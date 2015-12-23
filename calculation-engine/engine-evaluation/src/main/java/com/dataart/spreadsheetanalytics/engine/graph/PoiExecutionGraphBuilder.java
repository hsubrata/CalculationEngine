/*
Copyright 2015 DataArt Apps, Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package com.dataart.spreadsheetanalytics.engine.graph;

import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.CELL_WITH_FORMULA;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.CELL_WITH_VALUE;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.CONSTANT_VALUE;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.EMPTY_CELL;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.FUNCTION;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.IF;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.OPERATOR;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.RANGE;
import static com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type.isCell;
import static java.lang.String.format;
import static java.lang.String.join;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;
import static org.apache.poi.common.fork.ExecutionGraphBuilderUtils.ptgToString;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.FORMULA_PTG;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.FORMULA_PTG_STRING;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.FORMULA_STRING;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.FORMULA_VALUES;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.NAME;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.PTG_STRING;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.SOURCE_OBJECT_ID;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.TYPE;
import static org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName.VALUE;

import java.util.Collection;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.poi.common.fork.IExecutionGraphBuilder;
import org.apache.poi.common.fork.IExecutionGraphVertex;
import org.apache.poi.common.fork.IExecutionGraphVertexProperty;
import org.apache.poi.common.fork.IExecutionGraphVertexProperty.PropertyName;
import org.apache.poi.ss.formula.WorkbookEvaluator;
import org.apache.poi.ss.formula.eval.BlankEval;
import org.apache.poi.ss.formula.eval.ErrorEval;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.functions.Area2DValues;
import org.apache.poi.ss.formula.ptg.AbstractFunctionPtg;
import org.apache.poi.ss.formula.ptg.AreaPtg;
import org.apache.poi.ss.formula.ptg.NamePtg;
import org.apache.poi.ss.formula.ptg.NameXPxg;
import org.apache.poi.ss.formula.ptg.OperationPtg;
import org.apache.poi.ss.formula.ptg.ParenthesisPtg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.Ref3DPxg;
import org.apache.poi.ss.formula.ptg.RefPtg;
import org.apache.poi.ss.formula.ptg.ScalarConstantPtg;
import org.apache.poi.ss.formula.ptg.ValueOperatorPtg;
import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;

import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.ICellValue;
import com.dataart.spreadsheetanalytics.api.model.IExecutionGraphVertex.Type;
import com.dataart.spreadsheetanalytics.engine.CalculationEngineException;
import com.dataart.spreadsheetanalytics.model.CellAddress;

/**
 * This class is a direct implementation of {@link IExecutionGraphBuilder} interface from forked POI library.
 * It's purpose is to provide actual storage for Graph object while {@link WorkbookEvaluator} does evaluation.
 * From the beginning of evaluation till the end it fills graph with nodes and edges.
 * Temporary state is saved in internal Maps and Sets.
 * When evaluation is done it's {@link #runPostProcessing(boolean)} method does 'clean' graph's structure.
 * 
 * New instance of this class should be created for each evaluation (with graph building).
 */
public class PoiExecutionGraphBuilder implements IExecutionGraphBuilder {

    protected static final String CONSTANT_VALUE_NAME = "VALUE";
    protected static final String UNDEFINED_EXTERNAL_FUNCTION = "#external#";
    protected Map<String, String> refsToNames = new HashMap<>();

    static final Set<String> POI_VALUE_REDUNDANT_SYMBOLS = new HashSet<>(asList("[", "]"));
    
    protected DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> dgraph = new DefaultDirectedGraph<>(ExecutionGraphEdge.class);
    protected ExecutionGraphConfig config = ExecutionGraphConfig.DEFAULT;
    /*
     * The map is used to store vertices using value field as a key
     * One value may correspond to several vertices. That's why we use Deques instead of single values.
     */
    protected Map<ValueEval, Deque<IExecutionGraphVertex>> valueToVertex = new HashMap<>();
    protected Map<String, Set<IExecutionGraphVertex>> addressToVertices = new HashMap<>();

