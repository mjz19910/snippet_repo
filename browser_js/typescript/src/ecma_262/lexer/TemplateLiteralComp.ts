import {Dispatcher} from "./Dispatcher.js";
import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";

// https://tc39.es/ecma262/#sec-template-literal-lexical-components
// Template Literal Lexical Components
export class TemplateLiteralComp extends LexerBase {
	// https://tc39.es/ecma262/#prod-TemplateEscapeSequence
	TemplateEscapeSequence(str: string,index: number): LexReturnType {
		let len=0;
		/* CharacterEscapeSequence */
		let tmp=this.m_dispatcher.CharacterEscapeSequence(str,index);
		if(tmp[0]) {
			return [true,tmp[1]];
		}
		/* 0 [lookahead ∉ DecimalDigit]*/
		if(str[index]==='0') {
			len++;
			let la=this.m_dispatcher.DecimalDigit(str,index);
			if(!la[0]) {
				return [true,len];
			}
		}
		len=0;
		/* HexEscapeSequence*/
		let res=this.m_dispatcher.HexEscapeSequence(str,index);
		if(res[0]) return [true,res[1]];
		/* UnicodeEscapeSequence*/
		res=this.m_dispatcher.UnicodeEscapeSequence(str,index);
		if(res[0]) return [true,res[1]];
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-CodePoint
	CodePoint(str: string,index: number): LexReturnType {
		// HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF
		let res=this.m_dispatcher.HexDigits(str,index);
		if(res[0]) {
			if(res[1]>0&&typeof res[0]==='string') {
				// but only if MV of HexDigits ≤ 0x10FFFF
				let MV=parseInt(res[0],16);
				if(MV<=0x10FFFF) {
					return ['CodePoint',res[1]];
				}
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateHead
	TemplateHead(str: string,index: number): LexReturnType {
		let cur_index=index;
		// ` TemplateCharacters_opt ${
		if(str[cur_index]==='`') {
			cur_index++;
			let res=this.TemplateCharacters(str,cur_index);
			if(res[0]===false) throw res[1];
			if(res[1]>0) {
				cur_index+=res[1];
			}
			if(str[cur_index]==='$'&&str[cur_index+1]==='{') {
				return [true,cur_index+2];
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateMiddle
	TemplateMiddle(str: string,index: number): LexReturnType {
		let len=0;
		// } TemplateCharacters_opt ${
		if(str[index]==='{}'[1]) {
			len++;
			if(str[index+len]==='$'&&str[index+len+1]==='{}'[0]) {
				return [true,len+2];
			}
			let res=this.TemplateCharacters(str,index);
			if(res[0]) {
				len+=res[1];
				if(str[index+len]==='$'&&str[index+len+1]==='{}'[0]) {
					return [true,len+2];
				}
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateTail
	TemplateTail(str: string,index: number): LexReturnType {
		let len=0;
		// } TemplateCharacters_opt `
		if(str[index]==='{}'[0]) {
			len++;
			if(str[index+len]==='`') {
				len++;
				return [true,len];
			}
			let res=this.TemplateCharacters(str,index);
			if(res[0]) {
				len+=res[1];
				if(str[index+len]==='`') {
					len++;
					return [true,len];
				}
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateSubstitutionTail
	TemplateSubstitutionTail(str: string,index: number): LexReturnType {
		// TemplateMiddle
		let res=this.TemplateMiddle(str,index);
		if(res[0]) {
			return [true,res[1]];
		}
		// TemplateTail
		res=this.TemplateTail(str,index);
		if(res[0]) {
			return [true,res[1]];
		}
		return [null,0];
	}
	/*Template*/
	Template(str: string,index: number): LexReturnType {
		// NoSubstitutionTemplate
		let ret=this.NoSubstitutionTemplate(str,index);
		if(ret[0]) {
			return ret;
		}
		// TemplateHead
		ret=this.TemplateHead(str,index);
		if(ret[0]) {
			return ret;
		}
		return [null,0];
	}
	/* TemplateCharacter*/
	TemplateCharacter(str: string,index: number): LexReturnType {
		/* $ [lookahead ≠ {]*/
		if(str[index]==='$'&&str[index+1]!=='{') {
			return [true,1];
		}
		/* \ TemplateEscapeSequence*/
		if(str[index]==='\\') {
			let escape_res=this.TemplateEscapeSequence(str,index);
			if(escape_res[0]) {
				return [true,escape_res[1]];
			}
		}
		/* \ NotEscapeSequence*/
		if(str[index]==='\\') {
			let not_esc=this.NotEscapeSequence(str,index);
			if(not_esc[0]===false) {
				throw not_esc[1];
			}
		}
		/* LineContinuation */
		let res=this.m_dispatcher.LineContinuation(str,index);
		if(res[0]) {
			return [true,res[1]];
		}
		/* LineTerminatorSequence */
		res=this.m_dispatcher.LineTerminatorSequence(str,index);
		if(res[0]) {
			return [true,res[1]];
		}
		/* SourceCharacter but not one of ` or \ or $ or LineTerminator*/
		if(str[index]==='`'||str[index]==='\\'||str[index]==='$') {
			return [null,0];
		}
		res=this.m_dispatcher.LineTerminator(str,index);
		if(res[0]) {
			return [null,0];
		}
		/* TODO: SourceCharacter is too complex for js
				 It requires handling all of unicode */
		return [true,1];
	}
	// https://tc39.es/ecma262/#prod-NotEscapeSequence
	NotEscapeSequence(str: string,index: number): LexReturnType {
		let len=0;
		// 0 DecimalDigit
		if(str[index]==='0') {
			len++;
			let res=this.m_dispatcher.DecimalDigit(str,index+len);
			if(res[0]) {
				return [true,2];
			}
		} else {
			// DecimalDigit but not 0
			// else excludes 0
			let res=this.m_dispatcher.DecimalDigit(str,index);
			if(res[0]) {
				return [true,res[1]];
			}
		}
		len=0;
		// x [lookahead ∉ HexDigit]
		if(str[index]==='x') {
			++len;
			let lookahead=this.m_dispatcher.HexDigit(str,index+len);
			if(!lookahead[0]) {
				return ['x [lookahead ∉ HexDigit]',len];
			} else {
				// x HexDigit [lookahead ∉ HexDigit]
				lookahead=this.m_dispatcher.HexDigit(str,index+len);
				if(!lookahead[0]) {
					return ['x HexDigit [lookahead ∉ HexDigit]',len];
				}
			}
		}
		len=0;
		// u [lookahead ∉ HexDigit] [lookahead ≠ {]
		if(str[index]==='u') {
			len++;
			let lookahead_res_1=this.m_dispatcher.HexDigit(str,index+1);
			let lookahead_2=str[index+1]!=='{}'[0];
			if(!lookahead_res_1[0]&&lookahead_2) {
				return ['u [lookahead ∉ HexDigit] [lookahead ≠ {]',1];
			}
			// u HexDigit [lookahead ∉ HexDigit]
			lookahead_res_1=this.m_dispatcher.HexDigit(str,index+1);
			let lookahead_res_2=this.m_dispatcher.HexDigit(str,index+1);
			if(lookahead_res_1[0]&&!lookahead_res_2[0]) {
				return ['u HexDigit [lookahead ∉ HexDigit]',2];
			}
			// u HexDigit HexDigit [lookahead ∉ HexDigit]
			lookahead_res_1=this.m_dispatcher.HexDigit(str,index+1);
			lookahead_res_2=this.m_dispatcher.HexDigit(str,index+1);
			let lookahead_res=lookahead_res_1[0]&&lookahead_res_2[0];
			let lookahead_res_3=this.m_dispatcher.HexDigit(str,index+1);
			if(lookahead_res&&!lookahead_res_3[0]) {
				return ['u HexDigit2 [lookahead ∉ HexDigit]',3];
			}
			// u HexDigit HexDigit HexDigit [lookahead ∉ HexDigit]
			lookahead_res_1=this.m_dispatcher.HexDigit(str,index+1);
			lookahead_res_2=this.m_dispatcher.HexDigit(str,index+1);
			lookahead_res_3=this.m_dispatcher.HexDigit(str,index+1);
			lookahead_res=lookahead_res_1[0]&&lookahead_res_2[0]&&lookahead_res_3[0];
			let lookahead_res_4=this.m_dispatcher.HexDigit(str,index+1);
			if(lookahead_res&&!lookahead_res_4[0]) {
				return ['u HexDigit3 [lookahead ∉ HexDigit]',4];
			}
			// u { [lookahead ∉ HexDigit]
			// u { NotCodePoint [lookahead ∉ HexDigit]
			// u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]
			if(str[index+len]==='{}'[1]) {
				++len;
				// [lookahead ∉ HexDigit]
				let lookahead_res_1=this.m_dispatcher.HexDigit(str,index+len);
				if(!lookahead_res_1[0]) {
					return ['u { [lookahead ∉ HexDigit]',len];
				}
				// NotCodePoint [lookahead ∉ HexDigit]
				lookahead_res_1=this.NotCodePoint(str,index+len);
				lookahead_res_2=this.m_dispatcher.HexDigit(str,index+len+1);
				if(lookahead_res_1[0]&&!lookahead_res_2[0]) {
					return ['u { NotCodePoint [lookahead ∉ HexDigit]',len];
				}
				// CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]
				lookahead_res_1=this.CodePoint(str,index+len);
				lookahead_res_2=this.m_dispatcher.HexDigit(str,index+len+1);
				let lookahead_3=str[index+len+1]!=='{}'[1];
				if(lookahead_res_1[0]&&!lookahead_res_2[0]) {
					return ['u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]',len+1];
				}
				if(lookahead_res_1[0]&&lookahead_3) {
					return ['u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]',len+1];
				}
			}
			return [null,0];
		}
		return [false,new Error("TODO: NotEscapeSequence")];
	}
	// https://tc39.es/ecma262/#prod-NotCodePoint
	NotCodePoint(str: string,index: number): LexReturnType {
		// HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF
		let res=this.m_dispatcher.HexDigits(str,index);
		if(res[0]&&res[1]>0&&typeof res[0]==='string') {
			// but only if MV of HexDigits > 0x10FFFF
			let MV=parseInt(res[0],16);
			if(MV>0x10FFFF) {
				return ['NotCodePoint',res[1]];
			}
		}
		return [null,0];
	}
	/* TemplateCharacters ::*/
	/* | TemplateCharacter TemplateCharacters opt*/
	TemplateCharacters(str: string,index: number): LexReturnType {
		let cur_index=index;
		let tmp=this.TemplateCharacter(str,cur_index);
		if(tmp[0]) {
			cur_index+=tmp[1];
		}
		while(tmp[0]!==false&&cur_index<str.length) {
			tmp=this.TemplateCharacter(str,cur_index);
			if(tmp[0]) {
				cur_index+=tmp[1];
			} else {
				break;
			}
		}
		return ['TemplateCharacters',cur_index-index];
	}
	// https://tc39.es/ecma262/#prod-Template
	NoSubstitutionTemplate(str: string,index: number): LexReturnType {
		let cur_index=index;
		//` TemplateCharacters opt `
		if(str[cur_index]==='`') {
			cur_index++;
		} else {
			return [null,0];
		}
		let opt=this.TemplateCharacters(str,cur_index);
		if(opt[0]===false) throw opt[1];
		return ['NoSubstitutionTemplate',cur_index-index+opt[1]];
	}
}

export async function run_tests_impl() {
	let test_string=`
	let v=\`Hi there\`
	`;
	let dispatcher=new Dispatcher(test_string);
	let res=dispatcher.Template(test_string,test_string.indexOf('`'));
	if(res[0]) {
		let result=test_string.slice(test_string.indexOf('`'),test_string.indexOf('`')+res[1]+1);
		console.log('ecma 12.8.6 result',result,res);
	} else {
		console.assert(false,"Test failed: ecma_12_8_6 (Template)",res);
	}
}

export function run_tests() {
	run_tests_impl();
}