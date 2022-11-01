import {CanRunTest} from "./CanRunTest.js"
import {BaseTestRunner} from "./BaseTestRunner.js"

export class RootTestRunner extends BaseTestRunner implements CanRunTest {
	constructor() {
		super(null)
	}
}
