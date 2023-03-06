import {ApiBase2} from "../../../zc_child_modules/YtPlugin_Base.user.js";

export function cache_item_decompose_info_0_info_0(x: G_BoxedIdObj) {
	let s1=x.info_arr[0].info_arr[0];
	return s1;
}
type A1=ReturnType<typeof cache_item_decompose_info_0_info_0>;
type A2=Extract<A1,object>;
type B2=Exclude<A1,object>;
type A3=Extract<A2,{type: any;}>;
type B3=Exclude<A2,{type: any;}>;
type E1=Extract<A3,{info_arr: any;}>["info_arr"][0];
export function cache_item_decompose(x: G_BoxedIdObj): {
	v: [
		|{t: "a",u: {};}
		|{t: "c"; u: Extract<E1,{type: any;}>;}
		|{t: "d"; u: string;}
		|null
	];
	x: {
		a: [A1|null,A2|null,A3|null],
		b: [null,Exclude<A1,object>|null,{start_radio: "1"|"0";}|null];
	};
} {
	let a_base_2=new ApiBase2;
	let a1=x.info_arr[0].info_arr[0];
	let a2=null,b2=null;
	if(typeof a1==="object") a2=a1;
	else b2=a1;
	b2; a2;
	let a3=null,b3=null;
	{const c=a2; if(c!==null) if("type" in c) a3=c; else b3=c;}
	if(a3!==null) {
		let k2=a_base_2.get_keys_of(a3);
		k2[0]==="_is";

	}
	type R_Ex_2=[t: 2,r: ReturnType<typeof cache_item_decompose_2>];
	type R_Ex_3=[t: 3,r: ReturnType<typeof cache_item_decompose_3>];
	type G_Ex_WV=R_Ex_3|R_Ex_2;
	type G_Ex_Ret=[t: -1,n: number,v: G_Ex_WV,n: G_Ex_Ret|null];
	class RetValue {
		v: [
			|{t: "a",u: {};}
			|{t: "c"; u: Extract<E1,{type: any;}>;}
			|{t: "d"; u: string;}
			|null
		]=[null];
		constructor(a: [A1,A2|null,A3|null],b: [null,B2|null,B3|null]) {
			this.x={a,b};
		}
		x: {
			a: [A1,A2|null,A3|null],
			b: [null,Exclude<A1,object>|null,{start_radio: "1"|"0";}|null];
		};
		a: G_Ex_Ret|null=null;
		t: G_Ex_Ret|null=null;
		add_link(...args: G_Ex_WV) {
			if(this.a===null) this.a=[-1,1,args,null];
			let head=this.a;
			if(this.t===null) this.t=head;
			let tail=this.t;
			// added it
			if(head===tail) return;
			tail[3]=[-1,0,args,null];
			tail=tail[3];
			head[1]++;
			let next=head;
			while(true) {
				next[1]++;
				if(next===tail) break;
				if(next[3]===null) throw new Error("Disconnected linked list");
				next=next[3];
			}
			this.t=tail;
		}
	}
	let ret=new RetValue([a1,a2,a3],[null,b2,b3]);
	ret.add_link(2,cache_item_decompose_2(ret.x));
	ret.add_link(3,cache_item_decompose_3(ret.v));
	debugger;
	return ret;
}
function cache_item_decompose_2(x: ReturnType<typeof cache_item_decompose>["x"]): {
	v: [{t: "a3"; u: A3;}];
	x: typeof x;
}|null {
	const {a: [,,u]}=x;
	if(u!==null&&typeof u==="object"&&"type" in u) return {v: [{t: "a3",u}],x};
	return u;
}
type CDec3_XP={t: "x"; x: ReturnType<typeof cache_item_decompose>["v"];};
function cache_item_decompose_3(x: ReturnType<typeof cache_item_decompose>["v"]) {
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
		case "a": return {v: [t,s,{t,u}]};
		case "c": if("info_arr" in u) return {v: [`${t}:a`,s,{t: "c",u}]}; else return {v: [`${t}:b`,s,u]};
		case "d": return {v: [t,s,{t,u}]};
	}
}
