import {Box} from "../../../box/Box.js"
import {CSSStyleSheetBox} from "../../../box/CSSStyleSheetBox.js"
import {CSSStyleSheetConstructorBox} from "../../../box/CSSStyleSheetConstructorBox.js"
import {NoArgsType} from "../../../box/NoArgsType.js"

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
	as_type(to_match: 'function') {
		if(typeof this.value===to_match) {
			return this
		}
		return null
	}
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
