import {Box} from "../../../box/Box"
import {NoArgsType} from "../../../box/NoArgsType"
import {CSSStyleSheetBox,CSSStyleSheetConstructorBox} from "../version_00_30/support"

class CSSStyleSheetConstructorBoxImplSupport {
	type: "constructor_box"="constructor_box";
	from: "javascript"="javascript";
	instance_type: "CSSStyleSheet"="CSSStyleSheet";
	constructor_type: "CSSStyleSheet"="CSSStyleSheet";
	value: typeof CSSStyleSheet
	constructor(value: typeof CSSStyleSheet) {
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
			if(typeof val!='object') continue
			if(val===null) continue
			if(val.value instanceof Document) {
				throw new Error("Unexpected document")
			}
			if(val.type!='shape_box') continue
			args_state={
				value: [val.value],
				state: 1
			}
		}
		let obj: CSSStyleSheet=new this.value(...args_state.value)
		return new CSSStyleSheetBox(obj)
	}
}

export type CreateDesc=
	[1|2,'create','div','state_log',{}]|
	[2,'create','div','history',string]|
	[2,'create','div',"timeout_element",string]|
	[2,'create','div',"hours_played",string]|
	[2,'create','div',"ratio",string]|
	[2,'create','div',"ratio_change",string]

export type NewDesc=[
	v:0,
	type:'new',
	a:CSSStyleSheetConstructorBoxImplSupport,
	b:[],
	c:(obj: CSSStyleSheet,str: string) => Promise<CSSStyleSheet>,
	d:string[]
]
