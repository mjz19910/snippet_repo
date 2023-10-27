import {array_sample_end} from "../z_general/array_sample_end.ts";
import {Box} from "../box/Box.ts";
import {CSSStyleSheetBox} from "../box/CSSStyleSheetBox.ts";
import {CSSStyleSheetConstructorBox} from "../box/CSSStyleSheetConstructorBox.ts";
import {DomElementBox} from "../box/DomElementBox.ts";
import {NullBox} from "../box/NullBox.ts";
import {StringBox} from "../box/StringBox.ts";
import {VoidBox} from "../box/VoidBox.ts";
import {MulCompression} from "../compression/MulCompression.ts";
import {LOG_LEVEL_VERBOSE} from "../log_level_enum.ts";
import {DataLoader} from "../data_loader/DataLoader.ts";
import {EventHandlerDispatch} from "./EventHandlerDispatch.ts";
import {log_if} from "../log_if.ts";
import {is_in_ignored_from_src_fn} from "../script_registry/is_in_ignored_from_src_fn.ts";
import {SpecType} from "../SpecType.ts";
import {AsyncNodeRoot} from "../timer_node/AsyncNodeRoot.ts";
import {AsyncTimeoutFireNode} from "../timer_node/AsyncTimeoutFireNode.ts";
import {AsyncTimeoutNode} from "../timer_node/AsyncTimeoutNode.ts";
import {TimeoutTargetFireDataNode} from "../timer_node/TimeoutTargetFireDataNode.ts";
import {AUDIO_ELEMENT_VOLUME} from "../vars.ts";
import {BaseStackVM} from "../vm/BaseStackVM.ts";
import {EventHandlerVMDispatch} from "../vm/EventHandlerVMDispatch.ts";
import {InstructionType} from "../instruction/InstructionType.ts";
import {SimpleStackVMParser} from "../vm/SimpleStackVMParser.ts";
import {TreeItem} from "./TreeItem.ts";
import {AutoBuyInterface} from "./AutoBuyInterface.ts";
import {AutoBuyState} from "./AutoBuyState.ts";
import {do_auto_unit_promote} from "./do_auto_unit_promote.ts";
import {InstructionAstState} from "./InstructionAstState.ts";
import {lightreset_inject} from "./lightreset_inject.ts";
import {specialclick_inject} from "./specialclick_inject.ts";
import {AsyncFunctionBox} from "../box/AsyncFunctionBox.ts";
import {DomInstructionType} from "../instruction/DomInstructionType.ts";
import {FunctionBox} from "../box/FunctionBox.ts";

