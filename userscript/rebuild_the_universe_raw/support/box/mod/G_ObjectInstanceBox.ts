import {CSSStyleSheetBox} from "./CSSStyleSheetBox.ts";
import {MediaListBox} from "./MediaListBox.ts";
import {NodeBox} from "./NodeBox.ts";
import {StackVMBox} from "./StackVMBox.ts";

export type G_ObjectInstanceBox=
	|StackVMBox
	|NodeBox
	|CSSStyleSheetBox
	|MediaListBox
	;
;
