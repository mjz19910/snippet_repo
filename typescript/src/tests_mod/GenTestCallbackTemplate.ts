import {CanRunTest} from "./CanRunTest.js"
import {TestLock} from "./TestLock.js"
export type GenTestCallbackTemplate<T>=(runner: CanRunTest,lock: TestLock,extra_arg: T) => void
