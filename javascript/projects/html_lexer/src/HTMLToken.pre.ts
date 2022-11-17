import {HTMLToken_Type} from "./HTMLToken_Type";
import {SourcePosition} from "./SourcePosition.js";

function dbgln(msg: string,...val: any[]) {
    console.log(msg,...val);
}

function __builtin_trap() {
    throw new Error("Trap");
}

function ak_verification_failed(message:string) {
    dbgln("VERIFICATION FAILED: {}",message);
    __builtin_trap();
}

function __stringify(value: any): string {
    return value.toString();
}

class CodePoint {}

/** @template T */
class OwnPtr<T> {
    ptr: T|null=null;
}

class Vector<T> {
    x: T;
    constructor(x: T) {
        this.x=x;
    }
}

class Variant<T extends any[]> {
    set<V extends number>(arg0: T[V]) {
        this.erased=arg0;
    }
    x: T;
    erased: any;
    constructor(x: T) {
        this.x=x;
    }
}

class Empty {}

type u32=number;

class DoctypeData {}

class Attribute {}

export function use_types() {
    let u_types:u32|null=null;
    let ex=[
        u_types,
        Attribute,
        DoctypeData,
        Empty,
        Variant,
        Vector,
        OwnPtr,
        CodePoint,
        __stringify,
        ak_verification_failed,
    ] as const;
    return [
        ...ex,HTMLToken_Type,SourcePosition
    ] as const;
}