declare interface DOMTokenList {
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
