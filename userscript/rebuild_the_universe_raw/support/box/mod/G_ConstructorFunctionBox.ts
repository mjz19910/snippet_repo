import {AsyncFunctionBox} from "./AsyncFunctionBox.ts";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.ts";
import {FunctionBox} from "./FunctionBox.ts";
import {FunctionConstructorBox} from "./FunctionConstructorBox.ts";
import {NewableFunctionBox} from "./NewableFunctionBox.ts";
import {NewableInstancePackBox} from "./NewableInstancePackBox.ts";

export type G_ConstructorFunctionBox=
	|CSSStyleSheetConstructorBox
	|FunctionBox
	|NewableFunctionBox
	|NewableInstancePackBox
	|AsyncFunctionBox
	|FunctionConstructorBox
	;
;
