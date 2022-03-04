import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";

export class CSSStyleSheetConstructorBox
	extends BoxTemplate<"constructor_box", typeof CSSStyleSheet>
	implements BoxVerify<CSSStyleSheetConstructorBox, "CSSStyleSheetConstructorBox"> {
	type: "constructor_box" = "constructor_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	args_type?:{
		state:1,
		value:[options?: CSSStyleSheetInit | undefined]
	} | {
		id:0,
		value:[],
	} = {
		value:[],
		id:0
	}
	m_verify_name: "CSSStyleSheetConstructorBox"="CSSStyleSheetConstructorBox";
	verify_name(v:this['m_verify_name']){
		if(this.m_verify_name !== "CSSStyleSheetConstructorBox"){
			throw new Error("bad box");
		}
		if(v !== "CSSStyleSheetConstructorBox") {
			throw new Error("bad box");
		}
	}
	factory(...arr:Box[]){
		let valid_args:{
			state:1,
			acc:[options?: CSSStyleSheetInit | undefined]
		} | {
			state:0,
			acc:[],
		}={
			state:0,
			acc:[]
		}
		for(let i=0;i<arr.length;i++){
			let val=arr[i];
			if(typeof val != 'object')continue;
			if(val === null)continue;
			if(val.type != 'shape_box')continue;
			valid_args={
				acc:[val.value],
				state:1
			}
		}
		let obj:CSSStyleSheet=new this.value(...valid_args.acc);
		return new CSSStyleSheetBox(obj);
	}
}
