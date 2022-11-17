import {any} from "../../browser_fake_dom/src/any.js";
import {ak_verification_failed} from "./ak_verification_failed.js";
import {Attribute} from "./Attribute";
import {CodePoint} from "./CodePoint";
import {DoctypeData} from "./DoctypeData";
import {Empty} from "./Empty.js";
import {HTMLTokenBase} from "./HTMLTokenBase";
import {HTMLToken_Type} from "./HTMLToken_Type";
import {move} from "./move.js";
import {MyDocTypeData} from "./MyDocTypeData";
import {Optional} from "./Optional.js";
import {OwnPtr} from "./OwnPtr";
import {SourcePosition} from "./SourcePosition.js";
import {u32} from "./u32.js";
import {Variant} from "./Variant.js";
import {Vector} from "./Vector";

export class HTMLToken {
    static Position=SourcePosition;
    static Type=HTMLToken_Type;
    m_type: HTMLToken_Type|null;
    m_data: Variant<[Empty,u32,OwnPtr<DoctypeData>,OwnPtr<Vector<Attribute>>]>;
    m_code_point: CodePoint|null=null;
    m_start_position: SourcePosition|null=null;
    m_string_data: any;
    constructor() {
        this.m_type=HTMLToken_Type.Invalid;
        this.m_data=new Variant(any([]));
        this.m_data.set(Empty);
        this.set_code_point(new CodePoint);
    }
    set_end_position(arg0: {},arg1: SourcePosition) {
        throw new Error("Method not implemented.");
    }
    set_tag_name(arg0: string) {
        throw new Error("Method not implemented.");
    }
    ensure_doctype_data():MyDocTypeData {
        throw new Error("Method not implemented.");
    }
    static from_type(type: HTMLToken_Type): HTMLTokenBase {
        let obj=new this;
        obj.m_type=type;
        switch(obj.m_type) {
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
    set_start_position(_badge: "Badge_HTMLTokenizer",start_position: SourcePosition) {
        this.m_start_position=start_position;
    }
    tag_name() {
        (!(this.is_start_tag()||this.is_end_tag())? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","HTMLToken.cppts",":","42"].join("")):void 0);
        return this.m_string_data;
    }
    is_end_tag(): any {
        throw new Error("Method not implemented.");
    }
    is_start_tag(): boolean {
        throw new Error("Method not implemented.");
    }
    set_comment(arg0: string) {
        throw new Error("Method not implemented.");
    }
    opt(): Optional<HTMLToken> {
        return new Optional(this);
    }
    set_code_point(code_point: CodePoint|null) {
        this.m_code_point=code_point;
    }
}
