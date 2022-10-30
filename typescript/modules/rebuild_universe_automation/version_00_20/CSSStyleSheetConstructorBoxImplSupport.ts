import {Box} from "../../../box/Box"
import {CSSStyleSheetBox} from "../../../box/CSSStyleSheetBox"
import {CSSStyleSheetConstructorBox} from "../../../box/CSSStyleSheetConstructorBox"
import {NoArgsType} from "../../../box/NoArgsType"

export class CSSStyleSheetConstructorBoxImplSupport {
	type: "constructor_box"
	from: "javascript"
	instance_type: "CSSStyleSheet"
	constructor_type: "CSSStyleSheet"
	value: typeof CSSStyleSheet
	constructor(value: typeof CSSStyleSheet) {
		this.type='constructor_box'
		this.from='javascript'
		this.instance_type='CSSStyleSheet'
		this.constructor_type='CSSStyleSheet'
		this.value=value
	}
	/**@arg {'function'} to_match */
	as_type(to_match: 'function') {
		if(typeof this.value===to_match) {
			return this
		}
		return null
	}
	/**@arg {Box[]} arr */
	factory(...arr: Box[]) {
		let initial_state: NoArgsType={
			state: 0,
			value: []
		}
		let args_state: CSSStyleSheetConstructorBox['args_type']=initial_state
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
				value: [val.value],
				state: 1
			}
		}
		let obj: CSSStyleSheet=new this.value(...args_state.value)
		return new CSSStyleSheetBox(obj)
	}
}
