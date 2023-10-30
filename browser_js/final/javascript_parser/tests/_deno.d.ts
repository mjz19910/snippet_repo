declare namespace Deno {
	export interface TestContext {
		step(definition: TestStepDefinition): Promise<boolean>;
	}
	export interface TestStepDefinition {
		fn: (t: TestContext) => void|Promise<void>;
		name: string;
	}
	export interface TestDefinition {
		fn: (t: TestContext) => void|Promise<void>;
		name: string;
	}
}
