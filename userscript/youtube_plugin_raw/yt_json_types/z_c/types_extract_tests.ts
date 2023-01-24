import {Box} from "../../rebuild_the_universe_raw/ns.js";

type ExtractTypes_5<T>=T extends Promise<infer U>?[Promise<U>]:[null];
type ExtractTypes_4<T>=T extends (...v:infer A)=>infer R?[(...v:A)=>R,...ExtractTypes_5<T>]:[null,...ExtractTypes_5<T>];
type ExtractTypes_3<T>=T extends any[]? T extends infer R extends any[]?[R[0][],...ExtractTypes_4<T>]:[null,...ExtractTypes_4<T>]:[null,...ExtractTypes_4<T>];
type ExtractTypes_2<T>=T extends string?  [string,...ExtractTypes_3<T>]:[null,...ExtractTypes_3<T>];
type ExtractTypes_1<T>=T extends number?  [number,...ExtractTypes_2<T>]:[null,...ExtractTypes_2<T>];
type ExtractTypeAt<T,U extends number>=ExtractTypes_1<T>[U];
type ExtractTypes<T>=[ExtractTypeAt<T,0>,ExtractTypeAt<T,1>,ExtractTypeAt<T,2>,ExtractTypeAt<T,3>,
	ExtractTypeAt<T,4>,
];

export type VV=ExtractTypes<number|string|any[]|(()=>any)|{}>;
export type vu=ExtractTypes<Box['value']>;
export type Vc_0=vu[0];
export type Vc_1=vu[1];
export type Vc_2=vu[2];
export type Vc_3=vu[3];
export type Vc_4=vu[4];
export type Vc_len=vu['length'];
export type ux=ExtractTypes_1<number|{a:4}|any[]>;
export type v3=ExtractTypes<number|{a:4}|any[]>;
