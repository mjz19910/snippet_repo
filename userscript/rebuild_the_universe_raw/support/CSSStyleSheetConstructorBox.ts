import {StackVMImpl} from "../rebuild_the_universe.user.js";
import {Box} from "./Box.js";
import {BoxTemplate} from "./BoxTemplate.js";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.js";

export class CSSStyleSheetConstructorBox extends BoxTemplate<"constructor_box",typeof CSSStyleSheet> {
	readonly type="constructor_box";
	readonly next_member="instance_type";
	readonly instance_type="CSSStyleSheet";
	readonly arguments=[{name: "options",opt: true,value: {types: ["CSSStyleSheetInit","undefined"]}}] as const;
	readonly args_type: [options?: CSSStyleSheetInit|undefined]=[];
	on_get(_vm: StackVMImpl,key: string) {
		console.log("get","CSSStyleSheetConstructorBox",key);
	}
	factory(...arr: Box[]) {
		let valid_args: [options?: CSSStyleSheetInit|undefined]=[];
		for(let i=0;i<arr.length;i++) {
			let val=arr[i];
			if(val.type!="shape_box") continue;
			if(val.shape!="CSSStyleSheetInit") continue;
			let box: CSSStyleSheetInitBox=val;
			valid_args[0]=box.value;
		}
		let value=this.value;
		let obj: CSSStyleSheet=new value(...valid_args);
		return new CSSStyleSheetBox(obj);
	}
}
