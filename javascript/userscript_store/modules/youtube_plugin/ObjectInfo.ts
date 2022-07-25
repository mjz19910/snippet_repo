export class ObjectInfo {
	chunk_beg: string
	chunk_sep: string
	chunk_end: string
	key_sep: string
	constructor() {
		let [gr_0,gr_1,gr_2]="{{:,:}}".split(":")
		this.chunk_beg=gr_0
		this.chunk_sep=gr_1
		this.chunk_end=gr_2
		this.key_sep=this.chunk_end+this.chunk_sep+this.chunk_beg
	}
	keys_of(object: {},filter_function: ((value: string,index: number,array: string[]) => value is string)|undefined) {
		let object_keys=Object.keys(object)
		if(filter_function)
			object_keys=object_keys.filter(filter_function)
		return this.chunk_beg+object_keys.join(this.key_sep)+this.chunk_end
	}
	static instance: ObjectInfo
	static init() {
		this.instance = new this;
	}
}
