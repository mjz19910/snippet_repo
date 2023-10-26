import {KeepSome} from "./KeepSome.ts";

export class ProxyHandlers {
	weak_root: WeakRef<never|KeepSome>;
	count_arr: number[];
	constructor(root: never) {
		this.weak_root=new WeakRef(root);
		this.count_arr=[0];
	}
	generic(type: string,call_args: any,from: any[]) {
		let keep_vec=this.weak_root.deref();
		if(keep_vec===null) {
			console.log('ProxyHandlers reset KeepSome after gc collect');
			keep_vec=new KeepSome;
			this.weak_root=new WeakRef(keep_vec);
		}
		if(keep_vec)
			keep_vec.push((<any>from).concat([null,type,1,call_args]));
	}
	set_(call_args: [target: object,propertyKey: PropertyKey,value: any,receiver?: any],from: never) {
		this.generic('set',call_args,from);
		return Reflect.set(...call_args);
	}
	get_(call_args: [target: object,propertyKey: PropertyKey,receiver?: any],from: never) {
		this.generic('get',call_args,from);
		return Reflect.get(...call_args);
	}
	apply_(call_args: [target: Function,thisArgument: any,argumentsList: ArrayLike<any>],from: never) {
		this.generic('apply',call_args,from);
		return Reflect.apply(...call_args);
	}
	defineProperty_(call_args: [target: object,propertyKey: PropertyKey,attributes: PropertyDescriptor],from: never) {
		this.generic('defineProperty',call_args,from);
		return Reflect.defineProperty(...call_args);
	}
	getOwnPropertyDescriptor_(call_args: [target: object,propertyKey: PropertyKey],from: never) {
		this.generic('getOwnPropertyDescriptor',call_args,from);
		return Reflect.getOwnPropertyDescriptor(...call_args);
	}
}
