declare class DOMTokenList {
    private _set;
    private _afterUpdate;
    private _validate;
    constructor(valuesInit?: string[], afterUpdate?: (t: DOMTokenList) => void);
    add(c: string): void;
    replace(c1: string, c2: string): void;
    remove(c: string): void;
    toggle(c: string): void;
    contains(c: string): boolean;
    get length(): number;
    values(): IterableIterator<string>;
    get value(): string[];
    toString(): string;
}
