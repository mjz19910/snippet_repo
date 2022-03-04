import {CanRunTest} from "./CanRunTests";
import {BaseTestRunner} from "./BaseTestRunner";


export class TestEngine extends BaseTestRunner implements CanRunTest {
	test_started = false;
	m_is_user_completing_tests = false;
	is_running_test_set = false;
	is_user_reporting_completion() {
		return this.m_is_user_completing_tests;
	}
	set_is_user_completing_tests(value: boolean) {
		this.m_is_user_completing_tests = value;
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
	async_init_promise: Promise<void> | null = null;
	init_async_test(promise: Promise<void>) {
		this.async_init_promise = promise;
	}
	constructor(parent: CanRunTest) {
		super(parent);
		this.is_running_test_set = false;
		this.test_started = false;
	}
}
