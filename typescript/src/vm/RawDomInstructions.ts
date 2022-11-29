import {Box} from "../box/Box.js";
import {PromiseFunctionBox} from "./PromiseFunctionBox.js";

export type RawDomInstructions=
	['dom_peek',number,number]|
	['construct',number]|
	['new',typeof CSSStyleSheet,[],PromiseFunctionBox,[string]]|
	['call',number]|
	['get','body']|
	['create','div',string,string]|
	['create_props','div',string,{id: string;}]|
	['append']|
	['drop']|
	['enable_dry_mode']|
	['dom_exec',RawDomInstructions[]]|
	["push",...Box[]];
