// deno-lint-ignore-file
import {G_BoxedDatabaseData} from "../ghi/group_G.ts";

export function cache_item_decompose_info_0_info_0(x: G_BoxedDatabaseData) {
	return x;
}
export type A1=ReturnType<typeof cache_item_decompose_info_0_info_0>;
export type A2=Extract<A1,object>;
export type A3=Extract<A2,{type: any;}>;
export type E1=Extract<A3,{info_arr: any;}>["z"][0];
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
export type G_Ex_WV=[t: 1,r: {}];
export type G_Ex_Ret=[t: -1,n: number,v: G_Ex_WV,n: G_Ex_Ret|null];
