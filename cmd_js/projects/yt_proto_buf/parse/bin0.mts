import {readFileSync} from 'fs';
import {resolve} from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname=dirname(fileURLToPath(import.meta.url));

let token_enc=readFileSync(resolve(__dirname,"../binary/bin0.txt")).toString();
function r(path: string) {
	return resolve(__dirname,path);
}
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	let as_uint=new Uint32Array(token_binary.slice(0,4).buffer);
	console.log(as_uint[0]);
	var protobuf=(await import('protobufjs') as any as {default: typeof import("protobufjs");}).default;
	let root=await protobuf.load(r("../protobuf/bin0.proto"));
	var Type=root.lookupType("A");
	console.log(new Uint32Array(token_binary.slice(0,4).buffer));
	let message=Type.decode(token_binary.subarray(4));
	type ProtoTypeBin0A={
		token1?: string;
		token2?: string;
	};
	console.log(message);
	let obj: ProtoTypeBin0A=Type.toObject(message,{
		longs: Number,
		arrays: true,
	});
	if(!obj.token1) throw new Error("Invalid result");
	if(!obj.token2) throw new Error("Invalid result");
	let {token1,token2,...obj_other}=obj;
	console.log({token1,token2},Object.keys(obj_other));
	console.log(obj_other);
	let base64_enc_2=obj.token1.replaceAll("_","/").replaceAll("-","+");
	const text_2=atob(base64_enc_2);
	let token_binary_2=new Uint8Array([...text_2].map(e => e.charCodeAt(0)));
	let Type_2=root.lookupType("A_token1");
	console.log(new Uint32Array(token_binary.slice(0,4).buffer));
	let message_2=Type_2.decode(token_binary_2);
	let obj_2=Type_2.toObject(message_2,{
		longs: Number,
	});
	console.log(obj_2);
}
run();
