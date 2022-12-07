export class Variant<T extends any[]> {
    get<V extends number>():T[V] {
        return this.erased;
    }
    set<V extends number>(arg0: T[V]) {
        this.erased=arg0;
    }
    erased: any;
}
