export class NullOptional {
    /**@template T @param {T} dv */
    value_or(dv) {
        return dv;
    }
}
/**@template T */
export class Optional {
    value() {
        if(this.m_has_value) {
            return this.m_value;
        }
        throw new Error("Empty optional");
    }
    has_value() {
        return this.m_has_value;
    }
    m_has_value=false;
    /**@type {T} */
    m_value;
    /** @param {T} dv */
    value_or(dv) {
        if(this.m_has_value) {
            return this.m_value;
        }
        return dv;
    }
    /** @param {T} opt_value */
    constructor(opt_value) {
        this.m_value=opt_value;
    }
    set_null() {
        this.m_has_value=false;
    }
    /** @template T @arg {T} v */
    static null_opt(v) {
        let opt=new Optional(v);
        opt.set_null();
        return opt;
    }
}
