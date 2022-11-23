import {Dispatcher} from "./Dispatcher.js";
import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";

// https://tc39.es/ecma262/#sec-tokens
export class Tokens extends LexerBase {
	// https://tc39.es/ecma262/#prod-CommonToken
	CommonToken(str: any,index: any): LexReturnType {
		let common_token: ['IdentifierName','PrivateIdentifier','Punctuator','NumericLiteral','StringLiteral','Template']=['IdentifierName','PrivateIdentifier','Punctuator','NumericLiteral','StringLiteral','Template'];
		let acc=new Dispatcher("");
		let type=null,len=0;
		for(let m_name of common_token) {
			const cur=acc[m_name](str,index);
			if(cur[0]&&cur[1]>len) {
				type=cur[0];
				len=cur[1];
			}
		}
		return [type,len];
	}
}
