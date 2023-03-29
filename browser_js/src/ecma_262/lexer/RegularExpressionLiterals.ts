import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";

// https://tc39.es/ecma262/#sec-literals-regular-expression-literals
export class RegularExpressionLiterals extends LexerBase {
	// https://tc39.es/ecma262/#prod-RegularExpressionLiteral
	RegularExpressionLiteral(str: string,index: number): LexReturnType {
		let len=0;
		// / RegularExpressionBody / RegularExpressionFlags
		if(str[index]==='/') {
			len++;
		} else {
			return [null,0];
		}
		let res=this.RegularExpressionBody(str,index);
		if(!res[0]) return [null,0];
		len+=res[1];
		if(str[index+len]==='/') {
			len++;
		} else {
			return [null,0];
		}
		res=this.RegularExpressionFlags(str,index);
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBody
	RegularExpressionBody(str: string,index: number): LexReturnType {
		// RegularExpressionFirstChar RegularExpressionChars
		let res=this.RegularExpressionFirstChar(str,index);
		console.error("todo",res);
		throw new Error("TODO");
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFirstChar
	RegularExpressionFirstChar(str: string,index: number): LexReturnType {
		// RegularExpressionNonTerminator but not one of * or \ or / or [
		x: {
			if(str[index]==='*'||str[index]==='\\'&&str[index]==='/'||str[index]==='[]'[0]) {
				break x;
			}
			let res=this.RegularExpressionNonTerminator(str,index);
			if(res[0])
				return [true,res[1]];
		}
		// RegularExpressionBackslashSequence
		let res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,res[1]];
		// RegularExpressionClass
		res=this.RegularExpressionClass(str,index);
		if(res[0])
			return [true,res[1]];
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator
	RegularExpressionNonTerminator(str: string,index: number): LexReturnType {
		// SourceCharacter but not LineTerminator
		let vv=this.m_dispatcher.LineTerminator(str,index);
		if(vv[0])
			return [null,0];
		return [true,1];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBackslashSequence
	RegularExpressionBackslashSequence(str: string,index: number): LexReturnType {
		// \ RegularExpressionNonTerminator
		if(str[index]==='\\') {
			let res=this.RegularExpressionNonTerminator(str,index+1);
			if(res[0])
				return [true,1+res[1]];
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClass
	RegularExpressionClass(str: string,index: number): LexReturnType {
		let len=0;
		// [ RegularExpressionClassChars ]
		if(str[index]==='[]'[0]) {
			len++;
			let res=this.RegularExpressionClassChars(str,index+len);
			if(res[0]) {
				if(str[index+res[1]]==='[]'[1]) {
					len++;
					return [true,len+res[1]];
				}
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChars
	RegularExpressionClassChars(str: string,index: number): LexReturnType {
		let len=0;
		let is_class_chars=this.RegularExpressionClassChar(str,index+len);
		// [empty]
		if(!is_class_chars[0])
			return [true,0];
		while(is_class_chars[0]) {
			len++;
			is_class_chars=this.RegularExpressionClassChar(str,index+len);
			if(!is_class_chars[0]) {
				break;
			}
		}
		return [true,len];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChar
	RegularExpressionClassChar(str: string,index: number): LexReturnType {
		// RegularExpressionNonTerminator but not one of ] or \
		if(str[index]==='[]'[1]||str[index]==='\\') {
			return [null,0];
		}
		let res=this.RegularExpressionNonTerminator(str,index);
		if(res[0])
			return [true,res[1]];
		res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,res[1]];
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFlags
	RegularExpressionFlags(str: string,index: number): LexReturnType {
		// [empty]
		let len=0;
		let is_class_chars=this.m_dispatcher.IdentifierPartChar(str,index+len);
		if(!is_class_chars[0])
			return [true,0];
		throw new Error("TODO");
	}
}