    public ExecutionGraph get() {
        return ExecutionGraph.wrap(this.dgraph);
    }

    /**
     * This method should be used when creating a new vertex from a cell, so
     * vertex name is a cell's address. New Vertex will be created any time this
     * method is invoked. New vertex will be stored in address-to-set-of-vertices map.
     */
    @Override
    public IExecutionGraphVertex createVertex(String address) {
        // create new vertex object
        ExecutionGraphVertex v = new ExecutionGraphVertex(address.replace("$", ""));

        // add vertex to actual graph
        this.dgraph.addVertex(v);

        // put new vertex to set of vertices with the same address, since they
        // all must have the same set of properties and values
        Set<IExecutionGraphVertex> vs = this.addressToVertices.containsKey(address) ? this.addressToVertices.get(address) : new HashSet<>();
        vs.add(v);
        this.addressToVertices.put(address, vs);

        return v;
    }

    @Override
    public IExecutionGraphVertex createVertex(Ptg ptg) {
        if (isSkipVertex(ptg)) { return null; }
        
        boolean isCell = ptg instanceof RefPtg;
        String name = ptgToString(ptg);

        if (isCell) { // cell
            return createVertex(name);
        } else { // operation
            ExecutionGraphVertex v = new ExecutionGraphVertex(name);
            this.dgraph.addVertex(v);
            return v;
        }
    }

    @Override
    public void connect(IExecutionGraphVertex from, IExecutionGraphVertex to) {
        this.dgraph.addEdge((ExecutionGraphVertex) from, (ExecutionGraphVertex) to);
    }

    @Override
    public void removeVertex(IExecutionGraphVertex vertex) {
        if (vertex == null) { return; }
        this.dgraph.removeVertex((ExecutionGraphVertex) vertex);
    }

    @Override
    public void putVertexToStack(ValueEval value, IExecutionGraphVertex vertex) {
        if (value == null) { throw new CalculationEngineException("ValueEval to assosiate vertex with cannot be null."); }
        if (!this.valueToVertex.containsKey(value)) { this.valueToVertex.put(value, new LinkedList<IExecutionGraphVertex>()); }
        this.valueToVertex.get(value).push(vertex);
    }

    @Override
    public IExecutionGraphVertex getVertexFromStack(ValueEval value) {
        if (value == null) { throw new CalculationEngineException("ValueEval to assosiate vertex with cannot be null."); }
        /* the value is taken from the Deque while it is taken from the stack in poi WorkbookEvaluator class */
        return this.valueToVertex.get(value).pop();
    }

    @Override
    public void putVertexToCache(String address, IExecutionGraphVertex vertex) {
        if (!this.addressToVertices.containsKey(address)) { this.addressToVertices.put(address, new HashSet<>()); }
        this.addressToVertices.get(address).add(vertex);
    }
    
    @Override
    public void putVertexToCache(int row, int column, IExecutionGraphVertex vertex) {
        putVertexToCache(CellAddress.toA1Address(row, column), vertex);
    }
    
    @Override
    public Set<IExecutionGraphVertex> getVerticesFromCache(String address) {
        return this.addressToVertices.get(address);
    }

    @Override
    public Set<IExecutionGraphVertex> getVerticesFromCache(int row, int column) {
        return getVerticesFromCache(CellAddress.toA1Address(row, column));
    }

    @Override
    public IExecutionGraphVertexProperty getVertexProperty(IExecutionGraphVertex vertex, PropertyName property) {
        return ((ExecutionGraphVertex) vertex).property(property);
    }

