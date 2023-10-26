import {LexerBase} from "./LexerBase.ts";
import {LexReturnType} from "./LexReturnType.ts";

// https://tc39.es/ecma262/#sec-tokens
export class Tokens extends LexerBase {
	// https://tc39.es/ecma262/#prod-CommonToken
	CommonToken(str: any,index: any): LexReturnType {
		const common_token=['IdentifierName','PrivateIdentifier','Punctuator','NumericLiteral','StringLiteral','Template'] as const;
		let type=null,len=0;
		for(let m_name of common_token) {
			const cur=this.m_dispatcher[m_name](str,index);
			if(cur[0]&&cur[1]>len) {
				type=cur[0];
				len=cur[1];
			}
		}
		return [type,len];
	}
}
