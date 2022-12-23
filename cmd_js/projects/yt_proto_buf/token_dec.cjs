let token_enc=`
CBh6mAJHTGo3cDVIUGpfd0NNZ3NJOTVqV2lOV1d3cjZ0QVZwdkNtMEtHWGwwWDNCaFoyVmZjMjVoY0hOb2IzUmZjbVZuYVc5dVlXd1NIMVV4ZUc5SWJuSTVTekZKWTNOTVRsQjZNM051ZFVWa2JXUkZlbkpWZUdjYUx3QUFaVzR0UjBJQUFVTkJBQUZEUVFBQkFFWkZkMmhoZEY5MGIxOTNZWFJqYUFBQkFRRUFBQUVBQVFBQUFRRUFZa0VJQUJJVGNHRm5aVjl6Ym1Gd2MyaHZkRjkwYjJ0bGJob1RDTFg4OVpEUGpfd0NGV05DVEFnZDVCb1BEeUlUQ0xYODlaRFBqX3dDRldOQ1RBZ2Q1Qm9QRF9xY3g3MEpBZ2da
`;
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	let as_uint=new Uint32Array(token_binary.slice(0,4).buffer);
	console.log(as_uint[0]);
	var protobuf=require('protobufjs');
	let root=await protobuf.load("continue_cmd.proto");
	var Type=root.lookupType("CommandToken");
	console.log(new Uint32Array(token_binary.slice(0,4).buffer));
	/** @type {protobuf.Message<YtTokenProtoMessage>} */
	let message=Type.decode(token_binary.subarray(4));
	let obj=Type.toObject(message);
	console.log(obj);
}
run();
