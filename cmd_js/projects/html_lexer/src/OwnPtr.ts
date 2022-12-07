/** @template T */
export class OwnPtr<T> {
    deref(): T {
        if(this.ptr == null) throw new Error("");
        return this.ptr;
    }
    static make<T>(v:T) {
        let x=new this<T>();
        x.ptr=v;
        return x;
    }
    ptr: T|null=null;
}
