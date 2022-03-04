import {CanRunTest} from "./CanRunTests";
export interface TestTreeNode {
	parent: CanRunTest | null;
}
