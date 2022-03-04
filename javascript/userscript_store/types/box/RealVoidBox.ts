export class RealVoidBox {
	readonly type = "real_void";
	value:void;
	constructor(value:void){
		this.value=value;
	}
	as_type(_x: 'function' | 'object') {
		return null;
	}
}
