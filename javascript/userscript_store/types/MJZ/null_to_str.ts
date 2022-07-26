export function null_to_str<T extends any,U extends Exclude<T,null>>(e: U|null) {
	if(e===null) return 'null'
	return e
}