    /**
     * Do anything you want here. After graph is completed and we are out of POI
     * context you can add\remove\etc any information you want.
     */
    public void runPostProcessing(boolean multiRoot) {
        DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> graph = this.dgraph;

        // make identical vertices have the same set of properties
        // two vertices are identical if they have the same address value.
        // Id for every vertex is unique, so this is not a flag here
        for (Entry<String, Set<IExecutionGraphVertex>> en : this.addressToVertices.entrySet()) {
            Set<IExecutionGraphVertex> vs = this.addressToVertices.get(en.getKey());

            // the logic below is very fragile and based on some empirical model
            // and may not work for other type of graphs
            if (vs != null && vs.size() > 1) {
                IExecutionGraphVertex standard = null;

                for (IExecutionGraphVertex ivertex : vs) {
                    ExecutionGraphVertex vertex = (ExecutionGraphVertex) ivertex;
                    if (CELL_WITH_FORMULA == (Type) vertex.property(TYPE).get()) { standard = vertex; break; }
                }

                if (standard != null) {
                    copyProperties(standard, vs);
                }
            }
        }

        // copy or link subgraphs to identical vertices and modify Formula field with additional values
        Map<String, AtomicInteger> adressToCount = new HashMap<>();

        for (ExecutionGraphVertex vertex : graph.vertexSet()) {

            // restore/add subgraphs to identical vertices
            Type type = (Type) vertex.property(TYPE).get();

            if (isCell(type)) {
                String address = (String) vertex.property(NAME).get();

                adressToCount.putIfAbsent(address, new AtomicInteger(0));

                if (adressToCount.get(address).incrementAndGet() > 1) { // count > 1
                    // need to link
                    Set<ExecutionGraphVertex> subgraphTops = new HashSet<>();

                    for (IExecutionGraphVertex itmpVertex : graph.vertexSet()) {

                        ExecutionGraphVertex tmpVertex = (ExecutionGraphVertex) itmpVertex;

                        String tmpAddress = (String) tmpVertex.property(NAME).get();
                        if (address.equals(tmpAddress)) { // check for subgraph
                            for (ExecutionGraphEdge tmpEdge : graph.incomingEdgesOf(tmpVertex)) {
                                subgraphTops.add(graph.getEdgeSource(tmpEdge));
                            }
                        }
                    }

                    for (IExecutionGraphVertex subVertex : subgraphTops) {
                        if (!this.addressToVertices.containsKey(address)) { continue; }
                        for (IExecutionGraphVertex vertexOfAddress : this.addressToVertices.get(address)) {
                            graph.addEdge((ExecutionGraphVertex) subVertex, (ExecutionGraphVertex) vertexOfAddress);
                        }
                    }
                }
            }

            /* Adding IF Value */
            if (IF == type) {
                Set<ExecutionGraphEdge> two = graph.incomingEdgesOf(vertex);
                if (two.size() != 2) { throw new CalculationEngineException("IF must have only two incoming edges."); }

                Object ifBranchValue = null;
                for (ExecutionGraphEdge e : two) {
                    ExecutionGraphVertex oneOfTwo = graph.getEdgeSource(e);
                    if (!isCompareOperand(oneOfTwo.name())) {
                        ifBranchValue = oneOfTwo.property(VALUE).get();
                        break;
                    }
                }
                vertex.property(VALUE).set(ifBranchValue);
            }

        }

        for (ExecutionGraphVertex vert : graph.vertexSet()) {
            if (graph.outgoingEdgesOf(vert).isEmpty()) {
                ExecutionGraphVertex root = vert;
                root.formula = buildFormula(root, graph);
                if (!multiRoot) { break; }
            }
        }

        if (this.config.getDuplicatesNumberThreshold() != -1) {
            removeAllDuplicates();
        }
        addNamesToAliases();
    }

