import {Box} from "./Box"
import {BoxTemplate} from "./BoxTemplate"
import {IndexAccess} from "./IndexAccess"

export class IndexBox extends BoxTemplate<"object_box",IndexAccess<Box>> {
	readonly type="object_box";
	readonly m_verify_name="IndexBox";
	readonly like_type="object_box";
	readonly extension='index';
	readonly index_type="Box";
	verify_name(name: "IndexBox") {
		return this.m_verify_name==='IndexBox'&&name==='IndexBox'
	}
}
