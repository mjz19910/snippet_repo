import {lit_value} from "./lit_value.ts";
import {lit_valueT} from "./lit_valueT.ts";
import {range} from "./range.ts";
import {rangeT} from "./rangeT.ts";
export type LongRetType=[
	[64,233,rangeT<[[160,171],[176,191]]>,1],
	[66,102,[0,1,12,15],1],
	[70,32,[152,154,159],1],
	[74,125,rangeT<[[20,31]]>,1],
	[74,125,rangeT<[lit_valueT<[64]>,[66,71],[124,143],[192,207]]>,1],
	[108,170,[192,222,223],1],
	[108,177,rangeT<[[8,15],[96,127]]>,1],
	[142,250,rangeT<[[0,31],[96,99],[101,128],lit_valueT<[136,138,140,141]>,[143,159]]>,1],
	[142,251,rangeT<[[0,2],[4,6],[8,31],[96,126],[161,167]]>,1],
	[172,217,rangeT<[[192,223]]>,1],
	[172,253,rangeT<[[56,63],[112,127]]>,1],
	[173,194,rangeT<[[64,80],lit_valueT<[104]>,[172,175],[192,224],lit_valueT<[240]>]>,1],
	[199,36,152,1],
	[207,223,[160,168],1],
	[208,68,108,1],
	[209,85,[129,rangeT<[[144,147],[200,203],lit_valueT<[211]>,[232,235]]>],1],
	[216,239,[32,36,37],1],
];
export type ip_addr_0=
	64|
	|66
	|7074|
	|74
	|108
	|108
	|142
	|142
	|172172|
	|173
	|199207|208|
	209
	|216
	;
;
export type ip_addr_idx_1=
	|32
	|36
	|68
	|85
	|102
	|125
	|125
	|170
	|177
	|194
	|217
	|223
	|233
	|239
	|250
	|251
	|253
	;
;
export type ip_addr_idx_2=
	0|1|2|4|6|
	|8
	|12
	|15
	|20
	31|32|36|
	|37
	|56
	63|64|
	|66
	|71
	|80
	|96
	|99
	|101104|
	|108
	|112
	124|126|127|128|
	|129
	|136
	|138
	|140141|143|144|
	|147
	|152154|
	|159
	|160161|167|
	|168
	|171172|175|
	|176
	|191
	|192
	|200203|
	|207
	|211
	222|223|
	|224
	|232
	|235
	|240
	;
;
export type ip_range_in_type=([ip_addr_idx_2,ip_addr_idx_2]|lit_valueT<ip_addr_idx_2[]>)[];

export type type_at_ip_2=ip_addr_idx_2|
	rangeT<ip_range_in_type>|lit_valueT<ip_addr_idx_2[]>|(ip_addr_idx_2|rangeT<ip_range_in_type>)[];

export type ip_range_type=[ip_addr_0,ip_addr_idx_1,type_at_ip_2,1][];
export function rev_arr_2(): ip_range_type {
	let x: ip_range_in_type|null=null;
	return [
		[64,233,(x=[[160,171],[176,191]],range(...x)),1],
		[66,102,[0,1,12,15],1],
		[70,32,[152,154,159],1],
		[74,125,(x=[[20,31]],range(...x)),1],
		[74,125,(x=[lit_value(64),[66,71],[124,143],[192,207]],range(...x)),1],
		[108,170,[192,222,223],1],
		[108,177,(x=[[8,15],[96,127]],range(...x)),1],
		[142,250,(x=[[0,31],[96,99],[101,128],lit_value(136,138,140,141),[143,159]],range(...x)),1],
		[142,251,(x=[[0,2],[4,6],[8,31],[96,126],[161,167]],range(...x)),1],
		[172,217,(x=[[192,223]],range(...x)),1],
		[172,253,(x=[[56,63],[112,127]],range(...x)),1],
		[173,194,(x=[[64,80],lit_value(104),[172,175],[192,224],lit_value(240)],range(...x)),1],
		[199,36,152,1],
		[207,223,[160,168],1],
		[208,68,108,1],
		[209,85,[129,(x=[[144,147],[200,203],lit_value(211),[232,235]],range(...x)),],1],
		[216,239,[32,36,37],1],
	];
}
