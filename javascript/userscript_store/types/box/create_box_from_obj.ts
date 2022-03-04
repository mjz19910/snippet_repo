import CSSStyleSheetInitBox from "./CSSStyleSheetInitBox";
import ObjectBox from "./ObjectBox";
import StackVMBox from "./StackVMBox";
import {async_box_extract_CSSStyleSheetInit} from "./async_box_extract_CSSStyleSheetInit";
import {async_box_extract_StackVM} from "./async_box_extract_StackVM";
import {BoxExtractType} from "./extract/BoxExtractType";
import {has_any_properties_to_box} from "./has_any_properties_to_box";
import {can_property_return_a_box} from "./can_property_return_a_box";
import Primitives from "./Primitives";
import {force_to_type_downgrade} from "./force_to_type_downgrade";
import {PropertiesToIterate} from "./PropertiesToIterate";
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox";
import {PropertiesToIterateArray} from "./create_box";
import FunctionBox from "./FunctionBox";
import Box from "./Box";
import NewableFunctionBox from "./NewableFunctionBox";
import {FunctionConstructorBox} from "./FunctionConstructorBox";
import {BoxMaker} from "./BoxMaker";
import {force_type_upgrade} from "./force_type_upgrade";
import VoidBox from "./VoidBox";

function has_property<Z, Q extends string>(v:{}, q:Q): v is {[U in Q]:Z} {
	return true;
}

function add_part<Z, Q>(q:Q):q is Q&Z {
	return true;
}

function fn_box_maker<A, T, T_Box>(make_new_box: (do_box: () => T, ...a: A[]) => T_Box, value: {new ():T}) : T_Box {
	return make_new_box(()=>new value);
}

function box_fn_return():FunctionBox {
	return new FunctionBox(()=>null);
}


export function create_box_from_obj(value: Exclude<BoxExtractType, Primitives | undefined | null>) {
	if(async_box_extract_StackVM(value))
		return new StackVMBox(value);
	if(async_box_extract_CSSStyleSheetInit(value))
		return new CSSStyleSheetInitBox(value);
	if(Object.keys(value).length > 0) {
		let v_value: {} = value;
		if(
			v_value === Function &&
			has_property<typeof Function, 'prototype'>(v_value, 'prototype') && 
			add_part<{
				(...args: string[]): Function;
				new (...args:string[]):Function;
			}, {}>(v_value)
		) {
			return new FunctionConstructorBox(v_value, box_fn_return, fn_box_maker<string, Function, FunctionBox>);
		}
		if(force_to_type_downgrade<{}>(value)) {
			let v_value: {} = value;
			if(has_any_properties_to_box(v_value, Object.keys(value))) {
				let iter_arr = PropertiesToIterateArray;
				let res_arr: (PropertiesToIterate)[] = [];
				for(let i = 0;i < iter_arr.length;i++) {
					if(can_property_return_a_box(v_value, iter_arr[i])) {
						res_arr.push(iter_arr[i]);
					}
				}
				return new BoxWithPropertiesIsBox(v_value, res_arr);
			}
		}
		console.warn('unable to box', value);
		throw new Error("Need box for iterable properties of return value");
	}
	return new ObjectBox(value);
}
