export function as_base64_typeid(id_arr: Uint8Array) {
	return btoa(String.fromCharCode.apply("",Array.from(id_arr))).replaceAll("=","");
}
