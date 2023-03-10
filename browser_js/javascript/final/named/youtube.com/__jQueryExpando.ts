import {DInstanceType} from "./DInstanceType.js";
import {JQueryExpandoData} from "./JQueryExpandoData.js";
import {RxType} from "./RxType.js";

declare global {
	interface Element {
		["jQuery_expando_1"]?: JQueryExpandoData;
	}
	var __lst: never[];
	var __w: RxType;
	var __r_ret: never;
	var __res: never[];
	var __instance: DInstanceType;
}
