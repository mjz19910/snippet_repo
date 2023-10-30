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
	export interface DenoTest {
		(t: TestDefinition): void;
	}
	export const test: Deno.DenoTest;
}
export interface Deno {
	test: Deno.DenoTest;
}