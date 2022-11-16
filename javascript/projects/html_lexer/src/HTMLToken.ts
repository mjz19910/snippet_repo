import {ETokenType} from "./ETokenType";
import {SourcePosition} from "./SourcePosition.js";

class CodePoint {}

export class HTMLToken {
	static Position=SourcePosition;
	static Type=ETokenType;
	m_type: ETokenType|null;
	m_data!: CodePoint|SourcePosition|null;
	constructor(type: ETokenType,code_point: CodePoint) {
		this.m_type=type;
		this.set_code_point(code_point);
	}
	static make_character(code_num: string) {
		let obj=new this(HTMLToken.Type.Character,code_num);
		obj.set_code_point(code_num);
		return obj;
	}
	set_code_point(code_point: CodePoint|null) {
		this.m_data=code_point;
	}
	set_start_position(_badge: "Badge_HTMLTokenizer",start_position: SourcePosition) {
		this.m_data=start_position;
	}
	tag_name() {
		throw new Error("Method not implemented.");
	}
	is_start_tag(): boolean {
		throw new Error("Method not implemented.");
	}
}
