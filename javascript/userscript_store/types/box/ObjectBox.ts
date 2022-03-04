import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class ObjectBox
	extends BoxTemplate<"object_box", {}>
	implements BoxVerify<ObjectBox, "ObjectBox"> {
	readonly type = "object_box";
	readonly inner_type = 'unit';
	readonly m_verify_name = "ObjectBox";
	readonly extension = null;
	verify_name(name: "ObjectBox") {
		return this.m_verify_name === 'ObjectBox' && name === 'ObjectBox';
	}
}
