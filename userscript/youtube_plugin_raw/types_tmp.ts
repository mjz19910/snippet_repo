let known_root_ve: number[]=[];
let known_strings: [string,["one",string[]]|["many",string[][]]][]=[];
let known_bool: [string,{t: boolean; f: boolean;}][];
type DecTypeNum=["data",number|bigint]|["info",number,number]|['child',Uint8Array];
type DataArrType=[number,number,DecTypeNum[]][];
function run() {
	let first_num: DecTypeNum[]=[];
	let wireType=0;
	let fieldId=4;
	/** @type {import("./types_tmp.js").DataArrType} */
	let data: DataArrType=[];
	data.push([fieldId,wireType,first_num]);
}
run();
