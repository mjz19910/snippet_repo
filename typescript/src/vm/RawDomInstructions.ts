import {Box} from "../box/Box.js";
import {PromiseFunctionBox} from "./PromiseFunctionBox.js";

export type RawDomInstructions=
	[number,'new',typeof CSSStyleSheet,[],PromiseFunctionBox,[string]]|
	[number,'call',number]|
	[number,'get','body']|
	[number,'create','div',string,string]|
	[number,'create_props','div',string,{id: string;}]|
	[number,'append']|
	[number,'drop']|
	[number,'enable_dry_mode']|
	[number,"push",...Box[]];
