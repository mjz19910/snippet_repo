import { Box } from "../Box";
import { CSSStyleSheetConstructorBox } from "../CSSStyleSheetConstructorBox";
import { is_CSSStyleSheetConstructor } from "../is_namespace/is_CSSStyleSheetConstructor";
import { extract_sub_type } from "../extract_sub_type";
import { FunctionBox } from "../FunctionBox";
import { NewableInstancePack } from "../NewableInstancePack";
import { temporary_box_from_create_box } from "../temporary_box/temporary_box_from_create_box";
import { NewableInstancePackObjectBox } from "../NewableInstancePackObjectBox";
import { FunctionBox_Value } from "../FunctionBox_Value";
import { AsyncFunctionBox } from "../async/AsyncFunctionBox";

export function create_box_from_function(value: FunctionBox_Value): Box {
	if (is_CSSStyleSheetConstructor(value)) {
		return new CSSStyleSheetConstructorBox(value);
	}
	if (extract_sub_type<(...a: Box[]) => Box, Function>(value)) {
		return new FunctionBox(value);
	}
	if (extract_sub_type<NewableInstancePack<{}>, Function>(value)) {
		return new NewableInstancePackObjectBox(value);
	}
	if (extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(value)) {
		return new AsyncFunctionBox(value);
	}
	return new temporary_box_from_create_box(value);
}
