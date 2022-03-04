import {TestRunnerBase} from "./TestRunnerBase";
import {CanRunTestBase} from "./CanRunTestBase";
import {CanRunTestExtensions} from "./CanRunTestExtensions";
export interface CanRunTest extends TestRunnerBase, CanRunTestBase, CanRunTestExtensions {}
