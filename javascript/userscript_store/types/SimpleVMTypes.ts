class VMBoxed<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
}
/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
type VMNewableValue = {
	new(...a: VMValue[]): VMValue;
};
type VMCallableValue = {
	(...a: VMValue[]): VMValue;
};
type VMIndexed<T> = {
	[v: string]: T;
};
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface StackVM {
	push(value: VMValue): void;
	pop(): VMValue | undefined;
}

/* --- VM Value (classes) ---
VMBoxedFunction, VMNewableFunction, VMBoxedCSSStyleSheetConstructor
VMCallableFunction, VMIndexedCallableValue, VMBoxedIndexedObjectValue
*/
type VMArrayTypes = VMBoxedArray | VMBoxedInstructionTypeArray;
export class VMBoxedArray extends VMBoxed<VMValue[]>{
	type: "array_box" = "array_box";
	item_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedInstructionTypeArray extends VMBoxed<InstructionType[]>{
	type: "array_box" = "array_box";
	item_type: "instruction" = "instruction";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
type VMFunctionTypes = VMBoxedFunction | VMNewableFunction | VMCallableFunction;
export class VMBoxedFunction extends VMBoxed<Function> {
	type: "function_box" = "function_box";
	return_type: null = null;
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
}
export class VMNewableFunction extends VMBoxed<VMNewableValue> {
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
export class VMCallableFunction extends VMBoxed<VMCallableValue> {
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
type VMObjectTypes = VMIndexedCallableValue | VMIndexedObjectValue | VMBoxedObject;
export class VMIndexedCallableValue extends VMBoxed<VMIndexed<VMCallableValue>> {
	type: "callable_index" = "callable_index";
	index_type: "callable_box" = "callable_box";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
};
export class VMIndexedObjectValue extends VMBoxed<VMIndexed<VMValue>>{
	type: "object_index" = "object_index";
	index_type: "value" = "value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedObject extends VMBoxed<object> {
	type: "object_box" = "object_box";
	inner_type: null = null;
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
type VMInstanceTypes = VMBoxedStackVM | VMBoxedDomValue | VMBoxedCSSStyleSheet;
export class VMBoxedStackVM extends VMBoxed<StackVM>{
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedDomValue extends VMBoxed<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedCSSStyleSheet extends VMBoxed<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
type VMConstructorTypes = VMBoxedCSSStyleSheetConstructor;
export class VMBoxedCSSStyleSheetConstructor extends VMBoxed<typeof CSSStyleSheet> {
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
type VMArgumentTypes = VMBoxedCSSStyleSheetInit;
export class VMBoxedCSSStyleSheetInit extends VMBoxed<CSSStyleSheetInit>{
	type: "shape_box" = "shape_box";
	shape: "CSSStyleSheetInit" = "CSSStyleSheetInit";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
	set_property(key: keyof CSSStyleSheetInit, value: string | boolean | VMBoxedMediaList | undefined) {
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
type VMReturnTypes = VMReturnsBoxedVoidPromise | VMReturnsBoxedPromise;
export class VMReturnsBoxedVoidPromise extends VMBoxed<(...a:VMValue[]) => VMBoxedVoidPromise> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special:'void_type'='void_type';
	get_matching_typeof(to_match: 'function') {
		if(typeof this.value == to_match){
			return this;
		}
		return null;
	}
}
type VMGlobalTypes = VMBoxedGlobalThis | VMBoxedWindow;
export class VMBoxedGlobalThis extends VMBoxed<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedWindow extends VMBoxed<Window>{
	type: "object_box" = "object_box";
	inner_type: "Window" = "Window";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}


export class VMBoxedVoidPromise extends VMBoxed<Promise<void>> {
	type: "promise" = "promise";
	promise_return_type_special:'void_type'='void_type';
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedPromise extends VMBoxed<Promise<VMValue>> {
	type: "promise" = "promise";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMReturnsBoxedPromise extends VMBoxed<(...a:VMValue[]) => VMBoxedPromise> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type:"value"="value";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}
export class VMBoxedMediaList extends VMBoxed<MediaList>{
	type: "instance_box" = "instance_box";
	instance_type: "MediaList" = "MediaList";
	get_matching_typeof(_to_match: 'function') {
		return null;
	}
}

// --- VM Value (types) ---
export type VMValue = VMBoxedWindow |
	VMArrayTypes |
	VMObjectTypes |
	VMFunctionTypes |
	VMGlobalTypes |
	VMInstanceTypes |
	VMBoxedPromise |
	VMConstructorTypes |
	VMArgumentTypes |
	VMReturnTypes |
	bigint | boolean | number | string | symbol | null | undefined;

// --- Instruction ---
type InstructionPush = ['push', ...VMValue[]];
type InstructionDrop = ['drop'];
type InstructionDup = ['dup'];
type InstructionGet = ['get'];
type InstructionCall = ['call', number];
type InstructionReturn = ['return'];
type InstructionGlobal = ['global'];
type InstructionThis = ['this'];
type InstructionPushArgs = ['push_args'];
type InstructionBreakpoint = ['breakpoint'];
type InstructionHalt = ['halt'];
type InstructionPushInstructionPointer = ['push_pc'];
type InstructionConstruct = ['construct', number];
type InstructionModifyOperand = ['modify_operand', number, number];
type InstructionPeek = ['peek', number, number];
type DomInstructionAppend = ['dom_append'];
type InstructionExec = ['exec', InstructionType[]];
type InstructionJumpJe = ['je', number];
type InstructionJumpAbs = ['jmp', number];
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>
export type AnyInstructionOperands = SkipItem0<InstructionType>;

export type IStackInstructionType = InstructionPush | InstructionPeek | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
export type IInstructionJumpType = InstructionJumpJe | InstructionJumpAbs;
export type IDomInstructions = DomInstructionAppend;
export type InstructionType = IStackInstructionType | IObjectInstructionType |
	ICallInstructionType | ITuringInstructionType |
	ISpecialInstructionType | IDebugInstructionType | IInstructionJumpType |
	InstructionPushInstructionPointer | InstructionConstruct |
	InstructionModifyOperand | InstructionDup | InstructionExec;
export class VMBoxedInstructionType extends VMBoxed<InstructionType> {}
