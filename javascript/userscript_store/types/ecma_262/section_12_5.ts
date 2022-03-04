import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./LexerBase";
import {LexReturnType} from "./LexReturnType";

export class ecma_12_5 extends ecma_base {
	CommonToken(str: any, index: any):LexReturnType {
		/**@type {['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template']} */
		let common_token: ['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template'] = ['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template'];
		let acc:{[U in typeof common_token[number]]:(x:string, y:number)=>LexReturnType} = new Dispatcher;
		let type = null, len = 0;
		for(let m_name of common_token) {
			const cur = acc[m_name](str, index);
			if(cur[0] && cur[1] > len) {
				type = cur[0];
				len = cur[1];
			}
		}
		return [type, len];
	}
}
