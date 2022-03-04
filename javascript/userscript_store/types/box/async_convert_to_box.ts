import {BoxExtractType} from "./extract/BoxExtractType";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import VoidBox from "./VoidBox";

export async function async_convert_to_box(value: Extract<BoxExtractType, Promise<any>>) {
	let awaited_value = await value;
	if(awaited_value === void 0) {
		return new VoidBox;
	}
	if(awaited_value instanceof CSSStyleSheet) {
		return new CSSStyleSheetBox(awaited_value);
	}
	return awaited_value;
}
