let token_enc="4qmFsgKtAxIPRkV3aGF0X3RvX3dhdGNoGvwCQ0JoNm1BSkhUR28zY0RWSVVHcGZkME5OWjNOSk9UVnFWMmxPVjFkM2NqWjBRVlp3ZGtOdE1FdEhXR3d3V0ROQ2FGb3lWbVpqTWpWb1kwaE9iMkl6VW1aamJWWnVZVmM1ZFZsWGQxTklNVlY0WlVjNVNXSnVTVFZUZWtaS1dUTk9UVlJzUWpaTk0wNTFaRlZXYTJKWFVrWmxia3BXWlVkallVeDNRVUZhVnpSMFVqQkpRVUZWVGtKQlFVWkVVVkZCUWtGRldrWmtNbWhvWkVZNU1HSXhPVE5aV0ZKcVlVRkJRa0ZSUlVGQlFVVkJRVkZCUVVGUlJVRlphMFZKUVVKSlZHTkhSbTVhVmpsNlltMUdkMk15YUhaa1Jqa3dZakowYkdKb2IxUkRURmc0T1ZwRVVHcGZkME5HVjA1RFZFRm5aRFZDYjFCRWVVbFVRMHhZT0RsYVJGQnFYM2REUmxkT1ExUkJaMlExUW05UVJGOXhZM2czTUVwQloyZGGaAhpicm93c2UtZmVlZEZFd2hhdF90b193YXRjaA%3D%3D";
let base64_enc=decodeURIComponent(token_enc).replaceAll("_","/").replaceAll("-","+");
const text=atob(base64_enc);
const token_binary=new Uint8Array([...text].map(e => e.charCodeAt(0)));
async function run() {
	var protobuf=require('protobufjs');
	let root=await protobuf.load("yt_token.proto");
	var A=root.lookupType("A");
	/** @type {protobuf.Message<YtTokenProtoMessage>} */
	let message=A.decode(token_binary);
	let obj=A.toObject(message);
	console.log(obj);
}
run();
