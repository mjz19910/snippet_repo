import {Box} from "../../../box/Box.js"
import {BaseBox} from "./BaseBox.js"
import {not_reached} from "./not_reached"

export class NewableFactory {
	type: "constructor_box"
	arguments: 'box[]'
	return: 'box'
	value: (fn: new (...v: Box[]) => {}) => Box
	as_type(type: Parameters<BaseBox['as_type']>[0]) {
		switch(typeof this.value) {
			case 'function': this.value; break
			default: not_reached()
		}
		if(typeof this.value===type) {
			return this
		}
		return null
	}
	constructor(value: (fn: new (...v: Box[]) => {}) => Box) {
		this.type='constructor_box'
		this.arguments='box[]'
		this.return='box'
		this.value=value
	}
}
