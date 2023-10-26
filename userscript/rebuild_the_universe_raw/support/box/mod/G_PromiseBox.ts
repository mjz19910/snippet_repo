import {PromiseBox} from "./PromiseBox.ts";
import {VoidPromiseBox} from "./VoidPromiseBox.ts";

export type G_PromiseBox=
	|VoidPromiseBox
	|PromiseBox;
