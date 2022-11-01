import {BoxVerify} from "./BoxVerify.js"
import {BoxTemplate} from "./template/BoxTemplate.js"

export class DocumentBox
	extends BoxTemplate<"document_box",Document>
	implements BoxVerify<DocumentBox,"DocumentBox">
{
	readonly type="document_box"
	readonly m_verify_name="DocumentBox"
	verify_name(name: "DocumentBox") {
		return this.m_verify_name==="DocumentBox"&&name==="DocumentBox"
	}
}

