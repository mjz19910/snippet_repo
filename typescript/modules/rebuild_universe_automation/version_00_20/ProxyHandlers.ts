import {KeepSome} from "./KeepSome"

export class ProxyHandlers {
	weak_root: WeakRef<any>
	count_arr: [number]
	constructor(root: any) {
		this.weak_root=new WeakRef(root)
		this.count_arr=[0]
	}
	generic(type: string,call_args: any,from: any[]) {
		let keep_vec=this.weak_root.deref()
		if(keep_vec===null) {
			console.log('ProxyHandlers reset KeepSome after gc collect')
			keep_vec=new KeepSome
			this.weak_root=new WeakRef(keep_vec)
		}
		keep_vec.push(from.concat([null,type,1,call_args]))
	}
	set_(call_args: [o: object,k: PropertyKey,v: any,r?: any],from: any[]) {
		this.generic('set',call_args,from)
		return Reflect.set(...call_args)
	}
	get_(call_args: [o: object,k: PropertyKey,r?: any],from: any[]) {
		this.generic('get',call_args,from)
		return Reflect.get(...call_args)
	}
	apply_(call_args: [f: Function,o: any,l: ArrayLike<any>],from: any[]) {
		this.generic('apply',call_args,from)
		return Reflect.apply(...call_args)
	}
	defineProperty_(call_args: [o: object,k: PropertyKey,o: PropertyDescriptor],from: any[]) {
		this.generic('defineProperty',call_args,from)
		return Reflect.defineProperty(...call_args)
	}
	getOwnPropertyDescriptor_(call_args: [o: object,k: PropertyKey],from: any[]) {
		this.generic('getOwnPropertyDescriptor',call_args,from)
		return Reflect.getOwnPropertyDescriptor(...call_args)
	}
}
