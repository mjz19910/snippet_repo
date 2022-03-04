import {StackVM} from "../vm/StackVM";
import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";

abstract class MakeTemporaryBox<T extends void | object | Function> extends BoxTemplate<"temporary_box", T> {};

export class temporary_box_from_get extends MakeTemporaryBox<Function> {
	readonly type='temporary_box';
	readonly source='get';
	readonly extension='Function';
	verify_name(name:"temporary_box_from_get"){
		if(name !== 'temporary_box_from_get'){
			throw new Error("bad box");
		}
	}
};

export class temporary_box_from_cast_to_vm_function extends MakeTemporaryBox<(...a: Box[])=>Box> {
	readonly type= 'temporary_box';
	readonly source= 'cast';
	readonly cast_source= 'vm_function';
	extension=null;
	verify_name(name:"temporary_box_from_cast_to_vm_function"){
		if(name !== 'temporary_box_from_cast_to_vm_function'){
			throw new Error("bad box");
		}
	}
};

export class temporary_box_from_call extends MakeTemporaryBox<{}> {
	readonly type= 'temporary_box';
	readonly source= 'call';
	extension=null;
	verify_name(name:"temporary_box_from_call"){
		if(name !== 'temporary_box_from_call'){
			throw new Error("bad box");
		}
	}
};

export class temporary_box_instance extends MakeTemporaryBox<{}> {
	readonly type= 'temporary_box';
	readonly source= 'create_box';
	extension=null;
	verify_name(name:"temporary_box_instance"){
		if(name !== 'temporary_box_instance'){
			throw new Error("bad box");
		}
	}
};

export class temporary_box_object_index_to_box extends MakeTemporaryBox<{[x: string]: Box}> {
	readonly type= 'temporary_box';
	readonly source= 'cast';
	readonly cast_source = 'object_index';
	extension=null;
	verify_name(name:"temporary_box_object_index_to_box"){
		if(name !== 'temporary_box_object_index_to_box'){
			throw new Error("bad box");
		}
	}
};

export class temporary_box_StackVM extends MakeTemporaryBox<StackVM> {
	readonly type='temporary_box';
	readonly extension='custom_box_cast';
	readonly source='cast';
	readonly custom_type='StackVM';
	readonly cast_source='object_index';
	verify_name(name:"temporary_box_StackVM"){
		if(name !== 'temporary_box_StackVM'){
			throw new Error("bad box");
		}
	}
}

export class temporary_box_from_create_box_from_obj extends MakeTemporaryBox<{[x:string]:Box}> {
	readonly type='temporary_box';
	readonly extension='create_box';
	readonly source='create_box_from_obj';
	readonly custom_type='box';
	verify_name(name:"temporary_box_from_create_box_from_obj"){
		if(name !== 'temporary_box_from_create_box_from_obj'){
			throw new Error("bad box");
		}
	}
}
export function new_temporary_box_from_create_obj(value:{}) {
	return new temporary_box_from_create_box_from_obj(value);
}
export type TemporaryBox = 
temporary_box_from_get | 
temporary_box_from_cast_to_vm_function | 
temporary_box_from_call | 
temporary_box_instance | 
temporary_box_object_index_to_box|
temporary_box_StackVM|
temporary_box_from_create_box_from_obj;
