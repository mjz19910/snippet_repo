import {ghost_symbol} from "./ghost_symbol"
import {mk_run} from "./mk_run"

export class MKState {
	[ghost_symbol]=true;
	property_key: PropertyKey
	target: object
	property_path: string
	constructor(value: {},target: object,property_key: PropertyKey,property_path: string,noisy: boolean) {
		this.value=value
		this.property_key=property_key
		this.target=target
		this.property_path=property_path
		this.noisy=noisy
	}
	run() {
		return mk_run(this)
	}
	value={};
	value_tr="";
	/**@type {Function | null} */
	function_value: Function|null=null;
	noisy=false;
}
