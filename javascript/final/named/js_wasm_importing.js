/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/js_wasm_importing.js
*/
function main() {
	class cur {
		static value_arr=[]
		static key_arr=[]
		static set(key,value) {
			if(this.key_arr.indexOf(key)>-1) {
				throw new Error("Key conflict")
			}
			var x=this.key_arr.push(key)
			var y=this.value_arr.push(value)
			if(x==y) {
				return x
			} else if(x>y) {
				throw new Error("Too many keys")
			} else if(y>x) {
				throw new Error("Too many values")
			} else {
				throw new Error("Unexpected result (x != y && x > y && y > x)")
			}
		}
		static run() {
			let ret
			let index=this.key_arr.indexOf(cur.m_key)
			let fn_value=this.value_arr[index]
			try {
				ret=fn_value()
			} catch(e) {
				console.error('user error')
				console.log(e)
			}
			return ret
		}
		static get value() {
			return this.m_value
		}
		static set value(val) {
			this.m_cur_value=val
			if(!this.value_arr.includes(this.m_cur_value)) {
				add_func(this.m_cur_key,this.m_cur_value)
			}
			if(!this.m_has_value) {
				this.m_has_value=true
				this.m_value=val
			}
		}
		static get key() {
			return this.m_key
		}
		static set key(key_val) {
			this.m_cur_key=key_val
			if(!this.m_has_key) {
				this.m_has_key=true
				this.m_key=key_val
			}
		}
	}
	cur.key='js_wasm_importing'
	cur.value=function() {
		/*location.origin==="https://wasmbyexample.dev/"*/
		let fn=async function() {
			let fr=await fetch('/examples/importing-javascript-functions-into-webassembly/demo/rust/pkg/importing_javascript_functions_into_webassembly_bg.wasm')
			let cr,rd=fr.body.getReader()
			let u8
			while(!(cr=await rd.read()).done) {
				let v=cr.value
				if(u8) {
					v=u8.concat(u8,v)
				}
				u8=v
			}
			u8[125]=1
			let u8_edx=175+3
			let u8_dt=u8[u8_edx]
			console.log(u8_dt)
			u8[175+3]=128
			u8[175+1]=128
			let u8_idx=u8.indexOf(128+40)
			console.log(u8_idx,u8.indexOf(192,u8_idx))
			u8[232]=128+32
			u8[234]=128
			u8[248]=128+40
			u8[250]=128
			u8[196]=128
			u8[194]=128
			window.module_bytes=u8
			let wasm
			function console_log_from_wasm() {
				wasm.console_log_from_wasm()
			}
			function __wbg_log_f48fd9f1562bf74d(arg0,arg1) {
				let varg0=getStringFromWasm(arg0,arg1)
				console.log(varg0)
			}
			window.wasm_inst=await WebAssembly.instantiate(u8,{
				"./importing_javascript_functions_into_webassembly": {
					__wbg_log_f48fd9f1562bf74d: __wbg_log_f48fd9f1562bf74d
				}
			})
			wasm=window.wasm_inst.instance.exports
			let cachedTextDecoder=new TextDecoder("utf-8")
			let wasm_memory_cache=wasm.memory.buffer
			function getUint8Memory() {
				if(wasm_memory_cache.buffer!==wasm.memory.buffer) {
					wasm_memory_cache=new Uint8Array(wasm.memory.buffer)
				}
				return wasm_memory_cache
			}
			function getStringFromWasm(ptr,len) {
				return cachedTextDecoder.decode(getUint8Memory().subarray(ptr,ptr+len))
			}
			console_log_from_wasm()
			return wasm
		}
		let pr=fn()
		pr.then(e => console.log(e))
		return pr
	}
	return cur.run()
}
window.__ret=main()
