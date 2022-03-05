import {CanRunTest} from "./CanRunTest";
import {TestLock} from "./TestLock";
export type GenTestCallbackTemplate<T> = (runner: CanRunTest, lock: TestLock, extra_arg: T) => void;
