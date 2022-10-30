import {GenTestCallback} from "./GenTestCallback"
import {TestLock} from "./TestLock"
export interface CanRunTestBase {
	on_test_init(): void
	start_test(lock: TestLock,name: string,test_gen?: GenTestCallback): void
}
