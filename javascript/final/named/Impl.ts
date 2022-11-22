export namespace Impl {
	export class DebugAPI {
		asyncExecuteEval(gameiframe: any,function_: () => number): void {
			gameiframe;
			function_;
		};
		asyncExecuteFunction(top: Window|null,function_: any): void {
			top;
			function_;
		};
	}
}
