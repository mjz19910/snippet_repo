export function as_base64_typeid(id_arr: Uint8Array,skip_offset:number) {
	let b64=btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=","");
	if(skip_offset> 0) {
		return b64.slice(skip_offset*2)
	} else {
		return b64;
	}
}
