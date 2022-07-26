import {TestTreeNode} from "./TestNodeBase"
import {MarkerHandler} from "./MarkerHandler"
import {CanWaitFor} from "./CanWaitFor"
import {CanInitTestSet} from "./CanInitTestSet"
import {AsyncTest} from "./AsyncTest"
export interface CanRunTestExtensions extends
	AsyncTest,
	TestTreeNode,
	MarkerHandler,
	CanWaitFor,
	CanInitTestSet {}
