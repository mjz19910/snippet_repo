import {GenericEventTarget} from "types/vm/GenericEventTarget"
import {HexRandomDataGenerator} from "types/vm/HexRandomDataGenerator"
import {DebugDataBox as DebugDataBox} from "../box/DebugDataBox"
import {DebugFunctionType} from "../box/DebugFunctionType"
import {MapAllKeys} from "./MapAllKeys"
import {ChromeDevToolsDebug} from "./ChromeDevToolsDebug"
import {ChromeDevToolsGetEventListeners} from "./ChromeDevToolsGetEventListeners"
import {ChromeDevToolsUnDebug} from "./ChromeDevToolsUnDebug"
import {ClassCallbackArgs} from "../box/ClassCallbackArgs"
import {DebugInfoBox} from "./DebugInfoBox"
import {DebugFunctionCallbackArgs} from "types/box/DebugFunctionCallbackArgs"

const random_data_generator=new HexRandomDataGenerator()
const static_event_target=new GenericEventTarget()
const MapKeys: MapAllKeys=['d','u','getEventListeners','__k']

export class DebugAPI {
	next_remote_id=0
	data_store: Map<string,any>=new Map
	event_handler=static_event_target
	// static simple_parser = new RustSimpleParser
	// static javascript_parser = new SimpleJavascriptParser
	static the_instance: DebugAPI|null=null
	static the(): DebugAPI {
		if(!this.the_instance) {
			this.the_instance=new this
		}
		return this.the_instance
	}
	root: DebugAPI|null=null
	constructor(root: DebugAPI|null=null) {
		if(root) {
			this.root=root
		} else {
			this.root=this
		}
	}
	hasData<N extends keyof typeof MapKeys>(key: typeof MapKeys[N]): boolean {
		for(let i=0;i<MapKeys.length;i++) {
			let eq=MapKeys[i]
			if(eq===key) {
				return this.data_store.has(eq)
			}
		}
		return false
	}
	do_is_extract<X extends any[],U extends X[0]>(typ: any,val: U): typ is X {
		void typ
		void val
		return true
	}
	extractData(...q: any[]): typeof q|null {
		switch(q[0]) {
			case 'd': return q
			case 'u': return q
			case 'getEventListeners': return q
			case '__k': return q
			default: throw new Error("Unknown key in getData")
		}
	}
	getDataWithKey(...q: any[]): typeof q|null {
		switch(q[0]) {
			case 'd': {
				let ret=this.data_store.get(q[0])
				if(!ret) return null
				let kv: [(typeof q)[0],typeof ret]=[q[0],ret]
				if(this.do_is_extract(kv,q[0])) {
					let rr=this.extractData(kv[0],kv[1])
					if(rr&&rr[0]===q[0]) {
						return rr
					}
				}
				return null
			}
			case 'u': {
				let ret=this.data_store.get(q[0])
				if(!ret) return null
				let kv: [(typeof q)[0],typeof ret]=[q[0],ret]
				if(this.do_is_extract(kv,q[0])) {
					let rr=this.extractData(kv[0],kv[1])
					if(rr&&rr[0]===q[0]) {
						let o=rr[1]
						return rr
					}
				}
				return null
			}
			case 'getEventListeners': {
				let ret=this.data_store.get(q[0])
				if(!ret) return null
				let kv: [(typeof q)[0],typeof ret]=[q[0],ret]
				if(this.do_is_extract(kv,q[0])) {
					let rr=this.extractData(kv[0],kv[1])
					if(rr&&rr[0]===q[0]) {
						return rr
					}
				}
				return null
			}
			case '__k': {
				let ret=this.data_store.get(q[0])
				if(!ret) return null
				let kv: [(typeof q)[0],typeof ret]=[q[0],ret]
				if(this.do_is_extract(kv,q[0])) {
					let rr=this.extractData(kv[0],kv[1])
					if(rr&&rr[0]===q[0]) {
						return rr
					}
				}
				return null
			}
			default: throw new Error("Unknown key in getData")
		}
	}
	retype_data<T extends U,U>(x: U,v: T): x is T {
		void x,v
		return true
	}
	setData<T extends string>(...q: [T,any]): boolean {
		if(!q[1]) return false
		switch(q[0]) {
			case 'd': this.data_store.set(q[0],q[1]); break
			case 'u': this.data_store.set(q[0],q[1]); break
			case '__k': this.data_store.set(q[0],q[1]); break
			case 'getEventListeners': this.data_store.set(q[0],q[1]); break
			default: throw new Error("Unknown key in setData")
		}
		return false
	}
	deleteData<T extends number>(key: MapAllKeys[T]) {
		return this.data_store.delete(key)
	}
	get_event_listener_var_vec_1(debug: ChromeDevToolsDebug,undebug: ChromeDevToolsUnDebug,func: DebugFunctionType,name: string) {
		let __d=this.root
		if(!__d) {
			return {
				type: 'error',
				data: null
			}
		}
		__d.attach(debug,undebug,null)
		let activate: DebugFunctionCallbackArgs=['function',func,{},[]]
		let data: DebugDataBox=['function',this.activate,activate]
		return __d.debuggerGetVar_a(data,name)
	}
	attach(debug: ChromeDevToolsDebug,undebug: ChromeDevToolsUnDebug,getEventListeners: ChromeDevToolsGetEventListeners|null) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getDataWithKey('d',null)
		let obj_undebug=this.getDataWithKey('u',null)
		let get_ev_lis=this.getDataWithKey('getEventListeners',null)
		if(!obj_debug) return this
		if(!obj_undebug) return this
		if(!get_ev_lis) return this
		if(obj_debug[1]!==debug||obj_undebug[1]!==undebug||get_ev_lis[1]!==getEventListeners) {
			this.setData('d',debug)
			this.setData('u',undebug)
			if(getEventListeners) {
				this.setData('getEventListeners',getEventListeners)
			}
		}
		return this
	}
	activate(v: DebugFunctionCallbackArgs|ClassCallbackArgs) {
		if(v[0]==='function') {
			let [,target,thisArgument,argumentsList]=v
			return Reflect.apply(target,thisArgument,argumentsList)
		} else {
			let [,target_type,argumentsList]=v
			return Reflect.construct(target_type,argumentsList)
		}
	}
	debuggerBreakpointCode() {
		bp_code: {
			if(!window.DebugAPI.the()) break bp_code
			let gd=window.DebugAPI.the().getDataWithKey("__k",null)
			if(!gd) break bp_code
			if(gd[0]!=='__k') break bp_code
			if(!gd[1]) break bp_code
			gd[1].get=(/** @type {string} */ __v: string) => {
				let ret: DebugInfoBox|null
				if(__v==='__v') {
					ret={type: 'eval-lost',data: null}
					return ret
				}
				try {
					let ret_data: [string,any]=[__v,eval(__v)]
					ret={type: 'var',data: ret_data}
					return ret
				} catch {
					ret={type: 'no-var',data: null}
					return ret
				}
			}
			{
				if(!window.DebugAPI.the().clearCurrentBreakpoint()) {
					console.log("failed to clear breakpoint")
				}
			}
		}
		0
	}
	clearCurrentBreakpoint() {
		let key: "u"="u"
		if(this.hasData(key)) {
			let undebug=this.getDataWithKey(key,null)
			if(!undebug) return false
			if(undebug[0]!==key) return false
			let undebug_2=undebug[1]
			if(this.current_debug_data&&undebug_2) {
				let dd=this.current_debug_data
				if(dd[0]==='function') {
					let [,,k2]=dd
					let [,v1]=k2
					undebug_2(v1)
				} else if(dd[0]==='class') {
					let [,,k2]=dd
					let [,v1]=k2
					undebug_2(v1)
				}
				return true
			}
		}
		return false
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value: Function): string {
		let function_code=function_value.toString()
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]))
		} else {
			console.log(function_code)
		}
		return function_code
	}
	/**@type {DebugDataBox | null} */
	current_debug_data: DebugDataBox|null=null
	/**
	 * @param {DebugDataBox} debug_data
	 * @param {string} var_match
	 */
	debuggerGetVarArray_a(debug_data: DebugDataBox,var_match: string) {
		if(!this.hasData("d")||!this.getDataWithKey("u",null)) {
			return {
				type: 'invalid-state-error',
				data: null
			}
		}
		let ma=var_match.matchAll(/.-.|./g)
		let sr=[]
		let qs=[...ma].map(e => e[0])
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0))
				continue
			}
			let fs=j.split('-')
			let sa=fs[0].charCodeAt(0)
			let se=fs[1].charCodeAt(0)
			for(let i=sa;i<=se;i++) {
				sr.push(i)
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e))
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('')
		let __y=this.event_handler
		void __y
		if(debug_data[0]==='class') {
			this.current_debug_data=debug_data
		} else if(debug_data[0]==='function') {
			this.current_debug_data=debug_data
		} else {
			throw new Error("Invalid state")
		}
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode)
		let rep_arr=[]
		{
			rep_arr.push('__v','__v_'+rng_bytes)
			rep_arr.push('__k','__k_'+rng_bytes)
			rep_arr.push('__x','__x_'+rng_bytes)
		}
		let tmp_key: '__k'='__k'
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i]
				let cur1=rep_arr[i]+1
				if(tmp_key===cur0) {
					(tmp_key as any)=cur1
				}
				breakpoint_code_string=breakpoint_code_string.replaceAll(cur0,cur1)
			}
		}
		let tmp_value={
			/**@returns {{type:'no-var'|'eval-lost'|null} | {type:'var', data:null}} */
			get(/**@type {string}*/_q: string): {type: 'no-var'|'eval-lost'|null}|{type: 'var'; data: null} {return {type: null}}
		}
		this.setData(<any>tmp_key,<any>tmp_value)
		let debug=this.getDataWithKey('d',null)
		if(!debug) throw new Error("Invalid")
		if(debug[0]!=='d'||debug[1]===null) throw new Error("Invalid")
		debug[1](this.current_debug_data[1],`${breakpoint_code_string}`)
		// ---- Activate ----
		let exec_return=null
		if(this.current_debug_data[0]==='class') {
			let [,p2,p3]=this.current_debug_data
			p2(p3)
		} else if(this.current_debug_data[0]==='function') {
			let [,p2,p3]=this.current_debug_data
			p2(p3)
		}
		let exec_res_arr=[]
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res=tmp_value.get(j)
				if(!res) continue
				switch(res.type) {
					case null: continue
					case 'var':
						exec_res_arr.push(res.data)
						break
					case 'no-var':
						break
					case 'eval-lost':
						console.log('can\'t use dynamic eval for var hidden by eval argument "'+j+'"')
				}
			}
		}
		this.deleteData(tmp_key)
		if(exec_res_arr.length) {
			return {
				type: 'data',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			}
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: exec_return
			}
		}
	}
	debuggerGetVarArray_c(class_value: new (...a: any[]) => {},target_arg_vec: any[],var_match: string) {
		/**@type {ClassCallbackArgs} */
		let run_box: ClassCallbackArgs=['class',class_value,['class',target_arg_vec]]
		let data: DebugDataBox=['class',this.activate,run_box]
		return this.debuggerGetVarArray_a(data,var_match)
	}
	/**
	 * @param {DebugDataBox} run_box
	 * @param {string} var_match
	 */
	debuggerGetVarArray(run_box: DebugDataBox,var_match: string) {
		if(run_box[0]==='function') {
			return this.debuggerGetVarArray_a(run_box,var_match)
		} else if(run_box[0]==='class') {
			return this.debuggerGetVarArray_a(run_box,var_match)
		}
	}
	/**
	 * @param {DebugDataBox} debug_data
	 * @param {string} var_name
	 */
	debuggerGetVar_a(debug_data: DebugDataBox,var_name: string) {
		if(!this.hasData("d")||!this.getDataWithKey("u",null)) {
			return {
				type: 'invalid-state-error',
				data: null
			}
		}
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('')
		this.current_debug_data=debug_data
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode)
		let rep_arr=[]
		{
			rep_arr.push('__v','__v_'+rng_bytes)
			rep_arr.push('__k','__k_'+rng_bytes)
			rep_arr.push('__x','__x_'+rng_bytes)
		}
		let map_arr=[dbg_str_func]
		let tmp_key: '__k'='__k'
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i]
				let cur1=rep_arr[i]+1
				if(tmp_key===cur0) {
					(tmp_key as any)=cur1
				}
				map_arr[0]=map_arr[0].replaceAll(cur0,cur1)
			}
			dbg_str_func=map_arr[0]
		}
		let tmp_value={
			type: 'none',
			/**@arg {string} v */
			get(v: string) {
				void v
				return {
					type: 'none',
					data: null
				}
			}
		}
		this.setData(<any>tmp_key,<any>tmp_value)
		let fn: ChromeDevToolsDebug|['d', ChromeDevToolsDebug|null]|null=this.getDataWithKey('d',null) as any as ['d', ChromeDevToolsDebug|null]
		if(!fn||fn[0]!=='d'||fn[1]===null) throw new Error("Invalid")
		fn=fn[1]
		let dd=this.current_debug_data
		let ra=dd[2]
		fn(ra[1],`${dbg_str_func}`)
		let activate_return=null
		// ---- Activate ----
		if(this.current_debug_data[0]==='class') {
			let [,activate,p3]=this.current_debug_data
			let [t1,v1,v2]=p3
			activate_return=activate([t1,v1,v2])
		} else if(this.current_debug_data[0]==='function') {
			let [,activate,p3]=this.current_debug_data
			let [t1,v1,v2]=p3
			activate_return=activate([t1,v1,v2])
		}
		let breakpoint_result=null
		if(tmp_value.get) {
			breakpoint_result=tmp_value.get(var_name)
		}
		this.deleteData(tmp_key)
		if(breakpoint_result?.type==='var') {
			return {
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			}
		}
		if(breakpoint_result) {
			return {
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			}
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		}

	}
	/**
	 * @param {DebugDataBox} class_value
	 * @param {string} var_name
	 */
	debuggerGetVar_c(class_value: DebugDataBox,var_name: string) {
		if(typeof class_value!='function') {
			return {
				type: 'argument-error',
				value: null
			}
		}
		return this.debuggerGetVar_a(class_value,var_name)
	}
	/**
	 * @param {DebugDataBox} function_value
	 * @param {string} var_name
	 */
	debuggerGetVar(function_value: DebugDataBox,var_name: string) {
		return this.debuggerGetVar_a(function_value,var_name)
	}
}
