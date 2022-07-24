import {Box} from "../Box"
import {CSSStyleSheetConstructorBox} from "../CSSStyleSheetConstructorBox"
import {is_CSSStyleSheetConstructor} from "../is_namespace/is_CSSStyleSheetConstructor"
import {FunctionBox} from "../FunctionBox"
import {NewableInstancePack} from "../NewableInstancePack"
import {temporary_box_from_create_box} from "../temporary_box/temporary_box_from_create_box"
import {NewableInstancePackObjectBox} from "../NewableInstancePackObjectBox"
import {FunctionBox_Value} from "../FunctionBox_Value"
import {AsyncFunctionBox} from "../AsyncFunctionBox"
import {is_not_type} from "../is_namespace/is_not_type"
import {cast} from "../is_namespace/cast"

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

