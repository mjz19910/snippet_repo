import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";
import {MediaListBox} from "./MediaListBox.js";
import {NodeBox} from "./NodeBox.js";
import {StackVMBox} from "./StackVMBox.js";

export type G_ObjectInstance=StackVMBox|
	NodeBox|
	CSSStyleSheetBox|
	MediaListBox;
