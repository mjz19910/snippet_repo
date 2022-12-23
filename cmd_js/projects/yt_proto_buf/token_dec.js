let token_enc=`
4qmFsgKvAxIPRkV3aGF0X3RvX3dhdGNoGv4CQ0JoNmx3SkhVRWRpZVUxSU9HcGZkME5OWjI5SmNUUTJPSEZLZVRSNVptTnNWMjA0UzJKUmIxcGxXRkptWTBkR2JscFdPWHBpYlVaM1l6Sm9kbVJHT1hsYVYyUndZakkxYUdKQ1NXWldWRVkwWWpCb2RXTnFiRXhOVld4cVl6QjRUMVZJYjNwak1qVXhVbGRTU0ZWdVZubE5iRlkwV25odmRrRkJRbXhpYVRGSVVXZEJRbEV3UlVGQlZVNUNRVUZGUVZKclZqTmhSMFl3V0ROU2RsZ3paR2hrUjA1dlFVRkZRa0ZSUVVGQlVVRkNRVUZCUWtGUlFtbFJVV2RCUldoT2QxbFhaR3hZTTA1MVdWaENlbUZIT1RCWU0xSjJZVEpXZFVkb1RVbDVjbWxLZDJaNVVGOUJTVll4Y1VSRlEyZ3dNR2huWDB4SmFFMUplWEpwU25kbWVWQmZRVWxXTVhGRVJVTm9NREJvWjE5TUxYQjZTSFpSYTBORFFtcyUzRJoCGmJyb3dzZS1mZWVkRkV3aGF0X3RvX3dhdGNo
`;
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
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