    protected CellFormulaExpression buildFormula(ExecutionGraphVertex vertex, DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> graph) {

        checkValueNode(vertex);

        switch (vertex.type) {

            case CELL_WITH_VALUE: {
                CellFormulaExpression formula = vertex.formula;
                formula.formulaStr(vertex.property(NAME).get().toString());
                formula.formulaValues(vertex.value().toString());
                formula.formulaPtgStr(vertex.value().toString());
                formula.ptgStr(vertex.property(NAME).get().toString());
                checkForEmptyValues(vertex);
                return formula;
            }
            case CELL_WITH_REFERENCE:
            case CELL_WITH_FORMULA: {
                ExecutionGraphVertex ivertex = null;
                CellFormulaExpression formula = null;
                for (ExecutionGraphEdge edge : graph.incomingEdgesOf(vertex)) {
                    ivertex = graph.getEdgeSource(edge);
                    formula = buildFormula(ivertex, graph);
                }
                vertex.formula = CellFormulaExpression.copyOf(formula);
                vertex.value = (ivertex == null) ? vertex.value : ivertex.value;
                return CellFormulaExpression.copyOf(formula);
            }
            case OPERATOR:
            case FUNCTION: {
                Set<ExecutionGraphEdge> edges = graph.incomingEdgesOf(vertex);
                List<String> formulaStringNodes = new LinkedList<>();
                List<String> formulaValuesNodes = new LinkedList<>();
                List<String> formulaPtgNodes = new LinkedList<>();
                List<String> ptgNodes = new LinkedList<>();
                Object[] formulaPtg = (Object[]) vertex.property(FORMULA_PTG).get();
                for (ExecutionGraphEdge edge : edges) {
                    ExecutionGraphVertex ivertex = graph.getEdgeSource(edge);
                    CellFormulaExpression formula = buildFormula(ivertex, graph);
                    formulaStringNodes.add(formula.formulaStr());
                    formulaValuesNodes.add(formula.formulaValues());
                    formulaPtgNodes.add(formula.formulaPtgStr());
                    ptgNodes.add(formula.ptgStr());
                    // if the parent node has error value we leave it as it is
                    // otherwise it will represent the child's node error value
                    if (isErrorValue(ivertex.value()) && inheritsErrorValue(vertex)) {
                        vertex.value = ivertex.value();
                    }
                }
                CellFormulaExpression iformula = vertex.formula();
                iformula.formulaStr(createFormulaString(formulaPtg[0], formulaStringNodes, vertex));
                iformula.formulaValues(createFormulaString(formulaPtg[0], formulaValuesNodes, vertex));
                iformula.formulaPtgStr(createPtgString(formulaPtg[0], formulaPtgNodes, vertex));
                iformula.ptgStr(createPtgString(formulaPtg[0], ptgNodes, vertex));
                CellFormulaExpression result = CellFormulaExpression.copyOf(iformula);
                iformula.formulaPtgStr("");
                iformula.ptgStr("");
                return result;
            }
            case IF: {
                Set<ExecutionGraphEdge> edges = graph.incomingEdgesOf(vertex);
                List<String> formulaValuesNodes = new LinkedList<>();
                List<String> formulaPtgNodes = new LinkedList<>();
                List<String> ptgNodes = new LinkedList<>();
                for (ExecutionGraphEdge edge : edges) {
                    ExecutionGraphVertex ivertex = graph.getEdgeSource(edge);
                    CellFormulaExpression formula = buildFormula(ivertex, graph);
                    formulaValuesNodes.add(formula.formulaValues());
                    formulaPtgNodes.add(formula.formulaPtgStr());
                    ptgNodes.add(formula.ptgStr());
                    if (OPERATOR != ivertex.type) { vertex.value = ivertex.value; }
                }
                Collections.sort(formulaValuesNodes, (n1, n2) -> isCompareOperand(n1) ? -1 : 0);
                CellFormulaExpression iformula = vertex.formula;
                iformula.formulaValues(createFormulaString(null, formulaValuesNodes, vertex));
                iformula.formulaPtgStr(createPtgString(null, formulaPtgNodes, vertex));
                iformula.ptgStr(createPtgString(null, ptgNodes, vertex));
                CellFormulaExpression result = CellFormulaExpression.copyOf(iformula);
                iformula.formulaPtgStr("");
                iformula.ptgStr("");
                return result;
            }
            case RANGE: {
                CellFormulaExpression iformula = vertex.formula();
                iformula.formulaStr(vertex.property(NAME).get().toString());
                iformula.formulaValues(vertex.property(VALUE).get().toString());
                iformula.formulaPtgStr(vertex.property(VALUE).get().toString());
                iformula.ptgStr(vertex.property(NAME).get().toString());
                connectValuesToRange(vertex);
                Set<ExecutionGraphEdge> edges = graph.incomingEdgesOf(vertex);
                for (ExecutionGraphEdge edge : edges) {
                    ExecutionGraphVertex ivertex = graph.getEdgeSource(edge);
                    buildFormula(ivertex, graph);
                }
                return iformula;
            }
            case CONSTANT_VALUE: {
                vertex.property(NAME).set(CONSTANT_VALUE_NAME);
                CellFormulaExpression formula = vertex.formula;
                formula.formulaStr(vertex.property(NAME).get().toString());
                formula.formulaValues(vertex.value().toString());
                formula.formulaPtgStr(vertex.value().toString());
                formula.ptgStr(vertex.property(NAME).get().toString());
                return CellFormulaExpression.copyOf(formula);
            }
            default: {
                return vertex.formula;
            }
        }

    }

