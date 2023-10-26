import {BaseTestRunner} from "./BaseTestRunner.ts";
export class TestEngine extends BaseTestRunner {
	m_is_user_completing_tests=false;
	is_user_reporting_completion() {
		return this.m_is_user_completing_tests;
	}
	set_is_user_completing_tests(value: boolean) {
		this.m_is_user_completing_tests=value;
	}
	async handle_async_test_set_if_needed() {
		if(this.async_init_promise) {
			await this.async_init_promise;
			if(this.is_running_test_set) {
				this.m_test_started=true;
			}
			this.async_init_promise=null;
		}
	}
	async_init_promise: Promise<void>|null=null;
	init_async_test(promise: Promise<void>) {
		this.async_init_promise=promise;
	}
}
