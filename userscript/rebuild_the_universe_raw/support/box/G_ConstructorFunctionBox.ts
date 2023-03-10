import {AsyncFunctionBox} from "./AsyncFunctionBox.js";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.js";
import {FunctionBox} from "./FunctionBox.js";
import {FunctionConstructorBox} from "./FunctionConstructorBox.js";
import {NewableFunctionBox} from "./NewableFunctionBox.js";
import {NewableInstancePackBox} from "./NewableInstancePackBox.js";

export type G_ConstructorFunctionBox=CSSStyleSheetConstructorBox|
	FunctionBox|
	NewableFunctionBox|
	NewableInstancePackBox|
	AsyncFunctionBox|
	FunctionConstructorBox;