    protected void checkValueNode(ExecutionGraphVertex vertex) {
        if (vertex.type == CELL_WITH_VALUE) {
            if (this.dgraph.incomingEdgesOf(vertex).size() == 1) {
                vertex.type = Type.CELL_WITH_REFERENCE;
            } else if (this.dgraph.incomingEdgesOf(vertex).size() > 1) {
                vertex.type = CELL_WITH_FORMULA;
            }
        }
    }

    protected void checkForEmptyValues(ExecutionGraphVertex vertex) {
        Object value = vertex.property(VALUE).get();
        if (value.toString().isEmpty() || value instanceof BlankEval) {
            vertex.property(TYPE).set(EMPTY_CELL);
        }
    }

    protected void connectValuesToRange(ExecutionGraphVertex rangeVertex) {
        Object cellValue = rangeVertex.value();
        if (!(cellValue instanceof Area2DValues)) { return; }
        
        for (String adress : ((Area2DValues) cellValue).getRangeCellAddresses()) {
            if (this.addressToVertices.get(adress) == null) { continue; }
            
            this.addressToVertices.get(adress).forEach(cellVertex -> connect(cellVertex, rangeVertex));
        }
    }

    protected boolean isSkipVertex(Ptg ptg) {
        return ptg instanceof ParenthesisPtg;
    }

    protected String createFormulaString(Object optg, List<String> ops, ExecutionGraphVertex vertex) {
        String opname = "";
        if (optg == null) { // IF
            opname = "IF";
        } else if (optg instanceof Ptg) {
            opname = ptgToString((Ptg) optg);
            /* if the function was not recognized as internal function we use the node name as the function name */
            if (UNDEFINED_EXTERNAL_FUNCTION.equals(opname)) { opname = vertex.name(); }
        } else {
            opname = optg.toString();
        }
        
        if (optg == null || optg instanceof AbstractFunctionPtg) {
            return stripRedundantSymbols(format("%s(%s)", 
                                                 opname,
                                                 join(",", asList(ops)
                                                               .stream()
                                                               .map(v -> v.toString())
                                                               .collect(toList()))));
        } else if (optg instanceof ValueOperatorPtg) {
            return stripRedundantSymbols(format("%s %s %s", ops.size() > 1 ? ops.get(1) : "", opname, ops.size() > 0 ? ops.get(0) : ""));
        }
        return "";
    }

    protected String createPtgString(Object optg, List<String> ops, ExecutionGraphVertex vertex) {
        String opname = "";
        
        if (optg == null) {
            opname = "IF";
            return stripRedundantSymbols(format("%s %s ",
                                                join(",", asList(ops)
                                                            .stream()
                                                            .map(v -> v.toString())
                                                            .collect(toList())), 
                                                opname));
        } else {
            opname = optg instanceof Ptg ? ptgToString((Ptg) optg) : optg.toString();
            /* if the function was not recognized as internal function we use the node name as the function name */
            if (UNDEFINED_EXTERNAL_FUNCTION.equals(opname)) { opname = vertex.name(); }
        }
        if (optg instanceof AbstractFunctionPtg) {
            return stripRedundantSymbols(format("%s %s ",
                                                join(",", asList(ops)
                                                            .stream()
                                                            .map(v -> v.toString())
                                                            .collect(toList())),
                                                opname));
        } else if (optg instanceof ValueOperatorPtg) {
            return stripRedundantSymbols(format("%s %s %s", ops.size() > 1 ? ops.get(1) : "", ops.size() > 0 ? ops.get(0) : "", opname));
        }

        return "";
    }

