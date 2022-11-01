import {TestLock} from "./TestLock.js"
import {CanRunTest} from "./CanRunTest.js"
export type StartAsyncCallbackType=(runner: CanRunTest,lock: TestLock) => Promise<void>
