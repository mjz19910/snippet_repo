import {BaseTestRunner} from "./BaseTestRunner.ts";
import {TestLock} from "./TestLock.ts"
export type StartAsyncCallbackType=(runner: BaseTestRunner,lock: TestLock) => Promise<void>
