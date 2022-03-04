import {CanRunTest} from "./CanRunTests";
import {BaseTestRunner} from "./BaseTestRunner";

export class RootTestRunner extends BaseTestRunner implements CanRunTest {
	constructor() {
		super(null);
	}
}
