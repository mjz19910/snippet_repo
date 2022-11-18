import {CppPtr} from "./CppPtr.js";

class CppChar {}

export class StringView {
	static from_sub_view(string: string) {
		let sv=new StringView;
		sv.m_characters=string;
		sv.m_length=string.length;
		return sv;
	}
    at_u32(index: number) {
        return this.m_characters[index].charCodeAt(0);
    }
    at(index: number) {
        return this.m_characters[index];
    }
    substring_view(byte_offset: number,arg1: number) {
		let res=this.m_characters.slice(byte_offset,arg1);
		return StringView.from_sub_view(res);
    }
	length() {
		return this.m_length;
	}
	m_characters="";
	m_length=0;
	constructor() {}
}
