import {CSSStyleSheetInitBox} from "../CSSStyleSheetInitBox.js";
import {ObjectBox} from "../ObjectBox.js";
import {StackVMBox} from "../StackVMBox.js";
import {is_CSSStyleSheetInit} from "../is_namespace/is_CSSStyleSheetInit.js";
import {is_StackVM} from "../is_namespace/is_StackVM.js";
import {Box} from "../Box.js";
import {NodeBox} from "../NodeBox.js";
import {DocumentBox} from "../DocumentBox.js";
import {WindowBox} from "../WindowBox.js";
import {CSSStyleSheetBox} from "../CSSStyleSheetBox.js";
import {EmptyArrayBox} from "../EmptyArrayBox.js";
import {ArrayBox} from "../ArrayBox.js";
import {async_convert_to_box} from "../async_convert_to_box.js";
import {is_empty_arr} from "../is_namespace/is_empty_arr.js";
import {is_globalThis} from "../is_namespace/is_globalThis.js";
import {GlobalThisBox} from "../GlobalThisBox.js";
import {MediaListBox} from "../MediaListBox.js";
import {VoidBox} from "../VoidBox.js";
import {is_array_of} from "../is_namespace/is_array_of.js";
import {temporary_box_from_object} from "../temporary_box/temporary_box_from_object.js";
import {InstructionTypeArrayBox} from "../InstructionTypeArrayBox.js";
import {is_box} from "../is_namespace/is_box.js";
import {is_MediaList} from "../is_namespace/is_MediaList.js";
import {ObjectBox_Value} from "../ObjectBox_Value.js";
import {PromiseBox} from "../PromiseBox.js";
import {is_Node} from "../is_namespace/is_Node.js";
import {is_array} from "../is_namespace/is_array.js";
import {is_Promise} from "../is_namespace/is_Promise.js";
import {is_instruction_type} from "../is_namespace/is_instruction_type.js";
import {InstructionTypeBox} from "../InstructionTypeBox.js";
import {assert_type} from "../helper/assert_type.js";

export function create_box_from_object(value: ObjectBox_Value): Box {
	if(value===null) return value;
	if(value===void 0) return new VoidBox;
	if(is_StackVM(value)) return new StackVMBox(value);
	if(is_CSSStyleSheetInit(value)) return new CSSStyleSheetInitBox(value);
	if(value instanceof Document) return new DocumentBox(value);
	if(is_Node(value)) return new NodeBox(value);
	if(value instanceof Window) return new WindowBox(value);
	if(value instanceof CSSStyleSheet) return new CSSStyleSheetBox(value);
	if(is_array(value)) {
		if(is_empty_arr(value)) return new EmptyArrayBox(value);
		if(is_array_of(value,is_box)) return new ArrayBox(value);
		assert_type<never>(value);
		throw new Error("assert");
	}
	if(is_array(value)) {
		if(is_array_of(value,is_instruction_type)) return new InstructionTypeArrayBox(value);
		if(is_array(value)) throw new Error("Unable to box array");
		assert_type<never>(value);
		throw new Error("assert");
	}
	if(is_Promise(value)) return new PromiseBox(async_convert_to_box(value));
	if(is_MediaList(value)) return new MediaListBox(value);
	if(value instanceof Array) {
		if(is_array(value)) return create_box_from_array(value);
		if(value[0]==='vm_block_trace') return new InstructionTypeBox(value);
	}
	if(is_globalThis(value)) return new GlobalThisBox(value);
	if(Object.keys(value).length>0) return new temporary_box_from_object(value);
	return new ObjectBox(value);
}
function create_box_from_array(value: Extract<ObjectBox_Value,any[]>): Box {
	if(is_empty_arr(value)) return new EmptyArrayBox(value);
	if(is_array_of(value,is_box)) return new ArrayBox(value);
	if(is_array_of(value,is_instruction_type)) return new InstructionTypeArrayBox(value);
	if(value[0]==='vm_block_trace') return new InstructionTypeBox(value);
	assert_type<never>(value);
	throw new Error("assert");
}
