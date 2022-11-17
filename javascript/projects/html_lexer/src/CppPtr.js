/**@template T */

export class CppPtr {
    /** @type {T|null} */
    ptr=null;
    /** @template T @arg {T} v */
    static from(v) {
        /**@type {CppPtr<T>} */
        let value=new CppPtr;
        value.ptr=v;
        return value;
    }
}
