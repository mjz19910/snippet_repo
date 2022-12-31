let known_root_ve: number[]=[];
let known_strings: [string,["one",string[]]|["many",string[][]]][]=[];
let known_bool: [string,{t: boolean; f: boolean;}][];
function save_data_cache() {
	let data={
		known_root_ve,
		known_strings,
		known_bool,
	};
	let json_str=JSON.stringify(data);
	localStorage.data=json_str;
	return data;
}

export type SaveDataRet=ReturnType<typeof save_data_cache>;

export {};

export type DecRetType={
	first_w: number;
	first_f: number;
	as_num: (number|bigint|DecRetType)[]; rest: [number,number,number|bigint|DecRetType|null][];
};
