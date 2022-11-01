import {Box} from "../Box.js"
import {CSSStyleSheetConstructorBox} from "../CSSStyleSheetConstructorBox.js"
import {is_CSSStyleSheetConstructor} from "../is_namespace/is_CSSStyleSheetConstructor.js"
import {FunctionBox} from "../FunctionBox.js"
import {NewableInstancePack} from "../NewableInstancePack.js"
import {temporary_box_from_create_box} from "../temporary_box/temporary_box_from_create_box.js"
import {NewableInstancePackObjectBox} from "../NewableInstancePackObjectBox.js"
import {FunctionBox_Value} from "../FunctionBox_Value.js"
import {AsyncFunctionBox} from "../AsyncFunctionBox.js"
import {is_not_type} from "../is_namespace/is_not_type.js"
import {cast} from "../helper/cast.js"

export function create_box_from_function(value: FunctionBox_Value): Box {
	if(is_CSSStyleSheetConstructor(value)) {
		return new CSSStyleSheetConstructorBox(value)
	}
	if(is_not_type<(...a: Box[]) => Box,Function>(value)) {
		return new FunctionBox(value)
	}
	if(is_not_type<NewableInstancePack<{}>,Function>(value)) {
		return new NewableInstancePackObjectBox(value)
	}
	if(is_not_type<(...a: Box[]) => Promise<Box>,Function>(value)) {
		return new AsyncFunctionBox(value)
	}
	if(is_FunctionConstructor(value)) return new temporary_box_from_create_box(value)
	if(cast<Function>(value)) return new temporary_box_from_create_box(value)
}
function is_FunctionConstructor(value: Function|FunctionConstructor): value is FunctionConstructor {
	return value===Function
}

