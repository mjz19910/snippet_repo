export class DataLoader {
	static int_parser = new WebAssembly.Function({parameters: ['externref'], results: ['f64']}, parseInt);
	/**
	 * @param {Storage} storage
	 */
	constructor(storage) {this.store = storage;}
	/**
	 * @param {string} key
	 * @param {string[]} def_value
	 */
	load_str_arr(key, def_value) {
		let data = this.store.getItem(key); if(data === null)
			return def_value; return data.split(",");
	}
	/**
	 * @param {string} key
	 * @param {any} def_value
	 */
	load_int_arr(key, def_value, storage_data = this.store.getItem(key)) {
		if(storage_data === null)
			return def_value; return this.parse_int_arr(storage_data);
	}
	/**
	 * @param {string} key
	 * @param {{ (_e: any): number[]; (): any; }} def_factory
	 */
	load_int_arr_cb(key, def_factory, storage_data = this.store.getItem(key)) {
		if(storage_data === null)
			return def_factory(); return this.parse_int_arr(storage_data);
	}
	/**
	 * @param {string} string
	 */
	default_split(string) {return string.split(",");}
	/**
	 * @param {string} data
	 */
	parse_int_arr(data) {return this.default_split(data).map(DataLoader.int_parser);}
}
