import {Box} from "../Box.js"
import {Primitives} from "../helper/Primitives.js"
import {eat_never} from "../helper/eat_never.js"

export function is_box_object(v: Exclude<Box,Primitives|null>):
	v is Exclude<Box,Primitives|null> {
	if(!('type' in v)) throw new Error("Invalid")
	switch(v.type) {
		case 'array_box': switch(v.item_type) {
			case "Box": return v.verify_name("ArrayBox")
			case "instruction_type[]": return v.verify_name("InstructionTypeArrayBox")
			case null: return v.verify_name("EmptyArrayBox")
			default: return eat_never(v)
		}
		case 'function_box': switch(v.return_type) {
			case "promise_box": return v.verify_name("AsyncFunctionBox")
			case null: return v.verify_name("FunctionBox")
			default: return eat_never(v)
		}
		case 'instance_box': switch(v.instance_type) {
			case 'CSSStyleSheet': return v.verify_name("CSSStyleSheetBox")
			case 'InstructionType': return v.verify_name("InstructionTypeBox")
			case 'MediaList': return v.verify_name("MediaListBox")
			case 'Node': return v.verify_name("NodeBox")
			default: return eat_never(v)
		}
		case 'object_box': switch(v.inner_type) {
			case '{}': return v.verify_name("ObjectBox")
			case 'Box': return v.verify_name("IndexBox")
			case 'Window': return v.verify_name("WindowBox")
			default: return eat_never(v)
		}
		case 'promise_box': switch(v.await_type) {
			case 'Box': return v.verify_name("PromiseBox")
			case 'CSSStyleSheet': return v.verify_name("CSSStyleSheetPromiseBox")
			case void 0: return v.verify_name("VoidPromiseBox")
			default: return eat_never(v)
		}
		case 'constructor_box': switch(v.instance_type) {
			case 'CSSStyleSheet': return v.verify_name("CSSStyleSheetConstructorBox")
			case 'Function': return v.verify_name("FunctionConstructorBox")
			case null: return v.verify_name("NewableFunctionBox")
			default: return eat_never(v)
		}
		case 'value_box': return v.verify_name("GlobalThisBox")
		case 'custom_box': return v.verify_name("StackVMBox")
		case 'document_box': return v.verify_name("DocumentBox")
		case 'shape_box': return v.verify_name("CSSStyleSheetInitBox")
		case 'real_void': return v.verify_name("RealVoidBox")
		case 'void': return v.verify_name("VoidBox")
		case 'with_properties': return v.verify_name("BoxWithPropertiesIsBox")
		case 'NewableInstancePack<{}>': return v.verify_name("NewableInstancePackObjectBox")
		case 'temporary_box': switch(v.extension) {
			case 'Function': return v.verify_name("temporary_box_from_get")
			case 'create_box': return v.verify_name("temporary_box_from_create_box_from_obj")
			case 'custom_box_cast': return v.verify_name("temporary_box_StackVM")
			case null: switch(v.source) {
				case 'call': return v.verify_name("temporary_box_from_call")
				case 'cast': switch(v.cast_source) {
					case 'object_index': {
						let {type,source,cast_source,extension,value,...rest} = v;
						if(Object.keys(rest).length > 0){
							throw new Error("is_box_object unimplemented")
						}
						return v.source === 'cast'
					}
					case 'vm_function': return v.verify_name("temporary_box_from_cast_to_vm_function")
				}
				case 'create_box': return v.verify_name("temporary_box_from_create_box")
				default: return eat_never(v)
			}
			default: return eat_never(v)
		}
		default: return eat_never(v)
	}
}
