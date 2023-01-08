import {Box} from "../rebuild_the_universe_raw/ns.js";

type ExtractTypes_6<T>=T extends {}?[Exclude<T,number>]:[null];
type ExtractTypes_5<T>=T extends Promise<any>?[T,...ExtractTypes_6<T>]:[null,...ExtractTypes_6<T>];
type ExtractTypes_4<T>=T extends Function?[T,...ExtractTypes_5<T>]:[null,...ExtractTypes_5<T>];
type ExtractTypes_3<T>=T extends any[]?   [T,...ExtractTypes_4<T>]:[null,...ExtractTypes_4<T>];
type ExtractTypes_2<T>=T extends string?  [T,...ExtractTypes_3<T>]:[null,...ExtractTypes_3<T>];
type ExtractTypes_1<T>=T extends number?  [T,...ExtractTypes_2<T>]:[null,...ExtractTypes_2<T>];
type ExtractTypeAt<T,U extends number>=NonNullable<ExtractTypes_1<T>[U]>;
type ExtractTypes<T>=[ExtractTypeAt<T,0>,ExtractTypeAt<T,1>,ExtractTypeAt<T,2>,ExtractTypeAt<T,3>,
	ExtractTypeAt<T,4>,
	ExtractTypeAt<T,5>,
	ExtractTypeAt<T,6>,
];

export type VV=ExtractTypes<number|string|any[]|(()=>any)|{}>;
export type vu=ExtractTypes<Box['value']>;
export type Vc_0=vu[0];
export type Vc_1=vu[1];
export type Vc_2=vu[2];
export type Vc_3=vu[3];
export type Vc_4=vu[4];
export type Vc_5=vu[5];
export type Vc_len=vu['length'];
export type v3=ExtractTypes<number|{a:4}>;
