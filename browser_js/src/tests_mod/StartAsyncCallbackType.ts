import {BaseTestRunner} from "./BaseTestRunner.js";
import {TestLock} from "./TestLock.js"
export type StartAsyncCallbackType=(runner: BaseTestRunner,lock: TestLock) => Promise<void>
