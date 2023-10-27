import {Box} from "./Box.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.ts";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.ts";
import {StackVM} from "../ns_import_type.ts";

export class CSSStyleSheetConstructorBox extends BoxTemplate<"constructor_box",typeof CSSStyleSheet> {
	readonly type="constructor_box";
	readonly next_member="instance_type";
	readonly instance_type="CSSStyleSheet";
	readonly arguments=[{name: "options",opt: true,value: {types: ["CSSStyleSheetInit","undefined"]}}] as const;
	readonly args_type: [options?: CSSStyleSheetInit|undefined]=[];
	on_get(_vm: StackVM,key: string) {
		console.log("get","CSSStyleSheetConstructorBox",key);
	}
	factory(...arr: Box[]) {
		const valid_args: [options?: CSSStyleSheetInit|undefined]=[];
		for(const i=0;i<arr.length;i++) {
			const val=arr[i];
			if(val.type!='shape_box') continue;
			if(val.shape!='CSSStyleSheetInit') continue;
			const box: CSSStyleSheetInitBox=val;
			valid_args[0]=box.value;
		}
		const value=this.value;
		const obj: CSSStyleSheet=new value(...valid_args);
		return new CSSStyleSheetBox(obj);
	}
}
