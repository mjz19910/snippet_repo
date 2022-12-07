export enum HTMLNamespace {
    HTML
}

export abstract class ParserNode {
    namespace_():HTMLNamespace {
        throw new Error("Method not implemented.");
    }
}

export abstract class HTMLParser {
    abstract adjusted_current_node(): ParserNode;
	abstract test:number;
}
