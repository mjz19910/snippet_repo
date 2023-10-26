import {DocumentBox} from "./DocumentBox.ts";
import {GlobalThisBox} from "./GlobalThisBox.ts";
import {WindowBox} from "./WindowBox.ts";

export type G_GlobalObjBox=GlobalThisBox|
	WindowBox|
	DocumentBox;
