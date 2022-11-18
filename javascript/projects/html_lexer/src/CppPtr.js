export class CppPtr {
    deref() {
        if (this.ptr !== null)
            return this.ptr;
        throw new Error("Nullptr exception");
    }
    is_not_null() {
        return this.ptr !== null;
    }
    ptr = null;
    /** @template T @arg {T} v */
    static from(v) {
        let value = new CppPtr();
        value.ptr = v;
        return value;
    }
}
