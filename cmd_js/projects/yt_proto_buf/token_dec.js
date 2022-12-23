let token_enc=`
4qmFsgKvAxIPRkV3aGF0X3RvX3dhdGNoGv4CQ0JoNmx3SkhVRWRpZVUxSU9HcGZkME5OWjI5SmNUUTJPSEZLZVRSNVptTnNWMjA0UzJKUmIxcGxXRkptWTBkR2JscFdPWHBpYlVaM1l6Sm9kbVJHT1hsYVYyUndZakkxYUdKQ1NXWldWRVkwWWpCb2RXTnFiRXhOVld4cVl6QjRUMVZJYjNwak1qVXhVbGRTU0ZWdVZubE5iRlkwV25odmRrRkJRbXhpYVRGSVVXZEJRbEV3UlVGQlZVNUNRVUZGUVZKclZqTmhSMFl3V0ROU2RsZ3paR2hrUjA1dlFVRkZRa0ZSUVVGQlVVRkNRVUZCUWtGUlFtbFJVV2RCUldoT2QxbFhaR3hZTTA1MVdWaENlbUZIT1RCWU0xSjJZVEpXZFVkb1RVbDVjbWxLZDJaNVVGOUJTVll4Y1VSRlEyZ3dNR2huWDB4SmFFMUplWEpwU25kbWVWQmZRVWxXTVhGRVJVTm9NREJvWjE5TUxYQjZTSFpSYTBORFFtcyUzRJoCGmJyb3dzZS1mZWVkRkV3aGF0X3RvX3dhdGNo
`;
token_enc="4qmFsgKtAxIPRkV3aGF0X3RvX3dhdGNoGvwCQ0JoNm1BSkhUR28zY0RWSVVHcGZkME5OWjNOSk9UVnFWMmxPVjFkM2NqWjBRVlp3ZGtOdE1FdEhXR3d3V0ROQ2FGb3lWbVpqTWpWb1kwaE9iMkl6VW1aamJWWnVZVmM1ZFZsWGQxTklNVlY0WlVjNVNXSnVTVFZUZWtaS1dUTk9UVlJzUWpaTk0wNTFaRlZXYTJKWFVrWmxia3BXWlVkallVeDNRVUZhVnpSMFVqQkpRVUZWVGtKQlFVWkVVVkZCUWtGRldrWmtNbWhvWkVZNU1HSXhPVE5aV0ZKcVlVRkJRa0ZSUlVGQlFVVkJRVkZCUVVGUlJVRlphMFZKUVVKSlZHTkhSbTVhVmpsNlltMUdkMk15YUhaa1Jqa3dZakowYkdKb2IxUkRURmc0T1ZwRVVHcGZkME5HVjA1RFZFRm5aRFZDYjFCRWVVbFVRMHhZT0RsYVJGQnFYM2REUmxkT1ExUkJaMlExUW05UVJGOXhZM2czTUVwQloyZGGaAhpicm93c2UtZmVlZEZFd2hhdF90b193YXRjaA%3D%3D";
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	let as_uint=new Uint32Array(token_binary.slice(0,4).buffer);
	if(as_uint[0]!==2995104226) {
		console.log("Invalid message");
		return;
	}
	var protobuf=require('protobufjs');
	let root=await protobuf.load("continue_cmd.proto");
	var Type=root.lookupType("Int32");
	console.log(new Uint32Array(token_binary.slice(0,4).buffer));
	/** @type {protobuf.Message<YtTokenProtoMessage>} */
	let message=Type.decode(token_binary);
	let obj=Type.toObject(message);
	console.log(obj);
}
run();
