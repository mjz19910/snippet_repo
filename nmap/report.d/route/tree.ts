import {Route} from "./Route.ts";
import {RouteDescription} from "./RouteDescription.ts";

const tree_map=[
	{
		target: "100_126_0_1",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_1",
		]
	},
	{
		target: "100_126_0_2",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_2",
		]
	},
	{
		target: "100_126_0_9",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_9",
		]
	},{
		target: "100_126_0_10",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_1",
			"100_126_0_10",
		]
	},{
		target: "100_126_0_17",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_17",
		]
	},{
		target: "100_126_0_18",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_18",
		]
	},{
		target: "100_126_0_25",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_25",
		]
	},
	{
		target: "100_126_0_26",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_17",
			"100_126_0_26",
		]
	},{
		target: "100_126_0_26",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_17",
			"100_126_0_26",
		]
	},{
		target: "100_126_0_33",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_17",
			"100_126_0_33",
		]
	},{
		target: "100_126_0_34",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_34",
		]
	},{
		target: "100_126_0_41",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_41",
		]
	},{
		target: "100_126_0_42",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_42",
		]
	},{
		target: "100_126_0_48",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_48",
		]
	},{
		target: "100_126_0_49",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_49",
		]
	},{
		target: "100_126_0_50",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_50",
		]
	},{
		target: "100_126_0_55",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_55",
		]
	},{
		target: "100_126_0_56",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_56",
		]
	},{
		target: "100_126_0_57",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_57",
		]
	},{
		target: "100_126_0_58",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_58",
		]
	},{
		target: "100_126_0_63",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_63",
		]
	},{
		target: "100_126_0_66",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_66",
		]
	},{
		target: "100_126_0_65",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_65",
		]
	},{
		target: "100_126_0_73",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
		]
	},{
		target: "100_126_0_74",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_74",
		]
	},{
		target: "100_126_0_81",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_81",
		]
	},{
		target: "100_126_0_82",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_82",
		]
	},{
		target: "100_126_0_88",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_88",
		]
	},{
		target: "100_126_0_89",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_89",
		]
	},{
		target: "100_126_0_90",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_90",
		]
	},{
		target: "100_126_0_95",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_95",
		]
	},{
		target: "100_126_0_96",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_96",
		]
	},{
		target: "100_126_0_97",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_73",
			"100_126_0_97",
		]
	},{
		target: "100_126_0_98",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_98",
		]
	},{
		target: "100_126_0_103",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_103",
		]
	},{
		target: "100_126_0_105",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_13_1",
			"10_1_4_1",
			"100_126_0_105",
		]
	},{
		target: "100_126_0_106",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
			"100_126_0_106",
		]
	},{
		target: "100_126_0_113",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_113",
		]
	},{
		target: "100_126_0_114",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_114",
		]
	},{
		target: "100_126_0_121",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
		]
	},{
		target: "100_126_0_122",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"100_126_0_122",
		]
	},{
		target: "100_126_0_129",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_129",
		]
	},{
		target: "100_126_0_130",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"100_126_0_130",
		]
	},{
		target: "136_113_0_1",
		route: [
			"192_168_0_1",
			"10_4_18_1",
			"10_4_11_2",
			"10_1_4_1",
			"100_126_0_121",
			"100_126_0_73",
			"100_126_0_89",
			"100_126_0_17",
			"206_126_225_128",
			"108_170_245_123",
			"172_253_77_194",
			"209_85_245_100",
			"209_85_143_135",
			"108_170_228_85",
			"108_170_240_193",
			"172_217_88_5",
			"172_217_89_182",
			"136_113_0_1",
		]
	}
] as const;

type NArr<T extends any[],V>=[...T,V];

type NextNum<T extends number>=T extends 0? [T]['length']:T extends [T]['length']? NArr<[T],T>['length']:never;

interface UV<T extends number,Y extends never[]> {
	next: IntIncImpl<T,Y>;
};

type IntIncImpl<T extends number,U extends never[]>=
	U['length'] extends 9? never:
	// Check for number less than 0, access an array, this will verify
	// we have a positive or zero value
	[][T] extends never?
	// Only positive numbers are supported
	never:
	// is the value we are at equal to the accumulator array
	T extends U['length']?
	// we got to the accumulator length eq T, we found the value the user passed,
	// now add 1 to it
	{next: [never,...U]['length'];}:
	// recurse with a longer array
	UV<T,[never,...U]>;

type Inc<T extends number>=IntIncImpl<T,[]>;

type GTy<T extends any[]>=T extends [any,...infer U]? U:never;

interface UVR<T extends number,Y extends never[]> {
	next: IntIncImplR<T,Y>;
};

type IntIncImplR<T extends number,U extends never[]>=
	U['length'] extends 9? never:
	// Check for number less than 0, access an array, this will verify
	// we have a positive or zero value
	[][T] extends never?
	// Only positive numbers are supported
	never:
	// is the value we are at equal to the accumulator array
	T extends U['length']?
	// we got to the accumulator length eq T, we found the value the user passed,
	// now add 1 to it
	[never,...U]['length']:
	// recurse with a longer array
	UVR<T,[never,...U]>['next'];


type IncR<T extends number>=IntIncImplR<T,[]>;

function xr<T extends number>(key: T,arr: typeof tree_map) {
	return [key,arr[key]] as const;
}


function do_inc(v: Inc<0>) {
	return v.next;
}

class N<T extends number>{
	value: T;
	constructor(v: T) {
		this.value=v;
	}
	static n<T extends number,U extends IncR<T>>(v: T): N<U> {
		return new N<U>(v+1 as U);
	}
	n() {
		return N.n(this.value);
	}
}

class IncH<T extends number> {
	v: Inc<T>;
	constructor(v: Inc<T>) {
		this.v=v;
	}
	static from_next() {}
	next(): Inc<T> {
		return this.v;
	}
	static next_2(c: IncH<0>): IncH<Inc<0>['next']> {
		let x: {t: 0,v: Inc<0>;}|{t: 1,v: Inc<1>;}={
			t: 0,
			v: c.v,
		};
		x={
			t: 1,
			v: {next: {next: c.v.next+1 as Inc<1>['next']['next']}}
		};
		return new IncH(x.v);
	}
	static test() {
		let tv=new IncH<0>({
			next: 1,
		});
		let c=IncH.next_2(tv);
		let r=c.next();
		let t_val=r.next.next;
		console.log(t_val);
		let val=do_inc(tv.next());
		console.log(val);
	}
}

function make_route_map() {
	let res=[];
	for(let i: keyof typeof tree_map=0;i<tree_map.length;i++) {
		let nq=new N(0);
		nq.value;
		let cm: Map<number,N<number>>=new Map;
		let it_val=0;
		cm.set(nq.value,nq);
		cm.set(nq.n().value,nq.n());
		while(cm.get(it_val)!.value<8) {
			it_val=it_val+1;
			let prev=cm.get(it_val-1);
			if(!prev) {
				break;
			}
			cm.set(it_val,prev.n());
		}
		console.log(cm);
		switch(i) {
			case 0: {
				let e=xr(i,tree_map)[1];
				res.push([e.target,new Route(RouteDescription.from(e))] as const);
			} break;
			case 1: {
				let e=xr(i,tree_map)[1];
				res.push([e.target,new Route(RouteDescription.from(e))] as const);
			} break;
			case 2: {
				let e=xr(i,tree_map)[1];
				res.push([e.target,new Route(RouteDescription.from(e))] as const);
			} break;
		}
	}
	return res;
}

export let route_map=make_route_map();
