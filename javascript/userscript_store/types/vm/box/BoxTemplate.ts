import BoxInterface from "./BoxInterface";

export default class BoxTemplate<T> implements BoxInterface {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
	as_type(x:'function') {
		let tof=typeof this.value;
		switch(tof){
			case 'object':{

			} break;
			case 'bigint':{
			} break;
			case 'boolean':{

			} break;
			case 'function':{
				if(x === 'function')return this;
			}
		}
		return null;
	}
}
