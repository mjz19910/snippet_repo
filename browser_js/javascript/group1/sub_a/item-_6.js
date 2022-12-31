/* spell:words mustafaq cupcc
-- version_list item 6 --
v1 (old): snippet_repo/javascript/final/item6_v1.js
v2 (cur): snippet_repo/javascript/group1/sub_a/item-_6.js
*/
/**
 * @arg {number} id
 * @arg {string | any[]} arr
 */
function encode_section(id,arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [id,arr.length,...arr];
}
/**
 * @arg {string | any[]} arr
 */
function encode_string(arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [arr.length,...arr];
}

/** @type {<T>(v:T|null)=>T} */
function not_null(value) {
	if(value===null) throw new Error("Unexpected null");
	return value;
}

async function run() {
	const wasm_header=[0,0x61,0x73,0x6d,1,0,0,0];
	// const empty_wasm_module=await WebAssembly.compile(new Uint8Array(wasm_header));
	/**
	 * @type {WebAssembly.Module[]}
	 */
	let module_list=[];
	window.module_list=module_list;
	for(let i=0;i<256;i++) {
		let tmp=not_null(encode_string([0x65])).concat([]);
		let wasm_module_bytes=wasm_header.concat(not_null(encode_section(0,tmp)));
		try {
			let wasm_module=await WebAssembly.compile(new Uint8Array(wasm_module_bytes));
			module_list.push(wasm_module);
		} catch {}
	}
	console.log('success rate',module_list.length/256);
}
run();
