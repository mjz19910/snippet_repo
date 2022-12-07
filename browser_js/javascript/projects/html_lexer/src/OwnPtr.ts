/** @template T */
export class OwnPtr<T> {
    deref(): T {
        if(this.ptr == null) throw new Error("");
        return this.ptr;
    }
    ptr: T|null=null;
}
