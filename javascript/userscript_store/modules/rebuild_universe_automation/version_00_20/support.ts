import CSSStyleSheetBox from "types/vm/box/CSSStyleSheetBox.js";
import CSSStyleSheetConstructorBox from "types/vm/box/CSSStyleSheetConstructorBox";
class VMBoxedCSSStyleSheetConstructorR {
	type: "constructor_box"="constructor_box";
	from: "javascript"="javascript";
	instance_type: "CSSStyleSheet"= "CSSStyleSheet";
	constructor_type: "CSSStyleSheet"="CSSStyleSheet";
	value:typeof CSSStyleSheet;
	constructor(value: typeof CSSStyleSheet){
		this.value=value;
	}
	/**@arg {'function'} to_match */
	as_type(to_match: 'function') {
		if(typeof this.value === to_match){
			return this;
		}
		return null;
	}
	/**@arg {Box[]} arr */
	factory(...arr: Box[]){
		/**@type {CSSStyleSheetConstructorBox['args_type']} */
		let args_state: CSSStyleSheetConstructorBox['args_type']={
			id:0,
			value:[]
		}
	for(let i=0;i<arr.length;i++){
		let val=arr[i];
		if(typeof val != 'object')continue;
		if(val === null)continue;
		if(val.value instanceof Document){
			throw new Error("Unexpected document");
		}
		if(val.type != 'shape_box')continue;
		args_state={
			value:[val.value],
			state:1
		}
	}
	/**@type {CSSStyleSheet} */
	let obj: CSSStyleSheet=new this.value(...args_state.value);
	return new CSSStyleSheetBox(obj);
	}
}

export type CreateDesc=[1|2, 'create', 'div', 'state_log', {id:'state_log'}] |
[2, 'create', 'div', 'history', string]|
[2, 'create', 'div', "timeout_element", string]|
[2, 'create', 'div', "hours_played", string]|
[2, 'create', 'div', "ratio", string]|
[2, 'create', 'div', "ratio_change", string];
export type NewDesc=[
	0, 'new', VMBoxedCSSStyleSheetConstructorR, [],
	(obj:CSSStyleSheet, str:string)=>Promise<CSSStyleSheet>,
	string[]
];

export {Primitives} from "types/vm/Primitives";
