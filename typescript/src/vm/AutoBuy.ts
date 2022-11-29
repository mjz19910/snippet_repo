import {array_sample_end} from "./array_sample_end.js";
import {AsyncNodeRoot} from "./AsyncNodeRoot.js";
import {AsyncTimeoutNode} from "./AsyncTimeoutNode.js";
import {AsyncTimeoutTarget} from "./AsyncTimeoutTarget.js";
import {AutoBuyState} from "./AutoBuyState.js";
import {Box} from "../box/Box.js";
import {DomValueBox} from "./DomValueBox.js";
import {do_auto_unit_promote} from "./do_auto_unit_promote.js";
import {EventHandlerDispatch} from "./EventHandlerDispatch.js";
import {EventHandlerVMDispatch} from "./EventHandlerVMDispatch.js";
import {AutoBuyInterface} from "./AutoBuyInterface.js";
import {lightreset_inject} from "./lightreset_inject.js";
import {l_log_if} from "./l_log_if.js";
import {MulCompression} from "./MulCompression.js";
import {SimpleStackVMParser} from "./SimpleStackVMParser.js";
import {specialclick_inject} from "./specialclick_inject.js";
import {TimeoutTargetWithDesc} from "./TimeoutTarget.js";
import {DataLoader} from "./wasm/DataLoader.js";
import {debug_id_syms} from "../debug_id_syms.js";
import {AUDIO_ELEMENT_VOLUME} from "../vars.js";
import {is_in_ignored_from_src_fn} from "../script_registry/is_in_ignored_from_src_fn.js";
import {LOG_LEVEL_VERBOSE} from "../constants.js";
import {SpecType} from "../SpecType.js";
import {BaseStackVM} from "./BaseStackVM.js";
import {InstructionType} from "./instruction/InstructionType.js";
import {RawDomInstructions} from "./RawDomInstructions";
import {NullBox} from "../box/NullBox.js";
import {StringBox} from "../box/StringBox.js";
import {CSSStyleSheetBox} from "../box/CSSStyleSheetBox.js";
import {PromiseFunctionBox} from "./PromiseFunctionBox.js";
import {VoidBox} from "../box/VoidBox.js";
import {CSSStyleSheetConstructorBox} from "../box/CSSStyleSheetConstructorBox.js";

declare global {
	interface Window {
		timeplayed: number;
		secondinterval?: ReturnType<typeof setInterval>;
		doc: Document;
		rounding(v: number,x: any,y: any): string;
		totalAtome: number;
		atomsaccu: number;
		calcPres(): number;
		lightreset(): void;
		specialclick(that: any): void;
		__testing__: false;
		bonusAll(): void;
		allspec: SpecType[];
	}
}

