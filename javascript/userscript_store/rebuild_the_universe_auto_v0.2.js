// ==UserScript==
// @name			rebuild the universe auto
// @namespace		http://tampermonkey.net/
// @version			0.2
// @description		try to take over the world!
// @author			You
// @match			http://rebuildtheuniverse.com/mjz_version/*
// @match			http://rebuildtheuniverse.com/mjz_version/
// @match			https://rebuildtheuniverse.com/mjz_version/*
// @match			https://rebuildtheuniverse.com/mjz_version/
// @match			https://test.rebuildtheuniverse.com
// @run-at			document-start
// @grant			none
// ==/UserScript==
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	const AUDIO_ELEMENT_VOLUME=0.58;
	const AudioMuted=true;
	const AutoBuyMulModifierFactor=1;
	const AutoBuyRatioDiv=3;
	class DocumentWriteList {
		constructor(){
			this.list=[];
			this.attached=false;
			this.end_symbol=Symbol(null);
		}
		write(args_spread){
			console.assert(args_spread[0] === this.document_write);
			console.assert(args_spread[1] === this.attached_document);
			this.list.push(args_spread[2], null);
		}
		/**@arg {Document} document */
		attach_proxy(document){
			if(this.attached){
				let was_destroyed=this.destroy(true);
				if(!was_destroyed){
					throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
				}
			}
			this.attached_document=document;
			this.document_write=document.write;
			this.document_write_proxy=new Proxy(document.write, {
				other:this,
				apply(...a){
					this.other.write(a);
				}
			});
			document.write=this.document_write_proxy;
		}
		destroy(should_try_to_destroy){
			if(this.attached_document&&this.document_write_proxy){
				console.assert(this.attached_document.write === this.document_write_proxy);
				if(this.attached_document.write !== this.document_write_proxy){
					if(should_try_to_destroy){
						return false;
					}
					throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
				}
				this.attached_document.write=this.document_write;
			}
			if(this.document_write_proxy){
				this.document_write_proxy=null;
			}
			if(this.document_write){
				this.document_write=null;
			}
			if(this.attached_document){
				this.attached_document=null;
			}
			if(should_try_to_destroy){
				return true;
			}
		}
	}
	class UniqueIdGenerator {
		constructor(){
			this.m_current=-1;
		}
		set_current(current_value){
			this.m_current=current_value;
		}
		current(){
			return this.m_current;
		}
		next(){
			return this.m_current++;
		}
	}
	class EventHandlerDispatch {
		constructor(target_obj, target_name){
			this.target_obj=target_obj;
			this.target_name=target_name;
		}
		handleEvent(event){
			this.target_obj[this.target_name](event);
		}
	}
	class AbstractVM {
		push(){
			console.log('you might want to implement this.push for this constructor', Object.getPrototypeOf(this).constructor);
			throw new Error("Abstract function");
		}
		pop(){
			console.log('you might want to implement this.pop for this constructor', Object.getPrototypeOf(this).constructor);
			throw new Error("Abstract function");
		}
		execute_instruction_raw(cur_opcode, operands){
			// ignore it, this is the base, if you want to ignore instruction opcodes go ahead
			if(this.execute_instruction_raw !== AbstractVM.prototype.execute_instruction_raw)return;
			throw new Error("Abstract function");
		}
		execute_instruction_raw_t(cur_opcode, operands){
			switch(cur_opcode) {
					// implement more opcode handling here
				default/*Debug*/:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
	}
	/**@typedef {import("./types/SimpleVMTypes.js").InstructionType} InstructionType */
	class BaseVMCreate extends AbstractVM {
		constructor(instructions){
			super();
			this.instructions = instructions;
			this.instruction_pointer = 0;
			this.running = false;
		}
		reset(){
			this.instruction_pointer = 0;
			this.running = false;
		}
		is_in_instructions(value){
			return value >= 0 && value < this.instructions.length;
		}
		execute_instruction_raw(cur_opcode, operands) {
			switch(cur_opcode) {
				default:{
					console.info('Unknown opcode', cur_opcode);
					throw new Error('Halt: bad opcode ('+cur_opcode+')');
				}
				case 'je':{
					let [target] = operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Jump target is out of instructions range");
					}
					if(this.flags.equal){
						this.instruction_pointer=target;
					}
				} break;
				case 'jmp':{
					let [target] = operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Jump target is out of instructions range");
					}
					this.instruction_pointer=target;
				} break;
				case 'modify_operand':{
					let [target, offset]=operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify=this.instructions[ip_target].slice();
					let value=this.pop();
					instruction_modify[offset] = value;
					let verify_state=[instruction_modify.length];
					//[instruction.length]
					let valid_instruction=SimpleStackVMParser.verify_instruction(instruction_modify, verify_state);
					this.instructions[ip_target]=valid_instruction;
					console.log('new verify state', verify_state);
					console.assert(verify_state[0] === 0, "not all of the operands typechecked");
				} break;
				case 'push_pc':{
					if(AbstractVM.prototype.push === this.push){
						throw new Error("push_pc requires a stack");
					}
					this.push(this.instruction_pointer);
				} break;
				case 'halt'/*Running*/:this.running=false; break;
			}
		}
	}
	function trigger_debug_breakpoint(){
		debugger;
	}
	const LOG_LEVEL_CRIT=1;
	const LOG_LEVEL_ERROR=2;
	const LOG_LEVEL_WARN=3;
	const LOG_LEVEL_NOTICE=4;
	const LOG_LEVEL_INFO=5;
	const LOG_LEVEL_DEBUG=6;
	const local_logging_level=3;
	function l_log_if(level, ...args){
		if(level <= local_logging_level) {
			console.log(...args);
		}
	}
	/**@typedef {import("./types/SimpleVMTypes.js").VMBoxed} VMBoxed */
	class BaseStackVM extends BaseVMCreate {
		constructor(instructions){
			super(instructions);
			this.stack=[];
			this.return_value = void 0;
		}
		reset(){
			super.reset();
			this.stack.length = 0;
			this.return_value = void 0;
		}
		push(value) {
			this.stack.push(value);
		}
		pop() {
			return this.stack.pop();
		}
		peek_at(distance){
			return this.stack.at(-1 - distance);
		}
		pop_arg_count(operand_number_of_arguments){
			let arguments_arr=[];
			let arg_count=operand_number_of_arguments;
			for(let i = 0; i < arg_count; i++) {
				if(this.stack.length <= 0){
					throw new Error('stack underflow in pop_arg_count');
				}
				arguments_arr.unshift(this.pop());
			}
			return arguments_arr;
		}
		execute_instruction_raw(cur_opcode, operands){
			switch(cur_opcode) {
				case 'push'/*Stack*/: {
					for(let i = 0; i < operands.length; i++) {
						let item = operands[i];
						this.push(item);
					}
				} break;
				case 'drop'/*Stack*/:this.pop();break;
				case 'dup'/*Stack*/:this.push(this.peek_at(0));break;
				case 'get'/*Object*/: {
					let target_name = this.pop();
					let target_obj = this.pop();
					this.push(target_obj[target_name]);
				} break;
				case 'call'/*Call*/: {
					let number_of_arguments = operands[0];
					if(number_of_arguments <= 1){
						throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
					}
					let [target_this, target_fn, ...arg_arr] = this.pop_arg_count(number_of_arguments);
					let ret = target_fn.apply(target_this, arg_arr);
					this.push(ret);
				} break;
				case 'construct'/*Construct*/:{
					let number_of_arguments=operands[0];
					let [construct_target, ...construct_arr]=this.pop_arg_count(number_of_arguments);
					if(construct_target instanceof Function){
						let obj=new construct_target(...construct_arr);
						this.push(obj);
					} else {
						console.assert(false, 'try to construct non function');
						debugger;
					}
					l_log_if(LOG_LEVEL_INFO, operands, ...this.stack.slice(this.stack.length-operands[0]));
				} break;
				case 'return'/*Call*/:this.return_value=this.pop();break;
				case 'breakpoint'/*Debug*/:trigger_debug_breakpoint();break;
				default:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		run() {
			this.running = true;
			while(this.instruction_pointer < this.instructions.length && this.running) {
				let [cur_opcode, ...operands] = this.instructions[this.instruction_pointer];
				this.execute_instruction_raw(cur_opcode, operands);
				this.instruction_pointer++;
			}
			console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
			return this.return_value;
		}
	}
	class SimpleStackVM extends BaseStackVM {
		constructor(instructions){
			super(instructions);
			this.args_vec=null;
		}
		reset() {
			super.reset();
			this.args_vec=null;
		}
		execute_instruction_raw(cur_opcode, operands) {
			switch(cur_opcode) {
				case 'this'/*Special*/:this.push(this);break;
					// TODO: if you ever use this on a worker, change
					// it to use globalThis...
				case 'global'/*Special*/:this.push(window);break;
				case 'call'/*Call*/: {
					// TODO: Fix the other code to use the call handling from
					// the base class
					// Currently we support applying functions
					// this is closer to what you expect, not to just get
					// the name of a member to call
					let number_of_arguments = operands[0];
					let [target_obj, target_name, ...arg_arr] = this.pop_arg_count(number_of_arguments);
					let ret = target_obj[target_name](...arg_arr);
					this.push(ret);
				} break;
				default:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		run(...run_arguments) {
			this.args_vec=run_arguments;
			super.run();
		}
	}
	class SimpleStackVMParser {
		/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
		static parse_int_arg(cur, arg_loc) {
			let cur_item = cur[arg_loc];
			if(typeof cur_item == 'string') {
				let arg = cur_item;
				if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
					let str_int = arg.slice(4, -1);
					cur[arg_loc] = parseInt(str_int, 10);
				}
			}
		}
		static parse_string_with_format_ident(str, format_list) {
			let format_index = str.indexOf('%');
			let format_type = str[format_index + 1];
			switch(format_type) {
				case 'o':
					return format_list.shift();
				default:
					console.log("%s", 'unsupported format spec %' + format_type);
			}
		}
		static parse_current_instruction(cur, format_list) {
			let arg_loc = 1;
			let arg = cur[arg_loc];
			while(arg) {
				if(arg.slice(0, 3) === 'int') this.parse_int_arg(cur, arg_loc);
				if(arg.includes('%')) {
					let res = this.parse_string_with_format_ident(arg, format_list);
					cur[arg_loc] = res;
				}
				arg_loc++;
				arg = cur[arg_loc]
			}
		}
		static raw_parse_handle_regexp_match(m) {
			let iter=m[1].trim();
			if(iter.startsWith("//"))return;
			while(iter.startsWith("/*")){
				let j=iter.indexOf("*/");
				iter=iter.slice(j+2).trim();
			}
			if(!iter)return "";
			return iter.split(",");
		}
		static parse_string_into_raw_instruction_stream(string) {
			const parser_max_match_iter = 300;let parts, arr = [], i = 0;
			do {
				parts = this.match_regex.exec(string);
				if(!parts) break;
				let res = this.raw_parse_handle_regexp_match(parts);
				if(res) arr.push(res);
			} while(parts && i++ < parser_max_match_iter);
			if(parts)console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);return arr;
		}
		static parse_instruction_stream_from_string(string, format_list) {
			let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
			for(let i=0;i<raw_instructions.length;i++) {
				let raw_instruction=raw_instructions[i];
				this.parse_current_instruction(raw_instruction, format_list);
			}
			let instructions = this.verify_raw_instructions(raw_instructions);return instructions;
		}
		/**@arg {string[]} instruction @arg {[number]} left @ret {InstructionType}*/
		static verify_instruction(instruction, left){
			const [m_opcode, ...m_operands] = instruction;
			switch(m_opcode) {
					// variable argument count
				case 'push':
					left[0] = 0;
					return [m_opcode, ...m_operands];
				case 'call'/*1 argument*/:
					left[0] -= 2;
					if(typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0]))return [m_opcode, m_operands[0]];
					else {
						console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
						throw new Error("TypeError: Invalid argument");
					}
				case 'drop':
				case 'get':
				case 'return':
				case 'halt':
				case 'push_args':
				case 'this':
				case 'global':
				case 'breakpoint'/*opcode*/:
					left[0]--;
					return [m_opcode];
				default:
					console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
					throw new Error("Unexpected opcode");
			}
		}
		/*@arg {string[][]} raw_instructions @ret {InstructionType[]}*/
		static verify_raw_instructions(raw_instructions){
			/**@type{InstructionType[]}*/
			const instructions = [];
			for(let i = 0;i < raw_instructions.length;i++) {
				const instruction = raw_instructions[i];
				/*@type {[number]}*/const left = [instruction.length];
				const valid_instruction = this.verify_instruction(instruction, left);
				instructions.push(valid_instruction);
				if(left[0] > 0)throw new Error("Typechecking failure, data left when processing raw instruction stream");
			}
			return instructions;
		}
	}
	SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
	class EventHandlerVMDispatch extends SimpleStackVM {
		constructor(instructions, target_obj) {
			super(instructions);
			this.target_obj = target_obj;
		}
		handleEvent(event) {
			this.reset();
			this.run(event);
		}
	}
	class CompressionStatsCalculator {
		constructor(){
			this.hit_counts=[];
			this.cache=[];
		}
		map_values(){
			return this.hit_counts;
		}
		map_keys(){
			return this.cache;
		}
		add_hit(index) {
			if(!this.map_values()[index]) {
				this.map_values()[index]=1;
			} else this.map_values()[index]++;
		}
		add_item(key){
			let index=this.map_keys().indexOf(key)
			if(index == -1)index=this.map_keys().push(key);
			else this.add_hit(index);
		}
		reset(){
			this.map_keys().length=0;
			this.map_values().length=0;
		}
		calc_compression_stats(arr, win_size){
			this.reset();
			for(let i=0;i<arr.length;i++){
				if(i+win_size < arr.length){
					this.add_item(arr.slice(i, i+win_size).join(","));
				}
			}
			return to_tuple_arr(this.map_keys(), this.map_values()).filter(e=>e[1]!==void 0);
		}
		calc_for_stats_window_size(stats_arr, arr, win_size){
			stats_arr[win_size-1]=this.calc_compression_stats(arr, win_size);
		}
		calc_for_stats_index(stats_arr, arr, index){
			stats_arr[index]=this.calc_compression_stats(arr, index+1);
		}
	}
	class BaseCompression {
		did_compress(src, dst){
			return dst.length < src.length;
		}
		did_decompress(src, dst){
			return dst.length > src.length;
		}
		compress_result(src, dst){
			if(this.did_compress(src, dst))return [true, dst];
			return [false, src];
		}
		decompress_result(src, dst) {
			// maybe this is not a decompression, just a modification to make
			// later decompression work
			if(this.did_decompress(src, dst))return [true, dst];
			return [false, dst];
		}
	}
	class MulCompression extends BaseCompression {
		constructor(){
			super();
			this.stats_calculator=new CompressionStatsCalculator;
			this.compression_stats=[];
		}

		try_compress(arr){
			let ret=[];
			for (let i=0;i<arr.length;i++){
				let item=arr[i];
				if(i+1 < arr.length){
					if(item === arr[i+1]) {
						let off=1;
						while(item === arr[i+off]){
							off++;
						}
						if(off > 1){
							ret.push(`${item}${off}`);
							i+=off-1;
						}else{
							ret.push(item);
						}
					}else{
						ret.push(item);
					}
				}else{
					ret.push(item);
				}
			}
			return this.compress_result(arr, ret);
		}
		try_decompress(arr){
			let ret=[];
			for (let i=0;i<arr.length;i++) {
				let item=arr[i];
				if(!item)continue;
				if(i+1 < arr.length) {
					let [item_type, num_data]=[item[0], item.slice(1)];
					let parsed=parseInt(num_data);
					if(!Number.isNaN(parsed)){
						for(let j=0;j<parsed;j++)ret.push(item_type);
						continue;
					}
				}
				ret.push(arr[i]);
			}
			return this.decompress_result(arr, ret);
		}
		compress_array(arr){
			let success, res;
			// await async_semaphore.inc(1);
			[success, res]=this.try_decompress(arr);
			if(success)arr=res;
			for(let i=0;i<4;i++){
				this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
				let ls=this.compression_stats[i];
				if(ls.length>0){
					continue;
				}
				break;
			}
			// await async_semaphore.dec(1);
			[success, res]=this.try_compress(arr);
			if(success)return res;
			return arr;
		}
	}
	function calc_ratio(arr){
		let ratio_acc=0;
		for(let i=0;i<arr.length;i++)ratio_acc+=arr[i];
		// don't divide by zero
		if(ratio_acc === 0)return 0;
		return ratio_acc/arr.length;
	}
	console.assert(calc_ratio([0,0]) === 0, "calc ratio of array full of zeros does not divide by zero");
	class TimeoutTarget {
		constructor(obj, callback) {
			this.m_once=true;
			this.m_obj=obj;
			this.m_callback=callback;
		}
		fire(){
			this.m_callback.call(this.m_obj);
		}
	}
	class IntervalTarget {
		constructor(obj, callback) {
			this.m_once=false;
			this.m_obj=obj;
			this.m_callback=callback;
		}
		fire(){
			this.m_callback.call(this.m_obj);
		}
	}
	class PromiseTimeoutTarget {
		constructor(){
			this.m_promise_accept=null;
			this.m_promise_reject=null;
			this.m_promise=null;
			this.m_callback=null;
			this.m_active=false;
		}
		wait(){
			if(this.m_promise)return this.m_promise;
			this.m_promise=new Promise(this.promise_executor.bind(this));
			this.m_active=true;
			return this.m_promise;
		}
		promise_executor(accept, reject){
			this.m_promise_accept=accept;
			this.m_promise_reject=reject;
			this.m_callback=this.on_result.bind(this);
		}
		on_result(value){
			if(!this.m_promise_accept)throw new Error("Missing promise accept handler");
			this.m_promise_accept(value);
			this.reset();
		}
		on_error(error){
			if(!this.m_promise_reject)throw new Error("Missing promise accept handler");
			this.m_promise_reject(error);
			this.reset();
		}
		reset(){
			this.m_promise_accept=null;
			this.m_promise_reject=null;
			this.m_promise=null;
			this.m_callback=null;
			this.m_active=false;
		}
		fire(){
			if(this.m_callback)this.m_callback();
		}
		destroy(){
			if(this.m_active)this.on_error(new Error("Destroyed"));
		}
	}
	class AsyncTimeoutTarget extends PromiseTimeoutTarget {
		wait(){
			return super.wait();
		}
	}
	class BaseNode {
		constructor(){
			this.m_parent=null;
		}
		set_parent(parent){
			this.m_parent=parent;
		}
		run(){
			// do nothing
		}
		remove(){
			if(this.m_parent)this.m_parent.remove_child(this);
		}
		destroy(){
			this.remove();
		}
	}
	class TimeoutIdNode extends BaseNode {
		constructor(id){
			super();
			this.m_id=id;
		}
		destroy(){
			if(this.m_id !== null)clearTimeout(this.m_id);
			super.destroy();
		}
	}
	class IntervalIdNode extends BaseNode {
		constructor(id){
			super();
			this.m_id=id;
		}
		destroy(){
			if(this.m_id !== null)clearInterval(this.m_id);
			super.destroy();
		}
	}
	class TimeoutTargetFn {
		constructor(callback, timeout) {
			this.m_once=true;
			this.m_callback=callback;
			this.m_timeout=timeout;
		}
		fire(){
			this.m_callback();
		}
	}
	class IntervalTargetFn {
		constructor(obj, callback) {
			this.m_once=false;
			this.m_callback=callback;
		}
		fire(){
			this.m_callback();
		}
	}
	class TimeoutNode extends BaseNode {
		constructor(timeout=0){
			super();
			this.m_timeout=timeout;
			this.m_id=null;
			this.m_target=null;
		}
		timeout(){
			return this.m_timeout;
		}
		set_target(target){
			this.m_target=target;
		}
		set() {
			this.m_id=setTimeout(this.run.bind(this), this.m_timeout);
		}
		start(target){
			if(target){
				this.target=target;
			}else{
				this.target=new TimeoutTargetFn(target_fn, this.m_timeout);
			}
			this.set();
		}
		run(){
			if(this.target)this.target.fire();
			this.m_id=null;
			this.remove();
		}
		destroy(){
			if(this.m_id !== null)clearTimeout(this.m_id);
		}
	}
	class IntervalNode extends BaseNode {
		constructor(target_fn, timeout=0){
			super();
			this.m_target_fn=target_fn;
			this.m_timeout=timeout;
			this.id=null;
		}
		set(){
			this.id=setInterval(this.run.bind(this), this.m_timeout);
		}
		start(target){
			if(target){
				this.set_target(target);
			}else{
				this.set_target(new IntervalTargetFn(this.m_target_fn, this.m_timeout));
			}
			this.set();
		}
		destroy(){
			if(this.id !== null)clearInterval(this.id);
		}
	}
	class AsyncTimeoutNode extends TimeoutNode {
		async start_async(target){
			if(!target)throw new Error("unable to start_async without anything to wait for");
			this.target=target;
			this.set();
			let promise=this.target.wait();
			await promise;
		}
		destroy(){
			this.target.destroy();
			super.destroy();
		}
	}
	class IntervalIdNodeRef extends IntervalIdNode {
		constructor(interval_id, destroy_cb){
			super(interval_id);
			this.destroy_callback=destroy_cb;
		}
		destroy(){
			this.destroy_callback();
			super.destroy();
		}
	}
	class AsyncNodeRoot {
		constructor(){
			this.children=[];
		}
		// set(target_fn, timeout, repeat=false){
		// 	let node;
		// 	if(repeat) {
		// 		node=new TimeoutNode(target_fn, timeout);
		// 	} else {
		// 		node=new IntervalNode(target_fn, timeout);
		// 	}
		// 	this.append_child(node);
		// 	node.start();
		// }
		append_raw(timeout_id, once=true) {
			this.append_child(new TimeoutIdNode(timeout_id, once));
		}
		append_child(record){
			record.remove();
			record.set_parent(this);
			this.children.push(record);
		}
		remove_child(record){
			let index=this.children.indexOf(record);
			this.children.splice(index, 1);
			record.set_parent(null);
		}
		destroy(){
			let item=this.children.shift();
			if(!item)return;
			do{
				console.log('timer destroy', item);
				item.destroy();
				item=this.children.shift();
			} while(item);
		}
	}
	class AverageRatio {
		// @AverageRatio
		constructor(type, time_diff_max, size, history_size, time_start) {
			this.type=type;
			this.history=[];
			this.count=0;
			this.value=0;
			this.size=size;
			this.time_diff_max=time_diff_max;
			this.time_start=time_start;
			this.time_cur_start=0;
			this.time_cur=0;
			this.gen_count=0;
			this.history_size=history_size;
		}
		do_history_update(avg, time_now) {
			if(this.value === null)return;
			this.count++;
			this.time_cur=time_now-this.time_start-this.time_cur_start;
			if(this.time_cur > this.time_diff_max){
				this.time_cur_start+=this.time_diff_max;
				this.time_cur-=this.time_diff_max;
				this.count=0;
				this.gen_count++;
				this.history.unshift(this.value);
				if(this.history.length>this.history_size)this.history.pop();
				let next=avg.next(this);
				if(next)next.do_history_update(avg, time_now);
			}
		}
		add_to_ratio(value, avg_window=this.size) {
			if(this.value === null) {
				this.value=value;
				return;
			}
			this.value=(this.value*(avg_window-1)+value)/avg_window;
		}
		set_history_size(size) {
			this.history_size=size;
		}
		get_average() {
			if(this.value === null)return 0;
			return this.value;
		}
	}
	class AverageRatioRoot {
		constructor(){
			/**@type {Map<string, AverageRatio>} */
			this.map=new Map;
			/**@type {string[]} */
			this.keys=[];
			/**@type {AverageRatio[]} */
			this.values=[];
		}
		get_average(key){
			let ratio_calc=this.map.get(key);
			return ratio_calc.get_average();
		}
		/**@arg {key:string, value:AverageRatio} */
		set_ratio(key, value){
			this.keys.push(key);
			this.values.push(value);
			this.map.set(key, value);
		}
		next(value_obj){
			let idx=this.values.indexOf(value_obj);
			if(idx < this.values.length){
				return this.values[idx+1];
			}
			return null;
		}
		push(value){
			const do_debug=false;
			let cur=this.map.get(this.keys[0]);
			let cur_size=cur.size;
			let time_now=performance.now();
			cur=this.map.get(this.keys[0]);
			cur.do_history_update(this, time_now);
			cur.add_to_ratio(value);
			for(let i=1;i<this.keys.length;i++) {
				let key=this.keys[i];
				cur=this.map.get(key);
				cur_size*=cur.size;
				cur.add_to_ratio(value, cur_size);
			}
		}
	}
	class AutoBuyState {
		constructor(root){
			this.root_node=root;
			this.debug=false;
			this.arr=[];
			this.ratio=0;
			this.last_ratio=0;
			this.compressor_stats=[];
			this.arr_max_len=5*60;
			this.val=1;
			this.ratio_mode=0;
			this.locked_cycle_count=50;
			this.is_init_complete=false;
			this.avg=new AverageRatioRoot;
		}
		init() {
			if(atomepersecond === 0){
				let node=new TimeoutNode(0);
				this.root_node.append_child(node);
				node.start(new TimeoutTarget(this, this.init));
				return;
			}
			this.val=totalAtome/atomepersecond;
			let rep_val=this.val/(100*4*prestige);
			if(Number.isFinite(rep_val)){
				for(let i=0;i<8;i++){
					this.arr.push(rep_val*.75);
				}
			}else{
				rep_val=0.75;
			}
			let ratio_types=['10sec', '1min', '5min', '30min', '3hour'];
			let ratio_times=[10*1000, 60*1000, 5*60*1000, 30*60*1000, 3*60*60*1000];
			let ratio_counts=[80, 6, 5, 6, 6];
			function mul_3(arr, i){
				let [a, b=1, c=10]=arr.slice(i);
				return a * b * c * 4;
			}
			//@AverageRatio
			function create_ratio(target_obj, i, now_start){
				let obj=new AverageRatio(ratio_types[i], ratio_times[i], ratio_counts[i], mul_3(ratio_counts, i), now_start);
				if(ratio_types[i] === '1min')obj.set_history_size(7200);
				target_obj.set_ratio(ratio_types[i], obj);
			}
			let now_start=performance.now();
			for(let i=0;i<5;i++){
				create_ratio(this.avg, i, now_start);
			}
			this.prev_atomepersecond=atomepersecond;
			this.is_init_complete=true;
		}
		calc_ratio(){
			return this.avg.get_average('30min');
		}
		append_value(value) {
			if(!Number.isFinite(value)){
				console.assert(false, 'value is not finite');
			}
			this.arr.unshift(value);
			this.avg.push(value);
			while(this.arr.length > this.arr_max_len) {
				this.arr.pop();
			}
			let new_ratio=this.calc_ratio();
			if(!Number.isFinite(new_ratio)){
				console.assert(false, 'ratio result is not finite');
			}
			this.last_ratio=this.ratio;
			this.ratio=new_ratio;
		}
		update_ratio_mode(){
			let do_update=false;
			if(this.locked_cycle_count > 0){
				this.locked_cycle_count--;
				if(this.locked_cycle_count % 100 == 0){
					// do_update=true;
					// console.log('ratio cycle lcc=%o', this.locked_cycle_count);
				}
			} else {
				do_update=true;
			}
			if(!do_update)return;
			this.total_mul=1;
			this.total_cycle_count_change=0;
			let did_update=this.rep_update_ratio_mode(true);
			let should_notify=did_update;
			while(did_update){
				did_update=this.rep_update_ratio_mode(false);
			}
			if(should_notify){
				this.finalize_locked_cycle_count();
				this.cycle_log();
			}
		}
		rep_update_ratio_mode(do_lock){
			let mode_ratio_up=this.ratio_mode * .1;
			let mode_ratio_down=this.ratio_mode * .1 - .25;
			if(this.ratio > (mode_ratio_up + .5))return this.on_increase_ratio(do_lock, 2);
			if(this.ratio < mode_ratio_down)return this.on_decrease_ratio(do_lock);
			if(this.ratio > mode_ratio_up)return this.on_increase_ratio(do_lock);
			return false;
		}
		on_decrease_ratio(do_lock, mul=1){
			this.on_ratio_change(do_lock, -1, 10, mul);
			return true;
		}
		on_increase_ratio(do_lock, mul=1){
			this.on_ratio_change(do_lock, 1, 20, mul);
			return true;
		}
		on_ratio_change(do_lock, dir_num, lock_for, mul){
			if(do_lock){
				this.do_ratio_lock(do_lock, dir_num, 60 * lock_for * mul);
			} else {
				this.do_ratio_lock(do_lock, dir_num, 2 * lock_for * mul);
			}
			this.on_cycle_count_change(lock_for, mul);
		}
		on_cycle_count_change(lock_for, mul){
			this.total_mul*=mul;
			this.total_cycle_count_change+=lock_for;
		}
		finalize_locked_cycle_count(){
			let rem_val=this.locked_cycle_count%100;
			this.locked_cycle_count-=rem_val;
			this.locked_cycle_count+=50;
		}
		do_ratio_lock(do_lock, mode_change_direction, num_of_cycles){
			this.ratio_mode+=mode_change_direction;
			this.locked_cycle_count+=num_of_cycles;
		}
		get_mul_modifier(){
			switch(this.ratio_mode){
				case 0:return AutoBuyMulModifierFactor+2;
				case 1:return AutoBuyMulModifierFactor+1;
				default:return AutoBuyMulModifierFactor;
			}
		}
		get_near_val(near_avg){
			let real_val=this.avg.get_average(near_avg);
			let log_val=real_val;
			let log_mul_count=0;
			if(log_val < 0.01 || log_val > 1){
				while(log_val < 0.1){
					log_val*=10;
					log_mul_count--;
				}
				while(log_val > 1){
					log_val/=10;
					log_mul_count++;
				}
			}
			return [real_val, log_val, log_mul_count];
		}
		cycle_log(){
			// console.log('ratio mode mode=%o total_mul=%o cycle_change=%o', this.ratio_mode, this.total_mul, this.total_cycle_count_change);
			const near_avg='30min';
			let [real, num, exponent]=this.get_near_val(near_avg);
			a:if(exponent < 2 && exponent > -2) {
				break a;
				// console.log('ratio cycle avg:%s=%o lcc=%o', near_avg, (~~(real*10000))/10000, this.locked_cycle_count);
			} else {
				console.log('ratio cycle avg:%s=(%o,%o) lcc=%o', near_avg, (~~(num*1000))/1000, exponent, this.locked_cycle_count);
			}
		}
		update_not_ready(){
			let node=new TimeoutNode(80);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, this.update));
		}
		update() {
			let not_ready=false;
			if(!not_ready)if(typeof prestige=='undefined')not_ready=true;
			if(!not_ready)if(totalAtome < 100 || atomepersecond < 100)not_ready=true;
			if(not_ready) {
				this.update_not_ready();
				return;
			}
			this.div=Math.log2(prestige)*AutoBuyRatioDiv;
			//this.div=AutoBuyRatioDiv;
			this.val=Math.log2(totalAtome/atomepersecond)/this.div;
			if(!Number.isFinite(this.val)){
				this.val=1e-16;
				this.update_not_ready();
				return;
			}
			if(this.val < 1e-16) {
				this.val=1e-16;
			}
			this.val*=this.get_mul_modifier();
			this.append_value(this.val);
			this.update_ratio_mode();
		}
		on_game_reset_finish(time_played_str){
			let hist_arr=this.avg.values[0].history.slice().reverse();
			let avg=hist_arr[0];
			let avsz=6*5*6;
			let hist_filt_arr=hist_arr.map(e=>{
				avg=((avg*(avsz-1))+e)/avsz;
				return (avg*100).toFixed(1);
			});
			let json_hist=JSON.stringify(hist_filt_arr);
			let json_tag="JSON_HIST@";
			let prev_hist=sessionStorage.history;
			let data_arr;
			if(prev_hist && prev_hist.startsWith(json_tag)){
				let hist_data=prev_hist.slice("JSON_HIST@".length);
				let prev_data_len=parseInt(hist_data.split(":", 1)[0]);
				data_arr=hist_data.slice(prev_data_len.length).split("|");
				if(data_arr.length != prev_data_len){
					console.log('invalid data_arr len');
				}
				data_arr.push(json_hist);
			} else if(prev_hist.startsWith("JSON_HIST:")){
				// upgrade v1
				let hist_data=prev_hist.slice("JSON_HIST:".length);
				data_arr=hist_data.split("|");
				data_arr.push(json_hist);
			}
			else {
				data_arr=[json_hist];
			}
			sessionStorage.history=`${json_tag}${data_arr.length.toFixed(0)}:${data_arr.join("|")}`;
			let time_played_arr=data_arr.map(e=>null);
			if(sessionStorage.time_played_hist){
				let data=sessionStorage.time_played_hist;
				data.split("@").map(e=>{
					let [index, time_str]=e.split("|");
					time_played_arr[index]=time_str;
				})
			}
			time_played_arr[time_played_arr.length-1]=time_played_str;
			let t_play_tmp=time_played_arr.map((e, i)=>[i, e]);
			t_play_tmp=t_play_tmp.filter(e=>e[1]!==null);
			t_play_tmp=t_play_tmp.map(e=>`${e[0]}|${e[1]}`);
			sessionStorage.time_played_hist=t_play_tmp.join("@");
		}
		reset(){
			this.ratio*=0.75;
			for(var i=0;i<this.arr.length;i++){
				this.arr[i]*=0.75;
			}
		}
	}
	const debug_id_gen=new UniqueIdGenerator;
	/**@type {WeakRef<number>}*/
	const debug_id_syms=[];
	function next_debug_id(){
		const id=debug_id_gen.next();
		const sym=Symbol(id);
		debug_id_syms.push(new WeakRef({sym}));
		return sym;
	}
	const sym_id_gen=new UniqueIdGenerator;
	const sym_id_syms=[];
	function next_sym(){
		const id=sym_id_gen.next();
		const sym=Symbol(id);
		sym_id_syms.push(sym);
		return sym;
	}
	class DomValueBox {
		constructor(from, value){
			this.type='DomValueBox';
			this.from=from;
			this.value=value;
		}

	}
	/**@typedef {import("./types/SimpleVMTypes.js").AnyInstructionOperands} AnyInstructionOperands */
	class DomBuilderVM extends BaseStackVM {
		constructor(instructions) {
			super(instructions);
			this.exec_stack=[];
			this.jump_instruction_pointer=null;
		}
		/**@arg {InstructionType[0]} cur_opcode @arg {AnyInstructionOperands} operands */
		execute_instruction_raw(cur_opcode, operands){
			l_log_if(LOG_LEVEL_INFO, cur_opcode, ...operands, null);
			switch(cur_opcode) {
				case 'exec':{
					this.exec_stack.push([this.stack, this.instructions]);
					let base_ptr=this.stack.length;
					// advance the instruction pointer, when we return we want to resume
					// at the next instruction...
					this.instruction_pointer++;
					this.stack.push(this.instruction_pointer, base_ptr);
					this.stack=[];
					this.instructions=operands[0];
					this.jump_instruction_pointer=0;
					l_log_if(LOG_LEVEL_INFO, 'exec', ...operands[0]);
				} break;
				case 'peek':{
					let [op_1, op_2]=operands;
					let peek_stack=this.exec_stack[op_1][0];
					let base_ptr=peek_stack.at(-1);
					let at=peek_stack[base_ptr - op_2 - 1];
					this.push(at);
					l_log_if(LOG_LEVEL_INFO, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
				} break;
				case 'append':{
					if(this.stack.length <= 0){
						throw new Error('stack underflow');
					}
					let target=this.pop();
					if(this.stack.length <= 0){
						throw new Error('stack underflow');
					}
					let child_to_append=this.pop();
					this.verify_dom_box(target);
					this.verify_dom_box(child_to_append);
					if(child_to_append.from !== 'create'){
						console.warn('Are you sure you want to move elements around? child_to_append was not an element you created', child_to_append);
					}
					if(this.can_use_box(target) && this.can_use_box(child_to_append)){
						if(target.value && child_to_append.value){
							target.value.appendChild(child_to_append.value);
						} else {
							console.assert(false, 'box has no value');
						}
					} else {
						console.warn('not using box');
					}
					l_log_if(LOG_LEVEL_INFO, 'append to dom', [target, child_to_append]);
				} break;
				default/*Debug*/:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		can_use_box(box){
			return box.from === 'get' || box.from === 'create';
		}
		verify_dom_box(box){
			if(box.type===void 0)throw new Error("Invalid Box (no type)");
			if(box.type != 'DomValueBox')throw new Error("Unbox failed not a DomValueBox");
			if(typeof box.from != 'string')throw new Error("Unbox failed Box.from is not a string");
			if(typeof box.value != 'object')throw new Error("Unbox failed: Box is not boxing an object");
		}
		run() {
			this.running = true;
			while(this.instruction_pointer < this.instructions.length && this.running) {
				let instruction = this.instructions[this.instruction_pointer];
				let [cur_opcode, ...operands] = instruction;
				this.execute_instruction_raw(cur_opcode, operands);
				if(this.jump_instruction_pointer != null){
					this.instruction_pointer=this.jump_instruction_pointer;
					this.jump_instruction_pointer=null;
				}else{
					this.instruction_pointer++;
				}
				if(this.instruction_pointer >= this.instructions.length){
					if(this.exec_stack.length > 0){
						[this.stack, this.instructions]=this.exec_stack.pop();
						let base_ptr=this.stack.pop();
						this.instruction_pointer=this.stack.pop();
						l_log_if(LOG_LEVEL_INFO, 'returned to', this.instruction_pointer, this.exec_stack.length);
						continue;
					}
					l_log_if(LOG_LEVEL_INFO, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
				}
			}
			console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
			return this.return_value;
		}
	}
	class DataLoader {
		static int_parser=new WebAssembly.Function({parameters:['externref'], results:['f64']}, parseInt);
		constructor(storage) {this.store=storage}
		load_str_arr(key, def_value){let data=this.store.getItem(key);if(data === null)return def_value;return data.split(",")}
		load_int_arr(key, def_value, storage_data=this.store.getItem(key)){if(storage_data === null)return def_value;return this.parse_int_arr(storage_data)}
		load_int_arr_cb(key, def_factory, storage_data=this.store.getItem(key)){if(storage_data === null)return def_factory();return this.parse_int_arr(storage_data)}
		default_split(string){return string.split(",")}
		parse_int_arr(data){return this.default_split(data).map(DataLoader.int_parser)}
	}
	const DO_UPGRADES_RANDOM_RATE=0.008;// 0.005
	class AutoBuy {
		async_compress(){
			this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
			this.update_history_element();
		}
		constructor(){
			this.root_node=new AsyncNodeRoot;
			this.timeout_ms=0;this.iter_count=0;this.epoch_len=0;
			this.background_audio=null;this.state_history_arr=null;
			this.skip_save=false;this.has_real_time=false;
			this.cint_arr=[];
			this.local_data_loader=new DataLoader(localStorage);
			this.state=new AutoBuyState(this.root_node);
			this.debug=this.state.debug;
			this.compressor=new MulCompression;
			this.state_history_arr=this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
			this.epoch_start_time=Date.now();
			this.original_map=new Map;
			this.dom_map=new Map;
			this.debug_arr=[];
			this.flags=new Set();
			for(let i=0;i<debug_id_syms.length;i++){let val=debug_id_syms[i].deref();if(val && this[val.sym])this.debug_arr.push(...this[val.sym].split(",").map(e=>e.trim()))}
			this.timeout_arr=this.local_data_loader.load_int_arr_cb('auto_buy_timeout_str', e=>{let src=[300];src.length=16;let data_len=1;while(src.at(-1) != src[0]){src.copyWithin(data_len);data_len*=2}return src});
		}
		pre_init(){
			this.background_audio=document.querySelector("#background_audio");this.background_audio.onloadeddata=null;this.background_audio.volume=AUDIO_ELEMENT_VOLUME;
			this.async_pre_init().then(()=>{
				void 0;
				// console.log('pre_init done')
			});this.dom_pre_init();
		}
		async async_pre_init(){
			x:try{
				return await this.background_audio.play();
			}catch(e){
				break x;
				// console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
			}
			let raw_instructions=`this;push,target_obj;get;push,background_audio;get;push,play;call,int(2);push,then;push,%o;push,%o;call,int(4);drop;global;push,removeEventListener;push,click;this;call,int(4);drop`;
			let instructions=SimpleStackVMParser.parse_instruction_stream_from_string(raw_instructions, [
				function(){
					// console.log('play success')
				},
				function(err){console.log(err)}
			]);
			let handler=new EventHandlerVMDispatch(instructions, this);
			window.addEventListener('click', handler);
		}
		save_state_history_arr(){
			if(this.skip_save)return;
			localStorage.auto_buy_history_str=this.state_history_arr.join(",");
		}
		get_timeout_arr_data(forced_action){
			if(forced_action == "RESET")return this.timeout_arr.map(e=>~~(e/4)).join(",");
			return this.timeout_arr.join(",");
		}
		save_timeout_arr(){
			let forced_action, action_count;
			let action_data=localStorage.auto_buy_forced_action;
			if(action_data)[forced_action, action_count]=action_data.split(",");
			localStorage.auto_buy_timeout_str=this.get_timeout_arr_data(forced_action);
			if(action_count !== void 0){
				action_count=parseInt(action_count);
				if(Number.isFinite(action_count)){
					if(action_count > 0){
						localStorage.auto_buy_forced_action=[forced_action, action_count-1];
					}else if(forced_action !== "NONE"){
						localStorage.auto_buy_forced_action="NONE,0";
					}
				}
			}
		}
		dom_pre_init(){
			const css_display_style=`#state_log>div{width:max-content}#state_log{top:0px;width:30px;position:fixed;z-index:101;font-family:monospace;font-size:22px;color:lightgray}`;
			let create_state_log_arr=[[0, 'get', 'body'],[1, 'create', 'div', 'state_log', {id:'state_log'}], [1, 'dup'], [1, 'append']]
			let call_arg_arr=[];
			let make_css_arr=[
				[
					0, 'push', null,
					(...styles_promise_arr)=>
					/*@Hack: wait for any promise to settle*/
					Promise.allSettled(styles_promise_arr)
					.then(e=>{
						let res=e.filter(e=>e.status==='fulfilled').map(e=>e.value);
						this.adopt_styles(...res);
						let err=e.filter(e=>e.status!='fulfilled');
						if(err.length > 0)console.log('promise failure...', ...err)
					})
				],
				[0, 'new', CSSStyleSheet, [],(obj, str)=>obj.replace(str),[css_display_style]],[0, 'call', 3],/*drop the promise*/[0, 'drop']
			];
			let raw_dom_arr=[
				...create_state_log_arr,[2, 'create', 'div', 'history', "?3"], [2, 'append'],[2, 'create', 'div', 'timeout_element', "0"], [2, 'append'],
				[2, 'create', 'div', 'hours_played', "0.000 hours"], [2, 'append'],[2, 'create', 'div', 'ratio', 0..toFixed(2)+"%"], [2, 'append'],
				[2, 'create', 'div', 'ratio_change', 0..toExponential(3)], [2, 'append'],[1, 'drop'],[0, 'drop'],...make_css_arr];
			this.build_dom_from_desc(raw_dom_arr, this.dom_map);
		}
		adopt_styles(...styles){
			let dom_styles=document.adoptedStyleSheets;
			document.adoptedStyleSheets = [...dom_styles, ...styles];
		}
		build_dom_from_desc(raw_arr, trg_map=new Map, dry_run=false) {
			let stack=[];
			let map=trg_map;
			if(dry_run)stack.push([0, "enable_dry_mode"]);
			for(let i=0;i<raw_arr.length;i++) {
				let cur_item=raw_arr[i];
				let [depth, action, ...args] = cur_item;
				switch(action){
					case 'get':{
						let cur_element, [query_arg]=args;switch(query_arg){case 'body':cur_element=document.body;break;default:cur_element=document.querySelector(query_arg);break;}
						stack.push([depth, "push", new DomValueBox('get', cur_element)])
					} break;
					case 'new':{
						const [_class, construct_arg_arr, callback, arg_arr]=args;
						stack.push([depth, "push", null, callback, ...construct_arg_arr, _class],[depth, "construct", 1 + construct_arg_arr.length],[depth, "push", ...arg_arr],[depth, "call", 3 + arg_arr.length])
					} break;
					case 'create':{
						const [element_type, name, content] = args;
						let cur_element=document.createElement(element_type);
						if(typeof content == 'string')cur_element.innerText=content;
						else if(typeof content == 'object' && content.id)cur_element.id=content.id;
						else{console.log('bad typeof == %s for content in build_dom; content=%o', typeof content, content);console.info("Info: case 'create' args are", element_type, name)}
						map.set(name, cur_element);
						stack.push([depth, "push", new DomValueBox('create', cur_element)]);
					} break;
					case 'append':{/*peek at the return stack, up 1 depth*/stack.push([depth, "peek", depth-1, 0]);stack.push(cur_item);} break;
					case 'dup':case 'breakpoint':case 'drop':case 'call':/*push the item*/case 'push':stack.push(cur_item);break;
					default:{console.log('might need to handle', action);debugger} break;
				}
				if(this.debug_arr.includes('build_dom_from_desc'))console.log('es', stack.at(-1));
			}
			let [left_stack, tree]=this.parse_dom_desc(stack);
			if(left_stack.length > 0){
				console.assert(false, 'failed to parse everything (parse tree probably has errors)');
			}
			this.apply_dom_desc(tree);
		}
		parse_dom_desc(input_stack){
			let stack=[];
			let tree=[];
			for(let x=0,i=0;i<input_stack.length;i++){
				let cur_stack=input_stack[i];
				let [y, ...item]=cur_stack;
				if(this.debug_arr.includes('parse_dom_desc'))console.log(item);
				while(y > x){
					stack.push(tree);
					tree=[];
					x++;
				}
				while(y < x){
					let prev=tree;
					tree=stack.pop();
					tree.push([x, prev]);
					x--;
				}
				tree.push([y, item]);
			}
			return [stack, tree];
		}
		log_if(tag, ...log_args){
			if(this.debug_arr.includes(tag)){
				console.log(...log_args);
			}
		}
		get_logging_level(tag, level=LOG_LEVEL_INFO){
			if(this.debug_arr.includes(tag)){
				return level-1;
			}
			return level;
		}
		get [next_debug_id()](){
			return '';
		}
		apply_dom_desc(tree) {
			this.run_dom_desc(tree);
		}
		run_dom_desc(tree, stack=[], cur_depth=0, items=[], depths=[]){
			for(let i=0;i<tree.length;i++){
				let cur=tree[i];
				switch(cur[0] - cur_depth){
					case 1:{
						this.log_if('apply_dom_desc', 'rdc stk');
						stack.push(['children', items.length-1, cur]);
					} break;
					case 0:{
						items.push(cur[1]);
						depths.push(cur[0]);
					} break;
					default:{
						console.assert(false, 'handle depth change in apply_dom_desc');
						this.log_if('apply_dom_desc', cur[0] - cur_depth);
					}
				}
			}
			if(stack.length === 0)return [items, depths];
			let tag, data, items_index;
			{
				let data_depth;
				[tag, items_index, [data_depth, data]] = stack.pop();
				let log_level=this.get_logging_level('apply_dom_desc');
				l_log_if(log_level, tag, items[items_index], data_depth, data);
			}
			let deep_res=this.run_dom_desc(data, stack, cur_depth+1);
			const ret_items=items.slice();
			let off=1;
			ret_items.splice(items_index + off++, 0, ['exec', deep_res[0]]);
			this.log_if('apply_dom_desc', deep_res[0], deep_res[1]);
			this.log_if('apply_dom_desc', ret_items, depths, stack);
			if(cur_depth === 0){
				let builder_vm=new DomBuilderVM(ret_items);
				builder_vm.run();
			}
			return [ret_items, depths];
		}
		init_dom(){
			const font_size_px=22;
			let t=this;
			this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
			this.dom_map.get('history').addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));
			this.dom_map.get('ratio').addEventListener('click', function(){
				t.state.reset();
			});
			this.dom_map.get('state_log').style.fontSize = font_size_px+"px";
			window.addEventListener('unload', function(){
				t.save_state_history_arr();
				t.save_timeout_arr();
			});
		}
		global_init(){
			if(window.g_auto_buy && window.g_auto_buy!==this){
				window.g_auto_buy.destroy();
			}
			window.g_auto_buy=this;
		}
		destroy(){
			this.root_node.destroy();
			for(let i=0;i<this.cint_arr.length;i+=2){
				let cint_item=this.cint_arr[i];
				switch(cint_item[0]){
					case 1:clearTimeout(cint_item[1]);break;
					case 2:clearInterval(cint_item[1]);break;
					default:console.assert(false, 'cant destroy cint item (%o)', cint_item);break;
				}
			}
		}
		update_timeout_element() {
			this.dom_map.get('timeout_element').innerText=this.get_millis_as_pretty_str(this.round(this.timeout_ms), 0)// (this.timeout_avg()[1]);
		}
		do_zero_pad(value, pad_char, char_num) {
			let string;
			if(typeof value === 'number'){
				string = value.toString();
			} else {
				string = value;
			}
			while(string.length < char_num){
				string = pad_char + string;
			}
			return string;
		}
		get_millis_as_pretty_str(timeout_milli, milli_acc){
			let time_arr=[];
			let float_milliseconds = timeout_milli % 1000;
			let milli_len=6;
			if(milli_acc === 0){
				milli_len=3;
			}
			time_arr[3]=this.do_zero_pad(float_milliseconds.toFixed(milli_acc), '0', milli_len);
			timeout_milli-=float_milliseconds;
			timeout_milli/=1000;
			let int_seconds = timeout_milli % 60;
			time_arr[2]=this.do_zero_pad(int_seconds, '0', 2);
			timeout_milli-=int_seconds;
			timeout_milli/=60;
			let int_minutes = timeout_milli % 60;
			time_arr[1]=this.do_zero_pad(int_minutes, '0', 2);
			timeout_milli-=int_minutes;
			timeout_milli/=60;
			let int_hours=timeout_milli;
			time_arr[0]=this.do_zero_pad(int_hours, '0', 2);
			int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
			switch(time_arr.length) {
				case 1:
					return time_arr[0] + 'ms';
				case 2:
					return time_arr[0] + '.' + time_arr[1];
				case 3:
					return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
				case 4:
					return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
			}
			return time_arr.join(":");
		}
		get_hours_num_as_pretty_str(hours_num){
			let int_hours=~~hours_num;
			let time_arr=[];
			time_arr[0]=this.do_zero_pad(int_hours, '0', 2);
			let float_minutes=(hours_num-int_hours) * 60;
			let int_minutes = ~~float_minutes;
			time_arr[1]=this.do_zero_pad(int_minutes, '0', 2);
			let float_seconds = (float_minutes-int_minutes) * 60;
			let int_seconds = ~~float_seconds;
			time_arr[2]=this.do_zero_pad(int_seconds, '0', 2);
			let float_milliseconds = (float_seconds-int_seconds) * 1000;
			let float_milli_from_prev = float_milliseconds - 1000;
			if(float_milliseconds > 100 && float_milliseconds < 900){
				this.has_real_time=true;
			}
			x:if(this.has_real_time);
			else if(float_milliseconds < 3e-9 && float_milliseconds > -3e-9);
			else if(float_milli_from_prev < 3e-9 && float_milli_from_prev > -3e-9);
			else {
				break x;
				// console.log(float_milliseconds, float_milliseconds - 1000);
			}
			let int_milliseconds = ~~float_milliseconds;
			if(int_milliseconds >= 1000) {
				int_milliseconds-=1000;
				int_seconds++;
				if(int_seconds >= 60) {
					int_seconds=0;
					int_minutes++;
					if(int_minutes >= 60){
						int_minutes=0;
						int_hours++;
						time_arr[0]=this.do_zero_pad(int_hours, '0', 2);
						console.log('sec+ min+ hour+');
					} else {
						console.log('sec+ min+');
					}
					time_arr[1]=this.do_zero_pad(int_minutes, '0', 2);
				} else {
					console.log('sec+');
				}
				time_arr[2]=this.do_zero_pad(int_seconds, '0', 2);
			}
			time_arr[3]=this.do_zero_pad(int_milliseconds, '0', 3);
			int_hours === 0 && (time_arr.shift(), int_minutes === 0 && (time_arr.shift(), int_seconds === 0 && time_arr.shift()));
			switch(time_arr.length) {
				case 1:
					return time_arr[0] + 'ms';
				case 2:
					return time_arr[0] + '.' + time_arr[1];
				case 3:
					return time_arr.slice(0, 2).join(":") + '.' + time_arr[2];
				case 4:
					return time_arr.slice(0, 3).join(":") + '.' + time_arr[3];
			}
			return time_arr.join(":");
		}
		update_hours_played(){
			let float_hours=((timeplayed / 30) / 60);
			let time_played_str=this.get_hours_num_as_pretty_str(float_hours);
			this.dom_map.get('hours_played').innerText=time_played_str;
			this.dom_map.set('time_played_str', time_played_str);
		}
		update_ratio_element(){
			this.dom_map.get('ratio').innerText=(this.state.ratio*100).toFixed(2)+"%";
		}
		update_ratio_change_element(){
			let last_ratio=this.state.last_ratio*100;
			let cur_ratio=this.state.ratio*100;
			let ratio_diff=cur_ratio-last_ratio;
			let char_value="+";
			if(ratio_diff < 0)char_value='';
			this.dom_map.get('ratio_change').innerText=char_value+ratio_diff.toExponential(3);
		}
		update_history_element(){
			this.dom_map.get('history').innerText=array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
		}
		next_update(){
			if(this.flags.has('do_reset_dom')){
				this.flags.delete('do_reset_dom');
				return;
			}
			this.set_update_timeout();
		}
		set_update_timeout(){
			this.next_timeout(this.update, 125, 'update', true);
		}
		update(){
			this.state.update();
			// spell:words timeplayed
			this.update_hours_played();
			this.update_timeout_element();
			this.update_ratio_element();
			this.update_ratio_change_element();
			this.next_update();
		}
		init(){
			this.next_timeout(this.init_impl, 200, 'init', true);
		}
		set_secondinterval(){
			let disabled=false;
			if(disabled)return;
			//spell:words secondinterval
			if(window.secondinterval !== void 0)clearInterval(window.secondinterval);
			let rate = 66 / 2000;
			let time_base=performance.now();
			let interval_id = setInterval(function() {
				let real_time=performance.now();
				let time_diff=real_time-time_base;
				time_base=real_time;
				let real_rate=time_diff / 2000;
				// we lost some time here, the diff was too large (got a 10 hours playtime from putting my pc to sleep)
				if(time_diff > 2000){
					// assume a max of 2 seconds passed
					timeplayed++;
					return;
				}
				timeplayed += real_rate;
			}, 66);
			window.secondinterval = interval_id;
			this.root_node.append_child(new IntervalIdNodeRef(interval_id, function(){
				window.secondinterval = void 0;
			}));
		}
		set_timeplayed_update_interval(){
			this.root_node.append_raw(setInterval(function(){
				doc.title = rounding(totalAtome, false,1).toString() + " atoms";
				//spell:words atomsaccu presnbr
				doc.getElementById('atomsaccu').innerHTML = rounding(atomsaccu, false,0);
				doc.getElementById('timeplayed').innerHTML = (Math.round(timeplayed / 30) / 60).toFixed(2) + " hours";
				doc.getElementById('presnbr').innerHTML = "<br>" + (calcPres() * 100).toFixed(0) + " % APS boost";
			}, 2000), false);
		}
		replace_timeplayed_timer(){
			this.set_secondinterval();
			this.set_timeplayed_update_interval();
		}
		init_impl() {
			this.global_init();
			this.init_dom();
			this.state.init();
			this.next_update();
			this.main();
			this.original_map.set('lightreset', lightreset);
			window.lightreset=lightreset_inject;
			window.specialclick=specialclick_inject;
			if(window.secondinterval){
				this.replace_timeplayed_timer();
			}
		}
		state_history_clear_for_reset(){
			this.state_history_arr=["R"];
			localStorage.auto_buy_history_str="R";
		}
		state_history_append(value, silent=false){
			this.epoch_len++;
			if(silent)return;
			if(!value)throw new Error("Invalid state append requested");
			let last=this.state_history_arr.at(-1);
			this.state_history_arr.push(value);
			if(this.state.debug)console.log('history append', last, value);
			while(this.state_history_arr.length>120)this.state_history_arr.shift();
			Promise.resolve().then(this.async_compress.bind(this));
		}
		history_element_click_handler(event){
			this.root_node.destroy();
			this.set_update_timeout();
			this.set_auto_buy_timeout();
			// we destroyed the node this was attached to,
			// replace it again (it was there, we destroyed it, now please put it back)
			this.set_timeplayed_update_interval();
		}
		set_auto_buy_timeout(){
			this.timeout_ms=~~(this.timeout_ms * 0.9);
			this.start_main_async(true);
		}
		timeout_avg() {
			let first=this.timeout_arr[0];
			let min=first;
			let max=first;
			let total=0;
			for(var i=0;i<this.timeout_arr.length;i++){
				let cur=this.timeout_arr[i];
				total+=cur;
				if(cur > max){
					max=cur;
				}
				if(cur < min){
					min=cur;
				}
			};
			const avg=total / this.timeout_arr.length;
			return [min, avg, max];
		}
		large_diff=[];
		calc_timeout_ms() {
			while(this.timeout_arr.length>60)this.timeout_arr.shift();
			let max=0;
			let total=0;
			for(var i=0;i<this.timeout_arr.length;i++){
				total+=this.timeout_arr[i];
				max=Math.max(this.timeout_arr[i], max);
			};
			const val=total / this.timeout_arr.length;
			let num=val;// max / val;
			this.last_value??=num;
			let diff=this.last_value-num;
			this.last_value=num;
			this.large_diff.push(num);
			let sorted_diff_arr = this.large_diff.map(e=>e-num).sort((a,b)=>a-b);
			let diff_want_mul=1;
			let diff_cur=diff;
			while(diff_cur > -1 && diff_cur < 1 && diff_want_mul < 1e18){
				diff_cur*=10;
				diff_want_mul*=10;
			}
			diff_want_mul*=1000;
			let zero_idx=sorted_diff_arr.indexOf(0);
			let zs=zero_idx-8;
			let z_loss=0;
			if(zs < 0){
				z_loss=zs*-1;
				zs=0;
			}
			let ez_log=sorted_diff_arr.map(e=>{
				if(e === 0)return e;
				return this.round(e*diff_want_mul)
			});
			//console.log('calc_timeout_ms sorted_diff index', zero_idx, 'diff is', this.round(diff*diff_want_mul)/diff_want_mul);
			//console.log('calc_timeout_ms l_diff %o %o\n%o', ez_log.slice(0,8), ez_log.slice(-8), ez_log.slice(zs, zero_idx + z_loss + 8));
			return this.round(val);
		}
		is_epoch_over(){
			let epoch_diff=Date.now() - this.epoch_start_time;
			return epoch_diff > 60*5*1000;
		}
		async do_start_main_async(no_wait){
			if(!no_wait)await this.next_timeout_async(this.timeout_ms, 'A');
			await this.main_async();
		}
		start_main_async(no_wait=false) {
			return this.do_start_main_async(no_wait).then(e=>{}, e=>{
				console.log('err', e);
				console.log('cancled main_async');
			});
		}
		main() {
			console.log('start main_async');
			this.timeout_ms=this.calc_timeout_ms();
			this.start_main_async();
		}
		async maybe_async_reset(){
			let loss_rate=this.unit_promote_start();
			if(this.maybe_run_reset())return [true, loss_rate];
			return [false, loss_rate];
		}
		do_large_decrease(){
			this.do_timeout_dec([1.005], 60);// 60
		}
		do_normal_decrease(){
			this.do_timeout_dec([1.004], 80);// 80
		}
		do_rare_begin_change(){
			this.do_timeout_inc([1.008, 1.03], 10);
		}
		async bonus_async() {
			bonusAll();
			await this.fast_unit_async();
		}
		async initial_special_async(){
			await this.next_timeout_async(this.timeout_ms, '>');
			let in_special=true;
			while(in_special){
				if(this.do_special()){
					await this.next_timeout_async(this.timeout_ms, '^');
					continue;
				} else {
					in_special=false;
				}
			}
			await this.next_timeout_async(this.timeout_ms, '#');
			await this.bonus_async();
		}
		async rare_begin_async(){
			this.do_rare_begin_change();
			await this.next_timeout_async(this.timeout_ms, '<');
			await this.initial_special_async();
		}
		async normal_decrease_async(){
			this.do_normal_decrease();
			await this.next_timeout_async(this.timeout_ms, '-');
		}
		async large_decrease_async(){
			this.do_large_decrease();
			await this.next_timeout_async(this.timeout_ms, '!');
		}
		async main_async(){
			if(this.main_running){
				throw new Error("Already running");
			}
			this.main_running=true;
			run_loop:while(this.main_running) {
				for(this.iter_count=0;;) {
					let unit_upgradeable_trigger=30;
					if(this.timeout_ms > 3*60*1000){
						unit_upgradeable_trigger=8;
					}
					if(this.unit_upgradable_count > unit_upgradeable_trigger){
						this.unit_upgradable_count=0;
						await this.rare_begin_async();
					}
					if(this.iter_count<6) await this.normal_decrease_async();
					else await this.large_decrease_async();
					let [quit, loss_rate]=await this.maybe_async_reset();
					if(quit){
						this.main_running=false;
						continue run_loop;
					}
					if(loss_rate > 0.08)continue;
					if(this.pre_total == totalAtome)break;
				}
				await this.faster_timeout_async();
			}
		}
		async fast_unit_async() {
			this.fast_unit_running=true;
			let count=0;
			while(this.fast_unit_running) {
				this.unit_promote_start();
				if(this.pre_total == totalAtome) break;
				this.do_fast_unit_step_change();
				await this.next_timeout_async(this.timeout_ms, ':');
				count++;
				if(count > 12)this.fast_unit_running=false;
			}
			this.do_fast_unit_change();
			await this.next_timeout_async(this.timeout_ms, '$');
		}
		unit_upgradable_count=0;
		unit_promote_start(){
			this.timeout_ms=this.calc_timeout_ms();
			this.pre_total=totalAtome;
			this.do_unit_promote();
			let money_diff=this.pre_total-totalAtome;
			let loss_rate=money_diff/this.pre_total;
			if(this.pre_total != totalAtome){
				this.unit_upgradable_count++;
			}
			if(this.pre_total != totalAtome && this.debug){
				let log_args=[];
				let percent_change=(loss_rate*100).toFixed(5);
				let money_str=totalAtome.toExponential(3);
				log_args.push(this.iter_count);
				log_args.push(percent_change);
				log_args.push(money_str);
				console.log(...log_args);
			}
			this.iter_count+=1;
			return loss_rate;
		}
		do_fast_unit_step_change(){
			this.do_timeout_dec([1.006], 10);
		}
		do_fast_unit_change(){
			this.do_timeout_dec([1.006], 10);
		}
		async faster_timeout_async(){
			this.do_timeout_inc([1.006, 1.005], 4);
			await this.next_timeout_async(this.timeout_ms, '+');
		}
		get_timeout_change(pow_base, pow_num, div){
			let pow_res=Math.pow(pow_base, pow_num);
			let res=this.timeout_ms * pow_res;
			return res / div;
		}
		update_timeout_inc(change){
			if(window.__testing__){
				return;
			}
			let value=this.round(this.timeout_ms + change);
			l_log_if(LOG_LEVEL_INFO, 'inc', this.timeout_ms, value-this.timeout_ms);
			this.timeout_arr.push(value);
		}
		update_timeout_dec(change){
			if(window.__testing__){
				return;
			}
			let value=this.round(this.timeout_ms - change);
			if(value < 25)value=25;
			l_log_if(LOG_LEVEL_INFO, 'dec', this.timeout_ms, this.timeout_ms-value);
			this.timeout_arr.push(value);
		}
		round(value){
			return ~~value;
		}
		do_timeout_dec(pow_terms, div){
			let change=this.get_timeout_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_timeout_dec(change);
		}
		do_timeout_inc(pow_terms, div){
			let iter_term=Math.pow(pow_terms[1], this.iter_count);
			let change=this.get_timeout_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_timeout_inc(change * iter_term);
		}
		next_timeout_async_err_log(msg, err){
			let err_stack=err.stack.split("\n").slice(1);
			function rm(str){
				if(err_stack.length === 0)return false;
				if(err_stack[0].includes(str)){
					err_stack=err_stack.slice(1);
					return true;
				}
				return false;
			}
			while(true) {
				if(rm("at AutoBuy.next_timeout_async"))continue;
				if(rm("at AutoBuy.large_decrease_async"))continue;
				if(rm("at AutoBuy.normal_decrease_async"))continue;
				if(rm("at AutoBuy.faster_timeout_async"))continue;
				if(rm("at AutoBuy.main_async"))continue;
				break;
			}
			if(err_stack.length > 0){
				console.log("%s\n%s", msg, err_stack.map(e=>{
					if(e.slice(0, 4) == '    ')e=e.slice(4);
					if(e.slice(0, 3) == 'at ')e=e.slice(3);
					return e;
				}).join("\n"));
			}
		}
		[next_sym("next_timeout_async")]() {
			console.log('next_timeout_async', char, timeout);
			let err=new Error;
			this.next_timeout_async_err_log('next_timeout_async stk', err);
		}
		async next_timeout_async(timeout, char, silent=false){
			let node=new AsyncTimeoutNode(timeout);
			this.root_node.append_child(node);
			if(!silent){
				this.timeout_ms=timeout;
				this.update_timeout_element();
			}
			this.state_history_append(char, silent);
			await node.start_async(new AsyncTimeoutTarget);
		}
		next_timeout(trg_fn, timeout, char, silent=false){
			let node=new TimeoutNode(timeout);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, trg_fn));
			if(!silent){
				this.timeout_ms=timeout;
				this.update_timeout_element();
			}
			this.state_history_append(char, silent);
		}
		do_unit_promote(){
			do_auto_unit_promote();
		}
		is_special_done(special_buyable){
			return !special_buyable.done && special_buyable.cost < totalAtome;
		}
		next_special(){
			return allspec.findIndex(this.is_special_done);
		}
		do_special(){
			let ret=false;
			for(let index=this.next_special();;index=this.next_special()){
				if(index > -1){
					window.specialclick(index);
					ret=true;
				} else break;
			}
			return ret;
		}
		special(){
			if(this.do_special())this.next_timeout(this.special, this.timeout_ms, '^');
			else this.next_timeout(this.bonus, this.timeout_ms, '#');
		}
		initial_special(){
			this.next_timeout(this.special, this.timeout_ms, '>');
		}
		maybe_run_reset(){
			let count=0;
			count+=this.timeout_ms > 30*1000;
			count+=this.state.ratio > 1;
			count+=this.is_epoch_over();
			count+=this.state.locked_cycle_count < 100;
			switch(count){
				case 0:
				case 1:
				case 2:
				case 3:
					break;
				default:console.log('maybe_run_reset count', count);
			}
			if(this.state.ratio > 1 && this.is_epoch_over() && this.state.locked_cycle_count < 100) {
				this.do_game_reset();
				return true;
			}
			return false;
		}
		do_game_reset(){
			this.next_timeout(this.game_reset_step_1, this.round(this.timeout_ms / 3), '1R');
			this.on_repeat_r();
		}
		do_audio_mute_toggle(){
			if(!AudioMuted){
				// this.background_audio.muted=!this.background_audio.muted;
				mute();
			}
		}
		game_reset_step_1(){
			this.do_audio_mute_toggle();
			this.next_timeout(this.game_reset_step_2, 60*5*1000, '2R');
		}
		game_reset_step_2(){
			this.do_audio_mute_toggle();
			this.next_timeout(this.game_reset_finish, 60*5*1000, '3R');
		}
		game_reset_finish(){
			this.update_hours_played();
			this.dispatch_on_game_reset_finish(this.dom_map.get("time_played_str"));
		}
		dispatch_on_game_reset_finish(time_played){
			this.state.on_game_reset_finish(time_played);
			this.on_game_reset_finish(time_played);
		}
		on_game_reset_finish(time_played){
			console.info('fire lightreset at %s', time_played);
			window.lightreset();
		}
		on_repeat_r(){
			this.next_timeout(this.on_repeat_r, 1*1000, 'r');
		}
	}
	function do_auto_unit_promote(){
		var out=[],maxed=[];
		for(var k=0;k<arUnit.length;k++){
			var afford=false;
			if(arUnit[k][16]==true||k==0){
				var type=Get_Unit_Type(k);
				var tmp=getUnitPromoCost(k);
				var cost=tmp;
				var next=Find_ToNext(k);
				if(next < 0){maxed[k]=true};
				for(var i=1;i<=100;i++){
					if(totalAtome>=cost){
						tmp=tmp+(tmp*arUnit[k][3])/100;
						var tar=(arUnit[k][4]*1)+i;
						var a=_targets.indexOf(tar);
						var reduction=1;
						ib:if(a>-1&&tar<=1000){
							for(var k2 in type[2])if(type[2][k2]!=k&&arUnit[type[2][k2]][4]<tar)break ib;
							var c=_targets_achi.indexOf(totalAchi()+1);
							if(c>-1)reduction*=(1-((c+1)*0.01));
							reduction*=1-((a+1)*0.01);
						}
						tmp*=reduction;
						cost+=tmp;
					}else break;
					if(i==next||(maxed[k]&&i==100))afford=true;
				}
				if(afford)out[k]=true;else out[k]=false;
			}
		}
		res=out.lastIndexOf(true);
		if(res<0)return;
		if(maxed[res])for(var y=0;y<100;y++)mainCalc(res);else tonext(res);
	}
	const auto_buy_obj=new AutoBuy;
	class AsyncTrigger{
		constructor(){
			let t=this;
			t.m_set_flag=true;
			t.trigger_handler=null;
			this.promise_set=new Promise(function(accept, reject){
				t.m_set=accept;
				t.m_set_error=reject;
				t.m_set_flag=false;
			});
		}
		set(cnt){
			if(!this.m_set_flag){
				this.m_set(cnt);
				this.m_set_flag=true;
			}
		}
		set_error(opt_error){
			if(!this.m_set_flag){
				if(opt_error) this.m_set_error(opt_error);
				else this.m_set_error(null);
			}
		}
		async wait(){
			let ret=this.promise_set;
			return ret;
		}
		notify(cnt){
			if(this.m_can_notify){
				this.m_notify(cnt);
				this.m_can_notify=false;
			}
		}
		notify_error(error){
			if(this.m_can_notify){
				this.m_notify_error(error);
				this.m_can_notify=false;
			}
		}
		async notified(){
			let t=this;
			this.notify_promise=new Promise(function(accept, reject){
				t.m_notify=accept;
				t.m_notify_error=reject;
			});
			this.m_can_notify=true;
		}
	}
	class AsyncSemaphore{
		constructor(){
			this.notify_waiters_vec=[];
			this.count=0;
		}
		async inc(cnt){
			let wait_trigger=new AsyncTrigger;
			while(this.count > 0){
				if(!this.notify_waiters_vec.includes(wait_trigger)){
					this.notify_waiters_vec.push(wait_trigger);
				}
				await wait_trigger.wait();
				wait_trigger.notify(cnt);
			}
			this.count+=cnt;
		}
		async dec(cnt){
			this.count-=cnt;
			if(this.count <= 0){
				do{
					let waiter=this.notify_waiters_vec.shift();
					if(!waiter)break;
					waiter.set(cnt);
					let used_count=await waiter.notified();
					cnt-=used_count;
				} while(cnt > 0);
			}
		}
	}
	function map_to_tuple(e, i){
		return [e, this[i]];
	}
	function to_tuple_arr(keys, values){
		return keys.map(map_to_tuple, values);
	}
	function promise_set_timeout(timeout, a){
		setTimeout(a, timeout);
	}
	function do_async_wait(timeout){
		return new Promise(promise_set_timeout.bind(null, timeout));
	}
	void do_async_wait;
	function array_sample_end(arr, rem_target_len){
		arr=arr.slice(-300);
		let rem_len=char_len_of(arr);
		while(rem_len > rem_target_len) {
			rem_len-=arr.shift().length+1;
		}
		return arr;
	}
	function char_len_of(arr){
		return arr.reduce((a,b)=>a + b.length, 0) + arr.length;
	}
	function lightreset_inject(){
		g_auto_buy.state_history_clear_for_reset();
		g_auto_buy.skip_save=true;
		window.addEventListener('unload', function(){
			g_auto_buy.skip_save=false;
			localStorage.auto_buy_timeout_str="300,300,300,300";
			localStorage.long_wait=12000;
		});
		let original=g_auto_buy.original_map.get('lightreset');
		original();
	}
	function specialclick_inject(that) {
		if (allspec[that].done == undefined) allspec[that].done = false;
		if (allspec[that].cost <= totalAtome && allspec[that].done == false) {
			doc.getElementById('specialsbought').innerText = rounding(++specialsbought, false,0);
			if (that == 74) {
			}
			atomsinvest += allspec[that].cost;
			doc.getElementById('atomsinvest').innerText = rounding(atomsinvest, false,0);
			allspec[that].done = true;
			totalAtome -= allspec[that].cost;
			var diff1 = calcDiff(that);
			for (var a in arUnit[that][17]) arUnit[that][17][a] *= 100;
			arUnit[that][5] *= 100;
			var spec_aps = 0;
			if (arUnit[that][4] > 0) {
				spec_aps = (calcDiff(that) - diff1);
				atomepersecond += spec_aps;
			}
			//spell:ignore noti plurials
			if (noti) gritter('Power-up !', toTitleCase(plurials(arrayNames[that])) + " X100 APS", null, "+" + rounding(spec_aps, false,0) + " APS", "");
			//spell:ignore updateprogress
			updateprogress(that);
			$('#spec' + that).remove();
			(that < 74) ? seeUnit(that + 1): seeUnit(that - 1);
			seeUnit(that);
			//spell:ignore checkspec
			checkspec();
			//spell:ignore achiSpec
			achiSpec();
		}
	}
	class ProxyHandlers {
		constructor(root){
			this.weak_root=new WeakRef(root);
			this.count_arr=[0];
		}
		so_init(){
			let val=Array(12).fill((idx)=>{
				if(idx > window.da.length)return window.da.at(-1)(idx-1);
				return window.da[idx-1](idx-1);
			});
			window.da=[e=>g_proxy_state.hand.stack_overflow_check(), ...val];
		}
		stack_overflow_check(){
			g_proxy_state.hand.count_arr[0]++;
			if(g_proxy_state.hand.count_arr[0] < g_proxy_state.hand.count_arr[1]){
				return g_proxy_state.hand.stack_overflow_check();
			}
			return g_proxy_state.hand.count_arr[0];
		}
		generic(type, call_args, from){
			let keep_vec=this.weak_root.deref();
			if(keep_vec === null){
				console.log('ProxyHandlers reset KeepSome after gc collect');
				keep_vec=new KeepSome;
				this.weak_root=new WeakRef(keep_vec);
			}
			keep_vec.push(from.concat([null, type, 1, call_args]));
		}
		set_(call_args, from){
			this.generic('set', call_args, from);
			return Reflect.set(...call_args);
		}
		get_(call_args, from){
			this.generic('get', call_args, from);
			return Reflect.get(...call_args);
		}
		apply_(call_args, from){
			this.generic('apply', call_args, from);
			return Reflect.apply(...call_args);
		}
		defineProperty_(call_args, from){
			this.generic('defineProperty', call_args, from);
			return Reflect.defineProperty(...call_args);
		}
		getOwnPropertyDescriptor_(call_args, from){
			this.generic('getOwnPropertyDescriptor', call_args, from);
			return Reflect.getOwnPropertyDescriptor(...call_args);
		}
	}
	void ProxyHandlers;
	class KeepSome {
		/*@type {number[][]}*/
		m_2d_vec;
		constructor(){
			this.m_2d_vec=[];
		}
		/**@arg {number} value*/
		push(value){
			let tmp_val=null;
			let set_index=0;
			this.push_at(set_index, value);
			while(this.m_2d_vec[set_index].length > 50) {
				tmp_val=this.m_2d_vec[set_index].shift();
				if(tmp_val === void 0)break;
				if(Math.random() > 0.9) {
					set_index++;
					this.push_at(set_index, tmp_val);
					console.log('psp', 1);
					let off=0;
					while(this.m_2d_vec[set_index-off].length < 25){
						tmp_val=this.m_2d_vec[set_index-off-1].shift();
						if(tmp_val === void 0)break;
						this.m_2d_vec[set_index-off].push(tmp_val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 2);
					while(this.m_2d_vec[set_index-off].length < 40){
						tmp_val=this.m_2d_vec[set_index-off-1].shift();
						if(tmp_val === void 0)break;
						this.m_2d_vec[set_index-off].push(tmp_val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 3);
					while(this.m_2d_vec[set_index-off].length < 40){
						tmp_val=this.m_2d_vec[set_index-off-1].shift();
						if(tmp_val === void 0)break;
						this.m_2d_vec[set_index-off].push(tmp_val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 4);
					while(this.m_2d_vec[set_index-off].length < 40){
						tmp_val=this.m_2d_vec[set_index-off-1].shift();
						if(tmp_val === void 0)break;
						this.m_2d_vec[set_index-off].push(tmp_val);
					}
				}
				if(this.m_2d_vec[set_index].length <= 50 && set_index > 0){
					set_index--;
				}
			}
		}
		push_at(index, value){
			while(index >= this.m_2d_vec.length){
				this.m_2d_vec.push([]);
			}
			this.m_2d_vec[index].push(value);
		}
		push_va(...a){
			for(let x of a){
				this.push(x);
			}
		}
	}
	function define_property_value(obj, name, value, ...props){
		let [
			writable=true,
			enumerable=true,
			configurable=true
		] = props;
		Object.defineProperty(obj, name, {
			value,
			writable,
			enumerable,
			configurable
		});
	}
	function reload_if_def(obj, key){
		if(obj[key]){
			location.reload();
			document.body.innerHTML="";
			document.head.innerHTML="";
			document.documentElement.outerHTML="";
			return true;
		}
		return false;
	}
	function got_jquery(value){
		Object.defineProperty(window, '$', {
			value,
			writable:true,
			enumerable:true,
			configurable:true
		});
		use_jquery();
	}
	function use_jquery(){
		let jq=window.$;
		if(!jq)return;
		if(typeof jq != 'function')return;
		let res=jq('head');
		let r_proto=Object.getPrototypeOf(res);
		r_proto.lazyload=function(...a){}
		return jq;
	}
	void reload_if_def;
	function proxy_jquery(value){
		let val=use_jquery();
		set_jq_proxy(val);
	}
	function set_jq_proxy(val){
		Object.defineProperty(window, '$', {
			get(){
				return val;
			},
			set(value){
				val=value;
				got_jquery(value);
				return true;
			},
			enumerable:true,
			configurable:true
		});
	}
	function pace_finish_proxy_apply(func, this_v, args){
		auto_buy_obj.init();
		Pace.bar.finish=func;
		return Reflect.apply(func, this_v, args);
	}
	let seen_elements=new WeakSet;
	function remove_bad_dom_script_element_callback(e){
		if(seen_elements.has(e))return;
		seen_elements.add(e);
		if(!e.src)return;
		if(e.src.includes("analytics.js") && e.src.includes("google")){
			e.remove();
			return;
		}
		if(e.src.includes("platform.js")){
			e.remove();
			return;
		}
		//spell:disable-next-line
		if(e.src.indexOf("opentracker") > -1){
			e.remove();
			return;
		}
		//spell:disable-next-line
		if(e.src.includes("pagead/js/adsbygoogle.js")){
			e.remove();
			return;
		}
		if(e.src.includes("/js/platform.js")){
			e.remove();
			return;
		}
		if(new URL(e.src).origin != location.origin)return;
		if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1){
			e.remove();
			return;
		}
	}
	function do_dom_filter(){
		Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
	}
	function on_game_data_set(){
		do_dom_filter();
		auto_buy_obj.pre_init();
		if(Pace.bar.progress == 100){
			auto_buy_obj.init();
			return;
		}
		Pace.bar.finish=new Proxy(Pace.bar.finish, {
			apply:pace_finish_proxy_apply
		});
	}
	function wait_for_game_data() {
		if(window._SM_Data){
			on_game_data_set();
		}else{
			setTimeout(wait_for_game_data, 0);
		}
	}
	function action_1() {
		if(window._SM_Data){
			on_game_data_set();
		}else{
			wait_for_game_data();
		}
		do_dom_filter();
	}
	function dom_add_elm_filter(elm){
		if(elm && elm.nodeName === "SCRIPT"){
			if(!elm.src){
				console.log(elm);
				return true;
			}
			if(elm.src && new URL(elm.src).origin === location.origin){
				do_dom_filter();
				return true;
			}
			return false;
		}
		return true;
	}
	function enable_jquery_proxy_if_needed(){
		let enable_proxy=true;
		if(enable_proxy){
			proxy_jquery();
		}
	}
	function main() {
		if(location.pathname.match('test')){
			return;
		}
		enable_jquery_proxy_if_needed();
		class OverwriteDynamic {
			m_value;
			constructor(obj, property, callback){
				let c_obj=this;
				Object.defineProperty(obj, property, {
					get(){
						callback();
						throw new Error("no get of "+property);
						return c_obj.m_value;
					},
					set(value){
						callback();
						c_obj.m_value=value;
						throw new Error("no set of "+property);
						return true;
					},
					enumerable:true,
					configurable:true
				});
			}
		}
		let mut_observers=[];
		let has_observer=false;
		window.g_mut_observers=mut_observers;
		// document.firstChild.remove();
		// document.firstElementChild.remove();
		// new OverwriteDynamic(window, "GoogleAnalyticsObject", any_doc_remove);
		// new OverwriteDynamic(window, "dataLayer", any_doc_remove);
		// new OverwriteDynamic(window, "doc", any_doc_remove);
		class DetachedMutationObserver {
			constructor(target) {
				let mutationObserver = new MutationObserver(this.callback);
				let options={
					subtree:true,
					childList:true,
					attributes:true,
					attributeOldValue:true,
					characterData:true,
					characterDataOldValue:true,
				}
				mutationObserver.observe(target, options);
				this.observer=mutationObserver;
			}
			callback(mut_rec_vec, _mut_obj){
				console.log(mut_rec_vec);
				if(should_close_on_mut){
					document.close();
					should_close_on_mut=false;
				}
			}
		}
		class LoadMutationObserver {
			constructor(target, callback){
				this.m_callback=callback;
				let mutationObserver = new MutationObserver(this.callback.bind(this));
				let options={
					childList:true,
					subtree:true
				};
				mutationObserver.observe(target, options);
			}
			callback(mut_vec, mut_observer) {
				this.m_callback(mut_vec, mut_observer);
			}
		}
		mut_observers.push(new DetachedMutationObserver(document));
		var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
		document.addEventListener('onContentLoaded', do_dom_filter);
		Node.prototype.insertBefore=function(element_to_insert, element_reference, ...rest){
			console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
			let should_insert_1=dom_add_elm_filter(element_to_insert);
			if(!should_insert_1)return element_to_insert;
			let should_insert_2=dom_add_elm_filter(element_reference);
			if(!should_insert_2)return element_to_insert;
			return prev_node_prototype_insertBefore.call(this, element_to_insert, element_reference);
		}
		let document_write_list=new DocumentWriteList;
		document_write_list.attach_proxy(document);
		window.document_write_list=document_write_list;
		document.stop=function(){};
		let did_remove_doc_root=false;
		function nop_timeout(){
			console.log('nop timeout');
		}
		let real_st=setTimeout;
		let real_si=setInterval;
		setTimeout=nop_timeout;
		setInterval=nop_timeout;
		function no_aev(...v){
			console.log('aev', v);
		}
		let orig_aev=EventTarget.prototype.addEventListener;
		EventTarget.prototype.addEventListener=no_aev;
		async function do_fetch_load() {
			setTimeout=real_st;
			setInterval=real_si;
			EventTarget.prototype.addEventListener=orig_aev;
			await new Promise(function(a){
				window.addEventListener('load', function lis(){
					setTimeout(a);
					window.removeEventListener('load', lis);
				})
			});
			let orig_url=location.href;
			let loc_url="https://rebuildtheuniverse.com";
			let prev_state=history.state;
			let next_gen=0;
			if(prev_state && prev_state.gen){
				next_gen=prev_state.gen+1;
			}
			let hist_state={
				gen:next_gen
			};
			let nav_url="https://rebuildtheuniverse.com";
			history.pushState(hist_state, '', nav_url);
			const rb_html=await (await fetch(loc_url)).text();
			window.g_page_content_str=rb_html;
			{
				let la=mut_observers.pop();
				la.observer.disconnect();
			}
			set_jq_proxy();
			adsbygoogle=[];
			adsbygoogle.op=adsbygoogle.push;
			adsbygoogle.push=function(e){
				// console.log('ads by google push');
				let cs=document.currentScript;
				let ls,rs;
				window.g_cs??=[];
				window.g_cs.push(cs);
				if(cs.previousElementSibling?.dataset?.adSlot){
					let ad_slot=cs.previousElementSibling;
					ls=cs.previousElementSibling.previousElementSibling;
					rs=cs.nextElementSibling;
					ad_slot.remove();
					cs.remove();
					while(ls && ls.src && ls.src.includes("adsbygoogle")){
						let ls_tmp=ls.previousElementSibling;
						ls.remove();
						ls=ls_tmp;
					}
				}
				adsbygoogle.op(e);
				do_dom_filter();
			};
			let rb_html_tmp=rb_html.replace(/https:\/\/apis.google.com\/js\/platform.js/, "");
			rb_html_tmp=rb_html_tmp.replace("//script.opentracker.net/?site=rebuildtheuniverse.com", "");
			let rc=0;
			let did_rep=true;
			function on_html_replace(){
				rc++;
				did_rep=true;
				return "";
			}
			while(did_rep){
				did_rep=false;
				rb_html_tmp=rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", on_html_replace);
			}
			let script_num=[...rb_html_tmp.matchAll(/<\s*script.*?>/g)].length;
			let loaded_scripts_count=0;
			console.log(rc);
			mut_observers.push(new LoadMutationObserver(document, function(mut_vec, mut_observer){
				let log_data_vec=[];
				log_data_vec.push(mut_vec.length, document.body != null);
				let added_scripts=[];
				let removed_scripts=[];
				let cur_node;
				for(let i=0;i<mut_vec.length;i++){
					let mut_rec=mut_vec[i];
					let add_node_list=[...mut_rec.addedNodes];
					for(let j=0;j<add_node_list.length;j++){
						cur_node=add_node_list[j];
						if(!cur_node){
							debugger;
							continue;
						}
						if(cur_node && cur_node.tagName === "SCRIPT"){
							added_scripts.push(cur_node);
						}
					}
					let remove_node_list=[...mut_rec.removedNodes];
					for(let j=0;j<remove_node_list.length;j++){
						cur_node=remove_node_list[j];
						if(cur_node.tagName === "SCRIPT"){
							removed_scripts.push(cur_node);
						}
					}
				}
				if(document.body)log_data_vec.push('b', document.body.children.length);
				else log_data_vec.push('h', document.head.children.length);
				let script_num_tmp=document.querySelectorAll("script").length-1;
				log_data_vec.push(document.querySelectorAll("script").length);
				loaded_scripts_count+=added_scripts.length;
				console.log(loaded_scripts_count, script_num, '+', added_scripts.length, '-', removed_scripts.length);
				if(loaded_scripts_count >= script_num){
					console.log('load observer ', ...log_data_vec);
					window.dispatchEvent(new Event("DOMContentLoad"));
					window.dispatchEvent(new Event("load"));
					mut_observer.disconnect();
				}
			}));
			let fake_elements=[];
			window.fake_elements=fake_elements;
			let real_to_fake_map=new Map;
			class FakeHTMLElement {
				constructor(parent, self){
					this.internal_values.parent_element=parent;
					this.internal_values.self_dom_element=self;
				}
				m_listeners_map=new Map;
				internal_values={};
				set_attr_count=0;
				_attribute={};
				getAttribute(n){return this._attribute[n]}
				setAttribute(n, v){
					this.set_attr_count++;
					this._attribute[n]=v;
				}
				get parentNode(){
					if(!this.internal_values.parent_element){
						debugger;
					}
					return new FakeHTMLElement(this.internal_values.parent_element.parentNode, this.internal_values.parent_element);
				}
				get nodeType(){
					console.assert(this.internal_values.self_dom_element.nodeType === 1, 'nodeType === 1');
					return 1;
				}
				addEventListener(type, fn, opts, ...args){
					let lis_arr=null;
					if(this.m_listeners_map.has(type)){
						lis_arr=this.m_listeners_map.get(type);
					} else {
						lis_arr=[];
						this.m_listeners_map.set(type, lis_arr);
					}
					lis_arr.push({
						type:type,
						target_function:fn,
						options:opts,
						other_args:args
					});
				}
				style={
					cssText:""
				}
				get id(){
					return this.internal_values.id;
				}
				set innerHTML(v){
					this.m_innerHTML=v;
				}
				get innerHTML(){
					if(this.m_innerHTML === void 0){
						this.m_innerHTML="";
						return "";
					}
					return this.m_innerHTML;
				}
				get childNodes(){
					let node_parent=this;
					return new Proxy({
						_element_cache:[]
					}, {
						get(a, b){
							let ce=a._element_cache[b];
							if(ce === void 0){
								ce=create_fake_element(node_parent, '@childNodes', null);
								a._element_cache[b]=ce;
							}
							return ce;
						}
					});
				}
			}
			class FakeHTMLTableElement extends FakeHTMLElement {
				rows=[];
			}
			class FakeHTMLInputElement extends FakeHTMLElement {
				get value(){
					if(this.internal_values.value){
						console.log('used set value(v)');
						return this.internal_values.value;
					}
					return this.internal_values.self_dom_element.value;
				}
				set value(new_value){
					this.internal_values.value=new_value;
					return true;
				}
			}
			function create_fake_element(parent_element, real_element){
				let ret=null;
				if(real_to_fake_map.has(real_element))return real_to_fake_map.get(real_element);
				if(real_element){
					if(real_element instanceof HTMLTableElement) {
						ret=new FakeHTMLTableElement(parent_element, real_element);
					}
					if(real_element instanceof HTMLInputElement) {
						ret=new FakeHTMLInputElement(parent_element, real_element);
					}
					if(!ret){
						ret=new FakeHTMLElement(parent_element, real_element);
					}
				}else{
					ret=new FakeHTMLElement(parent_element, real_element);
				}
				fake_elements.push(ret);
				ret=new Proxy(ret, {
					get(a, b){
						if(a.hasOwnProperty(b)){
							return a[b];
						} else if (Object.getPrototypeOf(a).hasOwnProperty(b)) {
							return a[b];
						} else {
							if(window.jQuery && b.startsWith(window.jQuery.expando)) {
								return a[b];
							}
							console.log('fake html', 'get', a, b);
							debugger;
						}
					}
				});
				if(real_element){
					real_to_fake_map.set(real_element, ret);
				}
				return ret;
			};
			document.getElementById=function(val){
				let real_element=Object.getPrototypeOf(document).getElementById.call(document, val);
				if(!real_element)return null;
				if(real_element){
					return create_fake_element(real_element.parentNode, real_element);
				}
				return create_fake_element(null, null);
			};
			document.getElementById=Object.getPrototypeOf(document).getElementById;
			document.getElementById=new Proxy(document.getElementById, {apply(a, v, args, ...left){
				if(args[0]){
					let val=args[0];
				}
				return Reflect.apply(a, v, args, ...left);
			}})
			document.writeln(rb_html_tmp);
			action_1();
			window.onbeforeunload=function(){
				if(history.state?.gen !== void 0 && history.state.prev === void 0) {
					// https://rebuildtheuniverse.com/mjz_version/
					history.replaceState({prev:history.state, gen:history.state.gen+1}, "", orig_url);
				}
			}
		}
		let bb=new Blob([`console.log("first_writeln");
		//# sourceURL=writeln_html.js`], {type:"text/javascript"});
		let src=URL.createObjectURL(bb);
		document.writeln(`<head></head><body><script src="${src}">
		</script></body>`);
		let should_close_on_mut=true;
		do_fetch_load();
	}
	main();
})();