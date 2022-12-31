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
	as_num: DecTypeNum[];
	rest: [number,number,DecTypeNum|null][];
};
export type DecTypeNum=["data",number|bigint|DecRetType]|["info",number,number]|['child',Uint8Array];
export type DataArrType=[number,number,DecTypeNum[]][];
function run() {
	let first_num: DecTypeNum[]=[];
	let wireType=0;
	let fieldId=4;
	/** @type {import("./types_tmp.js").DataArrType} */
	let data: DataArrType=[];
	data.push([fieldId,wireType,first_num]);
}
run();
