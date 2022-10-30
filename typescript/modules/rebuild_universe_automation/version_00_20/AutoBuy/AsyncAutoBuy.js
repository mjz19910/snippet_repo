import {AsyncTimeoutNode} from "../AsyncTimeoutNode";
import {AsyncTimeoutTarget} from "../AsyncTimeoutTarget";
import {AutoBuy} from "./AutoBuy.js";

export class AsyncAutoBuy {
	/**@arg {AutoBuy} parent */
	constructor(parent) {
		this.parent = parent;
	}
	/**
	 * @param {boolean} no_wait
	 */
	async do_start_main_async(no_wait) {
		if(!no_wait)
			await this.next_timeout_async(this.timeout_ms, 'A');
		await this.main_async();
	}
	async maybe_async_reset() {
		let loss_rate = this.parent.unit_promote_start();
		if(this.parent.maybe_run_reset())
			return [true, loss_rate];
		return [false, loss_rate];
	}
	async bonus_async() {
		window.bonusAll();
		await this.fast_unit_async();
	}
	async initial_special_async() {
		await this.next_timeout_async(this.timeout_ms, '>');
		let in_special = true;
		while(in_special) {
			if(this.parent.do_special()) {
				await this.next_timeout_async(this.timeout_ms, '^');
				continue;
			} else {
				in_special = false;
			}
		}
		await this.next_timeout_async(this.timeout_ms, '#');
		await this.bonus_async();
	}
	async rare_begin_async() {
		this.parent.do_rare_begin_change();
		await this.next_timeout_async(this.timeout_ms, '<');
		await this.initial_special_async();
	}
	async normal_decrease_async() {
		this.parent.do_normal_decrease();
		await this.next_timeout_async(this.timeout_ms, '-');
	}
	async large_decrease_async() {
		this.parent.do_large_decrease();
		await this.next_timeout_async(this.timeout_ms, '!');
	}
	async main_async() {
		if(this.main_running) {
			throw new Error("Already running");
		}
		this.main_running = true;
		try {
			run_loop: while(this.main_running) {
				for(this.iter_count = 0; ;) {
					let unit_upgradeable_trigger = 30;
					if(this.timeout_ms && this.timeout_ms > 3 * 60 * 1000) {
						unit_upgradeable_trigger = 8;
					}
					if(this.parent.unit_upgradable_count > unit_upgradeable_trigger) {
						this.unit_upgradable_count = 0;
						await this.rare_begin_async();
					}
					if(this.iter_count < 6)
						await this.normal_decrease_async();
					else
						await this.large_decrease_async();
					let [quit, loss_rate] = await this.maybe_async_reset();
					if(quit)
						break run_loop;
					if(loss_rate > 0.08)
						continue;
					if(this.parent.pre_total == window.totalAtome)
						break;
				}
				await this.faster_timeout_async();
			}
		} finally {
			this.main_running = false;
		}
		if(this.main_running) {
			console.log('no finally');
			this.main_running = false;
		}
	}
	async fast_unit_async() {
		this.fast_unit_running = true;
		let count = 0;
		while(this.fast_unit_running) {
			this.parent.unit_promote_start();
			if(this.parent.pre_total == window.totalAtome)
				break;
			this.parent.do_fast_unit_step_change();
			await this.next_timeout_async(this.timeout_ms, ':');
			count++;
			if(count > 12)
				this.fast_unit_running = false;
		}
		this.parent.do_fast_unit_change();
		await this.next_timeout_async(this.timeout_ms, '$');
	}
	async faster_timeout_async() {
		this.parent.do_timeout_inc([1.006, 1.005], 4);
		await this.next_timeout_async(this.timeout_ms, '+');
	}
	/**
	 * @param {number | undefined} timeout
	 * @param {string} char
	 */
	async next_timeout_async(timeout, char, silent = false) {
		let node = new AsyncTimeoutNode(timeout);
		this.parent.root_node.append_child(node);
		if(!silent) {
			this.timeout_ms = timeout;
			this.parent.update_timeout_element();
		}
		this.parent.state_history_append(char, silent);
		await node.start_async(new AsyncTimeoutTarget);
	}
}
