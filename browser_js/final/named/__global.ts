import {RxType} from "./youtube.com/RxType.js";

export {};
declare global {
	var jQuery: ((...a: any[])=> any)&NonNullable<RxType["jQuery"]>;
}
