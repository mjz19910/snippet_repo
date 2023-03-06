import {ApiBase2} from "../../../zc_child_modules/YtPlugin_Base.user.js";

export function cache_item_decompose_info_0_info_0(x: G_BoxedIdObj) {
	let s1=x.info_arr[0].info_arr[0];
	return s1;
}
type A1=ReturnType<typeof cache_item_decompose_info_0_info_0>;
type A2=Extract<A1,object>;
type A3=Extract<A2,{type: any;}>;
type E1=Extract<A3,{info_arr: any;}>["info_arr"][0];
export function cache_item_decompose(x: G_BoxedIdObj): {
	v: [
		|{t: "c"; u: Extract<E1,{type: any;}>;}
		|{t: "d"; u: string;}
		|null
	];
	x: {
		a: [A1|null,A2|null,A3|null],
		b: [null,Exclude<A1,object>|null,{start_radio: "1"|"0";}|null];
		e: [E1|null];
	};
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
	let ret=cache_item_decompose_2({a: [a1,a2,a3],b: [null,b2,b3],e: [e1]});
	cache_item_decompose_3(ret.v);
	return ret;
}
function cache_item_decompose_2(x: ReturnType<typeof cache_item_decompose>["x"]): ReturnType<typeof cache_item_decompose> {
	const {e: [u]}=x;
	if(u!==null&&typeof u==="object"&&"type" in u) return {v: [{t: "c",u}],x};
	else {
		if(typeof u==="string") {
			return {v: [{t: "d",u}],x};
		} else {
			return {v: [u],x};
		}
	}
}
type CDec3_XP={t: "x"; x: ReturnType<typeof cache_item_decompose>["v"];};
type C3_x_f0=CDec3_XP["x"][0];
type C3_CA=Extract<C3_x_f0,{t: "c";}>["u"];
function cache_item_decompose_3(x: ReturnType<typeof cache_item_decompose>["v"]): {
	v: [
		m: "a",
		x: CDec3_XP,
		a: {t: "a"; a: null;}
	]|[
		m: "c:a",
		x: CDec3_XP,
		c: {t: "c"; u: Extract<C3_CA,{info_arr: any;}>;},
	]|[
		m: "d",
		x: CDec3_XP,
		d: {t: "d"; u: string;},
	]|[
		m: "x",
		x: CDec3_XP
	]|[
		m: "n",x: CDec3_XP,u: never
	]|[
		m: "c:b",x: CDec3_XP,u: make_item_group<bigint>,
	];
} {
	if(x===null) return {v: ["x",{t: "x",x}]};
	const s: CDec3_XP={t: "x",x};
	const [a]=x;
	if(a===null) {
		const t="a";
		return {v: [t,s,{t: t,a}]};
	}
	const {t,u}=a;
	if(u===null) return {v: ["x",s]};
	switch(t) {
		case "c": if("info_arr" in u) return {v: [`${t}:a`,s,{t: "c",u}]}; else return {v: [`${t}:b`,s,u]};
		case "d": return {v: [t,s,{t,u}]};
	}
}