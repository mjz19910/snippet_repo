import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {CSSStyleSheetConstructorArgsTypeState1} from "./CSSStyleSheetConstructorArgsTypeState1";
import {NoArgsType} from "./NoArgsType";
export class CSSStyleSheetConstructorBox
	extends BoxTemplate<"constructor_box", typeof CSSStyleSheet>
	implements BoxVerify<CSSStyleSheetConstructorBox, "CSSStyleSheetConstructorBox">
{
	readonly type = "constructor_box";
	readonly instance_type = "CSSStyleSheet";
	readonly arguments = "[options?: CSSStyleSheetInit | undefined]";
	readonly args_type: CSSStyleSheetConstructorArgsTypeState1 | NoArgsType = new NoArgsType;
	readonly m_verify_name = "CSSStyleSheetConstructorBox";
	verify_name(name: "CSSStyleSheetConstructorBox") {
		return this.m_verify_name === 'CSSStyleSheetConstructorBox' && name === 'CSSStyleSheetConstructorBox';
	}
	factory(...arr: Box[]) {
		let valid_args: CSSStyleSheetConstructorArgsTypeState1 | NoArgsType = new NoArgsType;
		for(let i = 0;i < arr.length;i++) {
			let val = arr[i];
			if(typeof val != 'object') continue;
			if(val === null) continue;
			if(val.type != 'shape_box') continue;
			valid_args = {
				value: [val.value],
				state: 1
			}
		}
		let value = this.value;
		let obj: CSSStyleSheet = new value(...valid_args.value);
		return new CSSStyleSheetBox(obj);
	}
}
