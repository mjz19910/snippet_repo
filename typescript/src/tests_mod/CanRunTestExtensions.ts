import {TestTreeNode} from "./TestNodeBase.js"
import {MarkerHandler} from "./MarkerHandler.js"
import {CanWaitFor} from "./CanWaitFor.js"
import {CanInitTestSet} from "./CanInitTestSet.js"
import {AsyncTest} from "./AsyncTest.js"
export interface CanRunTestExtensions extends
	AsyncTest,
	TestTreeNode,
	MarkerHandler,
	CanWaitFor,
	CanInitTestSet {}
