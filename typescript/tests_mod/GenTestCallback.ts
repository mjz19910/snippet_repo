import {TestLock} from "./TestLock.js"
import {CanRunTest} from "./CanRunTest.js"

export type GenTestCallback=(runner: CanRunTest,lock: TestLock) => void
