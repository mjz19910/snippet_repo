import {GenTestCallback} from "./GenTestCallback";
import {CanRunTest} from "./CanRunTests";
import {TestLock} from "./TestLock";
import {GenTestCallbackTemplate} from "./GenTestCallbackTemplate";
import {debug} from "./const";
export class BaseTestRunner implements CanRunTest {
	total = 0;
	successful = 0;
	failed = 0;
	finished = 0;
	parent: CanRunTest | null;
	on_complete_callback = () => {};
	constructor(parent: CanRunTest | null) {
		this.parent = parent;
	}
	async wait() {
		if(this.total > 0) {
			await new Promise<void>((e) => {
				this.on_complete_callback = function() {
					e();
				};
			});
		}
	}
	report_test_failure(): void {
		this.failed++;
		this.print_marker(true, this.total, this.successful, this.failed);
		if((this.successful + this.failed) >= this.total) {
			this.on_complete_callback();
		}
	}
	report_test_success(): void {
		this.successful++;
		this.print_marker(true, this.total, this.successful, this.failed);
		if((this.successful + this.failed) >= this.total) {
			this.on_complete_callback();
		}
	}
	on_test_init(): void {
		this.total++;
	}
	print_marker(first: boolean, count_total: number, count_success: number, count_failed: number) {
		if(!first) {
			count_total += this.total;
			count_success += this.successful;
			count_failed += this.failed;
		}
		if(this.parent) {
			this.parent.print_marker(false, count_total, count_success, count_failed);
		} else {
			let count_finished = count_failed + count_success;
			if(debug){
				console.log(` --- Running (${count_finished}/${count_total}, ${count_success} successful) --- `);
			}
			if(count_success === 0) {
				debugger;
			}
		}
	}
	test_started: boolean = false;
	is_running_test_set: boolean = false;
	init_test_set() {
		this.is_running_test_set = true;
		this.test_started = true;
	}
	start_test(lock: TestLock, name: string, test_gen: GenTestCallback): void {
		try {
			let engine = this;
			test_gen(engine, lock);
		} catch(e) {
			console.error('test threw an error', name, e);
			this.report_test_failure();
		}
	}
	start_async(test_gen: GenTestCallback, test_runner: CanRunTest, lock: TestLock) {
		test_runner.on_test_init();
		test_gen(test_runner, lock);
	}
	start_async_template<T>(test_gen: GenTestCallbackTemplate<T>, test_runner: CanRunTest, lock: TestLock, extra_arg: T) {
		test_runner.on_test_init();
		test_gen(test_runner, lock, extra_arg);
	}
}
