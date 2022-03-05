import {CanRunTest} from "./CanRunTest";
import {BaseTestRunner} from "./BaseTestRunner";

export class RootTestRunner extends BaseTestRunner implements CanRunTest {
	constructor() {
		super(null);
	}
}
