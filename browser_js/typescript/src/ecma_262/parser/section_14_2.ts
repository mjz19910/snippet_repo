import {ParseReturnType} from "./ParseReturnType.js";
import {ParserBase} from "./ParserBase.js";

export class section_14_2 extends ParserBase {
	// https://tc39.es/ecma262/#prod-BlockStatement
	// BlockStatement[Yield, Await, Return] :
	BlockStatement(str: string,index: number): ParseReturnType {
		// Block[?Yield, ?Await, ?Return]
		return this.Block(str,index);
	}
	// https://tc39.es/ecma262/#prod-Block
	// Block[Yield, Await, Return] :
	Block(str: string,index: number): ParseReturnType {
		let len=0;
		// { StatementList[?Yield, ?Await, ?Return] opt }
		if(str[index]==='{}'[0]) {
			len++;
		} else {
			return [null,0];
		}
		let res;
		do {
			res=this.StatementList(str,index);
			if(!res[0]) break;
			len+=res[1];
		} while(res);
		if(str[index]==='{}'[1]) {
			len++;
		} else {
			return [null,0];
		}
		return ["Block",len];
	}
	// https://tc39.es/ecma262/#prod-StatementList
	// StatementList[Yield, Await, Return] :
	StatementList(str: string,index: number): ParseReturnType {
		console.error("todo", str,index);
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-StatementListItem
	// StatementListItem[Yield, Await, Return] :
	StatementListItem(str: string,index: number) {
		let res=this.m_dispatcher.Statement(str,index);
		if(res[0]) return ['StatementListItem',res[1]];
		return [null,0];
	}
}