export class AutoBuy implements AutoBuyInterface {
	state_history_arr: any;
	root_node: AsyncNodeRoot;
	extra: number;
	background_audio: HTMLAudioElement|null;
	skip_save: boolean;
	iter_count: number;
	epoch_len: number;
	compressor: any;
	cint_arr: never[];
	local_data_loader: DataLoader;
	state: AutoBuyState;
	debug: boolean;
	epoch_start_time: number;
	original_map: Map<any,any>;
	dom_map: Map<any,any>;
	debug_arr: string[];
	timeout_arr: any;
	display_style_sheet?: CSSStyleSheet;
	history_element?: HTMLDivElement;
	timeout_element?: HTMLDivElement;
	hours_played_element?: HTMLDivElement;
	percent_ratio_element?: HTMLDivElement;
	percent_ratio_change_element?: HTMLDivElement;
	state_log_element?: HTMLDivElement;
	state_history_arr_max_len: number|undefined;
	last_value: number|undefined;
	pre_total: any;
	[v: symbol]: string;
	async_compress() {
		this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
	}
	constructor() {
		this.root_node=new AsyncNodeRoot;
		this.extra=0;
		this.iter_count=0;
		this.epoch_len=0;
		this.background_audio=null;
		this.state_history_arr=null;
		this.skip_save=false;
		this.cint_arr=[];
		this.local_data_loader=new DataLoader(globalThis.localStorage);
		this.state=new AutoBuyState(this.root_node);
		this.debug=this.state.debug;
		this.compressor=new MulCompression;
		this.state_history_arr=this.local_data_loader.load_str_arr('auto_buy_history_str',["S"]);
		this.epoch_start_time=Date.now();
		this.original_map=new Map;
		this.dom_map=new Map;
		this.debug_arr=[];
		for(let i=0;i<debug_id_syms.length;i++) {
			let val=debug_id_syms[i].deref();
			if(val&&(<any>this)[val.sym]) {
				let obj1=(this)[val.sym];
				let split_data=obj1.split(",");
				this.debug_arr.push(...split_data.map((e: string) => e.trim()));
			}
		}
		this.timeout_arr=this.local_data_loader.load_int_arr('auto_buy_timeout_str',() => {
			let src=[300];
			src.length=16;
			let data_len=1;
			while(src.at(-1)!=src[0]) {
				src.copyWithin(data_len,0);
				data_len*=2;
			}
			return src;
		});
	}
	pre_init() {
		// find elements
		// find background_audio by id
		this.background_audio=document.querySelector("#background_audio");
		if(!this.background_audio)
			throw new Error("Missing expected element");
		// change the audio element's volume, and remove
		// the event listener that will change the volume
		this.background_audio.onloadeddata=null;
		this.background_audio.volume=AUDIO_ELEMENT_VOLUME;
		this.async_pre_init().then(() => {
			console.log('pre_init done');
		});
		this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio)
			throw new Error("Missing expected element");
		try {
			return this.background_audio.play();
		} catch(e) {
			is_in_ignored_from_src_fn.flag=true;
			console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let instructions=SimpleStackVMParser.parse_instruction_stream_from_string(`
			this;push,target_obj;get;push,background_audio;get;push,play
				call,int(2)
					push,then
					push,%o;push,%o
					call,int(2)
				// comments work
				/*-2 +1 multiline too, (not split across lines yet)*/
			drop
			global;push,removeEventListener;push,click;this
				call,int(2)
			drop
			`,[function() {console.log('play success');},function(err: Box) {console.log(err);}]);
		let handler=new EventHandlerVMDispatch(instructions,this);
		globalThis.addEventListener('click',handler);
		is_in_ignored_from_src_fn.flag=false;
	}
	save_state_history_arr() {
		if(this.skip_save)
			return;
		localStorage["auto_buy_history_str"]=this.state_history_arr.join(",");
	}
	get_timeout_arr_data(forced_action: string) {
		if(forced_action=="RESET")
			return this.timeout_arr.map((e: number) => ~~(e/4)).join(",");
		return this.timeout_arr.join(",");
	}
	save_timeout_arr() {
		let forced_action,action_count;
		let action_data=localStorage["auto_buy_forced_action"];
		if(action_data)
			[forced_action,action_count]=action_data.split(",");
		localStorage["auto_buy_timeout_str"]=this.get_timeout_arr_data(forced_action);
		if(action_count!==void 0) {
			action_count=parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count>0) {
					localStorage["auto_buy_forced_action"]=[forced_action,action_count-1];
				} else if(forced_action!=="NONE") {
					localStorage["auto_buy_forced_action"]="NONE,0";
				}
			}
		}
	}
	dom_pre_init() {
		const css_display_style=`
			#state_log>div{width:max-content}
			#state_log{top:0px;width:30px;position:fixed;z-index:121;font-family:monospace;font-size:22px;color:lightgray}
		`;
		this.display_style_sheet=new CSSStyleSheet;
		this.display_style_sheet.replace(css_display_style);
		// dom element init
		// init history_element
		this.history_element=document.createElement("div");
		this.history_element.innerText="?3";
		// init timeout_element
		this.timeout_element=document.createElement("div");
		this.timeout_element.innerText="0";
		// init hours_played_element
		this.hours_played_element=document.createElement("div");
		this.hours_played_element.innerText="0.00000 hours";
		// init percent_ratio_element
		this.percent_ratio_element=document.createElement("div");
		this.percent_ratio_element.innerText=0..toFixed(2)+"%";
		// init percent_ratio_change_element
		this.percent_ratio_change_element=document.createElement("div");
		this.percent_ratio_change_element.innerText=0..toExponential(3);
		// init state_log_element
		this.state_log_element=document.createElement("div");
		this.state_log_element.id="state_log";
		// dom element attach
		// attach history_element
		this.state_log_element.append(this.history_element);
		// attach timeout_element
		this.state_log_element.append(this.timeout_element);
		// attach hours_played_element
		this.state_log_element.append(this.hours_played_element);
		// attach percent_ratio_element
		this.state_log_element.append(this.percent_ratio_element);
		// attach percent_ratio_change_element
		this.state_log_element.append(this.percent_ratio_change_element);
		// attach state_log_element
		document.body.append(this.state_log_element);
		// attach display_style_sheet
		this.adopt_styles(this.display_style_sheet);
		function retype_promise_helper(v: PromiseSettledResult<CSSStyleSheet>): v is PromiseFulfilledResult<CSSStyleSheet> {
			return v.status==='fulfilled';
		}
		function retype_promise_settled_results(v: PromiseSettledResult<CSSStyleSheet>[]): PromiseFulfilledResult<CSSStyleSheet>[] {
			let out: PromiseFulfilledResult<CSSStyleSheet>[]=[];
			for(let i=0;i<v.length;i++) {
				let cur=v[i];
				if(retype_promise_helper(cur)) {
					out.push(cur);
				}
			}
			return out;
		}
		let call_arg_arr: []=[];
		let raw_dom_arr: RawDomInstructions[]=[
			[0,'get','body'],
			[1,'create_props','div','state_log',{id: 'state_log'}],
			[1,'append'],
			[2,'create','div','history',"?3"],
			[2,'append'],
			[2,'create','div','delay',"0"],
			[2,'append'],
			[2,'create','div','hours_played',"0.000 hours"],
			[2,'append'],
			[2,'create','div','ratio',0..toFixed(2)+"%"],
			[2,'append'],
			[2,'create','div','ratio_change',0..toExponential(3)],
			[2,'append'],
			[1,'drop'],
			[0,'drop'],
			// process promise
			[0,'push',new NullBox(null),new PromiseFunctionBox(async (style_element_promise: Box) => {
				if(style_element_promise.type==='promise_box'&&style_element_promise.await_type==='CSSStyleSheet') {
					this.adopt_styles(await style_element_promise.value);
				}
				return new VoidBox(void 0);
			}),...call_arg_arr],
			[0,'new',CSSStyleSheet,[],
				new PromiseFunctionBox(async (...args:Box[]) => {
					if(args.length!==2) {
						throw new Error("Failed");
					}
					let [obj,str]=args;
					if(obj.type==='CSSStyleSheetBox'&&str.type==='string') {
						return new CSSStyleSheetBox(await obj.value.replace(str.value));
					}
					throw new Error("Failed");
				}),
				[css_display_style]
			],
			[0,'call',2+1+call_arg_arr.length],
			// drop the promise
			[0,'drop'],
		];
		try {
			this.build_dom_from_desc(raw_dom_arr,this.dom_map);
		} catch(e) {
			console.log(e);
		}
	}
	adopt_styles(...styles: CSSStyleSheet[]) {
		let dom_styles=document.adoptedStyleSheets;
		document.adoptedStyleSheets=[...dom_styles,...styles];
	}
	decode_query_arg(query: string) {
		switch(query) {
			case 'body': return document.body;
			default: return document.querySelector(query);
		}
	}
	build_dom_from_desc(raw_arr: RawDomInstructions[],trg_map=new Map,dry_run=false) {
		let stack: RawDomInstructions[]=[];
		let map=trg_map;
		if(dry_run)
			stack.push([0,"enable_dry_mode"]);
		for(let i=0;i<raw_arr.length;i++) {
			let cur_item=raw_arr[i];
			let [depth,action,...args]=cur_item;
			switch(cur_item[1]) {
				case 'get': {
					let [,,query_arg]=cur_item;
					const cur_element=this.decode_query_arg(query_arg);
					if(!cur_element) throw new Error("Unable to find query element");
					stack.push([depth,"push",new DomValueBox(cur_element)]);
				} break;
				case 'new': {
					const [,,class_,construct_arg_arr,callback,arg_arr]=cur_item;
					stack.push([depth,"push",new NullBox(null),callback,new CSSStyleSheetConstructorBox(class_)]);
					stack.push([depth,"construct",1+construct_arg_arr.length]);
					stack.push([depth,"push",...arg_arr.map(e => new StringBox(e))]);
					stack.push([depth,"call",3+arg_arr.length]);
				} break;
				case 'create': {
					const [,,element_type,name,content]=cur_item;
					let cur_element=document.createElement(element_type);
					cur_element.innerText=content;
					map.set(name,cur_element);
					stack.push([depth,"push",new DomValueBox(cur_element)]);
				} break;
				case 'create_props': {
					const [,,element_type,name,content]=cur_item;
					let cur_element=document.createElement(element_type);
					cur_element.id=content.id;
					map.set(name,cur_element);
					stack.push([depth,"push",new DomValueBox(cur_element)]);
				} break;
				case 'append': {
					// peek at the return stack, up 1 depth
					stack.push([depth,"peek",depth-1,0]);
					stack.push(cur_item);
				} break;
				case 'drop':
				case 'call': // push the item
				case 'push':
					stack.push(cur_item);
					break;
				default: {
					console.log('might need to handle',action);
					debugger;
				} break;
			}
			if(this.debug_arr.includes('build_dom_from_desc'))
				console.log('es',stack.at(-1));
		}
		let [left_stack,tree]=this.parse_dom_desc(stack);
		if(left_stack.length>0) {
			console.assert(false,'failed to parse everything (parse tree probably has errors)');
		}
		this.apply_dom_desc(tree);
	}
	parse_dom_desc(input_stack: string|any[]) {
		let stack: any[][]=[];
		let tree=[];
		for(let x=0,i=0;i<input_stack.length;i++) {
			let cur_stack=input_stack[i];
			let [y,...item]=cur_stack;
			if(this.debug_arr.includes('parse_dom_desc'))
				console.log(item);
			while(y>x) {
				stack.push(tree);
				tree=[];
				x++;
			}
			while(y<x) {
				let prev=tree;
				tree=<any>stack.pop();
				tree.push([x,prev]);
				x--;
			}
			tree.push([y,item]);
		}
		return [stack,tree];
	}
	log_if(tag: string,...log_args: (string|number|any[])[]) {
		if(this.debug_arr.includes(tag)) {
			console.log(...log_args);
		}
	}
	get_logging_level(tag: string,level=LOG_LEVEL_VERBOSE) {
		if(this.debug_arr.includes(tag)) {
			return level-1;
		}
		return level;
	}
	apply_dom_desc(tree: any) {
		this.run_dom_desc(tree);
	}
	run_dom_desc(tree: string|any[],stack: (InstructionType|['children',number,any])[]=[],cur_depth=0,items: InstructionType[]=[],depths: number[]=[]): [InstructionType[],number[]] {
		for(let i=0;i<tree.length;i++) {
			let cur=tree[i];
			switch(cur[0]-cur_depth) {
				case 1: {
					this.log_if('apply_dom_desc','rdc stk');
					stack.push(['children',items.length-1,cur]);
				} break;
				case 0: {
					items.push(cur[1]);
					depths.push(cur[0]);
				} break;
				default: {
					console.assert(false,'handle depth change in apply_dom_desc');
					this.log_if('apply_dom_desc',cur[0]-cur_depth);
				}
			}
		}
		if(stack.length===0)
			return [items,depths];
		let stack_item=stack.pop();
		if(!stack_item) throw 1;
		const [tag,items_index,[data_depth,data]]=stack_item;
		let log_level=this.get_logging_level('apply_dom_desc');
		l_log_if(log_level,tag,items[items_index],data_depth,data);
		let deep_res=this.run_dom_desc(data,stack,cur_depth+1);
		const ret_items=items.slice();
		let off=1;
		let new_instr: InstructionType=['dom_exec',deep_res[0]];
		ret_items.splice(items_index+off++,0,new_instr);
		this.log_if('apply_dom_desc',deep_res[0],deep_res[1]);
		this.log_if('apply_dom_desc',ret_items,depths,stack);
		let builder_vm=new BaseStackVM(ret_items);
		builder_vm.run();
		return [ret_items,depths];
	}
	init_dom() {
		const font_size_px=22;
		let t=this;
		// general init
		this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
		// dom element init
		// init history_element
		this.history_element?.addEventListener('click',new EventHandlerDispatch(this,this.history_element_click_handler));
		// init timeout_element
		if(this.timeout_element)
			this.timeout_element.innerText=this.timeout_arr[0];
		// init hours_played_element
		// init percent_ratio_element
		this.percent_ratio_element?.addEventListener('click',function() {
			t.state.reset();
		});
		// init percent_ratio_change_element
		// init state_log_element
		if(this.state_log_element)
			this.state_log_element.style.fontSize=font_size_px+"px";
		// event listeners
		// window unload
		window.addEventListener('unload',function() {
			t.save_state_history_arr();
			t.save_timeout_arr();
		});
	}
	global_init() {
		let cur_this: AutoBuyInterface=this;
		if((window as any).g_auto_buy&&(window as any).g_auto_buy!==cur_this) {
			(window as any).g_auto_buy.destroy();
		}
		(window as any).g_auto_buy=this;
	}
	destroy() {
		this.root_node.destroy();
		for(let i=0;i<this.cint_arr.length;i+=2) {
			let cint_item=this.cint_arr[i];
			switch(cint_item[0]) {
				case 1: {
					clearTimeout(cint_item[1]);
				} break;
				case 2: {
					clearInterval(cint_item[1]);
				} break;
				default: {
					console.assert(false,'cant destroy cint item (%o)',cint_item);
				} break;
			}
		}
	}
	update_dom() {
		if(!this.hours_played_element)
			return;
		if(!this.percent_ratio_element)
			return;
		if(!this.percent_ratio_change_element)
			return;
		if(!this.history_element)
			return;
		if(!this.state_history_arr_max_len)
			return;
		// spell:words timeplayed
		this.hours_played_element.innerText=((window.timeplayed/30)/60).toFixed(7)+" hours";
		let last_ratio=this.state.ratio*100;
		this.state.update();
		let cur_ratio=this.state.ratio*100;
		this.percent_ratio_element.innerText=cur_ratio.toFixed(2)+"%";
		let ratio_diff=cur_ratio-last_ratio;
		let extra_diff_char="+";
		if(ratio_diff<0)
			extra_diff_char='';
		this.percent_ratio_change_element.innerText=extra_diff_char+ratio_diff.toExponential(3);
		this.history_element.innerText=array_sample_end(this.state_history_arr,this.state_history_arr_max_len).join(" ");
		this.next_timeout(this.update_dom,125,'update_dom',true);
	}
	init() {
		this.next_timeout(this.init_impl,210-10,'init',true);
	}
	dom_reset() {
		this.update_dom();
	}
	replace_timeplayed_timer() {
		//spell:words secondinterval
		if(window.secondinterval!==void 0) {
			clearInterval(window.secondinterval);
		}
		let rate=66/(2110-110);
		console.error("todo",rate);
		let time_base=performance.now();
		window.secondinterval=setInterval(function() {
			let real_time=performance.now();
			let time_diff=real_time-time_base;
			time_base=real_time;
			let real_rate=time_diff/(2300-300);
			window.timeplayed+=real_rate;
		},66);
		this.root_node.create_timer(function() {
			window.doc.title=window.rounding(window.totalAtome,false,1).toString()+" atoms";
			let atomsaccu=window.doc.getElementById('atomsaccu');
			let timeplayed_e=window.doc.getElementById('timeplayed');
			let presnbr_e=window.doc.getElementById('timeplayed');
			if(!atomsaccu) return;
			if(!timeplayed_e) return;
			if(!presnbr_e) return;
			//spell:words atomsaccu presnbr
			atomsaccu.innerHTML=window.rounding(window.atomsaccu,false,0);
			timeplayed_e.innerHTML=(Math.round(window.timeplayed/30)/60).toFixed(2)+" hours";
			presnbr_e.innerHTML="<br>"+(window.calcPres()*100).toFixed(0)+" % APS boost";
		},(230-300));
	}
	init_impl() {
		this.global_init();
		this.init_dom();
		this.state.init();
		this.update_dom();
		this.main();
		this.original_map.set('lightreset',window.lightreset);
		window.lightreset=lightreset_inject;
		window.specialclick=specialclick_inject;
		if(window.secondinterval) {
			this.replace_timeplayed_timer();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr=["R"];
		localStorage["auto_buy_history_str"]="R";
	}
	state_history_append(value: any,silent=false) {
		Promise.resolve().then(this.async_compress.bind(this));
		this.epoch_len++;
		if(silent)
			return;
		let last=this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		if(this.state.debug)
			console.log('history append',last,value);
		while(this.state_history_arr.length>120)
			this.state_history_arr.shift();
	}
	history_element_click_handler(event: any) {
		console.error("todo",event);
		this.root_node.destroy();
		this.dom_reset();
		this.reset();
	}
	reset() {
		let timeout=3000;
		if(this.extra<timeout)
			timeout=this.extra;
		this.next_timeout(this.main,timeout,'@');
	}
	calc_timeout_extra() {
		while(this.timeout_arr.length>60)
			this.timeout_arr.shift();
		let max=0;
		let total=0;
		for(var i=0;i<this.timeout_arr.length;i++) {
			total+=this.timeout_arr[i];
			max=Math.max(this.timeout_arr[i],max);
		}
		const val=total/this.timeout_arr.length;
		let num=max/val;
		this.last_value??=num;
		let diff=this.last_value-num;
		if(diff>.1||diff<-.1) {
			this.last_value=num;
			console.log('timeout_arr num',num,'differing from last by',diff);
		}
		return this.round(val);
	}
	is_epoch_over() {
		let epoch_diff=Date.now()-this.epoch_start_time;
		return epoch_diff>60*5*1000;
	}
	main() {
		function r(v: number) {
			return ~~v;
		}
		let loss_rate=this.unit_promote_start();
		if(loss_rate>0||loss_rate<0) {
			console.log('loss',r(loss_rate*100*10)/10);
		}
		if(this.maybe_run_reset())
			return;
		if(this.pre_total!=window.totalAtome)
			return this.step_iter_start();
		this.iter_count=0;
		if(Math.random()<0.005)
			return this.rare_begin();
		this.faster_timeout();
	}
	async maybe_async_reset() {
		let loss_rate=this.unit_promote_start();
		if(this.maybe_run_reset())
			return [true,loss_rate];
		return [false,loss_rate];
	}
	async main_async() {
		for(this.iter_count=0;;) {
			if(this.iter_count<6)
				await this.normal_decrease_async();
			else
				await this.large_decrease_async();
			let [quit,loss_rate]=await this.maybe_async_reset();
			if(quit)
				return;
			if(loss_rate>0.08)
				continue;
			if(this.pre_total==window.totalAtome)
				break;
		}
		if(Math.random()<0.005)
			this.rare_begin();
		else
			this.faster_timeout_use_async();
	}
	large_decrease_async(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	normal_decrease_async(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	step_iter_start() {
		if(this.iter_count>6)
			return this.large_decrease();
		else
			return this.normal_decrease();
	}
	async fast_unit() {
		let running=true;
		while(running) {
			this.unit_promote_start();
			if(this.pre_total==window.totalAtome)
				break;
			let promise=this.async_timeout_step();
			await promise;
		}
		this.async_timeout_step_finish();
	}
	async_timeout_step(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	unit_promote_start() {
		this.extra=this.calc_timeout_extra();
		this.pre_total=window.totalAtome;
		this.do_unit_promote();
		let money_diff=this.pre_total-window.totalAtome;
		let loss_rate=money_diff/this.pre_total;
		if(this.pre_total!=window.totalAtome&&this.debug) {
			let log_args=[];
			let percent_change=(loss_rate*100).toFixed(5);
			let money_str=window.totalAtome.toExponential(3);
			log_args.push(this.iter_count);
			log_args.push(percent_change);
			log_args.push(money_str);
			console.log(...log_args);
		}
		this.iter_count+=1;
		return loss_rate;
	}
	async async_next_timeout_step() {
		this.do_timeout_dec([1.006],10);
		return this.next_timeout_async(this.extra,':');
	}
	async_timeout_step_finish() {
		this.do_timeout_dec([1.006],10);
		this.next_timeout(this.main,this.extra,'$');
	}
	large_decrease() {
		this.do_timeout_dec([1.008],10);
		this.next_timeout(this.main,this.extra,'!');
	}
	normal_decrease() {
		this.do_timeout_dec([1.006],10);
		this.next_timeout(this.main,this.extra,'-');
	}
	rare_begin() {
		this.do_timeout_inc([1.008,1.03],10);
		this.next_timeout(this.initial_special,this.extra,'<');
	}
	faster_timeout_use_async() {
		this.do_timeout_inc([1.007,1.01],50);
		this.next_timeout(this.main_async,this.extra,'A');
	}
	faster_timeout() {
		this.do_timeout_inc([1.007,1.01],50);
		this.next_timeout(this.main,this.extra,'+');
	}
	get_timeout_change(pow_base: number,pow_num: number,div: number) {
		let pow_res=Math.pow(pow_base,pow_num);
		let res=this.extra*pow_res;
		return res/div;
	}
	update_timeout_inc(change: number) {
		if(window.__testing__) {
			return;
		}
		let value=this.round(this.extra+change);
		this.timeout_arr.push(value);
	}
	update_timeout_dec(change: number) {
		if(window.__testing__) {
			return;
		}
		let value=this.round(this.extra-change);
		if(value<25)
			value=25;
		this.timeout_arr.push(value);
	}
	round(value: number) {
		return ~~value;
	}
	do_timeout_dec(pow_terms: any[],div: number) {
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_dec(change);
	}
	do_timeout_inc(pow_terms: any[],div: number) {
		let iter_term=Math.pow(pow_terms[1],this.iter_count);
		let change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_inc(change*iter_term);
	}
	async next_timeout_async(timeout: number,char: string,silent=false) {
		if(!silent&&this.timeout_element)
			this.timeout_element.innerText=timeout.toString();
		this.state_history_append(char,silent);
		let node=new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		let att=new AsyncTimeoutTarget(char);
		let promise=node.start_async(att);
		await promise;
	}
	next_timeout(trg_fn: () => void,timeout: number,char: string,silent=false) {
		let node=new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTargetWithDesc(this,trg_fn,char));
		if(!silent&&this.timeout_element)
			this.timeout_element.innerText=timeout.toString();
		this.state_history_append(char,silent);
	}
	do_unit_promote() {
		do_auto_unit_promote();
	}
	slow_final() {
		this.next_timeout(this.main,this.extra,'$');
	}
	bonus() {
		window.bonusAll();
		this.fast_unit();
	}
	special_timeout() {
		this.next_timeout(this.special,this.extra,'^');
	}
	is_special_done(special_buyable: {
		done: any;
		cost: number;
	}) {
		return !special_buyable.done&&special_buyable.cost<window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret=false;
		for(let index=this.next_special();;index=this.next_special()) {
			if(index>-1) {
				window.specialclick(index);
				ret=true;
			} else
				break;
		}
		return ret;
	}
	special() {
		if(this.do_special())
			this.next_timeout(this.special,this.extra,'^');
		else
			this.next_timeout(this.bonus,this.extra,'#');
	}
	initial_special() {
		this.next_timeout(this.special,this.extra,'>');
	}
	maybe_run_reset() {
		let count=0;
		count+=(this.extra>15*1000) as unknown as number;
		count+=this.state.ratio>1 as unknown as number;
		count+=this.is_epoch_over() as unknown as number;
		switch(count) {
			case 0:
			case 1: break;
			default: console.log('mrc',count);
		}
		if(this.state.ratio>1&&this.is_epoch_over()||this.extra>15*1000) {
			this.next_timeout(this.reset_timeout_trigger,5*1000,'reset_timeout_begin');
			return true;
		}
		return false;
	}
	reset_timeout_init() {
		if(this.background_audio) {
			this.background_audio.muted=!this.background_audio.muted;
		}
		this.next_timeout(this.reset_timeout_trigger,60*2*1000,'reset_timeout');
	}
	reset_timeout_trigger() {
		if(this.background_audio) {
			this.background_audio.muted=!this.background_audio.muted;
		}
		this.next_timeout(this.reset_timeout_start,60*2*1000,'reset_timeout');
	}
	reset_timeout_start() {
		this.next_timeout(this.reset_timeout_run,60*1000,'reset_timeout');
	}
	reset_timeout_run() {
		window.lightreset();
	}
}
