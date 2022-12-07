import {Ref} from "./from_cpp/Ref.js";
import {move} from "./move.js";
import {MyDocTypeData} from "./MyDocTypeData.js";
import {OwnPtr} from "./OwnPtr";
import {u32} from "./u32.js";
import {Variant} from "./Variant";
import {Vector} from "./Vector";

class CodePoint {}

function ak_verification_failed(string: string) {
    console.log("verify failure", string);
    throw new Error("Verify failed");
}

export class HTMLTokenBase {
    m_type: HTMLTokenBase.Type=HTMLTokenBase.Type.Invalid;
    m_data=new Variant<[null,u32,OwnPtr<MyDocTypeData>,OwnPtr<Vector<HTMLTokenBase.Attribute>>]>();
    m_code_point: CodePoint|null=null;
    m_start_position: HTMLTokenBase.Position|null=null;
    m_end_position: HTMLTokenBase.Position|null=null;
    m_self_closing: boolean=false;
    m_token_tag_name: string|null=null;
    set_code_point(code_point: CodePoint|null) {
        this.m_code_point=code_point;
    }
    constructor() {
        this.m_data.set<0>(null);
        this.set_code_point(new CodePoint);
    }
    set_end_position(_: "Badge<HTMLTokenizer>",arg1: HTMLTokenBase.Position) {
        this.m_end_position = arg1;
    }
    set_tag_name(tag_name: string) {
        this.m_token_tag_name=tag_name;
    }
    ensure_doctype_data(): MyDocTypeData {
        throw new Error("Method not implemented.");
    }
    static from_type(type: HTMLTokenBase.Type): HTMLTokenBase {
        let obj=new this;
        obj.m_type=type;
        switch(obj.m_type) {
            case HTMLTokenBase.Type.Character:
                obj.m_data.set(0);
                break;
            case HTMLTokenBase.Type.DOCTYPE:
                obj.m_data.set(new OwnPtr<MyDocTypeData>());
                break;
            case HTMLTokenBase.Type.StartTag:
            case HTMLTokenBase.Type.EndTag:
                obj.m_data.set(new OwnPtr<Vector<HTMLTokenBase.Attribute>>());
                break;
            default:
                break;
        }
        return obj;
    }
    static make_character(code_num: number) {
        let obj=new this;
        obj.m_data.set(HTMLTokenBase.Type.Character);
        obj.set_code_point(code_num);
        return obj;
    }
    set_start_position(_badge: "Badge<HTMLTokenizer>",start_position: HTMLTokenBase.Position) {
        this.m_start_position=start_position;
    }
    m_string_data: string="";
    tag_name() {
        (!(this.is_start_tag()||this.is_end_tag())? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","HTMLToken.cppts",":","42"].join("")):void 0);
        return this.m_string_data;
    }
    is_end_tag(): boolean {
        throw new Error("Method not implemented.");
    }
    is_start_tag(): boolean {
        throw new Error("Method not implemented.");
    }
    add_attribute(attribute: HTMLTokenBase.Attribute) {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","from_cpp/HTMLToken.cppts",":","10"].join("")) : void 0);
        this.ensure_tag_attributes().deref().append(move(attribute));
    }
    ensure_tag_attributes(): Ref<Vector<HTMLTokenBase.Attribute>> {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","from_cpp/HTMLToken.cppts",":","14"].join("")) : void 0);
        // 3 == OwnPtr<Vector<Attribute>>
        let ptr: Ref<OwnPtr<Vector<HTMLTokenBase.Attribute>>> = Ref.wrap(this.m_data.get<3>().deref());
        if (ptr.is_null())
            ptr.assign(Ref.wrap(new Vector<HTMLTokenBase.Attribute>()).deref());
        return Ref.wrap_vec(ptr.deref().deref());
    }
    last_attribute(): HTMLTokenBase.Attribute {
        throw new Error("Method not implemented.");
    }
    has_attributes(): boolean {
        throw new Error("Method not implemented.");
    }
    set_self_closing(closing: boolean): void {
        this.m_self_closing = closing;
    }
    m_comment:string|null=null;
    set_comment(value: string): void {
        this.m_comment=value;
    }
}

export namespace HTMLTokenBase {
    export class Attribute {
        prefix!: string;
        local_name="";
        namespace_!: string;
        value="";
        name_start_position=new Position(0,0);
        value_start_position=new Position(0,0);
        name_end_position=new Position(0,0);
        value_end_position=new Position(0,0);
    }

    export enum Type {
        Invalid,
        DOCTYPE,
        StartTag,
        EndTag,
        Comment,
        Character,
        EndOfFile
    }

    export class Position {
        static from(arg0: number,arg1: number) {
            return new this(arg0,arg1);
        }
        column;
        line;
        constructor(column: number,line: number) {
            this.column=column;
            this.line=line;
        }
    }
}
