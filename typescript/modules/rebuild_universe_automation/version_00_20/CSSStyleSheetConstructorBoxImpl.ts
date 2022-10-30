import {Box} from "../../../box/Box"
import {CSSStyleSheetBox} from "../../../box/CSSStyleSheetBox"
import {CSSStyleSheetConstructorBox} from "../../../box/CSSStyleSheetConstructorBox"

export class CSSStyleSheetConstructorBoxImpl {
	/**@type {"constructor_box"} */
	type: "constructor_box"
	/**@type {"javascript"} */
	from: "javascript"
	/**@type {"CSSStyleSheet"} */
	instance_type: "CSSStyleSheet"
	/**@type {"CSSStyleSheet"} */
	constructor_type: "CSSStyleSheet"
	value: typeof CSSStyleSheet
	constructor(value: typeof CSSStyleSheet) {
		this.type='constructor_box'
		this.from='javascript'
		this.instance_type='CSSStyleSheet'
		this.constructor_type='CSSStyleSheet'
		this.value=value
	}
	as_type(to_match: 'function') {
		if(typeof this.value===to_match) {
			return this
		}
		return null
	}
	factory(...arr: Box[]) {
		let args_state: CSSStyleSheetConstructorBox['args_type']={
			state: 0,
			value: []
		}
		for(let i=0;i<arr.length;i++) {
			let val=arr[i]
			if(typeof val!='object')
				continue
			if(val===null)
				continue
			if(val.value instanceof Document) {
				throw new Error("Unexpected document")
			}
			if(val.type!='shape_box')
				continue
			args_state={
				state: 1,
				value: [val.value]
			}
		}
		let obj=new this.value(...args_state.value)
		return new CSSStyleSheetBox(obj)
	}
}
