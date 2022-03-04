import {TestLock} from "./TestLock";
import {CanRunTest} from "./CanRunTests";

export type GenTestCallback = (runner: CanRunTest, lock: TestLock) => void;
