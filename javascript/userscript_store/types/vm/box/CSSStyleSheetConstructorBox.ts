import Box from "./Box";
import BoxTemplate from "./BoxTemplate";
import CSSStyleSheetBox from "./CSSStyleSheetBox";

export default class CSSStyleSheetConstructorBox extends BoxTemplate<typeof CSSStyleSheet> {
	type: "constructor_box" = "constructor_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	args_type:{
		state:1,
		acc:[options?: CSSStyleSheetInit | undefined]
	} | {
		state:0,
		acc:[],
	} = {
		acc:[],
		state:0
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
