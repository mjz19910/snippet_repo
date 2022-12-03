export namespace Impl {
	export class CustomInputMatcher {
		test_string: string|RegExp;
		test_needle: string|RegExp;
		ts_get: unknown;
		str?: string;
		constructor(test_string: string|RegExp,string_getter: unknown) {
			this.test_string=test_string;
			this.test_needle="";
			this.ts_get=string_getter;
		}
	}

	export class DebugAPI {
		asyncExecuteFunction(top: Window|null,function_: any): Promise<void> {
			top;
			function_;
			return Promise.resolve();
		};
	}
}
