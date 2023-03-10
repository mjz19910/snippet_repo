import {G_BasicBox} from "./G_BasicBox.js";
import {G_ObjectBox} from "./G_ObjectBox.js";
import {G_VoidBox} from "./G_VoidBox.js";

export type Box=
	|G_BasicBox
	|G_ObjectBox
	|G_VoidBox
	|never
	;
;
