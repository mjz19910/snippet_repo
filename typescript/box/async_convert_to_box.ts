import {BoxExtractType} from "./helper/BoxExtractType.js"
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js"
import {VoidBox} from "./VoidBox.js"

export async function async_convert_to_box(value: Extract<BoxExtractType,Promise<any>>) {
	let awaited_value=await value
	if(awaited_value===void 0) {
		return new VoidBox
	}
	if(awaited_value instanceof CSSStyleSheet) {
		return new CSSStyleSheetBox(awaited_value)
	}
	return awaited_value
}
