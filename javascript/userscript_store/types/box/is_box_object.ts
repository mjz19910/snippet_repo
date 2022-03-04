import {assume_is_box} from "./assume_is_box";
import {Box} from "./Box";
import {FunctionConstructorBox} from "./FunctionConstructorBox";
import {has_property_common_base_type as has_property_common_base_type} from "./has_property_common_base_type";
import {NewableFunctionBox} from "./NewableFunctionBox";
import {Primitives} from "./Primitives";
export function is_box_object<T>(v: Exclude<Box, Primitives | null> | T): v is Exclude<Box, Primitives | null> {
	type vv = "type";
	if(
		has_property_common_base_type<vv, {[X in vv]: string}>(v, 'type')
	) {
		switch(v.type) {
			case 'array_box': switch(v.item_type) {
				case "Box": return v.verify_name("ArrayBox");
				case "instruction_type[]": return v.verify_name("InstructionTypeArrayBox");
				case null: return v.verify_name("EmptyArrayBox");
			}
			case 'function_box': switch(v.return_type) {
				case "promise_box": return v.verify_name("AsyncFunctionBox");
				case null: return v.verify_name("FunctionBox");
			}
			case 'instance_box': switch(v.instance_type) {
				case "Node": return v.verify_name("NodeBox");
				case "CSSStyleSheet": return v.verify_name("CSSStyleSheetBox");
			}
			case 'object_box': switch(v.inner_type) {
				case 'Window': return v.verify_name("WindowBox");
			}

			case 'promise_box': switch(v.await_type) {
				case 'Box': return v.verify_name("PromiseBox");
				case 'CSSStyleSheet': return v.verify_name("CSSStyleSheetPromiseBox");
				case void 0:v;return true;
			} break;
			case 'value_box': return v.verify_name("GlobalThisBox");
		}
	}
	if(assume_is_box(v)) {
		switch(v.type) {
			// NewableFunctionBox | FunctionConstructorBox
			case 'constructor_box':switch(v.arguments) {
				case 'box[]': return v.verify_name("NewableFunctionBox");
				case 'string[]': let q:FunctionConstructorBox=v;return v.verify_name("FunctionConstructorBox");
			}
			case 'real_void': return v.verify_name("RealVoidBox");
			case 'void': return v.verify_name("VoidBox");
			case 'with_properties': return v.verify_name("BoxWithPropertiesIsBox");
			case 'temporary_box': switch(v.extension) {
				case 'Function': return v.verify_name("temporary_box_from_get");
				case 'create_box': return v.verify_name("temporary_box_from_create_box_from_obj");
				case 'custom_box_cast': return v.verify_name("temporary_box_StackVM");
				case null:switch(v.source) {
					case 'create_box': return v.verify_name("temporary_box_instance");
					case 'cast':switch(v.cast_source) {
						case 'object_index': return v.verify_name("temporary_box_object_index_to_box");
						case 'vm_function': return v.verify_name("temporary_box_from_cast_to_vm_function");
					}
					case 'call': return v.verify_name("temporary_box_from_call");
				}
			};
		}
	}
	console.log('chk', v);
	return false;
}
