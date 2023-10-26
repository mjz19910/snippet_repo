import {Box} from "./Box.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";
import {IndexAccess} from "./IndexAccess.ts";

export class IndexBox extends BoxTemplate<"object_box",IndexAccess<Box>> {
	readonly type="object_box";
	readonly like_type="object_box";
	readonly extension='index';
	readonly index_type="Box";
	readonly inner_type="Box";
}
