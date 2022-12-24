export function get_token_data(token: string) {
	let base64_enc_2=token.replaceAll("_","/").replaceAll("-","+");
	let text_2=atob(base64_enc_2);
	return new Uint8Array([...text_2].map(e => e.charCodeAt(0)));
}
