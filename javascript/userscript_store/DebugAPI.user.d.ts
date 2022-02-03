//spell:words deref
interface RustSimpleTokenizer {
	index: number;
	source: string | null;
	reset(str: string | null): void
	advance(tok_len: number): void
	inIdentRange(char_code: number): boolean;
	isWhitespaceRange(char_code: number): boolean;
	exec(string: string): any[]
	into_tt(tok_arr: any[]): any[]
}
interface RustSimpleParser {
	tokenizer: RustSimpleTokenizer;
	simple_type_info(str: any): any;
	result_ok_option_any_example(): any;
}
interface SimpleJavascriptParser {
	token_generator: null;
	ecma_262_section_12_factory(): any;
	ecma_262_section_script_parse_factory(): any;
	ecma_262_section_module_parse_factory(): any;
	get_sequence_of_input_elements(utf8_string: string): any;
	ecma_262_pseudo(): any;
	create_token_generator(): any;
}
type data_value_arr = {
	result: any[]
	return: any
};
type data_null_value = {
	result: null
	return: any
};
type arg_error = {
	type: 'argument-error'
	value: null
};
type data_resp_arr = {
	type: 'data'
	value: data_value_arr
};
export type DebugAPI_breakpoint_return_array =
	arg_error | data_resp_arr | no_debugger_response;
type data_value = {
	result: any
	return: any
};
type data_response = {
	type: 'data',
	value: data_value
};
type no_debugger_response = {
	type: 'no-response',
	value: data_null_value
};
export type DebugAPI_breakpoint_return =
	arg_error | no_debugger_response | data_response;
export class GenericEvent {
	type: string;
	readonly defaultPrevented: boolean;
	preventDefault(): void;
}
type GenericEventListener = {
	(evt: GenericEvent): void;
}
type GenericEventListenerObject = {
	handleEvent(event: GenericEvent): void;
}
type GenericEventListenerOrEventListenerObject =
	GenericEventListener | GenericEventListenerObject;
interface EventListenerValue {
	callback: GenericEventListenerOrEventListenerObject | null;
	options: boolean | EventListenerOptions;
}
interface GenericEventTarget {
	_events: Map<string, EventListenerValue[]>;
	addEventListener(
		type: string,
		callback: GenericEventListenerOrEventListenerObject | null,
		options?: AddEventListenerOptions | boolean
	): void;
	dispatchEvent(event: GenericEvent): boolean;
	/** Removes the event listener in target's event listener list with the same type, callback, and options. */
	removeEventListener(
		type: string,
		callback: GenericEventListenerOrEventListenerObject | null,
		options?: EventListenerOptions | boolean
	): void;
}
export class GenericDataEvent extends GenericEvent {
	constructor(type: string, data: object)
}
export class DebugAPI {
	static simple_parser: RustSimpleParser;
	static javascript_parser: SimpleJavascriptParser;
	static the_instance: DebugAPI;
	static the(): DebugAPI;
	event_handler: GenericEventTarget;
	u?: CallableFunction;
	d?: CallableFunction;
	getEventListeners?: CallableFunction;
	parent: DebugAPI;
	storeObject(object: any): number;
	attach(
		debug: CallableFunction,
		undebug: CallableFunction,
		getEventListeners: CallableFunction
	): DebugAPI;
	startPortServer(): void;
	activateClass(
		class_value: NewableFunction,
		arg_vec: any[]
	): object;
	activateApply(
		function_value: CallableFunction,
		target_obj: any, arg_vec: any[]
	): any;
	debuggerBreakpointCode(): void;
	stringifyFunction(v: Function): string;
	debuggerGetVarArray_a(
		function_value: CallableFunction,
		activate: CallableFunction,
		var_match: string,
		...activate_vec: any[]
	): DebugAPI_breakpoint_return_array;
	debuggerGetVarArray_c(
		class_value: NewableFunction,
		target_arg_vec: any[],
		var_match: string
	): DebugAPI_breakpoint_return_array;
	debuggerGetVarArray(
		function_value: CallableFunction,
		target_obj: any,
		target_arg_vec: any[],
		var_match: string
	): DebugAPI_breakpoint_return_array;
	debuggerGetVar_a(
		function_value: CallableFunction | NewableFunction,
		activate: CallableFunction,
		var_name: string,
		...activate_vec: any[]
	): DebugAPI_breakpoint_return;
	debuggerGetVar_c(
		class_value: NewableFunction,
		target_arg_vec: any[],
		var_name: string
	): DebugAPI_breakpoint_return;
	debuggerGetVar(
		function_value: CallableFunction,
		target_obj: any,
		target_arg_vec: any[],
		var_name: string
	): DebugAPI_breakpoint_return;
	setPrivate(v: boolean): void;
	is_private: boolean;
}
declare global {
	interface Window {
		DebugAPI: typeof DebugAPI;
		GenericDataEvent:typeof GenericDataEvent;
	}
	interface String {
		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
		 */
		replaceAll(searchValue: string | RegExp, replaceValue: string): string;

		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replacer A function that returns the replacement text.
		 */
		replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
	}
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef";

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T | undefined;
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>;

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>;
	}

	var WeakRef: WeakRefConstructor;

	interface FinalizationRegistry<T> {
		readonly [Symbol.toStringTag]: "FinalizationRegistry";

		/**
		 * Registers an object with the registry.
		 * @param target The target object to register.
		 * @param heldValue The value to pass to the finalizer for this object. This cannot be the
		 * target object.
		 * @param unregisterToken The token to pass to the unregister method to unregister the target
		 * object. If provided (and not undefined), this must be an object. If not provided, the target
		 * cannot be unregistered.
		 */
		register(target: object, heldValue: T, unregisterToken?: object): void;

		/**
		 * Unregisters an object from the registry.
		 * @param unregisterToken The token that was used as the unregisterToken argument when calling
		 * register to register the target object.
		 */
		unregister(unregisterToken: object): void;
	}

	interface FinalizationRegistryConstructor {
		readonly prototype: FinalizationRegistry<any>;

		/**
		 * Creates a finalization registry with an associated cleanup callback
		 * @param cleanupCallback The callback to call after an object in the registry has been reclaimed.
		 */
		new <T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T>;
	}

	var FinalizationRegistry: FinalizationRegistryConstructor;
}
