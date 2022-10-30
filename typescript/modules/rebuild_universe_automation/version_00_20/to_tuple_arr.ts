export function to_tuple_arr<T,U>(keys: T[],values: U[]): [T,U][] {
	let ret: [typeof keys[0],typeof values[0]][]=[]
	for(let i=0;i<keys.length;i++) {
		let k=keys[i]
		let v=values[i]
		let item: [typeof k,typeof v]=[k,v]
		ret.push(item)
	}
	return ret
}
