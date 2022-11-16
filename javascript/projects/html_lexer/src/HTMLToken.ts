import {ETokenType} from "./ETokenType";
import {HtmlTokenPos} from "./HtmlTokenPos";

export class HTMLToken {
	static Position=HtmlTokenPos;
	tag_name() {
		throw new Error("Method not implemented.");
	}
	is_start_tag(): boolean {
		throw new Error("Method not implemented.");
	}
	set_end_position(arg0: {},arg1: {}) {
		throw new Error("Method not implemented.");
	}
	static Type=ETokenType;
	m_type: ETokenType|null;
	m_data!: number|string|null;
	static make_character(code_num: string|number) {
		let obj=new this(HTMLToken.Type.Character,code_num);
		obj.set_code_point(code_num);
		return obj;
	}
	constructor(type: ETokenType|null,code_point: string|number|null) {
		this.m_type=type;
		this.set_code_point(code_point);
	}
	set_code_point(code_point: number|string|null) {
		this.m_data=code_point;
	}
	set_start_position(_badge: "Badge_HTMLTokenizer",start_position: number) {
		this.m_data=start_position;
	}
}
