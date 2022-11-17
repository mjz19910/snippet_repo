// 0 "HTMLToken.cppts"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLToken.cppts"
import {HTMLToken_Type} from "./HTMLToken_Type";
import {SourcePosition} from "./SourcePosition.js";

function __builtin_trap() {
    throw new Error("Trap");
}

function ak_verification_failed(message) {
    dbgln("VERIFICATION FAILED: {}", message);
    __builtin_trap();
}






class CodePoint {}

/** @template T */
class OwnPtr<T> {
    ptr:T|null = null;
}

class Vector<T> {
    x:T;
    constructor(x:T) {
        this.x = x;
    }
}

class Variant<T extends any[]> {
    set<V extends number>(arg0: T[V]) {
        this.erased=arg0;
    }
    x:T;
    erased:any;
    constructor(x:T) {
        this.x=x;
    }
}

class Empty {}

type u32 = number;

class DoctypeData {}

class Attribute {}

export class HTMLToken {
    static Position=SourcePosition;
    static Type=HTMLToken_Type;
    m_type: HTMLToken_Type|null;
    m_data!: Variant<[Empty, u32, OwnPtr<DoctypeData>, OwnPtr<Vector<Attribute>>]>;
    m_code_point: CodePoint|null = null;
    m_start_position: SourcePosition|null = null;
    m_string_data: any;
    constructor() {
        this.m_type=HTMLToken_Type.Invalid;
        this.set_code_point(new CodePoint);
    }
    static from_type(type:HTMLToken_Type): HTMLToken
    {
        let obj=new this;
        obj.m_type=type;
        switch (obj.m_type) {
        case this.Type.Character:
            obj.m_data.set(0);
            break;
        case this.Type.DOCTYPE:
            obj.m_data.set(new OwnPtr<DoctypeData>());
            break;
        case this.Type.StartTag:
        case this.Type.EndTag:
            obj.m_data.set(new OwnPtr<Vector<Attribute>>());
            break;
        default:
            break;
        }
        return obj;
    }
    static make_character(code_num: string) {
        let obj=new this;
        obj.m_data.set(HTMLToken.Type.Character);
        obj.set_code_point(code_num);
        return obj;
    }
    set_code_point(code_point: CodePoint|null) {
        this.m_code_point=code_point;
    }
    set_start_position(_badge: "Badge_HTMLTokenizer",start_position: SourcePosition) {
        this.m_start_position=start_position;
    }
    tag_name() {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed("this.is_start_tag() || this.is_end_tag()" "\n" "HTMLToken.cppts" ":" __stringify(96)) : (void)0);
        return this.m_string_data;
    }
    is_end_tag(): any {
        throw new Error("Method not implemented.");
    }
    is_start_tag(): boolean {
        throw new Error("Method not implemented.");
    }
}
