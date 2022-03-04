import {BoxTemplate} from "./BoxTemplate";

export class DocumentBox
	extends BoxTemplate<"document_box", Document>
{
	readonly type = "document_box";
	readonly m_verify_name = "DocumentBox";
	as_type(v: 'function' | 'object') {
		if(v === 'object') return this;
		return null;
	}
	verify_name(name: "DocumentBox") {
		return this.m_verify_name === "DocumentBox" && name === "DocumentBox";
	}
}

