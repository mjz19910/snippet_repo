import {ResponseTypes} from "./ResponseTypes.js";

export namespace ResponseTypeTexts {
	function cast_as<T extends U,U>(e: U,x: any=e): T {
		return x;
	}	
	type VV=ResponseTypes['type'] extends infer U? PageTypeList[number]&U:never;
	const vvq: PageTypeList=cast_as([] as any[]);
	function ttq(x: VV) {
		for(let i=0;i<vvq.length;i++) {
			vvq[i]=x;
		}
	}
	ttq("browse");
}
