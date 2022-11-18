export enum Namespace {
    HTML
}

export abstract class ParserNode {
    namespace_():Namespace {
        throw new Error("Method not implemented.");
    }
}

export abstract class HTMLParser {
    abstract adjusted_current_node(): ParserNode;
	abstract test:number;
}
