<<<<<<< HEAD
import {OwnPtr} from "../OwnPtr.js";
import {Vector} from "../Vector.js";

export class Ref<T> {
    static wrap_vec<T extends Vector<any>>(arg0: T): Ref<T> {
        return new Ref<T>(arg0);
    }
    static wrap<T>(a: T): Ref<OwnPtr<T>> {
        return new Ref<OwnPtr<T>>(OwnPtr.make(a));
    }
    assign(value: T|null) {
        this.value=value;
    }
    is_null() {
        return this.value===null;
    }
    deref(): T {
        if(this.value===null) throw new Error("");
        return this.value;
    }
    constructor(public value: T|null) {
        this.value=value;
=======
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
>>>>>>> 19d8bcac (u)
    }
}
