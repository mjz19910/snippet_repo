/** @template T */
export class OwnPtr {
    deref() {
        if (this.ptr == null)
            throw new Error("");
        return this.ptr;
    }
    ptr = null;
}
