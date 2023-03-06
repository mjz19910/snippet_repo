import {ApiBase2} from "../../../zc_child_modules/YtPlugin_Base.user.js";

export function cache_item_decompose_info_0_info_0(x: G_BoxedIdObj) {
	let s1=x.info_arr[0].info_arr[0];
	return s1;
}
type A1=ReturnType<typeof cache_item_decompose_info_0_info_0>;
type A2=Extract<A1,object>;
type A3=Extract<A2,{type: any;}>;
export function cache_item_decompose(x: G_BoxedIdObj): {
	a: [A1|null,A2|null,A3|null],
	b: [null,Exclude<A1,object>|null,{start_radio: "1"|"0";}|null];
	e: [Extract<A3,{info_arr: any;}>["info_arr"][0]|null];
} {
	let a_base_2=new ApiBase2;
	let a1=x.info_arr[0].info_arr[0];
	let a2=null,b2=null;
	if(typeof a1==="object") a2=a1;
	else b2=a1;
	b2; a2;
	let a3=null,b3=null,e1=null;
	{const c=a2; if(c!==null) if("type" in c) a3=c; else b3=c;}
	if(a3!==null&&"info_arr" in a3) e1=a3.info_arr[0];
	if(e1!==null&&typeof e1==="object") {
		let k2=a_base_2.get_keys_of(e1);
		switch(k2[0]) {
			case "type": break;
		}
	}
	return cache_item_decompose_2({a: [a1,a2,a3],b: [null,b2,b3],e: [e1]});
}
function cache_item_decompose_2(x: NonNullable<ReturnType<typeof cache_item_decompose>>) {
	const {e: [u]}=x;
	let c1=null,d1=null;
	if(u!==null&&typeof u==="object"&&"type" in u) c1=u;
	else d1=u;
	d1; c1;
	return x;
}