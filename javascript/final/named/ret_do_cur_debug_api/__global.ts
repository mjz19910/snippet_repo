export {};

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
	}
	var debugApi: DebugAPI;
	var CustomInputMatcher: typeof X.CustomInputMatcher;

	class DebugAPI {
		asyncExecuteFunction(top: Window|null,function_: any): void;
	}
}

export type Holder={
	use(): void;
};


namespace X {
	export class CustomInputMatcher {
		test_string: string;
		test_needle: string|RegExp;
		m_string_getter: unknown;
		constructor(test_string: string,string_getter: unknown) {
			this.test_string=test_string;
			this.test_needle="";
			this.m_string_getter=string_getter;
		}
	}
}
