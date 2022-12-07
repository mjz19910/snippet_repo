import {OwnPtr} from "../OwnPtr.js";

export class Ref<T> {
    static wrap<T>(a: T): Ref<OwnPtr<T>> {
        return new Ref<OwnPtr<T>>(new OwnPtr(a));
    }
    assign(value: any) {
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
    }
}