// Imports
declare global {
	interface Window {
		timeplayed: number;
		secondinterval?: number|undefined;
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

// Exports
declare global {
	interface Window {
		g_auto_buy: AutoBuy;
	}
}

export class AutoBuy implements AutoBuyInterface {
	debug_flags: Map<string,boolean>=new Map;
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
	m_dry_run: boolean=false;
	timeout_ms: number;
	constructor() {
		this.root_node=new AsyncNodeRoot;
		this.extra=0;
		this.iter_count=0;
		this.epoch_len=0;
		this.timeout_ms=30;
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
		this.timeout_arr=this.local_data_loader.load_int_arr('auto_buy_timeout_str',() => {
			const src=[300];
			src.length=16;
			const data_len=1;
			while(src.at(-1)!=src[0]) {
				src.copyWithin(data_len,0);
				data_len*=2;
			}
			return src;
		});
		const enable_debug_flags=false;
		if(enable_debug_flags) {
			this.debug_flags.set("build_dom_from_desc",true);
			this.debug_flags.set("parse_dom_desc",true);
			this.debug_flags.set("apply_dom_desc",true);
		}
	}
	do_zero_pad(value: string|number,pad_char: string,char_num: number) {
		const string;
		if(typeof value==='number') {
			string=value.toString();
		} else {
			string=value;
		}
		while(string.length<char_num) {
			string=pad_char+string;
		}
		return string;
	}
	get_millis_as_pretty_str(timeout_milli: number,milli_acc: number) {
		const number_stringify_debug=false;
		const time_arr=[];
		const float_milliseconds=timeout_milli%1000;
		const milli_len=4+milli_acc;
		if(milli_acc===0) {
			milli_len=3+milli_acc;
		}
		if(number_stringify_debug) {
			// deno-lint-ignore no-debugger
			debugger;
		}
		time_arr[3]=this.do_zero_pad(float_milliseconds.toFixed(milli_acc),'0',milli_len);
		timeout_milli-=float_milliseconds;
		timeout_milli/=1000;
		const int_seconds=timeout_milli%60;
		time_arr[2]=this.do_zero_pad(int_seconds,'0',2);
		timeout_milli-=int_seconds;
		timeout_milli/=60;
		const int_minutes=timeout_milli%60;
		time_arr[1]=this.do_zero_pad(int_minutes,'0',2);
		timeout_milli-=int_minutes;
		timeout_milli/=60;
		const int_hours=timeout_milli;
		time_arr[0]=this.do_zero_pad(int_hours,'0',2);
		int_hours===0&&(time_arr.shift(),int_minutes===0&&(time_arr.shift(),int_seconds===0&&time_arr.shift()));
		switch(time_arr.length) {
			case 1:
				return time_arr[0]+'ms';
			case 2:
				return time_arr[0]+'.'+time_arr[1];
			case 3:
				return time_arr.slice(0,2).join(":")+'.'+time_arr[2];
			case 4:
				return time_arr.slice(0,3).join(":")+'.'+time_arr[3];
		}
		return time_arr.join(":");
	}
	update_timeout_element() {
		if(this.timeout_ms) {
			const element=this.dom_map.get('timeout_element');
			if(element instanceof HTMLElement) {
				const acc=2;// 0;
				element.innerText=this.get_millis_as_pretty_str(this.timeout_ms,acc);
			}
		}
	}
	do_fast_unit_step_change() {
		this.do_timeout_dec([1.006],40);
	}
	async_compress() {
		this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
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
		const instructions=SimpleStackVMParser.parse_instruction_stream(`
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
			`,[
			FunctionBox.wrap(function() {console.log('play success');}),
			FunctionBox.wrap_1(function(err: Box) {console.log(err);})
		]);
		const handler=new EventHandlerVMDispatch(instructions,this);
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
		const forced_action,action_count;
		const action_data=localStorage["auto_buy_forced_action"];
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
		const call_arg_arr: []=[];
		const raw_dom_arr: DomInstructionType[]=[
			[0,'dom_get','body'],
			[1,'dom_create_element_with_props','div','state_log',{id: 'state_log'}],
			[1,'append'],
			[2,'dom_create_element','div','history',"?3"],
			[2,'append'],
			[2,'dom_create_element','div','delay',"0"],
			[2,'append'],
			[2,'dom_create_element','div','hours_played',"0.000 hours"],
			[2,'append'],
			[2,'dom_create_element','div','ratio',0..toFixed(2)+"%"],
			[2,'append'],
			[2,'dom_create_element','div','ratio_change',0..toExponential(3)],
			[2,'append'],
			[1,'drop'],
			[0,'drop'],
			// process promise
			[0,'push',new NullBox(null)],
			[0,"push",new AsyncFunctionBox(async (style_element_promise: Box) => {
				if(style_element_promise.type==='promise_box'&&style_element_promise.await_type==='CSSStyleSheet') {
					this.adopt_styles(await style_element_promise.value);
				}
				return new VoidBox();
			})],
			[0,'dom_new',CSSStyleSheet,[],
				new AsyncFunctionBox(async (...args: Box[]) => {
					if(args.length!==2) {
						throw new Error("Failed");
					}
					const [obj,str]=args;
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
		const dom_styles=document.adoptedStyleSheets;
		document.adoptedStyleSheets=[...dom_styles,...styles];
	}
	decode_query_arg(query: string) {
		switch(query) {
			case 'body': return document.body;
			default: return document.querySelector(query);
		}
	}
	build_dom_from_desc(raw_arr: DomInstructionType[],trg_map: Map<string,Element>=new Map,dry_run=false) {
		const stack: DomInstructionType[]=[];
		this.m_dry_run=dry_run;
		for(const i=0;i<raw_arr.length;i++) {
			const cur_item=raw_arr[i];
			const [depth]=cur_item;
			switch(cur_item[1]) {
				case 'dom_get': {
					const [,,query_arg]=cur_item;
					const cur_element=this.decode_query_arg(query_arg);
					if(!cur_element) throw new Error("Unable to find query element");
					stack.push([depth,"push",new DomElementBox(cur_element)]);
				} break;
				case 'dom_new': {
					const [,,class_,construct_arg_arr,callback,arg_arr]=cur_item;
					stack.push([depth,"push",new NullBox(null)]);
					stack.push([depth,"push",callback]);
					stack.push([depth,"push",new CSSStyleSheetConstructorBox(class_)]);
					stack.push([depth,"construct",1+construct_arg_arr.length]);
					for(const i=0;i<arg_arr.length;i++) {
						stack.push([depth,"push",new StringBox(arg_arr[i])]);
					}
					stack.push([depth,"call",3+arg_arr.length]);
				} break;
				case 'dom_create_element': {
					const [,,element_type,name,content]=cur_item;
					const cur_element=document.createElement(element_type);
					cur_element.innerText=content;
					trg_map.set(name,cur_element);
					stack.push([depth,"push",new DomElementBox(cur_element)]);
				} break;
				case 'dom_create_element_with_props': {
					const [,,element_type,name,content]=cur_item;
					const cur_element=document.createElement(element_type);
					cur_element.id=content.id;
					trg_map.set(name,cur_element);
					stack.push([depth,"push",new DomElementBox(cur_element)]);
				} break;
				case 'append': {
					// peek at the return stack, up 1 depth
					stack.push([depth,"dom_peek",depth-1,0]);
					stack.push(cur_item);
				} break;
				case 'drop':
				case 'call': // push the item
				case 'push':
					stack.push(cur_item);
					break;
				default: {
					console.log('might need to handle',cur_item[1]);
					debugger;
				} break;
			}
			if(this.debug_flags.get("build_dom_from_desc"))
				console.log('es',stack.at(-1));
		}
		const instruction_tree=this.stack_to_instruction_tree(stack);
		const functions_map: Map<number,InstructionType[]>=new Map;
		const cur_function_id=0;
		this.cur_function_id=cur_function_id;
		const state=new InstructionAstState(instruction_tree,functions_map);
		const dom_vm_instructions=this.instruction_tree_to_instructions(state);
		functions_map.set(cur_function_id,dom_vm_instructions);
		const builder_vm=new BaseStackVM(functions_map);
		builder_vm.run();
	}
	stack_to_instruction_tree(input_stack: DomInstructionType[]): TreeItem[] {
		const tree: TreeItem[]=[];
		const stack: TreeItem[][]=[];
		for(const iter_depth=0,i=0;i<input_stack.length;i++) {
			const cur_stack=input_stack[i];
			if(cur_stack[1]==='marker') continue;
			// TODO:
			if(cur_stack[1]==='dom_filter') continue;
			if(cur_stack[1]==='vm_call_at') continue;
			const [cur_depth,...item]=cur_stack;
			if(this.debug_flags.get("parse_dom_desc"))
				console.log(item);
			while(cur_depth>iter_depth) {
				stack.push(tree);
				tree=[];
				iter_depth++;
			}
			while(cur_depth<iter_depth) {
				const prev=tree;
				const stack_item=stack.pop();
				if(!stack_item) throw new Error("Stack underflow");
				tree=stack_item;
				tree.push([iter_depth,'group',prev]);
				iter_depth--;
			}
			tree.push([cur_depth,'op',item]);
		}
		while(stack.length>0) {
			const stack_item=stack.pop();
			if(!stack_item) throw new Error("Stack underflow");
			tree=stack_item;
		}
		return tree;
	}
	log_if(tag: string,...log_args: (string|number|any[])[]) {
		if(this.debug_flags.get(tag)) {
			console.log(...log_args);
		}
	}
	get_logging_level(tag: string,level=LOG_LEVEL_VERBOSE) {
		if(this.debug_flags.get(tag)) {
			return level-1;
		}
		return level;
	}
	cur_function_id=-1;
	instruction_tree_to_instructions(state: InstructionAstState): InstructionType[] {
		const cur_function_id=this.cur_function_id;
		this.cur_function_id++;
		for(const i=0;i<state.tree.length;i++) {
			const cur=state.tree[i];
			switch(cur[1]) {
				case 'group': {
					this.log_if('apply_dom_desc','rdc stk');
					state.stack.push(['children',state.items.length-1,[cur[0],cur[2]]]);
				} break;
				case 'op': {
					state.items.push(cur[2]);
					state.depths.push(cur[0]);
				} break;
				default: {
					console.assert(false,'handle depth change in apply_dom_desc');
					this.log_if('apply_dom_desc',cur[0]-state.cur_depth);
				}
			}
		}
		if(state.stack.length===0)
			return state.items;
		while(state.stack.length>0) {
			const stack_item=state.stack.pop();
			if(!stack_item) break;
			const [tag,items_index,[data_depth,rec_tree]]=stack_item;
			const log_level=this.get_logging_level('apply_dom_desc');
			log_if(log_level,tag,items_index,data_depth,rec_tree);
			const rec_state=new InstructionAstState(rec_tree,state.functions_map,[],state.cur_depth+1);;
			const deep_res=this.instruction_tree_to_instructions(rec_state);
			state.functions_map.set(cur_function_id,deep_res);
			state.items.push(['dom_exec',cur_function_id]);
			this.log_if('apply_dom_desc',deep_res);
			this.log_if('apply_dom_desc',state.items,state.depths,state.stack);
		}
		return state.items;
	}
	init_dom() {
		const font_size_px=22;
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
		this.percent_ratio_element?.addEventListener('click',() => {
			this.state.reset();
		});
		// init percent_ratio_change_element
		// init state_log_element
		if(this.state_log_element)
			this.state_log_element.style.fontSize=font_size_px+"px";
		// event listeners
		// window unload
		window.addEventListener('unload',() => {
			this.save_state_history_arr();
			this.save_timeout_arr();
		});
	}
	global_init() {
		const cur_this: AutoBuyInterface=this;
		if(window.g_auto_buy&&window.g_auto_buy!==cur_this) {
			window.g_auto_buy.destroy();
		}
		window.g_auto_buy=this;
	}
	destroy() {
		this.root_node.destroy();
		for(const i=0;i<this.cint_arr.length;i+=2) {
			const cint_item=this.cint_arr[i];
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
		const last_ratio=this.state.ratio*100;
		this.state.update();
		const cur_ratio=this.state.ratio*100;
		this.percent_ratio_element.innerText=cur_ratio.toFixed(2)+"%";
		const ratio_diff=cur_ratio-last_ratio;
		const extra_diff_char="+";
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
		const rate=66/(2110-110);
		console.error("todo",rate);
		const time_base=performance.now();
		window.secondinterval=setInterval(function() {
			const real_time=performance.now();
			const time_diff=real_time-time_base;
			time_base=real_time;
			const real_rate=time_diff/(2300-300);
			window.timeplayed+=real_rate;
		},66);
		this.root_node.create_timer(function() {
			window.doc.title=window.rounding(window.totalAtome,false,1).toString()+" atoms";
			const atomsaccu=window.doc.getElementById('atomsaccu');
			const timeplayed_e=window.doc.getElementById('timeplayed');
			const presnbr_e=window.doc.getElementById('timeplayed');
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
		const last=this.state_history_arr.at(-1);
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
		const timeout=3000;
		if(this.extra<timeout)
			timeout=this.extra;
		this.next_timeout(this.main,timeout,'@');
	}
	calc_timeout_extra() {
		while(this.timeout_arr.length>60)
			this.timeout_arr.shift();
		const max=0;
		const total=0;
		for(const i=0;i<this.timeout_arr.length;i++) {
			total+=this.timeout_arr[i];
			max=Math.max(this.timeout_arr[i],max);
		}
		const val=total/this.timeout_arr.length;
		const num=max/val;
		this.last_value??=num;
		const diff=this.last_value-num;
		if(diff>.1||diff<-.1) {
			this.last_value=num;
			console.log('timeout_arr num',num,'differing from last by',diff);
		}
		return this.round(val);
	}
	is_epoch_over() {
		const epoch_diff=Date.now()-this.epoch_start_time;
		return epoch_diff>60*5*1000;
	}
	main() {
		function r(v: number) {
			return ~~v;
		}
		const loss_rate=this.unit_promote_start();
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
	async maybe_async_reset(): Promise<[boolean,number]> {
		const loss_rate=this.unit_promote_start();
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
			const [quit,loss_rate]=await this.maybe_async_reset();
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
		const running=true;
		while(running) {
			this.unit_promote_start();
			if(this.pre_total==window.totalAtome)
				break;
			const promise=this.async_timeout_step();
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
		const money_diff=this.pre_total-window.totalAtome;
		const loss_rate=money_diff/this.pre_total;
		if(this.pre_total!=window.totalAtome&&this.debug) {
			const log_args=[];
			const percent_change=(loss_rate*100).toFixed(5);
			const money_str=window.totalAtome.toExponential(3);
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
		const pow_res=Math.pow(pow_base,pow_num);
		const res=this.extra*pow_res;
		return res/div;
	}
	update_timeout_inc(change: number) {
		if(window.__testing__) {
			return;
		}
		const value=this.round(this.extra+change);
		this.timeout_arr.push(value);
	}
	update_timeout_dec(change: number) {
		if(window.__testing__) {
			return;
		}
		const value=this.round(this.extra-change);
		if(value<25)
			value=25;
		this.timeout_arr.push(value);
	}
	round(value: number) {
		return ~~value;
	}
	do_timeout_dec(pow_terms: any[],div: number) {
		const change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_dec(change);
	}
	do_timeout_inc(pow_terms: any[],div: number) {
		const iter_term=Math.pow(pow_terms[1],this.iter_count);
		const change=this.get_timeout_change(pow_terms[0],Math.log(window.totalAtome),div);
		this.update_timeout_inc(change*iter_term);
	}
	async next_timeout_async(timeout: number,char: string,silent=false) {
		if(!silent&&this.timeout_element)
			this.timeout_element.innerText=timeout.toString();
		this.state_history_append(char,silent);
		const node=new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		const att=new AsyncTimeoutFireNode(char);
		const promise=node.start_async(att);
		await promise;
	}
	next_timeout(trg_fn: () => void,timeout: number,char: string,silent=false) {
		const node=new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTargetFireDataNode(this,trg_fn,char));
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
		const ret=false;
		for(const index=this.next_special();;index=this.next_special()) {
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
		const count=0;
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
