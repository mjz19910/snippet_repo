import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";

// https://tc39.es/ecma262/#sec-literals-string-literals
export class StringLiterals extends LexerBase {
	StringLiteral(str: string,index: number): LexReturnType {
		let cur=str[index];
		if(cur==='"') {
			if(str[index+1]==='"') {
				return ['StringLiteral',2];
			}
			let double_string_len=this.DoubleStringCharacters(str,index+1);
			if(str[index+double_string_len+1]==='"') {
				return ['StringLiteral',double_string_len+2];
			}
			return [null,0];
		}
		if(cur==="'") {
			if(str[index+1]==="'") {
				return ['StringLiteral',2];
			}
			let single_string_len=this.SingleStringCharacters(str,index+1);
			if(str[index+single_string_len[1]+1]==="'") {
				return ['StringLiteral',single_string_len[1]+2];
			}
			return [null,0];
		}
		return [null,0];
	}
	DoubleStringCharacters(str: any,index: number) {
		let off=0;
		for(;;) {
			let len=this.DoubleStringCharacter(str,index+off);
			if(len>0) {
				off++;
				continue;
			}
			break;
		}
		return off;
	}
	DoubleStringCharacter(str: string,index: number) {
		x: {
			if(str[index]==='"') {
				return 0;
			}
			if(str[index]==='\\') {
				break x;
			}
			let len=this.m_dispatcher.LineTerminator(str,index);
			if(len[0]&&len[1]>0) {
				break x;
			}
			return 1;
		}
		if(str[index]==='\u{2028}') {
			return 1;
		}
		if(str[index]==='\u{2029}') {
			return 1;
		}
		if(str[index]==='\\') {
			let tmp=this.EscapeSequence(str,index);
			if(!tmp[0]) throw tmp[1];
			return tmp[1]+1;
		}
		let lc_len=this.LineContinuation(str,index);
		if(lc_len[0]) {
			return lc_len[1];
		}
		return 1;
	}
	SingleStringCharacters(str: string,index: number): [string|null,number] {
		let off=0;
		for(;;) {
			let len=this.SingleStringCharacter(str,index+off);
			if(len>0) {
				off++;
				continue;
			}
			break;
		}
		if(!off) {
			return [null,0];
		}
		return ["SingleStringCharacters",off];
	}
	SingleStringCharacter(str: string,index: number) {
		x: {
			if(str[index]==="'") {
				return 0;
			}
			if(str[index]==='\\') {
				break x;
			}
			let len=this.m_dispatcher.LineTerminator(str,index);
			if(len[0]&&len[1]>0) {
				break x;
			}
			return 1;
		}
		if(str[index]==='\u{2028}') {
			return 1;
		}
		if(str[index]==='\u{2029}') {
			return 1;
		}
		if(str[index]==='\\') {
			let esc_len=this.EscapeSequence(str,index);
			if(esc_len[0]) return esc_len[1]+1;
		}
		let lc_len=this.LineContinuation(str,index);
		if(lc_len[0]) {
			return lc_len[1];
		}
		return 1;
	}
	LineContinuation(str: string,index: number): LexReturnType {
		if(str[index]==='\\') {
			let lt_len=this.m_dispatcher.LineTerminatorSequence(str,index+1);
			if(lt_len[0]&&lt_len[1]>0) {
				return [true,lt_len[1]+1];
			}
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-EscapeSequence
	EscapeSequence(str: string,index: number): LexReturnType {
		let len;
		// CharacterEscapeSequence
		let out=this.CharacterEscapeSequence(str,index);
		if(out[0]) return [true,out[1]];
		// 0 [lookahead ∉ DecimalDigit]
		x: if(str[index]==='0') {
			let peek_res=this.m_dispatcher.DecimalDigit(str,index);
			if(!peek_res[0]) break x;
			let [,peek]=peek_res;
			if(peek>0) break x;
			return [true,1];
		}
		// LegacyOctalEscapeSequence
		out=this.LegacyOctalEscapeSequence(str,index);
		if(out[0]) return [true,out[1]];
		// NonOctalDecimalEscapeSequence
		let non_oct_len: 1|0=this.NonOctalDecimalEscapeSequence(str,index);
		if(non_oct_len) {
			let len_ty: 1=non_oct_len;
			return [true,len_ty];
		}
		// HexEscapeSequence
		let res=this.HexEscapeSequence(str,index);
		if(res[0]) return [true,res[1]];
		// UnicodeEscapeSequence
		len=this.UnicodeEscapeSequence(str,index);
		if(len>0) {
			return [true,len];
		}
		return [null,0];
	}
	CharacterEscapeSequence(str: string,index: number): LexReturnType {
		let len=this.SingleEscapeCharacter(str,index);
		if(len>0) {
			return [true,len];
		}
		len=this.NonEscapeCharacter(str,index);
		if(len>0) {
			return [true,len];
		}
		return [null,0];
	}
	SingleEscapeCharacter(str: string,index: number) {
		let m_arr=["'",'"','\\','b','f','n','r','t','v'];
		let cur=str[index];
		if(m_arr.includes(cur)) {
			return 1;
		}
		return 0;
	}
	NonEscapeCharacter(str: string,index: number) {
		if(this.EscapeCharacter(str,index)) {
			return 0;
		}
		if(this.m_dispatcher.LineTerminator(str,index)) {
			return 0;
		}
		return 1;
	}
	EscapeCharacter(str: string,index: number): LexReturnType {
		let len0=this.SingleEscapeCharacter(str,index);
		let len1=this.m_dispatcher.DecimalDigit(str,index);
		if(!len1[0]) throw len1[1];
		if(str[index]==='x') {
			return ["EscapeCharacter",1];
		}
		if(len0>0&&len0>=len1[1]) {
			return ["EscapeCharacter",len0];
		}
		if(len1[1]>0&&len1[1]>len0) {
			return ["EscapeCharacter",len1[1]];
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-LegacyOctalEscapeSequence
	LegacyOctalEscapeSequence(str: string,index: number): LexReturnType {
		// 0 [lookahead ∈ { 8, 9 }]
		if(str[index]==='0') {
			if(str[index+1]==='8'||str[index+1]==='9') {
				return [true,1];
			}
		}
		// NonZeroOctalDigit [lookahead ∉ OctalDigit]
		x: {
			let len=this.NonZeroOctalDigit(str,index);
			if(len>0) {
				let n_len=this.m_dispatcher.OctalDigit(str,index+1);
				if(n_len[0]) {
					break x;
				}
				return [true,1];
			}
		}
		// ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
		x: {
			let len=this.ZeroToThree(str,index);
			if(len>0) {
				let val=this.m_dispatcher.OctalDigit(str,index+1);
				if(!val[0]) break x;
				let n_len=this.m_dispatcher.OctalDigit(str,index+2);
				if(n_len[0]) break x;
				return [true,len+val[1]];
			}
		}
		// FourToSeven OctalDigit
		x: {
			let len=this.FourToSeven(str,index);
			if(len===0) break x;
			let val=this.m_dispatcher.OctalDigit(str,index+1);
			if(!val[0]) break x;
			return [true,2];
		}
		// ZeroToThree OctalDigit OctalDigit
		let len=this.ZeroToThree(str,index);
		if(!len) return [null,0];
		let val=this.m_dispatcher.OctalDigit(str,index+1);
		if(!val[0]) return [null,0];
		val=this.m_dispatcher.OctalDigit(str,index+2);
		if(!val[0]) return [null,0];
		return [true,3];
	}
	// https://tc39.es/ecma262/#prod-NonZeroOctalDigit
	NonZeroOctalDigit(str: string,index: number) {
		// OctalDigit but not 0
		if(str[index]==='0') {
			return 0;
		}
		let len=this.m_dispatcher.OctalDigit(str,index);
		if(len[0]) {
			return len[1];
		}
		return 0;
	}
	ZeroToThree(str: string,index: number) {
		let cur=str[index];
		if(cur==='0'||cur==='1'||cur==='2'||cur==='3') {
			return 1;
		}
		return 0;
	}
	FourToSeven(str: string,index: number) {
		let cur=str[index];
		let chk='4567';
		if(chk.includes(cur)) {
			return 1;
		}
		return 0;
	}
	NonOctalDecimalEscapeSequence(str: string,index: number): 1|0 {
		if(str[index]==='8'||str[index]==='9') {
			return 1;
		}
		return 0;
	}
	HexEscapeSequence(str: string,index: number): LexReturnType {
		let len=0;
		if(str[index]==='x') {
			++len;
			let res=this.m_dispatcher.HexDigit(str,index+len);
			if(!res[0]) return [null,0];
			++len;
			res=this.m_dispatcher.HexDigit(str,index+len);
			if(!res[0]) return [null,0];
			++len;
			return [true,len];
		}
		return [null,0];
	}
	UnicodeEscapeSequence(str: string,index: number) {
		let off=0;
		if(str[index]==='u') {
			++off;
		}
		let len=this.Hex4Digits(str,index+off);
		if(len[0]) {
			return len[1]+1;
		}
		if(str[index+off]==='{}'[0]) {
			++off;
			let len=this.m_dispatcher.CodePoint(str,index+off);
			if(len[0]) {
				off+=len[1];
				if(str[index+off]==='{}'[1]) {
					++off;
					return off;
				}
			}
		}
		return 0;
	}
	Hex4Digits(str: string,index: number): LexReturnType {
		let acc=0;
		let len=this.m_dispatcher.HexDigit(str,index);
		if(!len[0]) return [null,0];
		acc+=len[1];
		len=this.m_dispatcher.HexDigit(str,index);
		if(!len[0]) return [null,0];
		acc+=len[1];
		len=this.m_dispatcher.HexDigit(str,index);
		if(!len[0]) return [null,0];
		acc+=len[1];
		len=this.m_dispatcher.HexDigit(str,index);
		if(!len[0]) return [null,0];
		acc+=len[1];
		return [true,acc];
	}
}