    protected static String stripRedundantSymbols(String inline) {
        for (String token : POI_VALUE_REDUNDANT_SYMBOLS) 
            { inline = inline.replace(token, ""); }
        return inline;
    }

    protected static boolean isErrorValue(Object val) {
        return val instanceof ErrorEval;
    }

    protected static boolean inheritsErrorValue(IExecutionGraphVertex ivertex) {
        ExecutionGraphVertex vertex = (ExecutionGraphVertex) ivertex;
        boolean isNotInherFunction = "ISERROR".equals(vertex.name());
        boolean isError = isErrorValue(vertex.value());
        return !(isError || isNotInherFunction);
    }

    public static Type ptgToVertexType(Ptg ptg) {

        if (ptg instanceof AbstractFunctionPtg) { // functions: SUM, COUNT, COS, etc.
            return FUNCTION;
        } else if (ptg instanceof ValueOperatorPtg || ptg instanceof OperationPtg) { // single operators: +, -, /, *, =
            return OPERATOR;
        } else if (ptg instanceof RefPtg || ptg instanceof Ref3DPxg || ptg instanceof NameXPxg || ptg instanceof NamePtg) {
            return CELL_WITH_VALUE;
        } else if (ptg instanceof ScalarConstantPtg) {
            return CONSTANT_VALUE;
        } else if (ptg instanceof AreaPtg) {
            return RANGE;
        }

        throw new CalculationEngineException("Unsupported Ptg class: " + ptg.getClass());
    }

    /**
     * Does copy of all properties for every Vertex from @param vertices. the
     * first @param istandard is used as object to copy from.
     */
    protected static void copyProperties(IExecutionGraphVertex istandard, Set<IExecutionGraphVertex> vertices) {
        ExecutionGraphVertex standard = (ExecutionGraphVertex) istandard;
        
        for (IExecutionGraphVertex ivertex : vertices) {
            if (istandard.equals(ivertex)) { continue; }

            ExecutionGraphVertex vertex = (ExecutionGraphVertex) ivertex;
            
            // copy properties
            for (PropertyName pname : PropertyName.values()) {
                if (pname == PropertyName.VERTEX_ID) { continue; }
                if (pname == PropertyName.INDEX_IN_FORMULA) { continue; }

                vertex.property(pname).set(standard.property(pname).get());
            }
        }
    }

    protected Set<ExecutionGraphVertex> getParents(ExecutionGraphVertex vertex) {
        Set<ExecutionGraphVertex> retvals = new HashSet<>();
        Set<ExecutionGraphEdge> edges = this.dgraph.outgoingEdgesOf(vertex);
        for (ExecutionGraphEdge edge : edges) { retvals.add(this.dgraph.getEdgeTarget(edge)); }
        return retvals;
    }

    protected Set<ExecutionGraphVertex> getChildren(ExecutionGraphVertex vertex) {
        Set<ExecutionGraphVertex> retvals = new HashSet<>();
        Set<ExecutionGraphEdge> edges = this.dgraph.incomingEdgesOf(vertex);
        for (ExecutionGraphEdge edge : edges) { retvals.add(this.dgraph.getEdgeSource(edge)); }
        return retvals;
    }

    protected void removeAllDuplicates() {
        Set<ExecutionGraphVertex> leaves = new HashSet<>();
        for (String address : this.addressToVertices.keySet()) {
            leaves.add((ExecutionGraphVertex) removeLeafDublicates(address, this.config.getDuplicatesNumberThreshold()));
        }
        processLeaves(leaves, this.config.getDuplicatesNumberThreshold());
    }

