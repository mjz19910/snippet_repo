export class NullOptional {
    /**@template T @param {T} dv */
    value_or(dv) {
        return dv;
    }
}
/**@template T */
export class Optional {
    /**@type {T|null} */
    opt_value;
    /** @param {T} dv */
    value_or(dv) {
        if(this.opt_value!==null) {
            return this.opt_value;
        }
        return dv;
    }
    /** @param {T|null} opt_value */
    constructor(opt_value) {
        this.opt_value=opt_value;
    }
}
