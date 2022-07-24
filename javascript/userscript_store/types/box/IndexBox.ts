import { Box } from "./Box";

type IndexAccess<T> = {
	[v: string]: T;
}
type IndexRaw = IndexAccess<Box>;
export class IndexBox {
	value:IndexRaw;
	like_type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "Box" = "Box";
	constructor(value:IndexRaw){
		this.value=value;
	}
}
