import {Box} from "./Box.js";
import {BoxTemplate} from "./BoxTemplate.js";
import {IndexAccess} from "./IndexAccess.js";

export class IndexBox extends BoxTemplate<"object_box",IndexAccess<Box>> {
	readonly type="object_box";
	readonly like_type="object_box";
	readonly extension="index";
	readonly index_type="Box";
	readonly inner_type="Box";
}
