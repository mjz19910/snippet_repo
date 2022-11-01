import {Box} from "typescript/box/Box.js";
import {CSSStyleSheetBox} from "typescript/box/CSSStyleSheetBox.js";
import {CSSStyleSheetConstructorArgsTypeState1} from "typescript/box/CSSStyleSheetConstructorArgsTypeState1.js";
import {CSSStyleSheetConstructorBox} from "typescript/box/CSSStyleSheetConstructorBox.js";
import {NoArgsType} from "typescript/box/NoArgsType.js";

export class CSSStyleSheetConstructorBoxImpl implements CSSStyleSheetConstructorBox {
	type: "constructor_box";
	from: "javascript";
	instance_type: "CSSStyleSheet";
	constructor_type: "CSSStyleSheet";
	arguments:"[options?: CSSStyleSheetInit | undefined]";
	args_type:CSSStyleSheetConstructorArgsTypeState1 | NoArgsType;
	m_verify_name:"CSSStyleSheetConstructorBox";
	value: typeof CSSStyleSheet;
	constructor(value: typeof CSSStyleSheet) {
		this.type='constructor_box';
		this.from='javascript';
		this.instance_type='CSSStyleSheet';
		this.constructor_type='CSSStyleSheet';
		this.arguments='[options?: CSSStyleSheetInit | undefined]';
		this.m_verify_name='CSSStyleSheetConstructorBox';
		this.args_type=new NoArgsType;
		this.value=value;
	}
	verify_name(name: "CSSStyleSheetConstructorBox") {
		return this.m_verify_name==='CSSStyleSheetConstructorBox'&&name==='CSSStyleSheetConstructorBox'
	}
	as_type(to_match: 'function') {
		if(typeof this.value===to_match) {
			return this;
		}
		return null;
	}
	factory(...arr: Box[]) {
		let args_state: CSSStyleSheetConstructorBox['args_type']={
			state: 0,
			value: []
		};
		for(let i=0;i<arr.length;i++) {
			let val=arr[i];
			if(typeof val!='object')
				continue;
			if(val===null)
				continue;
			if(val.value instanceof Document) {
				throw new Error("Unexpected document");
			}
			if(val.type!='shape_box')
				continue;
			args_state={
				state: 1,
				value: [val.value]
			};
		}
		let obj=new this.value(...args_state.value);
		return new CSSStyleSheetBox(obj);
	}
}
