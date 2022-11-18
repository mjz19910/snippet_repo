/** @template T */
export class Optional {
    deref() {
        return this.value();
    }
    value() {
        if(this.m_has_value) {
            if(this.m_value !== null) return this.m_value;
        }
        throw new Error("Empty optional");
    }
    has_value() {
        return this.m_has_value;
    }
    m_has_value=false;
    /**@type {NonNullable<T>|null} */
    m_value;
    /** @param {T} dv */
    value_or(dv) {
        if(this.m_has_value) {
            if(this.m_value == null) throw new Error("Runtime error");
            return this.m_value;
        }
        return dv;
    }
    /** @param {[x: NonNullable<T>]|[]} args */
    constructor(...args) {
        if(args.length===0) {
            this.m_has_value=false;
            this.m_value=null;
        } else {
            this.m_value=args[0];
        }
    }
    set_null() {
        this.m_has_value=false;
    }
    /** @template T @arg {NonNullable<T>} v */
    static null_opt(v) {
        let opt=new Optional(v);
        opt.set_null();
        return opt;
    }
}
