import {DocumentBox} from "./DocumentBox.js";
import {GlobalThisBox} from "./GlobalThisBox.js";
import {WindowBox} from "../WindowBox.js";

export type G_GlobalObjBox=GlobalThisBox|
	WindowBox|
	DocumentBox;
