import {GenericEventTarget} from "../vm/GenericEventTarget.js";
import {HexRandomDataGenerator} from "../vm/HexRandomDataGenerator.js";
import {DebugDataBox} from "./box/DebugDataBox.js";
import {DebugFunctionType} from "./box/DebugFunctionType.js";
import {ChromeDevToolsDebug} from "./dev_tools_debugger/ChromeDevToolsDebug.js";
import {ChromeDevToolsGetEventListeners} from "./dev_tools_debugger/ChromeDevToolsGetEventListeners.js";
import {ChromeDevToolsUnDebug} from "./dev_tools_debugger/ChromeDevToolsUnDebug.js";
import {DebugFunctionBox} from "./box/DebugFunctionBox.js";
import {DebugClassBox} from "./box/DebugClassBox.js";
import {DebugInfoValue} from "./DebugInfoValue.js";

export class DebugAPI {
	static hex_generator=new HexRandomDataGenerator();
	static static_event_target=new GenericEventTarget();
	static the_instance: DebugAPI|null=null;
	static the(): DebugAPI {
		if(!this.the_instance) {
			this.the_instance=new this;
		}
		return this.the_instance;
	}
	next_remote_id=0;
	data_store: Map<string,any>=new Map;
	event_handler=DebugAPI.static_event_target;
	root: DebugAPI|null=null;
	constructor(root: DebugAPI|null=null) {
		if(root) {
			this.root=root;
		} else {
			this.root=this;
		}
	}
	hasData(key: string): boolean {
		return this.data_store.has(key);
	}
	getData(a: 'd'): ChromeDevToolsDebug|null;
	getData(a: 'u'): ChromeDevToolsUnDebug|null;
	getData(a: 'getEventListeners'): ChromeDevToolsGetEventListeners|null;
	getData(a: '__k'): DebugInfoValue|null;
	getData(a: string): any {
		return this.data_store.get(a);
	}
	setData(a: 'd',b: ChromeDevToolsDebug|null): boolean;
	setData(a: 'u',b: ChromeDevToolsUnDebug|null): boolean;
	setData(a: 'getEventListeners',b: ChromeDevToolsGetEventListeners|null): boolean;
	setData(a: '__k',b: DebugInfoValue|null): boolean;
	setData(a: string,b: any): boolean {
		if(!b) return false;
		switch(a) {
			case 'd': this.data_store.set(a,b); break;
			case 'u': this.data_store.set(a,b); break;
			case '__k': this.data_store.set(a,b); break;
			case 'getEventListeners': this.data_store.set(a,b); break;
			default: throw new Error("Unknown key in setData");
		}
		return false;
	}
	deleteData(key: string) {
		return this.data_store.delete(key);
	}
	get_event_listener_var_vec_1(debug: ChromeDevToolsDebug,undebug: ChromeDevToolsUnDebug,func: DebugFunctionType,name: string) {
		let __d=this.root;
		if(!__d) {
			return {
				type: 'error',
				data: null
			};
		}
		__d.attach(debug,undebug,null);
		let data: DebugFunctionBox=['function',this.activate_function,func,{},[]];
		return __d.debuggerGetVarInternal(data,name);
	}
	attach(debug: ChromeDevToolsDebug,undebug: ChromeDevToolsUnDebug,getEventListeners: ChromeDevToolsGetEventListeners|null) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getData('d');
		let obj_undebug=this.getData('u');
		let get_ev_lis=this.getData('getEventListeners');
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData('d',debug);
			this.setData('u',undebug);
			if(getEventListeners) {
				this.setData('getEventListeners',getEventListeners);
			}
		}
		return this;
	}
	activate_function(target: DebugFunctionType,thisArgument: {},argumentsList: any[]): any {
		return Reflect.apply(target,thisArgument,argumentsList);
	}
	activate_class(target_type: new (...a: any[]) => {},argumentsList: any[]): {} {
		return Reflect.construct(target_type,argumentsList);
	}
	debuggerBreakpointCode() {
		bp_code: {
			if(!window.DebugAPI) break bp_code;
			if(!window.DebugAPI.getData('__k')) break bp_code;
			window.DebugAPI.getData('__k')!.get=(__v) => {
				if(__v=='__v') {
					return {type: 'hidden-var',var: __v};
				}
				try {
					return {type: 'var',data: [__v,eval(__v)]};
				} catch {
					return {type: 'no-var',data: null};
				}
			};
			window.DebugAPI.getData('__k')!.valid=true;
			if(!window.DebugAPI.clearCurrentBreakpoint()) {
				console.log("failed to clear breakpoint");
			}
		}
		0;
	}
	clearCurrentBreakpoint() {
		if(this.hasData('u')&&this.current_debug_data) {
			let undebug=this.getData('u');
			undebug!(this.current_debug_data[2]);
			return true;
		}
		return false;
	}
	stringifyFunction(function_value: Function): string {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	current_debug_data: DebugDataBox|null=null;
	debuggerGetVarArrayInternal(debug_data: DebugDataBox,var_match: string) {
		if(!this.hasData("d")||!this.hasData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		let ma=var_match.matchAll(/.-.|./g);
		let sr=[];
		let qs=[...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs=j.split('-');
			let sa=fs[0].charCodeAt(0);
			let se=fs[1].charCodeAt(0);
			for(let i=sa;i<=se;i++) {
				sr.push(i);
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e));
		let rng_bytes=Array(5).fill('').map(() => DebugAPI.hex_generator.next_byte()).join('');
		this.current_debug_data=debug_data;
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode);
		breakpoint_code_string=breakpoint_code_string.replaceAll('__v','__v_'+rng_bytes);
		let tmp_value=new DebugInfoValue;
		this.setData('__k',tmp_value);
		let debug=this.getData('d');
		if(!debug) throw new Error("Invalid");
		debug(this.current_debug_data[1],`${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return=null;
		if(this.current_debug_data[0]==='class') {
			let [,p2,p3,p4]=this.current_debug_data;
			p2(p3,p4);
		} else if(this.current_debug_data[0]==='function') {
			let [,p2,p3,p4,p5]=this.current_debug_data;
			p2(p3,p4,p5);
		}
		let exec_res_arr=[];
		if(tmp_value.valid) {
			for(let var_name of vars_arr) {
				let res=tmp_value.get(var_name);
				if(!res) continue;
				switch(res.type) {
					case null: continue;
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'hidden-var':
						console.log('can\'t use dynamic eval for shadowed var_name: "'+var_name+'"');
				}
			}
		}
		this.deleteData('__k');
		if(exec_res_arr.length) {
			return {
				type: 'data',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: exec_return
			}
		};
	}
	debuggerGetVarArrayClass(class_value: new (...a: any[]) => {},target_arg_vec: any[],var_match: string) {
		let data: DebugClassBox=['class',this.activate_class,class_value,target_arg_vec];
		return this.debuggerGetVarArrayInternal(data,var_match);
	}
	debuggerGetVarArray(run_box: DebugDataBox,var_match: string) {
		return this.debuggerGetVarArrayInternal(run_box,var_match);
	}
	debuggerGetVarInternal(debug_data: DebugDataBox,var_name: string) {
		if(!this.hasData("d")||!this.hasData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		let rng_bytes=Array(5).fill('').map(() => DebugAPI.hex_generator.next_byte()).join('');
		this.current_debug_data=debug_data;
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode);
		dbg_str_func=dbg_str_func.replaceAll('__v','__v_'+rng_bytes);
		let tmp_value=new DebugInfoValue;
		this.setData('__k',tmp_value);
		let debug=this.getData('d');
		if(debug===null) throw new Error("Invalid");
		debug(this.current_debug_data[2],`${dbg_str_func}`);
		let activate_return;
		// ---- Activate ----
		if(this.current_debug_data[0]==='function') {
			let [,activate,v1,v2,v3]=this.current_debug_data;
			activate_return=activate(v1,v2,v3);
		} else {
			let [,activate,v1,v2]=this.current_debug_data;
			activate_return=activate(v1,v2);
		}
		let breakpoint_result=tmp_value.get(var_name);
		this.deleteData('__k');
		if(breakpoint_result?.type==='var') {
			return {
				type: 'data',
				data: {
					result: breakpoint_result.data,
					callback_result: activate_return
				}
			};
		}
		if(breakpoint_result) {
			return {
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					callback_result: activate_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				callback_result: activate_return
			}
		};
	}
	debuggerGetVar(function_value: DebugDataBox,var_name: string) {
		return this.debuggerGetVarInternal(function_value,var_name);
	}
}
