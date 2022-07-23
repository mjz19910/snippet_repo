import { CSSStyleSheetInitBox } from "./CSSStyleSheetInitBox";
import { ObjectBox } from "./ObjectBox";
import { StackVMBox } from "./StackVMBox";
import { extract_CSSStyleSheetInit } from "./extract_CSSStyleSheetInit";
import { extract_StackVM } from "../vm/box_support/extract_stack_vm";
import { Box } from "./Box";
import { NodeBox } from "./NodeBox";
import { DocumentBox } from "./DocumentBox";
import { WindowBox } from "./WindowBox";
import { CSSStyleSheetBox } from "./CSSStyleSheetBox";
import { EmptyArrayBox } from "./EmptyArrayBox";
import { ArrayBox } from "./ArrayBox";
import { async_convert_to_box } from "./async_convert_to_box";
import { is_empty_arr } from "./is_empty_arr";
import { async_box_extract_globalThis as is_globalThis } from "./extract_globalThis";
import { GlobalThisBox } from "./GlobalThisBox";
import { MediaListBox } from "./MediaListBox";
import { VoidBox } from "./VoidBox";
import { is_array_of } from "./is_array_of";
import { temporary_box_from_create_box_from_obj } from "./temporary_box_from_create_box_from_obj";
import { InstructionTypeArrayBox } from "./InstructionTypeArrayBox";
import { is_box } from "./is_box";
import { extract_MediaList as is_MediaList } from "./extract_MediaList";
import { ObjectBox_Value } from "./ObjectBox_Value";
import { PromiseBox } from "./promise/PromiseBox";
import { is_node } from "./is_node";
import { is_array } from "./is_array";
import { is_instruction_type } from "./is_instruction_type.1";
export function create_box_from_object(value: ObjectBox_Value): Box {
	if (value === null) return value
	if (value === void 0) return new VoidBox
	if (extract_StackVM(value)) return new StackVMBox(value)
	if (extract_CSSStyleSheetInit(value))return new CSSStyleSheetInitBox(value)
	if (value instanceof Document) return new DocumentBox(value)
	if (is_node(value)) return new NodeBox(value)
	if (value instanceof Window) return new WindowBox(value)
	if (value instanceof CSSStyleSheet) return new CSSStyleSheetBox(value)
	if (is_array<ObjectBox_Value, Extract<typeof value, any[]>>(value)) {
		if (is_empty_arr(value)) return new EmptyArrayBox(value)
		if (is_array_of(value, is_box)) return new ArrayBox(value)
		if (is_array_of(value, is_instruction_type)) return new InstructionTypeArrayBox(value)
	}
	if (value instanceof Promise<any>) return new PromiseBox(async_convert_to_box(value))
	if (is_MediaList(value)) return new MediaListBox(value)
	if (is_globalThis(value)) return new GlobalThisBox(value)
	if (Object.keys(value).length > 0) return new temporary_box_from_create_box_from_obj(value)
	return new ObjectBox(value);
}
