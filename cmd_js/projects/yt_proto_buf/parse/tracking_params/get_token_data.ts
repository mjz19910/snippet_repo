
export function get_token_data(token: string) {
	let base64_enc_2=token.replaceAll("_","/").replaceAll("-","+");
	return Buffer.from(base64_enc_2,'base64');
}
