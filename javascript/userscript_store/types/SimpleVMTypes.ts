class Box<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
}
/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
namespace VM {
	export type Function = (...a: VMValue[]) => VMValue;
}
export type NewableFunction = {
	new(...a: VMValue[]): VMValue;
};
export type VMCallable = {
	(...a: Unboxed[]): Unboxed;
};
export type VMIndexed<T> = {
	[v: string]: T;
};
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface IStackVM {
	push(value: VMValue): void;
	pop(): VMValue | undefined;
	pop_arg_count(q: number): VMValue[];
	stack: VMValue[];
}

/* --- VM Value (classes) ---
VMBoxedFunction, VMNewableFunction, VMBoxedCSSStyleSheetConstructor
VMCallableFunction, VMIndexedCallableValue, VMBoxedIndexedObjectValue
*/
type ArrayBoxes = ArrayBox | InstructionTypeArrayBox;
export class ArrayBox extends Box<VMValue[]>{
	type: "array_box" = "array_box";
	item_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class InstructionTypeArrayBox extends Box<InstructionType[]>{
	type: "array_box" = "array_box";
	item_type: "instruction" = "instruction";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}

type CallableBoxes = FunctionBox | NewableFunctionBox | CallableFunctionBox;
export class FunctionBox extends Box<VM.Function> {
	type: "function_box" = "function_box";
	return_type: null = null;
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
}
export class NewableFunctionBox extends Box<NewableFunction> {
	type: "constructor_box" = "constructor_box";
	from: "typescript" = "typescript";
	instance_type: null = null;
	constructor_type: "NewableFunction" = "NewableFunction";
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
}
export class CallableFunctionBox extends Box<VMCallable> {
	type: "callable_box" = "callable_box";
	parameters_type_array: null = null;
	instance_type: null = null;
	return_type: null = null;
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
}
type VMObjectTypes = VMIndexedCallableBox | VMIndexedValue | ObjectBox;
export type VMIndexedValueRaw = VMIndexed<VMValue>;
export type VMIndexedCallableRaw = VMIndexed<VMCallable>;
export class VMIndexedCallableBox extends Box<VMIndexedCallableRaw> {
	type: "callable_index" = "callable_index";
	index_type: "callable_box" = "callable_box";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
};
export class VMIndexedValue extends Box<VMIndexedValueRaw>{
	type: "object_index" = "object_index";
	index_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class ObjectBox extends Box<{}> {
	type: "object_box" = "object_box";
	inner_type: null = null;
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
type InstanceBoxes = IStackVMBox | NodeBox | CSSStyleSheetBox | MediaListBox;
export class IStackVMBox extends Box<IStackVM>{
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class NodeBox extends Box<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class CSSStyleSheetBox extends Box<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class MediaListBox extends Box<MediaList>{
	type: "instance_box" = "instance_box";
	instance_type: "MediaList" = "MediaList";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}

type ConstructorBoxes = CSSStyleSheetConstructorBox;
export class CSSStyleSheetConstructorBox extends Box<typeof CSSStyleSheet> {
	type: "constructor_box" = "constructor_box";
	from: "javascript" = "javascript";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	constructor_type: "CSSStyleSheet" = "CSSStyleSheet";
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
}

type ArgumentTypeBoxes = CSSStyleSheetInitBox;
export class CSSStyleSheetInitBox extends Box<CSSStyleSheetInit>{
	type: "shape_box" = "shape_box";
	shape: "CSSStyleSheetInit" = "CSSStyleSheetInit";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
	set_property(key: keyof CSSStyleSheetInit, value: string | boolean | MediaListBox | undefined) {
		if(key === 'baseURL') {
			if(typeof value == 'string') {
				this.value[key] = value;
			} else if(typeof value === 'undefined') {
				this.value[key] = value;
			} else {
				throw new Error("Invalid value for key " + key);
			}
		} else if(key === 'disabled') {
			if(typeof value === 'boolean') {
				this.value[key] = value;
			} else if(typeof value === 'undefined') {
				this.value[key] = value;
			} else {
				throw new Error("Invalid value for key " + key);
			}
		} else if(key === 'media') {
			if(typeof value === 'object' && value.instance_type === 'MediaList') {
				this.value[key] = value.value;
			} else if(typeof value === 'string') {
				this.value[key] = value;
			} else if(typeof value === 'undefined') {
				this.value[key] = value;
			} else {
				throw new Error("Invalid value for key " + key);
			}
		} else {
			throw new Error("Type shenanigans afoot (You passed a value that should be impossible at runtime)");
		}
	}
}

type PromiseTypeBoxes = VoidPromiseBox | PromiseBox;
export class VoidPromiseBox extends Box<Promise<void>> {
	type: "promise" = "promise";
	return_type: null = null;
	await_type: null = null;
	promise_return_type_special: 'void_type' = 'void_type';
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class PromiseBox extends Box<Promise<VMValue>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}

type BoxesWithoutValue = VoidBox;
export class VoidBox {
	type: "special" = "special";
	value_type: "void" = "void";
};

type CustomFunctionBoxes = CallableReturnsVoidPromiseBox | CallableReturnPromiseBox;
export class CallableReturnsVoidPromiseBox extends Box<(...a: VMValue[]) => VoidPromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special: 'void_type' = 'void_type';
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value == to_match) {
			return this;
		}
		return null;
	}
}
export class CallableReturnPromiseBox extends Box<(...a: VMValue[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}

type FunctionReturnBoxes = CSSStyleSheetPromiseBox;
export class CSSStyleSheetPromiseBox extends Box<Promise<CSSStyleSheet>> {
	type: "promise" = "promise";
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}


// --- Misc Boxes ---
export class GlobalThisBox extends Box<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class WindowBox extends Box<Window>{
	type: "object_box" = "object_box";
	inner_type: "Window" = "Window";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}


// --- VM Value (types) ---
export type VMBoxedValues = BoxesWithValue | BoxesWithoutValue;
export type BoxesWithValue =
	VMObjectTypes |
	CallableBoxes |
	InstanceBoxes |
	PromiseBox |
	ConstructorBoxes |
	ArgumentTypeBoxes |
	GlobalThisBox |
	WindowBox |
	PromiseTypeBoxes |
	FunctionReturnBoxes |
	CustomFunctionBoxes;
export type UnboxedObjects = BoxesWithValue['value'] | null;
export type Unboxed = UnboxedObjects | string | number | bigint | boolean | symbol | undefined;
export type VMPrimitiveValues = bigint | boolean | number | string | symbol | undefined;
export type VMValue = VMBoxedValues | VMPrimitiveValues | null;


// --- Instruction ---
export type InstructionPush = ['push', ...VMValue[]];
export type InstructionDrop = ['drop'];
export type InstructionDup = ['dup'];
export type InstructionGet = ['get'];
export type InstructionCall = ['call', number];
export type InstructionReturn = ['return'];
export type InstructionGlobal = ['global'];
export type InstructionThis = ['this'];
export type InstructionPushArgs = ['push_args'];
export type InstructionBreakpoint = ['breakpoint'];
export type InstructionHalt = ['halt'];
export type InstructionPushInstructionPointer = ['push_pc'];
export type InstructionConstruct = ['construct', number];
export type InstructionModifyOperand = ['modify_operand', number, number];
export type InstructionPeek = ['peek', number, number];
export type InstructionAppend = ['append'];
export type InstructionExec = ['exec', InstructionType[]];
export type InstructionJumpJe = ['je', number];
export type InstructionJumpAbs = ['jmp', number];
type CastObjectOpts = "object_index" | "callable_index";
export type InstructionCastObject = ['cast_object', CastObjectOpts];
export type AnyInstructionOperands = SkipItem0<InstructionType>;

export type IStackInstructionType = InstructionPush | InstructionDup | InstructionPeek | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
export type IVMJumpType = InstructionJumpJe | InstructionJumpAbs;
export type IVMExecutionType = ['vm_return'] | ['vm_call', number];
export type InstructionType =
	IStackInstructionType | IObjectInstructionType |
	ICallInstructionType | ITuringInstructionType |
	ISpecialInstructionType | IDebugInstructionType |
	IVMJumpType | IVMExecutionType |
	InstructionPushInstructionPointer | InstructionConstruct |
	InstructionModifyOperand | InstructionExec |
	InstructionAppend | InstructionCastObject;
export class VMBoxedInstructionType extends Box<InstructionType> {};

// --- Misc ---
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>;
