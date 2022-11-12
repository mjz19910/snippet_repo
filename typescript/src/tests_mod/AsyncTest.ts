import {StartAsyncCallbackType} from "./StartAsyncCallbackType.js"
import {GenTestCallbackTemplate} from "./GenTestCallbackTemplate.js"
import {TestLock} from "./TestLock.js"
import {CanRunTest} from "./CanRunTest.js"
export interface AsyncTest {
	start_async_template<T>(test_gen: GenTestCallbackTemplate<T>,test_runner: CanRunTest,lock: TestLock,extra_arg: T): void
	start_async(function_to_run: StartAsyncCallbackType,runner: CanRunTest,lock: TestLock): void
}
