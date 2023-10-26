import {T_Split,T_VideoIdStr} from "../yt_json_types/stu/group_T.ts";

export namespace hidden_namespace {
	type AbcChar=T_Split<"abcdefghijklmnopqrstuvwxyz","">[number];
	type NumChar=T_Split<"0123456789","">[number];
	type Char=Uppercase<AbcChar>|AbcChar|NumChar;
	type Delay2<T>=T;
	type Delay1<T>=Delay2<T>;
	type Delay<T>=T extends string? Delay1<T>:never;
	export type TJoin<T extends string>=`${T}`;
	export type Cj2<T extends string>=T extends infer U? U extends `${Delay<Char>}${Delay<Char>}`? U:never:never;
	export type Cj4<T extends string>=T extends infer U? U extends Cj4<`${T}`>? U:never:never;
	type cc=T_Split<"g2U2-i13970","">;
	export type c2=T_Split<"AAAAAAAAAAA","">;
	export type UU=cc["length"];
	export const vv: {videoId: T_VideoIdStr<"g2U2-i13970">;}={videoId: "g2U2-i13970"};
}
