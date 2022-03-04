import {CanRunTest} from "./CanRunTests";
import {BaseTestRunner} from "./BaseTestRunner";

export class TestRunner extends BaseTestRunner implements CanRunTest {
	on_done() {
		console.log(` --- ${this.successful}/${this.total} Tests complete --- `);
	}
	test_started = false;
	m_is_user_completing_tests = false;
	is_running_test_set = false;
	constructor() {
		super(null);
	}
	async handle_async_test_set_if_needed() {
		if(this.async_init_promise) {
			await this.async_init_promise;
			if(this.is_running_test_set) {
				this.test_started = true;
			}
			this.async_init_promise = null;
		}
	}
	children: CanRunTest[] = [];
	async_init_promise: Promise<void> | null = null;
	async wait() {
		let promise = super.wait();
		await Promise.all([promise].concat(this.children.map(e => {
			return e.wait();
		})));
	}
}
