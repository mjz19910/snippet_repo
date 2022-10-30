import {BaseBox} from "./BaseBox.js";
import {not_reached} from "./not_reached";

export class NewableFactory {
	/**@type {"constructor_box"} */
	type = "constructor_box";
	/**@type {'box[]'} */
	arguments = "box[]";
	/**@type {'box'} */
	return = "box";
	/**@type {<T>(fn:{new (...v:Box[]):T})=>Box} */
	value;
	/**@arg {Parameters<BaseBox['as_type']>[0]} type */
	as_type(type) {
		switch(typeof this.value) {
			case 'function': this.value; break;
			default: not_reached();
		}
		if(typeof this.value === type) {
			return this;
		}
		return null;
	}
	/**@arg {<T>(fn: new (...v: Box[]) => T) => Box} value */
	constructor(value) {
		this.value = value;
	}
}
