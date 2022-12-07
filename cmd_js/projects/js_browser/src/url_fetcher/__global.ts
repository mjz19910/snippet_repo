export declare interface DOMTokenListMore {
    add(c: string): void;
    replace(c1: string, c2: string): void;
    remove(c: string): void;
    toggle(c: string): void;
    contains(c: string): boolean;
    values(): IterableIterator<string>;
    toString(): string;
}

export {};