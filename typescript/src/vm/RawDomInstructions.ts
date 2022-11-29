import {Box} from "../box/Box.js";
import {PromiseFunctionBox} from "./PromiseFunctionBox.js";

export type RawDomInstructions=
	['dom_peek',number,number]|
	['construct',number]|
	['dom_new',typeof CSSStyleSheet,[],PromiseFunctionBox,[string]]|
	['call',number]|
	['dom_get',string]|
	['dom_create_element','div',string,string]|
	['dom_create_element_with_props','div',string,{id: string;}]|
	['append']|
	['drop']|
	['dom_exec',RawDomInstructions[]]|
	["push",...Box[]];
