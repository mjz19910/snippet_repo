export class CppPtr<T> {
	offset(index: number) {
		throw new Error("Method not implemented.");
	}
    deref(): T {
        if(this.ptr!== null)return this.ptr;
        throw new Error("Nullptr exception");
    }
    is_not_null() {
        return this.ptr !== null;
    }
    ptr:T|null=null;
    /** @template T @arg {T} v */
    static from<T>(v:T) {
        let value=new CppPtr<T>();
        value.ptr=v;
        return value;
    }
}
