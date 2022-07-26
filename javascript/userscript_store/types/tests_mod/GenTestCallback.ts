import {TestLock} from "./TestLock"
import {CanRunTest} from "./CanRunTest"

export type GenTestCallback=(runner: CanRunTest,lock: TestLock) => void
