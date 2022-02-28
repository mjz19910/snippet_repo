import {ecma_base} from "./ecma_base";

export class ecma_12_6 extends ecma_base {
	/**
	 * @param {string[]} str
	 * @param {number} index
	 */
	PrivateIdentifier(str, index) {
		if(str[0] !== '#')
			return [null, 0];
		let cur = this.IdentifierName(src, index + 1);
		return cur[1] + 1;
	}
	/**
	 * @param {any} str
	 * @param {number} index
	 */
	IdentifierName(str, index) {
		let ids = this.IdentifierStart(str, index);
		if(ids > 0) {
			for(; ;) {
				let len = this.IdentifierPart(str, index + ids);
				if(len === 0) {
					break;
				}
				ids++;
			}
			return ['IdentifierName', ids];
		}
		return [null, 0];
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	IdentifierStart(str, index) {
		if(str[index].match(/[a-zA-Z$_]/)) {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	IdentifierPart(str, index) {
		if(str[index].match(/[a-zA-Z$_0-9]/)) {
			return 1;
		}
		return 0;
	}
}
