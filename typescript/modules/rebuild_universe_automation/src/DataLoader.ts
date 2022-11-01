import {data_loader_parse_value} from "./data_loader_parse_value.js";

export class DataLoader {
	store: Storage
	constructor(storage: Storage) {
		this.store=storage
	}
	load_str_arr(key: string,def_value: string[]) {
		let data=this.store.getItem(key)
		if(data===null)
			return def_value
		return data.split(",")
	}
	load_int_arr(key: string,def_value: number[]) {
		let storage_data=this.store.getItem(key)
		if(storage_data===null)
			return def_value
		return this.parse_int_arr(storage_data)
	}
	load_int_arr_cb(key: string,def_factory: () => number[]) {
		let storage_data=this.store.getItem(key)
		if(storage_data===null)
			return def_factory()
		return this.parse_int_arr(storage_data)
	}
	parse_int_arr(data: string) {
		return data.split(",").map(data_loader_parse_value)
	}
}
