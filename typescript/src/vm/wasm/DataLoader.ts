export class DataLoader {
	store: Storage;
	null_sym: symbol;
	constructor(storage: Storage) {
		this.store=storage;
		this.null_sym=Symbol('null');
	}
	load_str_arr(key: any,def_value: any) {
		if(!this.store)
			return this.create_default(def_value);
		let data=this.store.getItem(key);
		if(data===null)
			return this.create_default(def_value);
		return data.split(",");
	}
	load_int_arr(key: any,def_value: any) {
		if(!this.store)
			return this.create_default(def_value);
		let storage_data=this.store.getItem(key);
		if(storage_data===null)
			return this.create_default(def_value);
		return this.parse_int_arr(storage_data);
	}
	default_split(string: string) {
		return string.split(",");
	}
	parse_int_arr(data: any) {
		return this.default_split(data).map(parseInt);
	}
	create_default(value_or_factory: () => any) {
		let value=this.null_sym;
		if(typeof value_or_factory==='function') {
			// this is a value factory
			return value_or_factory();
		}
		let cc=Object.getPrototypeOf(value_or_factory).constructor;
		try {
			// get it as an object, the convert back to unboxed if possible
			value=(new cc(value_or_factory)).valueOf();
		} catch {}
		if(value===this.null_sym) {
			// none of them worked, it is a default value that you can't construct and call valueOf on
			return value_or_factory;
		}
		return value;
	}
}
