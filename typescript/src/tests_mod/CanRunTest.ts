import {TestRunnerBase} from "./TestRunnerBase.js"
import {CanRunTestBase} from "./CanRunTestBase.js"
import {CanRunTestExtensions} from "./CanRunTestExtensions.js"
export interface CanRunTest extends TestRunnerBase,CanRunTestBase,CanRunTestExtensions {}
