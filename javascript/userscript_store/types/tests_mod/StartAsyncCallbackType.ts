import {TestLock} from "./TestLock";
import {CanRunTest} from "./CanRunTests";
export type StartAsyncCallbackType = (runner: CanRunTest, lock: TestLock) => Promise<void>;
