import {GenTestCallback} from "./GenTestCallback.js"
import {TestLock} from "./TestLock.js"
export interface CanRunTestBase {
	on_test_init(): void
	start_test(lock: TestLock,name: string,test_gen?: GenTestCallback): void
}
