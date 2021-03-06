import {CSSStyleSheetInitBox} from "../CSSStyleSheetInitBox"
import {ObjectBox} from "../ObjectBox"
import {StackVMBox} from "../StackVMBox"
import {is_CSSStyleSheetInit} from "../is_namespace/is_CSSStyleSheetInit"
import {is_StackVM} from "../../vm/box_support/extract_stack_vm"
import {Box} from "../Box"
import {NodeBox} from "../NodeBox"
import {DocumentBox} from "../DocumentBox"
import {WindowBox} from "../WindowBox"
import {CSSStyleSheetBox} from "../CSSStyleSheetBox"
import {EmptyArrayBox} from "../EmptyArrayBox"
import {ArrayBox} from "../ArrayBox"
import {async_convert_to_box} from "../async_convert_to_box"
import {is_empty_arr} from "../is_namespace/is_empty_arr"
import {is_globalThis} from "../is_namespace/is_globalThis"
import {GlobalThisBox} from "../GlobalThisBox"
import {MediaListBox} from "../MediaListBox"
import {VoidBox} from "../VoidBox"
import {is_array_of} from "../is_namespace/is_array_of"
import {temporary_box_from_object} from "../temporary_box/temporary_box_from_object"
import {InstructionTypeArrayBox} from "../InstructionTypeArrayBox"
import {is_box} from "../is_namespace/is_box"
import {is_MediaList} from "../is_namespace/is_MediaList"
import {ObjectBox_Value} from "../ObjectBox_Value"
import {PromiseBox} from "../PromiseBox"
import {is_Node} from "../is_namespace/is_Node"
import {is_array} from "../is_namespace/is_array"
import {is_Promise} from "../is_namespace/is_Promise"
import {is_instruction_type} from "../is_namespace/is_instruction_type"
import {throw_never} from "./throw_never"
export function create_box_from_object(value: ObjectBox_Value): Box {
	if(value===null) return value
	if(value===void 0) return new VoidBox
	if(is_StackVM(value)) return new StackVMBox(value)
	if(is_CSSStyleSheetInit(value)) return new CSSStyleSheetInitBox(value)
	if(value instanceof Document) return new DocumentBox(value)
	if(is_Node(value)) return new NodeBox(value)
	if(value instanceof Window) return new WindowBox(value)
	if(value instanceof CSSStyleSheet) return new CSSStyleSheetBox(value)
	if(is_array(value)) {
		if(is_empty_arr(value)) return new EmptyArrayBox(value)
		if(is_array_of(value,is_box)) return new ArrayBox(value)
		throw throw_never(value)
	}
	if(is_array(value)) {
		if(is_array_of(value,is_instruction_type)) return new InstructionTypeArrayBox(value)
		if(is_array(value))throw new Error("Unable to box array")
		throw throw_never(value)
	}
	if(is_Promise(value)) return new PromiseBox(async_convert_to_box(value))
	if(is_MediaList(value)) return new MediaListBox(value)
	if(value instanceof Array) {
		if(is_array(value)) return create_box_from_array(value)
	}
	if(is_globalThis(value)) return new GlobalThisBox(value)
	if(Object.keys(value).length>0) return new temporary_box_from_object(value)
	return new ObjectBox(value)
}
function create_box_from_array(value: Extract<ObjectBox_Value,any[]>): Box {
	if(is_empty_arr(value)) return new EmptyArrayBox(value)
	if(is_array_of(value,is_box)) return new ArrayBox(value)
	if(is_array_of(value,is_instruction_type)) return new InstructionTypeArrayBox(value)
	throw throw_never(value)
}

