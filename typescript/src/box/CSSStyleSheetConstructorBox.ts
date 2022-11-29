import {Box} from "./Box.js";
import {BoxTemplate} from "./template/BoxTemplate.js";
import {BoxVerify} from "./BoxVerify.js";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";

export class CSSStyleSheetConstructorBox
	extends BoxTemplate<"constructor_box",typeof CSSStyleSheet>
	implements BoxVerify<CSSStyleSheetConstructorBox,"CSSStyleSheetConstructorBox">
{
	readonly type="constructor_box";
	readonly instance_type="CSSStyleSheet";
	readonly arguments=[{name: "options",opt: true,value: {types: ["CSSStyleSheetInit","undefined"]}}] as const;
	readonly args_type: [options?: CSSStyleSheetInit|undefined]=[];
	readonly m_verify_name="CSSStyleSheetConstructorBox";
	verify_name(name: "CSSStyleSheetConstructorBox") {
		return this.m_verify_name==='CSSStyleSheetConstructorBox'&&name==='CSSStyleSheetConstructorBox';
	}
	factory(...arr: Box[]) {
		let valid_args: [options?: CSSStyleSheetInit|undefined]=[];
		for(let i=0;i<arr.length;i++) {
			let val=arr[i];
			if(val.type!='shape_box') continue;
			if(val.shape!='CSSStyleSheetInit') continue;
			valid_args[0]=val.value;
		}
		let value=this.value;
		let obj: CSSStyleSheet=new value(...valid_args);
		return new CSSStyleSheetBox(obj);
	}
}
