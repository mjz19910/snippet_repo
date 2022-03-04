import {Box} from "./Box";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import VoidBox from "./VoidBox";
import {AllPromiseInBoxType} from "./promise/AllPromiseInBoxType";
import {create_box} from "./create_box";

export async function async_returns_into_box(promise: AllPromiseInBoxType): Promise<Box> {
	let val = await promise;
	if(val === void 0) {
		return new VoidBox();
	} else if(val === null) {
		return null;
	} else if(val instanceof CSSStyleSheet) {
		return new CSSStyleSheetBox(val);
	} else if(typeof val === 'object') {
		if(val.type === 'array_box')
			return val;
		else if(val.type === 'constructor_box')
			return val;
		else if(val.type === 'custom_box')
			return val;
		else if(val.type === 'function_box')
			return val;
		else if(val.type === 'instance_box')
			return val;
		else if(val.type === 'object_box')
			return val;
		else if(val.type === 'promise_box')
			return val;
		else if(val.type === 'shape_box')
			return val;
		else if(val.type === 'value_box')
			return val;
		else if(val.type === 'void')
			return val;
		else {
			return create_box(val);
		}
	}
	return val;
}
