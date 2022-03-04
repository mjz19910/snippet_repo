import {run_tests as ecma_12_8_6_run_tests} from "../vm/ecma_262/section_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "../vm/ecma_262/section_12_6";
import {run_tests as ecma_terminal_run_tests} from "../vm/ecma_262/section_12";

type GenTestCallback = (runner: ITestRunner, lock: TestLock) => void;

type StartAsyncCallbackType=(runner: ITestRunner, lock: TestLock) => Promise<void>;


export interface ITestRunner {
	wait():Promise<void>;
	init_test_set(): void;
	report_test_failure(): void;
	report_test_success(): void;
	start_test(lock: TestLock, name: string, test_gen?: GenTestCallback): void;
	start_async_template<T>(test_gen:GenTestCallbackTemplate<T>, test_runner: ITestRunner, lock: TestLock, extra_arg:T):void;
	start_async(function_to_run: StartAsyncCallbackType, runner: ITestRunner, lock: TestLock): void;
	print_marker(first:boolean, successful: number, finished: number, total: number): void;
	on_test_init(): void;
	parent: ITestRunner | null;
}

function null_resolver() {}

export class TestLock {
	notify_promise: Promise<void> | null = null;
	m_locked = false;
	m_was_locked=false;
	notify_resolver = null_resolver;
	waiters: {
		wait_unlock(): Promise<void>;
		lock_resolve: () => void;
		wait_for_unlock: Promise<void>;
	}[] = [];
	async unlock() {
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
	}
	async lock() {
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
			await waiter.wait_unlock();
		}
		this.m_was_locked=true;
		this.m_locked = true;
	}
}

export const test_lock = new TestLock;

const debug=false;

type GenTestCallbackTemplate<T>=(runner: ITestRunner, lock: TestLock, extra_arg:T) => void;

class BaseTestRunner implements ITestRunner {
	total = 0;
	successful = 0;
	failed = 0;
	finished = 0;
	parent: ITestRunner|null;
	on_complete_callback=()=>{};
	constructor(parent: ITestRunner|null) {
		this.parent = parent;
	}
	async wait(){
		if(this.total > 0){
			await new Promise<void>((e)=>{
				this.on_complete_callback=function(){
					e();
				};
			});
		}
	}
	report_test_failure(): void {
		this.failed++;
		this.print_marker(true, this.total, this.successful, this.failed);
		if((this.successful + this.failed) >= this.total){
			this.on_complete_callback();
		}
	}
	report_test_success(): void {
		this.successful++;
		this.print_marker(true, this.total, this.successful, this.failed);
		if((this.successful + this.failed) >= this.total){
			this.on_complete_callback();
		}
	}
	on_test_init(): void {
		this.total++;
	}
	print_marker(first:boolean, count_total: number, count_success: number, count_failed:number) {
		if(!first){
			count_total+=this.total;
			count_success+=this.successful;
			count_failed+=this.failed;
		}
		if(this.parent) {
			this.parent.print_marker(false, count_total, count_success, count_failed);
		} else {
			let count_finished=count_failed + count_success;
			if(debug)console.log(` --- Running (${count_finished}/${count_total}, ${count_success} successful) --- `);
			if(count_success === 0){
				debugger;
			}
		}
	}
	test_started:boolean=false;
	is_running_test_set:boolean=false;
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
	};
	start_async(test_gen:GenTestCallback, test_runner: ITestRunner, lock: TestLock) {
		test_runner.on_test_init();
		test_gen(test_runner, lock);
	}
	start_async_template<T>(test_gen:GenTestCallbackTemplate<T>, test_runner: ITestRunner, lock: TestLock, extra_arg:T) {
		test_runner.on_test_init();
		test_gen(test_runner, lock, extra_arg);
	}
}

export class TestEngine extends BaseTestRunner implements ITestRunner {
	test_started = false;
	m_is_user_completing_tests = false;
	is_running_test_set = false;
	is_user_reporting_completion() {
		return this.m_is_user_completing_tests
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
	constructor(parent: ITestRunner) {
		super(parent);
		this.is_running_test_set = false;
		this.test_started = false;
	}
}

class TestRunner extends BaseTestRunner implements ITestRunner {
	on_done(){
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
	children:ITestRunner[]=[];
	async_init_promise: Promise<void> | null = null;
	async wait() {
		let promise=super.wait();
		await Promise.all([promise].concat(this.children.map(e=>{
			return e.wait();
		})));
	}
}



async function main(): Promise<void> {
	let test_runner = new TestRunner;
	console.log(` --- Starting tests --- `);
	test_runner.start_test(test_lock, "ecma_12_8_6", ecma_12_8_6_run_tests);
	test_runner.start_test(test_lock, "ecma_12_6", ecma_12_6_run_tests);
	test_runner.start_test(test_lock, "ecma_terminal", ecma_terminal_run_tests);
	await test_runner.wait();
	test_runner.on_done();
}
main()
