import {HTMLToken} from "../HTMLToken.js";
import {Vector} from "../Vector.js";

export class Ref<T> {
    static wrap(arg0: Vector<HTMLToken.Attribute>): any {
        throw new Error("Method not implemented.");
    }
    assign(arg0: any) {
        throw new Error("Method not implemented.");
    }
    is_null() {
        return this.type===null;
    }
    deref(): T {
        if(this.type===null) throw new Error("");
        return this.type;
    }
    constructor(public type: T|null) {
        this.type=type;
    }
}
