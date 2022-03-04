import {StartAsyncCallbackType} from "./StartAsyncCallbackType";
import {GenTestCallbackTemplate} from "./GenTestCallbackTemplate";
import {TestLock} from "./TestLock";
import {CanRunTest} from "./CanRunTests";
export interface AsyncTest {
	start_async_template<T>(test_gen: GenTestCallbackTemplate<T>, test_runner: CanRunTest, lock: TestLock, extra_arg: T): void;
	start_async(function_to_run: StartAsyncCallbackType, runner: CanRunTest, lock: TestLock): void;
}
