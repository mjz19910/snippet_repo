import { ak_verification_failed } from "./ak_verification_failed.js";
import { CodePoint } from "./CodePoint";
import { Empty } from "./Empty";
import { Ref } from "./from_cpp/Ref.js";
import { move } from "./move.js";
import { Optional } from "./Optional.js";
import { OwnPtr } from "./OwnPtr";
import { Variant } from "./Variant";
import { Vector } from "./Vector";
export class HTMLTokenBase {
    opt() {
        return new Optional(this);
    }
    m_type = HTMLTokenBase.Type.Invalid;
    m_data = new Variant();
    m_code_point = null;
    m_start_position = null;
    m_end_position = null;
    m_self_closing = false;
    set_code_point(code_point) {
        this.m_code_point = code_point;
    }
    constructor() {
        this.m_data.set(Empty);
        this.set_code_point(new CodePoint);
    }
    set_end_position(_, arg1) {
        this.m_end_position = arg1;
    }
    set_tag_name(arg0) {
        throw new Error("Method not implemented.");
    }
    ensure_doctype_data() {
        throw new Error("Method not implemented.");
    }
    static from_type(type) {
        let obj = new this;
        obj.m_type = type;
        switch (obj.m_type) {
            case HTMLTokenBase.Type.Character:
                obj.m_data.set(0);
                break;
            case HTMLTokenBase.Type.DOCTYPE:
                obj.m_data.set(new OwnPtr());
                break;
            case HTMLTokenBase.Type.StartTag:
            case HTMLTokenBase.Type.EndTag:
                obj.m_data.set(new OwnPtr());
                break;
            default:
                break;
        }
        return obj;
    }
    static make_character(code_num) {
        let obj = new this;
        obj.m_data.set(HTMLTokenBase.Type.Character);
        obj.set_code_point(code_num);
        return obj;
    }
    set_start_position(_badge, start_position) {
        this.m_start_position = start_position;
    }
    m_string_data = "";
    tag_name() {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()", "\n", "HTMLToken.cppts", ":", "42"].join("")) : void 0);
        return this.m_string_data;
    }
    is_end_tag() {
        throw new Error("Method not implemented.");
    }
    is_start_tag() {
        throw new Error("Method not implemented.");
    }
    add_attribute(attribute) {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()", "\n", "from_cpp/HTMLToken.cppts", ":", "10"].join("")) : void 0);
        this.ensure_tag_attributes().deref().append(move(attribute));
    }
    ensure_tag_attributes() {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()", "\n", "from_cpp/HTMLToken.cppts", ":", "14"].join("")) : void 0);
        // 3 == OwnPtr<Vector<Attribute>>
        let ptr = Ref.wrap(this.m_data.get().deref());
        if (ptr.is_null())
            ptr.assign(Ref.wrap(new Vector()));
        return Ref.wrap(ptr.deref().deref());
    }
    last_attribute() {
        throw new Error("Method not implemented.");
    }
    has_attributes() {
        throw new Error("Method not implemented.");
    }
    set_self_closing(closing) {
        this.m_self_closing = closing;
    }
    set_comment(value) { }
}
(function (HTMLTokenBase) {
    class Attribute {
        prefix;
        local_name = "";
        namespace_;
        value = "";
        name_start_position = new Position(0, 0);
        value_start_position = new Position(0, 0);
        name_end_position = new Position(0, 0);
        value_end_position = new Position(0, 0);
    }
    HTMLTokenBase.Attribute = Attribute;
    let Type;
    (function (Type) {
        Type[Type["Invalid"] = 0] = "Invalid";
        Type[Type["DOCTYPE"] = 1] = "DOCTYPE";
        Type[Type["StartTag"] = 2] = "StartTag";
        Type[Type["EndTag"] = 3] = "EndTag";
        Type[Type["Comment"] = 4] = "Comment";
        Type[Type["Character"] = 5] = "Character";
        Type[Type["EndOfFile"] = 6] = "EndOfFile";
    })(Type = HTMLTokenBase.Type || (HTMLTokenBase.Type = {}));
    class Position {
        static from(arg0, arg1) {
            return new this(arg0, arg1);
        }
        column;
        line;
        constructor(column, line) {
            this.column = column;
            this.line = line;
        }
    }
    HTMLTokenBase.Position = Position;
})(HTMLTokenBase || (HTMLTokenBase = {}));
