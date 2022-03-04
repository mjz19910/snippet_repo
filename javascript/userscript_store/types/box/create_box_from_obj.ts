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
import NewableFunctionBox, {FunctionConstructorBox} from "./NewableFunctionBox";
import {force_type_upgrade} from "./force_type_upgrade";


export function create_box_from_obj(value: Exclude<BoxExtractType, Primitives | undefined | null>) {
	if(async_box_extract_StackVM(value))
		return new StackVMBox(value);
	if(async_box_extract_CSSStyleSheetInit(value))
		return new CSSStyleSheetInitBox(value);
	if(Object.keys(value).length > 0) {
		if(value === Function && value instanceof Function) {
			return new FunctionConstructorBox(function(...a:string[]){
				return value;
			}, function(){

			});
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
