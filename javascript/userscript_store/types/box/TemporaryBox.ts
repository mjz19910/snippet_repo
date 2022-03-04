import {StackVM} from "../vm/StackVM";
import Box from "./Box";

type TmpBoxStr = 'temporary_box';
export type temporary_box_from_get = {
	type: TmpBoxStr;
	source: 'get';
	extension: 'Function';
	value: Function;
};

export type temporary_box_from_cast_to_vm_function = {
	type: TmpBoxStr;
	source: 'cast';
	extension:null;
	cast_source: 'vm_function';
	value(...a: Box[]): Box;
};

export type temporary_box_from_call = {
	type: TmpBoxStr;
	source: 'call';
	extension:null;
	value: {};
};

export type temporary_box_instance = {
	type: TmpBoxStr;
	source: 'create_box';
	extension:null;
	value: {};
};

export type temporary_box_object_index_to_box = {
	type: TmpBoxStr;
	source: 'cast';
	extension:null;
	cast_source: 'object_index';
	value: {
		[x: string]: Box;
	};
};

export type temporary_box_StackVM = {
	type:'temporary_box',
	source:'cast',
	extension:'custom_box_cast',
	custom_type:'StackVM',
	cast_source:'object_index',
	value:StackVM;
}

export type TemporaryBox = 
temporary_box_from_get | 
temporary_box_from_cast_to_vm_function | 
temporary_box_from_call | 
temporary_box_instance | 
temporary_box_object_index_to_box|
temporary_box_StackVM;
export default TemporaryBox;
