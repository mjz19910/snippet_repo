import BoxTemplate from "./BoxTemplate";
import IndexRaw from "../raw/IndexRaw";

export default class IndexBox extends BoxTemplate<IndexRaw> {
	type: "object_box" = "object_box";
	extension: 'index' = 'index';
	index_type: "value" = "value";
}
