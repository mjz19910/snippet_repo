import {EventHandlerDispatch} from "../EventHandlerDispatch";
import {SimpleStackVMParser} from "../SimpleStackVMParser";
import {EventHandlerVMDispatch} from "../template/EventHandlerVMDispatch";
import {MulCompression} from "../MulCompression";
import {AsyncNodeRoot} from "../AsyncNodeRoot";
import {AutoBuyState} from "../AutoBuyState";
import {specialclick_inject} from "../specialclick_inject";
import {array_sample_end} from "../array_tools/array_sample_end";
import {do_auto_unit_promote} from "../do_auto_unit_promote";
import {AUDIO_ELEMENT_VOLUME} from "../mod";

export class AutoBuy {
	delay: number;
	extra: number;
	iter_count: number;
	epoch_len: number;
	background_audio: HTMLAudioElement | null;
	state: AutoBuyState;
	cint_arr: any[];
	skip_save: boolean;
	state_history_arr: string[];
	compressor: MulCompression;
	epoch_start_time: number;
	root_node: AsyncNodeRoot;
	original_map: any;
	constructor() {
		this.root_node = new AsyncNodeRoot;
		this.delay = 0;
		this.extra = 0;
		this.iter_count = 0;
		this.epoch_len = 0;
		this.background_audio = null;
		this.state = new AutoBuyState(this.root_node);
		this.cint_arr = [];
		this.skip_save = false;
		this.state_history_arr = [];
		this.compressor = new MulCompression;
		this.load_state_history_arr(["S"]);
		this.epoch_start_time = Date.now();
		this.delay_arr = [];
		this.display_style_sheet = new CSSStyleSheet;
		this.history_element = document.createElement("div");
		this.delay_element = document.createElement("div");
		this.hours_played_element = document.createElement("div");
		this.percent_ratio_element = document.createElement("div");
		this.percent_ratio_change_element = document.createElement("div");
		this.state_log_element = document.createElement("div");
		this.state_history_arr_max_len = 80;
	}
	pre_init() {
		// find elements
		// find background_audio by id
		this.background_audio = document.querySelector("#background_audio");
		if(!this.background_audio)
			throw new Error("No background audio");
		// change the audio element's volume, and remove
		// the event listener that will change the volume
		this.background_audio.onloadeddata = null;
		this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
		this.async_pre_init().then(() => {
			console.log('pre_init done');
		});
		this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio)
			throw new Error("No background audio");
		try {
			await this.background_audio.play();
			return;
		} catch(e) {
			console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let instructions = SimpleStackVMParser.parse_instruction_stream_from_string(`
		this;push,target_obj;get;push,background_audio;get;push,play;
			call,int(0);
				push,then;
				push,%o;push,%o;
				call,int(2);
			// comments work
			/*-2 +1 multiline too, (not split across lines yet)*/
		drop;
		global;push,removeEventListener;push,click;this;
			call,int(2);
		drop
		`, [function() {console.log('play success');}, function(err: any) {console.log(err);}]);
		let handler = new EventHandlerVMDispatch(instructions, this);
		globalThis.addEventListener('click', handler);
	}
	save_state_history_arr() {
		if(this.skip_save)
			return;
		localStorage.auto_buy_history_str = this.state_history_arr.join(",");
	}
	load_state_history_arr(arr: string[]) {
		if(localStorage.auto_buy_history_str)
			arr = localStorage.auto_buy_history_str.split(",");
		this.state_history_arr = arr;
	}
	delay_arr: number[];
	get_delay_arr_data(forced_action: string) {
		if(forced_action == "RESET")
			return this.delay_arr.map((e: number) => ~~(e / 4)).join(",");
		return this.delay_arr.join(",");
	}
	save_delay_arr() {
		let forced_action, action_count;
		let action_data = localStorage.auto_buy_forced_action;
		if(action_data)
			[forced_action, action_count] = action_data.split(",");
		localStorage.auto_buy_delay_str = this.get_delay_arr_data(forced_action);
		if(action_count !== void 0) {
			action_count = parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count > 0) {
					localStorage.auto_buy_forced_action = [forced_action, action_count - 1];
				} else if(forced_action !== "NONE") {
					localStorage.auto_buy_forced_action = "NONE,0";
				}
			}
		}
	}
	display_style_sheet: CSSStyleSheet;
	history_element: HTMLDivElement;
	delay_element: HTMLDivElement;
	hours_played_element: HTMLDivElement;
	percent_ratio_element: HTMLDivElement;
	percent_ratio_change_element: HTMLDivElement;
	state_log_element: HTMLDivElement;
	dom_pre_init() {
		let style_string = "";
		this.display_style_sheet.replace(`
		#state_log > div {width:max-content}
		#state_log {
			top:0px;width:30px;position:fixed;z-index:101;
			font-family:monospace;font-size:22px;color:lightgray;
		}`);
		this.history_element.innerText = "?3";
		this.delay_element.innerText = "0";
		this.hours_played_element.innerText = "0.000 hours";
		this.percent_ratio_element.innerText = 0..toFixed(2) + "%";
		this.percent_ratio_change_element.innerText = 0..toExponential(3);
		this.state_log_element.id = "state_log";
		this.state_log_element.style = style_string as any as CSSStyleDeclaration;
		this.state_log_element.append(this.history_element);
		this.state_log_element.append(this.delay_element);
		this.state_log_element.append(this.hours_played_element);
		this.state_log_element.append(this.percent_ratio_element);
		this.state_log_element.append(this.percent_ratio_change_element);
		document.body.append(this.state_log_element);
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.display_style_sheet];
	}
	state_history_arr_max_len: number;
	init_dom() {
		const font_size_px = 22;
		let t = this;
		this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
		this.history_element.addEventListener('click', new EventHandlerDispatch(this, this.history_element_click_handler));
		this.delay_element.innerText = this.delay_arr[0].toString();
		this.percent_ratio_element.addEventListener('click', function() {
			t.state.reset();
		});
		this.state_log_element.style.fontSize = font_size_px + "px";
		window.addEventListener('unload', function() {
			t.save_state_history_arr();
			t.save_delay_arr();
		});
	}
	global_init() {
		if(window.g_auto_buy && (<any>window).g_auto_buy !== this)
			window.g_auto_buy.destroy();
		(<any>window).g_auto_buy = this;
	}
	destroy() {
		for(let i = 0;i < this.cint_arr.length;i += 2) {
			let item = this.cint_arr[i];
			if(item[0] === 1)
				clearTimeout(item[1]);
			else if(item[0] === 2)
				clearTimeout(item[1]);
			console.log(item);
		}
	}
	parse_single_int(string: string) {
		return parseInt(string);
	}
	default_split(string: string) {
		return string.split(",");
	}
	parse_delay_arr(data: any) {
		return this.default_split(data).map(this.parse_single_int);
	}
	load_delay_arr() {
		let storage_data = localStorage.auto_buy_delay_str;
		if(!storage_data)
			return Array(12).fill(300);
		return this.parse_delay_arr(storage_data);
	}
	update_dom() {
		this.hours_played_element.innerText = ((window.timeplayed / 30) / 60).toFixed(3) + " hours";
		if(!Number.isFinite(this.state.ratio)) {
			debugger;
		}
		let last_ratio = this.state.ratio * 100;
		this.state.update();
		let cur_ratio = this.state.ratio * 100;
		this.percent_ratio_element.innerText = cur_ratio.toFixed(2) + "%";
		let ratio_diff = cur_ratio - last_ratio;
		let extra_diff_char = "+";
		if(ratio_diff < 0)
			extra_diff_char = '';
		this.percent_ratio_change_element.innerText = extra_diff_char + ratio_diff.toExponential(3);
		this.history_element.innerText = array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
		// let cint = setTimeout(this.update_dom, 125, this);
		// this.cint_arr.push([1, cint, 'dom update_dom']);
	}
	init() {
		this.delay_arr = this.load_delay_arr();
		// setTimeout(this.delayed_init, 200, this);
	}
	delayed_init() {
		let t = this;

		this.global_init();
		this.init_dom();
		this.state.init();
		this.update_dom();
		this.main();

		let original_lightreset = window.lightreset;
		window.lightreset = lightreset_inject;
		window.specialclick = specialclick_inject;

		function lightreset_inject() {
			t.state_history_clear_for_reset();
			t.skip_save = true;
			window.addEventListener('unload', function() {
				t.skip_save = false;
				localStorage.auto_buy_delay_str = "300,300,300,300";
				localStorage.long_wait = 12000;
			});
			original_lightreset();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr = ["R"];
		localStorage.auto_buy_history_str = "R";
	}
	state_history_append(value: string) {
		this.epoch_len++;
		let last = this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		if(this.state.debug)
			console.log('history append', last, value);
		while(this.state_history_arr.length > 120) {
			this.state_history_arr.shift();
		}
		function async_compress(self: {state_history_arr: any; compressor: {compress_array: (arg0: any) => any;};}) {
			self.state_history_arr = self.compressor.compress_array(self.state_history_arr);
		}
		Promise.resolve(this).then(async_compress);
	}
	history_element_click_handler(_event: MouseEvent) {
		this.extra = this.calc_delay_extra();
		let cint = setTimeout(this.main, this.extra, this);
		this.cint_arr.push([1, cint]);
		this.delay_element.innerText = this.extra.toString();
		this.state_history_append(">");
	}
	calc_delay_extra() {
		let max;
		while(this.delay_arr.length > 16) {
			this.delay_arr.shift();
		};
		for(var i = 0;i < this.delay_arr.length;i++) {
			this.extra += this.delay_arr[i];
			if(max !== void 0)
				max = Math.max(this.delay_arr[i], max);
			else
				max = this.delay_arr[i];
		};
		void max;
		return ~~(this.extra / this.delay_arr.length);
	}
	is_epoch_over() {
		let epoch_diff = Date.now() - this.epoch_start_time;
		if(epoch_diff > 40 * 1000) {
			return true;
		}
		return false;
	}
	main() {
		this.extra = this.calc_delay_extra();
		this.pre_total = window.totalAtome;
		do_auto_unit_promote();
		if(this.state.ratio > 1 && this.is_epoch_over())
			return this.reset_delay_init();
		if(this.pre_total != window.totalAtome)
			return this.step_iter_start();
		this.iter_count = 0;
		this.rare_begin_or_faster_delay();
	}
	step_iter_start() {
		this.iter_count += 1;
		if(this.iter_count > 6) {
			return this.large_decrease();
		} else {
			return this.normal_decrease();
		};
	}
	get_delay_change(pow_base: number, pow_num: number, div: number) {
		let pow_res = Math.pow(pow_base, pow_num);
		let res = this.extra * pow_res;
		return res / div;
	}
	update_delay(change: number, decrease = false) {
		if(window.__testing__) {
			return;
		}
		let value = this.get_updated_delay(change, decrease);
		this.delay = value;
		this.delay_arr.push(value);
	}
	get_updated_delay(change: number, decrease: boolean) {
		let value;
		if(decrease)
			value = this.extra - change;
		else
			value = this.extra + change;
		// floor the value
		return ~~value;
	}
	do_delay_dec(pow_terms: [number, number], div: number) {
		let iter_term = Math.pow(pow_terms[1], this.iter_count);
		let delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_delay(delay_change * iter_term, true);
		if(this.delay < 25)
			this.delay = 25;
	}
	do_delay_inc(pow_terms: [number], div: number) {
		let delay_change = this.get_delay_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_delay(delay_change);
	}
	large_decrease() {
		this.do_delay_dec([1.007, 1.05], 10);
		this.next_delay(this.main, this.extra, '!');
	}
	normal_decrease() {
		this.do_delay_dec([1.006, 1.05], 10);
		this.next_delay(this.main, this.extra, '-');
	}
	fast_unit_delay() {
		this.extra = this.calc_delay_extra();
		this.iter_count += 1;
		this.do_delay_dec([1.0065, 1.05], 10);
		this.next_delay(this.fast_unit, this.get_updated_delay(this.extra * 0.1, true), ':');
	}
	next_delay(trg_fn: (this: this) => void, delay: number, char: string) {
		let cint = setTimeout(trg_fn.bind(this), delay);
		this.cint_arr.push([1, cint]);
		this.delay_element.innerText = delay.toString();
		this.state_history_append(char);
	}
	rare_begin_or_faster_delay() {
		if(Math.random() < 0.05)
			return this.rare_begin();
		this.faster_delay();
	}
	faster_delay() {
		this.do_delay_inc([1.007], 40);
		this.next_delay(this.main, this.extra, '+');
	}
	pre_total: number | undefined;
	fast_unit() {
		this.pre_total = window.totalAtome;
		do_auto_unit_promote();
		if(this.pre_total == window.totalAtome)
			this.slow_final();
		else
			this.fast_unit_delay();
	}
	slow_final() {
		this.next_delay(this.main, this.extra, '$');
	}
	bonus() {
		window.bonusAll();
		this.fast_unit_delay();
	}
	special_delay() {
		this.next_delay(this.special, this.extra, '^');
	}
	is_special_done(special_buyable: {done: boolean; cost: number;}) {
		return !special_buyable.done && special_buyable.cost < window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret = false;
		for(let index = this.next_special();;index = this.next_special()) {
			if(index > -1) {
				window.specialclick(index);
				ret = true;
			} else
				break;
		}
		return ret;
	}
	bonus_delay() {
		this.next_delay(this.bonus, this.extra, '#');
	}
	special() {
		if(this.do_special())
			this.special_delay();
		else
			this.bonus_delay();
	}
	rare_begin() {
		this.do_delay_inc([1.008], 10);
		this.next_delay(this.initial_special, this.extra, '<');
	}
	initial_special() {
		this.next_delay(this.special, this.extra, '>');
	}
	reset_delay_trigger() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'trigger');
	}
	reset_delay_start() {
		this.next_delay(this.reset_delay_start, 60 * 1000, 'reset_soon');
	}
	reset_delay_run() {
		window.lightreset();
	}
	reset_delay_init() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_delay(this.reset_delay_start, 60 * 2 * 1000, 'reset_delay');
	}
}
