import {any} from "../../browser_fake_dom/src/any.js";
import {Attribute} from "./Attribute";
import {CodePoint} from "./CodePoint";
import {DoctypeData} from "./DoctypeData";
import {Empty} from "./Empty";
import {HTMLToken_Type} from "./HTMLToken_Type";
import {OwnPtr} from "./OwnPtr";
import {SourcePosition} from "./SourcePosition.js";
import {u32} from "./u32";
import {Variant} from "./Variant";
import {Vector} from "./Vector";

export class HTMLTokenBase {
    static Position=SourcePosition;
    static Type=HTMLToken_Type;
    m_type: HTMLToken_Type|null;
    m_data: Variant<[Empty,u32,OwnPtr<DoctypeData>,OwnPtr<Vector<Attribute>>]>;
    m_code_point: CodePoint|null=null;
    m_start_position: SourcePosition|null=null;
    m_string_data: any;
    set_code_point(code_point: CodePoint|null) {
        this.m_code_point=code_point;
    }
    constructor() {
        this.m_type=HTMLToken_Type.Invalid;
        this.m_data=new Variant(any([]));
        this.m_data.set(Empty);
        this.set_code_point(new CodePoint);
    }
}
