import {IStackVMBox} from "./IStackVMBox";
import {NodeBox} from "./NodeBox";
import {CSSStyleSheetBox} from "./box/CSSStyleSheetBox";
import {MediaListBox} from "./MediaListBox";


export type InstanceBoxes = IStackVMBox | NodeBox | CSSStyleSheetBox | MediaListBox;
