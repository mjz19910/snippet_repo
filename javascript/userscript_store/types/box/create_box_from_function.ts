import { Box } from "./Box";
import { CSSStyleSheetConstructorBox } from "./CSSStyleSheetConstructorBox";
import { extract_CSSStyleSheetConstructor } from "./extract_CSSStyleSheetConstructor";
import { extract_sub_type } from "./extract_sub_type";
import { FunctionBox } from "./FunctionBox";
import { NewableInstancePack } from "./NewableInstancePack";
import { AsyncFunctionBox } from "./mod";
import { temporary_box_from_create_box } from "./temporary_box_from_create_box";
import { BoxedNewableInstancePackObject } from "./BoxedNewableInstancePackObject";
import { FunctionBox_Value } from "./FunctionBox_Value";

export function create_box_from_function(value: FunctionBox_Value): Box {
	if (extract_CSSStyleSheetConstructor(value)) {
		return new CSSStyleSheetConstructorBox(value);
	}
	if (extract_sub_type<(...a: Box[]) => Box, Function>(value)) {
		return new FunctionBox(value);
	}
	if (extract_sub_type<NewableInstancePack<{}>, Function>(value)) {
		return new BoxedNewableInstancePackObject(value);
	}
	if (extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(value)) {
		return new AsyncFunctionBox(value);
	}
	return new temporary_box_from_create_box(value);
}
