/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/js_wasm_importing.js
*/
function main() {
	class cur_class {
		/**
		 * @param {any} m_cur_key
		 * @param {any} m_cur_value
		 */
		add_func(m_cur_key,m_cur_value) {
			this.key_arr.push(m_cur_key);
			this.value_arr.push(m_cur_value);
		}
		/**
		 * @type {any[]}
		 */
		value_arr=[];
		/**
		 * @type {any[]}
		 */
		key_arr=[];
		/**
		 * @param {any} key
		 * @param {any} value
		 */
		set(key,value) {
			if(this.key_arr.indexOf(key)>-1) {
				throw new Error("Key conflict");
			}
			var x=this.key_arr.push(key);
			var y=this.value_arr.push(value);
			if(x==y) {
				return x;
			} else if(x>y) {
				throw new Error("Too many keys");
			} else if(y>x) {
				throw new Error("Too many values");
			} else {
				throw new Error("Unexpected result (x != y && x > y && y > x)");
			}
		}
		run() {
			let ret;
			let index=this.key_arr.indexOf(cur.m_key);
			let fn_value=this.value_arr[index];
			try {
				ret=fn_value();
			} catch(e) {
				console.error('user error');
				console.log(e);
			}
			return ret;
		}
		/** @type {any} */
		get value() {
			return this.m_value;
		}
		set value(val) {
			this.m_cur_value=val;
			if(!this.value_arr.includes(this.m_cur_value)) {
				this.add_func(this.m_cur_key,this.m_cur_value);
			}
			if(!this.m_has_value) {
				this.m_has_value=true;
				this.m_value=val;
			}
		}
		/** @type {any} */
		get key() {
			return this.m_key;
		}
		set key(key_val) {
			this.m_cur_key=key_val;
			if(!this.m_has_key) {
				this.m_has_key=true;
				this.m_key=key_val;
			}
		}
	}
	let cur=new cur_class;
	cur.key='js_wasm_importing';
	cur.value=function() {
		/*location.origin==="https://wasmbyexample.dev/"*/
		let fn=async function() {
			let fr=await fetch('/examples/importing-javascript-functions-into-webassembly/demo/rust/pkg/importing_javascript_functions_into_webassembly_bg.wasm');
			if(!fr.body) throw new Error("no body on fetch");
			let cr,rd=fr.body.getReader();
			/**
			 * @type {any[]}
			 */
			let u8=[];
			let uint_8_arr=new Uint8Array(0);
			while(!(cr=await rd.read()).done) {
				let v=cr.value;
				uint_8_arr=new Uint8Array(u8.concat(u8,v));
			}
			uint_8_arr[125]=1;
			let u8_edx=175+3;
			let u8_dt=uint_8_arr[u8_edx];
			console.log(u8_dt);
			uint_8_arr[175+3]=128;
			uint_8_arr[175+1]=128;
			let u8_idx=uint_8_arr.indexOf(128+40);
			console.log(u8_idx,uint_8_arr.indexOf(192,u8_idx));
			uint_8_arr[232]=128+32;
			uint_8_arr[234]=128;
			uint_8_arr[248]=128+40;
			uint_8_arr[250]=128;
			uint_8_arr[196]=128;
			uint_8_arr[194]=128;
			window.module_bytes=uint_8_arr;
			/**
			 * @type {WebAssembly.Exports}
			 */
			let wasm;
			function console_log_from_wasm() {
				if(!('console_log_from_wasm' in wasm&&typeof wasm.console_log_from_wasm=='function')) throw 1;
				wasm.console_log_from_wasm();
			}
			/**
			 * @param {any} arg0
			 * @param {any} arg1
			 */
			function __wbg_log_f48fd9f1562bf74d(arg0,arg1) {
				let varg0=getStringFromWasm(arg0,arg1);
				console.log(varg0);
			}
			let wasm_inst=await WebAssembly.instantiate(uint_8_arr,{
				"./importing_javascript_functions_into_webassembly": {
					__wbg_log_f48fd9f1562bf74d: __wbg_log_f48fd9f1562bf74d
				}
			});
			window.wasm_inst=wasm_inst;
			wasm=wasm_inst.instance.exports;
			let cachedTextDecoder=new TextDecoder("utf-8");
			if(!('buffer' in wasm.memory)) throw 1;
			let wasm_memory_cache=new Uint8Array(wasm.memory.buffer);
			function getUint8Memory() {
				if(!('buffer' in wasm.memory)) throw 1;
				if(wasm_memory_cache.buffer!==wasm.memory.buffer) {
					wasm_memory_cache=new Uint8Array(wasm.memory.buffer);
				}
				return wasm_memory_cache;
			}
			/**
			 * @param {any} ptr
			 * @param {any} len
			 */
			function getStringFromWasm(ptr,len) {
				return cachedTextDecoder.decode(getUint8Memory().subarray(ptr,ptr+len));
			}
			console_log_from_wasm();
			return wasm;
		};
		let pr=fn();
		pr.then(e => console.log(e));
		return pr;
	};
	return cur.run();
}
window.__ret=main();
