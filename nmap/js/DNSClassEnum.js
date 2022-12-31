export class DNSClassEnum {
    /** @readonly*/ static 0 = "IN";
    /** @readonly*/ static IN = 0;
    /** @readonly*/ static 1 = "HS";
    /** @readonly*/ static HS = 1;
    /** @readonly*/ static 2 = "CH";
    /** @readonly*/ static CH = 2;
    /** @arg {Extract<keyof typeof this, number>} value @arg {boolean} short */
    static stringify(value, short) {
        if(short) {
            return this[value];
        }
        return `${this.name}.${this[value]}`;
    }
}
