import {ak_verification_failed} from "./ak_verification_failed.js";
import {Attribute} from "./Attribute";
import {CodePoint} from "./CodePoint";
import {DoctypeData} from "./DoctypeData";
import {HTMLTokenBase} from "./HTMLTokenBase";
import {HTMLToken_Type} from "./HTMLToken_Type";
import {Optional} from "./Optional.js";
import {OwnPtr} from "./OwnPtr";
import {SourcePosition} from "./SourcePosition.js";
import {Vector} from "./Vector";
import {cpp__stringify} from "./__stringify";


export class HTMLToken extends HTMLTokenBase {
    ensure_doctype_data() {
        throw new Error("Method not implemented.");
    }
    opt(): Optional<HTMLToken> {
        return new Optional(this);
    }
    static from_type(type: HTMLToken_Type): HTMLToken {
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
    set_code_point(code_point: CodePoint|null) {
        this.m_code_point=code_point;
    }
    set_start_position(_badge: "Badge_HTMLTokenizer",start_position: SourcePosition) {
        this.m_start_position=start_position;
    }
    tag_name() {
        (!(this.is_start_tag()||this.is_end_tag())? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","HTMLToken.cppts",":",cpp__stringify(42)].join("")):void 0);
        return this.m_string_data;
    }
    is_end_tag(): any {
        throw new Error("Method not implemented.");
    }
    is_start_tag(): boolean {
        throw new Error("Method not implemented.");
    }
}
