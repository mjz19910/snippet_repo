import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class ecma_12_6 extends ecma_base {
	PrivateIdentifier(str:string, index:number):ecma_return_type {
		if(str[0] !== '#')
			return [null, 0];
		let cur = this.IdentifierName(str, index + 1);
		return [true, cur[1] + 1];
	}
	IdentifierName(str:string, index:number):ecma_return_type {
		let [, ids] = this.IdentifierStart(str, index);
		if(ids > 0) {
			for(; ;) {
				let [, len] = this.IdentifierPart(str, index + ids);
				if(len === 0) {
					break;
				}
				ids++;
			}
			return ['IdentifierName', ids];
		}
		return [null, 0];
	}
	IdentifierStart(str:string, index:number):ecma_return_type {
		if(str[index].match(/[a-zA-Z$_]/)) {
			return [true, 1];
		}
		return [null, 0];
	}
	IdentifierPart(str:string, index:number):ecma_return_type {
		if(str[index].match(/[a-zA-Z$_0-9]/)) {
			return [true, 1];
		}
		return [null, 0];
	}
}
