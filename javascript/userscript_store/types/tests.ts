import {run_tests as ecma_12_8_6_run_tests} from "./vm/ecma_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "./vm/ecma_12_6";
import {run_tests as ecma_terminal_run_tests} from "./vm/ecma_terminal";

type GenTestCallback = (runner: ITestRunnerNode, lock: TestLock) => void;


export interface ITestRunnerNode {
	init_test_set(): void;
	report_test_failure(): void;
	report_test_success(): void;
	start_test(lock: TestLock, name: string, test_gen?: GenTestCallback): void;
	start_async(a: (test_runner: ITestRunnerNode, lock: TestLock) => Promise<void>, b: ITestRunnerNode, c: TestLock): void;
	print_marker(successful: number, finished: number, total: number): void;
	on_test_init(): void;
	parent: ITestRunnerNode | null;
}

function null_resolver() {}

export class TestLock {
	notify_promise: Promise<void> | null = null;
	m_locked = false;
	notify_resolver = null_resolver;
	waiters: {
		wait_unlock(): Promise<void>;
		lock_resolve: () => void;
		wait_for_unlock: Promise<void>;
	}[] = [];
	async unlock() {
		console.log('enter unlock');
		this.m_locked = false;
		let waiting = this.waiters.pop();
		if(this.notify_resolver !== null_resolver) {
			this.notify_resolver();
			this.notify_promise = null;
			this.notify_resolver = null_resolver;
		}
		if(waiting) {
			waiting.lock_resolve();
		}
		console.log('exit unlock');
	}
	async lock() {
		console.log('enter lock');
		if(this.notify_promise) {
			await this.notify_promise;
			this.notify_promise = null;
		}
		if(this.m_locked) {
			let lock_resolve = () => {};
			let wait_for_unlock = new Promise<void>((resolve) => {
				lock_resolve = resolve;
			});
			let waiter = {
				lock: this,
				async wait_unlock() {
					await this.wait_for_unlock;
					this.lock.m_locked = false;
					this.lock.notify_promise = new Promise(e => {
						this.lock.notify_resolver = e;
					})
				},
				lock_resolve,
				wait_for_unlock
			};
			this.waiters.push(waiter);
			console.log('wait');
			await waiter.wait_unlock();
		}
		this.m_locked = true;
		console.log('exit lock');
	}
}

export const active_test_lock = new TestLock;

class BaseTestRunner {
	total = 0;
	successful = 0;
	failed = 0;
	finished = 0;
	parent: any;
	constructor(parent: any) {
		this.parent = parent;
	}
	report_test_failure(): void {
		this.finished++;
		this.failed++;
		console.log(`Test failed`);
	}
	report_test_success(): void {
		this.finished++;
		this.successful++;
	}
	on_test_init(): void {
		this.total++;
		this.print_marker();
	}
	print_marker(count_success: number = 0, count_finished: number = 0, count_total: number = 0) {
		if(this.parent) {
			this.parent.print_marker(
				count_success + this.successful,
				count_finished + this.finished,
				count_total + this.total
			);
		}
	}
}

export class TestEngine extends BaseTestRunner implements ITestRunnerNode {
	test_started = false;
	m_is_user_completing_tests = false;
	is_running_test_set = false;
	start_async() {
		console.error('TODO');
	}
	is_user_reporting_completion() {
		return this.m_is_user_completing_tests
	}
	set_is_user_completing_tests(value: boolean) {
		this.m_is_user_completing_tests = value;
	}
	init_test_set() {
		this.is_running_test_set = true;
		this.test_started = true;
	}
	init_test_engine() {
		return new TestEngine(this);
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
	start_test(lock: TestLock, name: string, test_gen: GenTestCallback): void {
		try {
			let engine = this;
			test_gen(engine, lock);
		} catch(e) {
			console.error('test threw an error', name, e);
			this.report_test_failure();
		}
	};
	async_init_promise: Promise<void> | null = null;
	init_async_test(promise: Promise<void>) {
		this.async_init_promise = promise;
	}
	finished = 0;
	print_marker(count_success: number = 0, count_finished: number = 0, count_total: number = 0) {
		if(this.parent) {
			this.parent.print_marker(
				count_success + this.successful,
				count_finished + this.finished,
				count_total + this.total
			);
		}
	}
	get_results() {
		let {finished, failed, total, successful} = this;
		return {
			failed,
			finished,
			total,
			successful
		}
	}
	constructor(parent: ITestRunnerNode) {
		super(parent);
		this.is_running_test_set = false;
		this.test_started = false;
	}
}

class TestRunner extends BaseTestRunner implements ITestRunnerNode {
	test_started = false;
	m_is_user_completing_tests = false;
	is_running_test_set = false;
	constructor() {
		super(null);
	}
	init_test_set() {}
	report_test_success(): void {
		this.successful++;
	}
	report_test_failure(): void {
		this.failed++;
	}
	on_test_init(): void {
		this.total++;
		this.print_marker();
	}
	start_async() {}
	async handle_async_test_set_if_needed() {
		if(this.async_init_promise) {
			await this.async_init_promise;
			if(this.is_running_test_set) {
				this.test_started = true;
			}
			this.async_init_promise = null;
		}
	}
	start_test(lock: TestLock, name: string, test_gen?: GenTestCallback): void {
		if(test_gen) {
			let engine = new TestEngine(this);
			engine.start_test(lock, name, test_gen);
		}
	}
	async_init_promise: Promise<void> | null = null;
	finished = 0;
	print_marker(successful: number = 0, finished: number = 0, total: number = 0) {
		successful += this.successful;
		finished += this.finished;
		total += this.total;
		console.log(` --- Running (${finished}/${total}, ${successful} successful) --- `);
	}
}



async function main(): Promise<TestRunner> {
	let test_runner = new TestRunner;
	console.log(` --- Starting tests --- `);
	test_runner.start_test(active_test_lock, "ecma_12_8_6", ecma_12_8_6_run_tests);
	test_runner.start_test(active_test_lock, "ecma_12_6", ecma_12_6_run_tests);
	test_runner.start_test(active_test_lock, "ecma_12_6", ecma_terminal_run_tests);
	return test_runner;
}
main().then(function(res) {
	res.print_marker();
	console.log(`${res.successful}/${res.total} Tests complete`);
});
