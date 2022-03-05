import {TestLock} from "./TestLock";
import {CanRunTest} from "./CanRunTest";
export type StartAsyncCallbackType = (runner: CanRunTest, lock: TestLock) => Promise<void>;
