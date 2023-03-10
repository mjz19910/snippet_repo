import {ApiBase2} from "../../zc_child_modules/YtPlugin_Base.user.js";

export function cache_item_decompose_info_0_info_0(x: G_BoxedDatabaseData) {
	let s1=x.z[0].z[0];
	return s1;
}
type A1=ReturnType<typeof cache_item_decompose_info_0_info_0>;
type A2=Extract<A1,object>;
type A3=Extract<A2,{type: any;}>;
type E1=Extract<A3,{info_arr: any;}>["z"][0];
class ChainWalker {
	/** @arg {RetValue} parent */
	constructor(parent: RetValue) {
		if(parent.linked_list_head===null) throw new Error("Linked List empty");
		this.head=parent.linked_list_head;
	}
	head: G_Ex_Ret;
	next() {
		let cur=this.head;
		if(cur[3]===null) return {done: true,value: cur};
		this.head=cur[3];
		return {done: false,value: cur};
	}
	[Symbol.iterator]() {
		return this;
	}
}
class RetValue {
	v: [
		|{t: "c"; u: Extract<E1,{type: any;}>;}
		|{t: "d"; u: string;}
		|null
	]=[null];
	linked_list_head: G_Ex_Ret|null=null;
	linked_list_tail: G_Ex_Ret|null=null;
	add_link(...args: G_Ex_WV) {
		if(this.linked_list_head===null) this.linked_list_head=[-1,1,args,null];
		let head=this.linked_list_head;
		if(this.linked_list_tail===null) this.linked_list_tail=head;
		let tail=this.linked_list_tail;
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
		this.linked_list_tail=tail;
	}
	walk_chain() {
		return new ChainWalker(this);
	}
}
type G_Ex_WV=[t: 1,r: ReturnType<typeof cache_item_decompose_1>];
type G_Ex_Ret=[t: -1,n: number,v: G_Ex_WV,n: G_Ex_Ret|null];
export function cache_item_decompose_0(x: G_BoxedDatabaseData): RetValue {
	let a_base_2=new ApiBase2;
	let a1=x.z[0].z[0];
	let ret=new RetValue();
	if(typeof a1==="object") {
		let k2=a_base_2.get_keys_of(a1);
		k2;
		ret.add_link(1,cache_item_decompose_1(a_base_2,a1));
	} else {
		a1;
	}
	for(let val of ret.walk_chain()) {
		let [,v1,v2,next]=val;
		console.log("link length",v1);
		console.log("linked list value",v2);
		switch(v2[0]) {
			case 1: {
				const [,i1]=v2;
				i1;
			} break;
		}
		if(next===null) {
			console.log("done");
		}
	}
	debugger;
	return ret;
}
function cache_item_decompose_1(s: ApiBase2,x: A2) {
	if("a" in x) {
		return cache_item_decompose_work(s,[1,"+a",x]);
	} else {
		return cache_item_decompose_work(s,[1,"-a",x]);
	}
}
type DecomposeWork_1a=Extract<A2,{a: any;}>;
type DecomposeWork_1f=Exclude<A2,{a: any;}>;
type DecomposeWork_1b=Extract<DecomposeWork_1a,{b: any;}>;
type DecomposeWork_sub_1b=Exclude<DecomposeWork_1a,{b: any;}>;
type A2_Box=Extract<A2,T_PrimitiveBox<any>>;
type A1b_Group_MK=Extract<DecomposeWork_1b,{a: "/GV/a/b/c/f/z";}>;
type A1b_Group_RM=Exclude<DecomposeWork_1b,{a: "/GV/a/b/c/f/z";}>;
type A4_RM_Box=Exclude<DecomposeWork_sub_1b,T_PrimitiveBox<any>>;
type DecomposeWorkItem=
	// a
	|[1,"+a",DecomposeWork_1a]
	|[1,"-a",DecomposeWork_1f]
	// b
	|[1,"+b",DecomposeWork_1b]
	|[1,"-b",DecomposeWork_sub_1b]
	// f
	|[1,"+f",Extract<DecomposeWork_1f,{f: any;}>]
	|[1,"-f",Exclude<DecomposeWork_1f,{f: any;}>]
	|[id: 1,t: "+a=group_value",a: A1b_Group_MK]
	|[id: 1,t: "-a=group_value",b: A1b_Group_RM]
	// not T_PrimitiveBox<any>
	|[id: 1,k: "-a=primitive",v: A4_RM_Box]
	// final
	|[id: 2,k: "b|item",v: A1b_Group_MK]
	|[id: 2,k: "c|one",v: Extract<A1b_Group_MK,{c: "one";}>]
	|[id: 2,k: "c|arr",v: Extract<A1b_Group_MK,{c: "arr";}>]
	|[id: 2,k: "c|instance_name",v: make_instance_name_t<any>]
	|[id: 2,k: "c|many",v: Extract<A1b_Group_MK,{c: "many";}>]
	|[id: 2,k: "c|typeof_name",v: Extract<A1b_Group_MK,{c: "typeof_name";}>]
	|[id: 2,k: "a|primitive",b: A2_Box]
	;
function cache_item_decompose_work(s: ApiBase2,x: DecomposeWorkItem): DecomposeWorkItem|null {
	s;
	switch(x[0]) {
		default: return null;
		case 1: {
			switch(x[1]) {
				case "+a": {
					const v=x[2];
					return [1,"-b",v];
				}
				case "+a=group_value": {
					const v=x[2]; v;
				} break;
				case "-a": {
					const v=x[2];
					return [1,"-f",v];
				}
				case "+f": break;
				case "-a=group_value": break;
				case "-a=primitive": break;
				case "-b": break;
				case "-f": break;
			}
		} break;
	}
	return null;
}
