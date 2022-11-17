enum Namespace {
    HTML
}

abstract class ParserNode {
    namespace_():Namespace {
        throw new Error("Method not implemented.");
    }
}

abstract class HTMLParser {
    abstract adjusted_current_node(): ParserNode;
	abstract test:number;
}
