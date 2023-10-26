import {GenTestCallbackTemplate} from "./GenTestCallbackTemplate.ts"
import {debug} from "./const.ts"
export class BaseTestRunner {
	m_total=0
	m_successful=0
	m_failed=0
	m_finished=0
	m_pre_start_test: number=0
	m_test_started=false
	m_parent: BaseTestRunner|null
	on_complete_callback=() => {}
	constructor(parent: BaseTestRunner|null) {
		this.m_parent=parent
	}
	on_done() {
		console.log(` --- ${this.m_successful}/${this.m_total} Tests complete --- `)
	}
	pre_start_set_test_count(test_count: number) {
		this.m_total+=test_count
		this.m_pre_start_test+=test_count
	}
	report_test_failure(): void {
		this.m_failed++
		this.print_marker(true,this.m_total,this.m_successful,this.m_failed)
		if((this.m_successful+this.m_failed)>=this.m_total) {
			this.on_complete_callback()
		}
	}
	report_test_success(): void {
		this.m_successful++
		this.print_marker(true,this.m_total,this.m_successful,this.m_failed)
		if((this.m_successful+this.m_failed)>=this.m_total) {
			this.on_complete_callback()
		}
	}
	on_test_init(): void {
		this.m_total++
	}
	print_marker(first: boolean,count_total: number,count_success: number,count_failed: number) {
		if(!first) {
			count_total+=this.m_total
			count_success+=this.m_successful
			count_failed+=this.m_failed
		}
		if(this.m_parent) {
			this.m_parent.print_marker(false,count_total,count_success,count_failed)
		} else {
			let count_finished=count_failed+count_success
			if(debug) {
				console.log(` --- Running (${count_finished}/${count_total}, ${count_success} successful) --- `)
			}
			if(count_success===0) {
				debugger
			}
		}
	}
	is_running_test_set: boolean=false
	init_test_set() {
		this.is_running_test_set=true
		this.m_test_started=true
	}
	start_test<T>(name: string, value: T,test_gen: GenTestCallbackTemplate<any,T>): void {
		try {
			let engine=this
			test_gen(engine, value);
		} catch(e) {
			console.error('test threw an error',name,e)
			this.report_test_failure()
		}
	}
	start_async<T>(test_gen: GenTestCallbackTemplate<any,T>,value: T) {
		this.on_test_init();
		test_gen(this,value);
	}
	async wait_impl() {
		if(this.m_total>0) {
			await new Promise<void>((e) => {
				this.on_complete_callback=function() {
					e()
				}
			})
		}
	}
	children: BaseTestRunner[]=[]
	async wait() {
		if(this.children.length===0) {
			return this.wait_impl()
		} else {
			let arr_1=this.children.map(run => run.wait())
			let arr2=[this.wait_impl(),...arr_1]
			await Promise.all(arr2)
		}
	}
}
