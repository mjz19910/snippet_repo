import {BaseTestRunner} from "./BaseTestRunner.ts";
import {TestLock} from "./TestLock.js"
export type StartAsyncCallbackType=(runner: BaseTestRunner,lock: TestLock) => Promise<void>