    protected void processLeaves(Set<ExecutionGraphVertex> leaves, int allowedNum) {
        Iterator<ExecutionGraphVertex> it = leaves.iterator();
        while (it.hasNext()) {
            ExecutionGraphVertex leaf = it.next();
            if (!this.dgraph.containsVertex(leaf)) {
                it.remove();
                continue;
            }
            Set<ExecutionGraphVertex> parents = getParents(leaf);
            Map<ExecutionGraphVertex, List<ExecutionGraphVertex>> chosen = new HashMap<>();
            for (ExecutionGraphVertex parent : parents) {
                if (isCyclicRef(parent, leaf)) { continue; }
                ExecutionGraphVertex found = returnVertexDuplicate(chosen.keySet(), parent);
                if (found == null) {
                    chosen.put(parent, new LinkedList<>());
                } else {
                    List<ExecutionGraphVertex> duplicates = chosen.get(found);
                    duplicates.add(parent);
                    chosen.put(found, duplicates);
                }
            }
            reduceDuplicates(chosen, allowedNum);
            processLeaves(chosen.keySet(), allowedNum);
        }
    }

    protected void reduceDuplicates(Map<ExecutionGraphVertex, List<ExecutionGraphVertex>> verticesMap, int allowedNum) {
        Set<ExecutionGraphVertex> childrenToRemove = new HashSet<>();
        Iterator<Entry<ExecutionGraphVertex, List<ExecutionGraphVertex>>> enterator = verticesMap.entrySet().iterator();
        while (enterator.hasNext()) {
            Entry<ExecutionGraphVertex, List<ExecutionGraphVertex>> entry = enterator.next();
            List<ExecutionGraphVertex> values = entry.getValue();
            if (values.size() > allowedNum) {
                for (ExecutionGraphVertex vertex : values) {
                    reassignOutgoingEdges(entry.getKey(), vertex);
                    for (ExecutionGraphEdge edge : this.dgraph.incomingEdgesOf(vertex)) {
                        ExecutionGraphVertex child = this.dgraph.getEdgeSource(edge);
                        if (Type.CONSTANT_VALUE.equals(child.type())) {
                            childrenToRemove.add(child);
                        }
                    }
                    this.dgraph.removeVertex(vertex);
                }
            }
        }
        for (ExecutionGraphVertex child : childrenToRemove) {
            this.dgraph.removeVertex(child);
        }
    }

    protected boolean isCyclicRef(ExecutionGraphVertex parent, ExecutionGraphVertex child) {
        Set<ExecutionGraphVertex> grandParents = getParents(parent);
        return grandParents.contains(child);
    }

    protected static ExecutionGraphVertex returnVertexDuplicate(Collection<ExecutionGraphVertex> set, ExecutionGraphVertex value) {
        for (ExecutionGraphVertex item : set) 
            { if (item.compareTo(value) == 1) { return item; } }
        return null;
    }

    protected void reassignOutgoingEdges(ExecutionGraphVertex ivertex1, ExecutionGraphVertex ivertex2) {
        for (ExecutionGraphEdge item : this.dgraph.outgoingEdgesOf(ivertex2)) 
            { this.dgraph.addEdge(ivertex1, this.dgraph.getEdgeTarget(item)); }
    }

    protected IExecutionGraphVertex removeLeafDublicates(String address, int num) {
        Set<IExecutionGraphVertex> vertices = getVerticesFromCache(address);
        ExecutionGraphVertex result = null;
        if (vertices.size() >= num) {
            Iterator<IExecutionGraphVertex> it = vertices.iterator();
            result = (ExecutionGraphVertex) it.next();
            while (it.hasNext()) {
                ExecutionGraphVertex value = (ExecutionGraphVertex) it.next();
                if (this.dgraph.containsVertex(value) && this.dgraph.containsVertex(result)) {
                    reassignOutgoingEdges(result, value);
                    this.dgraph.removeVertex(value);
                } else {
                    it.remove();
                }
            }
        }
        return result;
    }

