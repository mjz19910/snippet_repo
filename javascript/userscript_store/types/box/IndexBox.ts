import BoxTemplate from "./BoxTemplate";
import IndexRaw from "../vm/raw/IndexRaw";

export default class IndexBox {
	value:IndexRaw;
	like_type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "Box" = "Box";
	constructor(value:IndexRaw){
		this.value=value;
	}
}
