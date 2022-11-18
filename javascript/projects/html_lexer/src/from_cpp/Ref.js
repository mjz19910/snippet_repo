export class Ref {
    type;
    static wrap(arg0) {
        throw new Error("Method not implemented.");
    }
    assign(arg0) {
        throw new Error("Method not implemented.");
    }
    is_null() {
        return this.type === null;
    }
    deref() {
        if (this.type === null)
            throw new Error("");
        return this.type;
    }
    constructor(type) {
        this.type = type;
        this.type = type;
    }
}
