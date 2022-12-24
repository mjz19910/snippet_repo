import {writeFileSync} from 'fs';

export function get_token_data(token: string,r: (x:string)=>string) {
	let base64_enc_2=token.replaceAll("_","/").replaceAll("-","+");
	writeFileSync(r("binary/bin0_token1.txt"),base64_enc_2);
	let text_2=atob(base64_enc_2);
	return new Uint8Array([...text_2].map(e => e.charCodeAt(0)));
}