    // TODO: not the best solution, but works as for now
    protected static boolean isCompareOperand(String name) {
        return name.contains("=") || name.contains("<") || name.contains(">") || name.contains("<>") || name.contains("=>") || name.contains("<=");
    }

    protected void addNamesToAliases() {
        for (Entry<String, String> entry : this.refsToNames.entrySet()) {
            String[] tokens = entry.getValue().split("!");
            String addr = tokens[tokens.length - 1].replace("$", "");
            if (getVerticesFromCache(addr) != null) {
                for (IExecutionGraphVertex ivrt : getVerticesFromCache(addr)) {
                    ExecutionGraphVertex vrt = (ExecutionGraphVertex) ivrt;
                    vrt.alias = entry.getKey();
                }
            }
            Set<IExecutionGraphVertex> namedVertices = getVerticesFromCache(entry.getKey());
            if (namedVertices != null) {
                for (IExecutionGraphVertex inamedVertex : namedVertices) {
                    ExecutionGraphVertex namedVertex = (ExecutionGraphVertex) inamedVertex;
                    for (ExecutionGraphVertex parent : getParents(namedVertex)) {
                        for (ExecutionGraphVertex child : getChildren(namedVertex)) { connect(child, parent); }
                    }
                    removeVertex(namedVertex);
                }
            }
        }
    }

    public static ExecutionGraph buildSingleVertexGraphForParseException(ICellAddress address, ErrorEval error, String formulaString) {
        
        ExecutionGraphVertex vertex = new ExecutionGraphVertex(address.a1Address().address());
        vertex.property(TYPE).set(CELL_WITH_FORMULA);
        vertex.property(VALUE).set(error);
        
        if (formulaString == null) { vertex.property(FORMULA_STRING).set(error.getErrorString()); }
        else { vertex.property(FORMULA_STRING).set(formulaString); }
        
        vertex.property(FORMULA_VALUES).set(error.getErrorString());
        vertex.property(FORMULA_PTG_STRING).set(error.getErrorString());
        vertex.property(PTG_STRING).set(error.getErrorString());
        vertex.property(SOURCE_OBJECT_ID).set("");
        
        DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> emptyGraph = new DefaultDirectedGraph<>(ExecutionGraphEdge.class);
        emptyGraph.addVertex(vertex);
        return ExecutionGraph.wrap(emptyGraph);
    }
    
    public static ExecutionGraph buildSingleVertexGraphForCellWithValue(ICellValue cell, ICellAddress address) {
        
        ExecutionGraphVertex vertex = new ExecutionGraphVertex(address.a1Address().address());
        vertex.property(VALUE).set(cell.get());
        vertex.property(TYPE).set(CELL_WITH_VALUE);
        vertex.property(FORMULA_STRING).set(address.a1Address().address());
        vertex.property(FORMULA_VALUES).set(cell.get().toString());
        vertex.property(FORMULA_PTG_STRING).set("");
        vertex.property(PTG_STRING).set("");
        vertex.property(SOURCE_OBJECT_ID).set(address.getDataModelId());

        DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> emptyGraph = new DefaultDirectedGraph<>(ExecutionGraphEdge.class);
        emptyGraph.addVertex(vertex);
        return ExecutionGraph.wrap(emptyGraph);
    }
    
    public static ExecutionGraph buildSingleVertexGraphForEmptyCell(ICellAddress address) {
        ExecutionGraphVertex vertex = new ExecutionGraphVertex(address.a1Address().address());
        vertex.property(TYPE).set(EMPTY_CELL);

        DirectedGraph<ExecutionGraphVertex, ExecutionGraphEdge> emptyGraph = new DefaultDirectedGraph<>(ExecutionGraphEdge.class);
        emptyGraph.addVertex(vertex);
        return ExecutionGraph.wrap(emptyGraph);
    }

    public void setRefsToNames(Map<String, String> refsToNames) { this.refsToNames = refsToNames; }
    public void setExecutionGraphConfig(ExecutionGraphConfig config) { this.config = config; }

}
