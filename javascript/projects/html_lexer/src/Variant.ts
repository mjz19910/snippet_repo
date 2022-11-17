export class Variant<T extends any[]> {
    set<V extends number>(arg0: T[V]) {
        this.erased=arg0;
    }
    x: T;
    erased: any;
    constructor(x: T) {
        this.x=x;
    }
}
