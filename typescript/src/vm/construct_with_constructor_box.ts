import {FunctionConstructorBox} from "../box/FunctionConstructorBox.js";
import {CSSStyleSheetConstructorBox} from "../box/CSSStyleSheetConstructorBox.js";
import {NewableFunctionBox} from "../box/NewableFunctionBox.js";
import {Box} from "../box/Box.js";


export function construct_with_constructor_box(value: CSSStyleSheetConstructorBox|NewableFunctionBox|FunctionConstructorBox,arg_arr: Box[]) {
	switch(value.instance_type) {
		case 'CSSStyleSheet': return value.factory(...arg_arr);
	}
	throw new Error("Bad");
}
