import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";

export class ecma_12_5 extends ecma_base {
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	CommonToken(str, index) {
		/**@type {['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template']} */
		let common_token = ['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template'];
		/**@type {{[U in typeof common_token[number]]:(x:string, y:number)=>void}} */
		let acc = new Dispatcher;
		let cur = null, type = null, len = 0;
		for(let m_name of common_token) {
			cur = acc[m_name](str, index);
			if(cur[1] > len) {
				type = cur[0];
				len = cur[1];
			}
		}
		return [type, len];
	}
}
