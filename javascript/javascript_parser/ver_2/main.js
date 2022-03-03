export function ecma_parse_main() {
	'use strict';
	{
		class ecma_12_2 {
			static _attach(root) {
				root.export(this, '12.2', ['WhiteSpace']);
			}
			WhiteSpace(str, index) {
				if(str[index] === ' ') {
					return ['WhiteSpace', 1];
				}
				if(str[index] === '\t') {
					return ['WhiteSpace', 1];
				}
				return [null, 0];
			}
		}
		class ecma_12_3 {
			static the() {
				if(this._the)
					return this._the;
				this._the = new this;
			}
			static _attach(root) {
				root.export(this, '12.3', ['LineTerminator', 'LineTerminatorSequence']);
			}
			LineTerminator(str, index) {
				let len = 0;
				if(str[index] === '\r')
					len = 1;
				if(str[index] === '\n')
					len = 1;
				//<LS>
				if(str[index] === '\u{2028}')
					len = 1;
				//<PS>
				if(str[index] === '\u{2029}')
					len = 1;
				if(len > 0) {
					return ['LineTerminator', 1];
				}
				return [null, 0];
			}
			LineTerminatorSequence() {
				console.info('LineTerminatorSequence not implemented');
			}
		}
		class ecma_12_4 {
			static _attach(root) {
				let exports = [];
				exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.4', exports);
			}
			Comment(str, index) {
				let ml_len = this.MultiLineComment(str, index);
				let sl_len = this.SingleLineComment(str, index);
				if(ml_len[1] > 0) {
					return ml_len;
				}
				if(sl_len[1] > 0) {
					return sl_len;
				}
				return [null, 0];
			}
			MultiLineComment(str, index) {
				`
				MultiLineComment ::
				/* MultiLineCommentChars opt */
				`;
				let off = 0;
				let eof_off = str.length - 1;
				if(str.slice(index, index + 2) === '/*') {
					off += 2;
					if(str.slice(index + off, index + off + 2) === '*/') {
						return ['MultiLineComment', 4];
					}
					let com_len = this.MultiLineCommentChars(str, index + off);
					if(com_len === 0) {
						return [null, 0];
					}
					console.log([str.slice(index, index + off + com_len + 2)]);
					if(str.slice(index + off + com_len, index + off + com_len + 2) === "*/") {
						return ['MultiLineComment', off + com_len + 2];
					}
				}
				return [null, 0];
			}
			/**MultiLineCommentChars ::
			MultiLineNotAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			MultiLineCommentChars(str, index) {
				this.dep ??= 0;
				let slen = 0;
				if(this.dep > 64) {
					throw Error('stack overflow');
				}
				this.dep++;
				let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
				if(ml_na > 0) {
					slen++;
					for(; ;) {
						let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
						if(ml_na > 0) {
							slen += ml_na;
							continue;
						}
						if(str[index + slen] === '*') {
							let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
							if(pac > 0) {
								slen++;
								slen += pac;
							}
						}
						break;
					}
				}
				if(str[index + slen] === '*') {
					let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
					if(pac > 0) {
						slen++;
						slen += pac;
					}
				}
				this.dep--;
				return slen;
			}
			/**PostAsteriskCommentChars ::
			MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			PostAsteriskCommentChars(str, index) {
				let idxoff = 0;
				let cxlen = this.MultiLineNotForwardSlashOrAsteriskChar(str, index + idxoff);
				if(cxlen > 0) {
					idxoff += cxlen;
					let la = this.MultiLineCommentChars(str, index + idxoff);
					idxoff += la;
					return idxoff;
				}
				if(cxlen === 0) {
					if(str[index + idxoff] === '*') {
						idxoff++;
						let len = this.PostAsteriskCommentChars(str, index + idxoff);
						if(len > 0) {
							return len + idxoff;
						}
					}
				}
				return idxoff;
			}
			/**MultiLineNotAsteriskChar ::
			SourceCharacter but not * */
			MultiLineNotAsteriskChar(str, index) {
				if(str[index] !== '*') {
					return 1;
				}
				return 0;
			}
			MultiLineNotForwardSlashOrAsteriskChar(str, index) {
				if(str[index] === '*' || str[index] === '/') {
					return 0;
				}
				return 1;
			}
			SingleLineComment(str, index) {
				if(str.slice(index, index + 2) === '//') {
					let comlen = this.SingleLineCommentChars(str, index + 2);
					return ['SingleLineComment', comlen + 2];
				}
				return [null, 0];
			}
			/*SingleLineCommentChars ::
			SingleLineCommentChar SingleLineCommentChars*/
			SingleLineCommentChars(str, index) {
				let sidx = index;
				while(str[sidx] !== '\n') {
					sidx++;
					if(sidx > str.length) {
						break;
					}
				}
				return sidx - index;
			}
		}
		class ecma_12_5 {
			static _attach(root) {
				root.export(this, '12.5', ['CommonToken']);
			}
			/*
			CommonToken ::
			IdentifierName
			PrivateIdentifier
			Punctuator
			NumericLiteral
			StringLiteral
			Template
			*/
			CommonToken(str, index) {
				let cur = null, item = null, len = 0;
				cur = this.IdentifierName(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.PrivateIdentifier(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.Punctuator(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.NumericLiteral(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.StringLiteral(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				cur = this.Template(str, index);
				if(cur[1] > len) {
					len = cur[1];
					item = cur;
				}
				return item;
			}
		}
		class ecma_12_6 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.6', exports);
			}
			static source = `
			PrivateIdentifier ::
			# IdentifierName
			
			IdentifierName ::
			IdentifierStart
			IdentifierName IdentifierPart
			
			IdentifierStart ::
			UnicodeIDStart
			$
			_
			\ UnicodeEscapeSequence
			
			IdentifierPart ::
			UnicodeIDContinue
			$
			\ UnicodeEscapeSequence
			<ZWNJ>
			<ZWJ>
			
			UnicodeIDStart ::
			any Unicode code point with the Unicode property “ID_Start”
			
			UnicodeIDContinue ::
			any Unicode code point with the Unicode property “ID_Continue”
			`;
			PrivateIdentifier(str, index) {
				if(str[0] !== '#')
					return [null, 0];
				let cur = this.IdentifierName(src, index + 1);
				return cur[1] + 1;
			}
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
			IdentifierStart(str, index) {
				if(str[index].match(/[a-zA-Z$_]/)) {
					return 1;
				}
				return 0;
			}
			IdentifierPart(str, index) {
				if(str[index].match(/[a-zA-Z$_0-9]/)) {
					return 1;
				}
				return 0;
			}
		}
		class ecma_12_7 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				let test_class = new ecma_12_7();
				let static_names_arr = Object.getOwnPropertyNames(test_class);
				exports = exports.concat(static_names_arr);
				for(let x of static_names_arr) {
					this.prototype[x] = test_class[x];
				}
				root.export(this, '12.7', exports);
			}
			Punctuator(str, index) {
				let len = this.OptionalChainingPunctuator(str, index);
				if(len > 0) {
					return len;
				}
				return 0;
			}
			OptionalChainingPunctuator(str, index) {
				if(str.slice(index, index + 2) === '?.') {
					let num_len = this.DecimalDigit(str, index + 2);
					if(num_len > 0) {
						return 0;
					}
					return 2;
				}
				let punct_len = this.OtherPunctuator(str, index);
				if(punct_len > 0) {
					return punct_len;
				}
				return 0;
			}
			_OtherPunct = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
			OtherPunctuator(str, index) {
				let len = 0;
				for(let ci, i = 0; i < this._OtherPunct.length; i++) {
					ci = this._OtherPunct[i];
					if(str.slice(index, index + ci.length) === ci) {
						if(ci.length > len) {
							len = ci.length;
						}
					}
				}
				return len;
			}
			_DivPunct = "/ /=".split(' ');
			DivPunctuator(str, index) {
				let len = 0;
				for(let ci, i = 0; i < this._DivPunct.length; i++) {
					ci = this._DivPunct[i];
					if(str.slice(index, index + ci.length) === ci) {
						if(ci.length > len) {
							len = ci.length;
						}
					}
				}
				return len;
			}
			RightBracePunctuator(str, index) {
				if(str[index] === '{}'[1]) {
					return 1;
				}
				return 0;
			}
		}
		class ecma_12_8 {
			static the() {
				if(ecma_12_8._the)
					return ecma_12_8._the;
				ecma_12_8._the = new ecma_12_8;
			}
			constructor() {}
			static _forward_imports(root) {
				let fn = root._pull_import('LineTerminator');
				this.LineTerminator = fn;
			}
			RegularExpressionNonTerminator(str) {
				let _val = this.LineTerminator(str);
				if(_val[0] === 0) {
					return [1, ['regexpNonTerm'], null];
				}
				return [0, null, null];
			}
		}
		class ecma_12_8_3 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.8.3', exports);
			}
			DecimalDigit(str, index) {
				if(str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteral(str, index) {
				let len = this.DecimalLiteral(str, index);
				if(len > 0) {
					return len;
				}
				return 0;
			}
			DecimalLiteral(str, index) {
				if(str[index] === '0') {
					return 1;
				}
				let zd_len = this.NonZeroDigit(str, index);
				let off = 0;
				if(zd_len === 1) {
					off += 1;
					let ns_len = this.NumericLiteralSeparator(str, index + off);
					if(ns_len > 0) {
						off++;
					}
					let dd_len = this.DecimalDigits(str, index + off);
					return dd_len + off;
				}
				return off;
			}
			DecimalDigits(str, index) {
				let off = 0;
				for(; ;) {
					let len = this.DecimalDigit(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					let s_len = this.NumericLiteralSeparator(str, index + off);
					if(s_len > 0) {
						let exl = this.DecimalDigit(str, index + off + 1);
						if(exl > 0) {
							off++;
							continue;
						}
						break;
					}
					break;
				}
				return off;
			}
			NonZeroDigit(str, index) {
				if(str.charCodeAt(index) >= 49 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteralSeparator(str, index) {
				if(str[index] === '_') {
					return 1;
				}
				return 0;
			}
			DecimalIntegerLiteral(str, index) {
			}
		}
		class ecma_base {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				let ecma_section_name = this.name.slice(5).replaceAll('_', '.');
				root.export(this, ecma_section_name, exports);
			}
		}
		class ecma_12_8_4 {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.8.4', exports);
			}
			/*
			EscapeCharacter ::
			SingleEscapeCharacter
			DecimalDigit
			x
			u

			LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit

			NonZeroOctalDigit ::
			OctalDigit but not 0

			ZeroToThree :: one of
			0 1 2 3

			FourToSeven :: one of
			4 5 6 7

			NonOctalDecimalEscapeSequence :: one of
			8 9

			HexEscapeSequence ::
			x HexDigit HexDigit

			UnicodeEscapeSequence ::
			u Hex4Digits
			u{ CodePoint }

			Hex4Digits ::
			HexDigit HexDigit HexDigit HexDigit
			*/
			StringLiteral(str, index) {
				let cur = str[index];
				if(cur === '"') {
					if(str[index + 1] === '"') {
						return ['StringLiteral', 2];
					}
					let dslen = this.DoubleStringCharacters(str, index + 1);
					if(str[index + dslen + 1] === '"') {
						return ['StringLiteral', dslen + 2];
					}
					return [null, 0];
				}
				if(cur === "'") {
					if(str[index + 1] === "'") {
						return ['StringLiteral', 2];
					}
					let sslen = this.SingleStringCharacters(str, index + 1);
					if(str[index + sslen + 1] === "'") {
						return ['StringLiteral', sslen + 2];
					}
					return [null, 0];
				}
				return [null, 0];
			}
			DoubleStringCharacters(str, index) {
				let off = 0;
				for(; ;) {
					let len = this.DoubleStringCharacter(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			DoubleStringCharacter(str, index) {
				x: {
					if(str[index] === '"') {
						return 0;
					}
					if(str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if(len > 0) {
						break x;
					}
					return 1;
				}
				if(str[index] === '\u{2028}') {
					return 1;
				}
				if(str[index] === '\u{2029}') {
					return 1;
				}
				if(str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if(lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			SingleStringCharacters(str, index) {
				let off = 0;
				for(; ;) {
					let len = this.SingleStringCharacter(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			SingleStringCharacter(str, index) {
				x: {
					if(str[index] === "'") {
						return 0;
					}
					if(str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if(len > 0) {
						break x;
					}
					return 1;
				}
				if(str[index] === '\u{2028}') {
					return 1;
				}
				if(str[index] === '\u{2029}') {
					return 1;
				}
				if(str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if(lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			LineContinuation(str, index) {
				if(str[index] === '\\') {
					let lt_len = this.LineTerminatorSequence(str, index + 1);
					if(lt_len > 0) {
						return lt_len + 1;
					}
					return 0;
				}
			}
			/*
			EscapeSequence ::
			CharacterEscapeSequence
			0 [lookahead ∉ DecimalDigit]
			LegacyOctalEscapeSequence
			NonOctalDecimalEscapeSequence
			HexEscapeSequence
			UnicodeEscapeSequence

			following function ignores:
			LegacyOctalEscapeSequence
			*/
			EscapeSequence(str, index) {
				let len = this.CharacterEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				x: {
					if(str[index] === '0') {
						let peek = this.DecimalDigit(str, index);
						if(peek > 0) {
							break x;
						}
						// \0 null escape found
						return 1;
					}
				}
				len = this.LegacyOctalEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.NonOctalDecimalEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.HexEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.UnicodeEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				return 0;
			}
			CharacterEscapeSequence(str, index) {
				let len = this.SingleEscapeCharacter(str, index);
				if(len > 0) {
					return len;
				}
				len = this.NonEscapeCharacter(str, index);
				if(len > 0) {
					return len;
				}
			}
			SingleEscapeCharacter(str, index) {
				let val = ["'", "\"", "\\", "b", "f", "n", "r", "t", "v"];
				let cur = str[index];
				if(val.includes(cur)) {
					return 1;
				}
			}
			NonEscapeCharacter(str, index) {
				if(this.EscapeCharacter(str, index)) {
					return 0;
				}
				if(this.LineTerminator(str, index)) {
					return 0;
				}
				return 1;
			}
			EscapeCharacter(str, index) {
				let len0 = this.SingleEscapeCharacter(str, index);
				let len1 = this.DecimalDigit(str, index);
				let act = 0;
				if(len0 > len1) {
					act = 1;
				}
				if(str[index] === 'x') {
					return 1;
				}
				if(len0 > 0 && len0 >= len1) {
					return len0;
				}
				if(len1 > 0 && len1 > len0) {
					return len1;
				}
			}
			/*LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit
			 */
			LegacyOctalEscapeSequence(str, index) {
				x: {
					if(str[index] === '0') {
						if(str[index + 1] === '8' || str[index + 1] === '9') {
							return 1;
						}
						break x;
					}
				}
				x: {
					let len = this.NonZeroOctalDigit(str, index);
					if(len > 0) {
						let n_len = this.OctalDigit(str, index + 1);
						if(n_len > 0) {
							break x;
						}
						return 1;
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if(len > 0) {
						len = this.OctalDigit(str, index + 1);
						if(len > 0) {
							let n_len = this.OctalDigit(str, index + 2);
							if(n_len > 0) {
								break x;
							}
							return 2;
						}
					}
				}
				x: {
					let len = this.FourToSeven(str, index);
					if(len > 0) {
						len = this.OctalDigit(str, index + 1);
						if(len > 0) {
							return 2;
						}
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if(!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 1);
					if(!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 2);
					if(!len) {
						break x;
					}
					return 3;
				}

			}
			NonZeroOctalDigit(str, index) {
				if(str[index] === '0') {
					return 0;
				}
				let len = this.OctalDigit(str, index);
				if(len > 0) {
					return 1;
				}
				return 0;
			}
			ZeroToThree(str, index) {
				let cur = str[index];
				let chk = '0123';
				if(chk.includes(cur)) {
					return 1;
				};
			}
			FourToSeven(str, index) {
				let cur = str[index];
				let chk = '4567';
				if(chk.includes(cur)) {
					return 1;
				};
			}
			NonOctalDecimalEscapeSequence(str, index) {
				if(str[index] === '8' || str[index] === '9') {
					return 1;
				}
			}
			HexEscapeSequence(str, index) {
				if(str[index] === 'x') {
					let len = this.HexDigit(str, index);
					if(!len) {
						return 0;
					}
					len = this.HexDigit(str, index + 1);
					if(!len) {
						return 0;
					}
					return 3;
				}
			}
			UnicodeEscapeSequence(str, index) {
				let off = 0;
				if(str[index] === 'u') {
					off++;
				}
				let len0 = this.Hex4Digits(str, index + off);
				if(len0 > 0) {
					return len0 + 1;
				}
				if(str[index + off] === '{}'[0]) {
					off++;
					let len = this.CodePoint(str, index + off);
					if(len > 0) {
						off += len;
						if(str[index + off] === '{}'[1]) {
							off++;
							return off;
						}
					}
				}
				return 0;
			}
			Hex4Digits(str, index) {
				let len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len0) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				return 4;
			}
		}
		class ecma_12_8_6 extends ecma_base {
			/*Template ::
			NoSubstitutionTemplate
			TemplateHead*/
			Template(str, index) {
				// TODO:implement template parsing without Substitution
				if(str[0] === '`') {
					console.info('Impl is never for Template');
					// this is a template, but we dont know how to parse it
					return ['Template', 0];
				}
				return [null, 0];
			}
		}
		class js_root {
			static init() {
				this._init = true;
				this.export_list = [];
				let ecma_sections = [];
				ecma_sections.push(ecma_12_2);
				ecma_sections.push(ecma_12_3);
				ecma_sections.push(ecma_12_4);
				ecma_sections.push(ecma_12_5);
				ecma_sections.push(ecma_12_6);
				ecma_sections.push(ecma_12_7);
				ecma_sections.push(ecma_12_8_3);
				ecma_sections.push(ecma_12_8_4);
				ecma_sections.push(ecma_12_8_6);
				for(let i of ecma_sections)
					i._attach(js_root);
				let pull_imp = [ecma_12_8];
				for(let i of pull_imp)
					i._forward_imports(js_root);
			}
			static _pull_import(fn_name) {
				let mat = this.export_list.find(e => e[2].includes(fn_name));
				let cls = mat[0];
				if(!cls.the) {
					console.log('missing', [cls], 'the', fn_name);
				}
				let c_t = cls.the();
				return cls.prototype[fn_name].bind(c_t);
			}
			static import(name) {
				if(this._init === void 0)
					this.init();
				let item = name.split(':');
				let toc = item[0];
				let fn = item[1];
				let mat = this.export_list.find(e => e[1] === toc && e[2].includes(fn));
				let cls = mat[0];
				return cls.prototype[fn];
			}
			static export(_class, toc_loc, name_vec) {
				if(this._init === void 0)
					this.init();
				this.export_list.push([_class, toc_loc, name_vec]);
			}
			static import_all_items(trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list;
				rt: for(let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					let n_arr = cur[2];
					let src_class = cur[0];
					for(let x of n_arr) {
						if(x === 'constructor') {
							continue;
						}
						if(trg_class.prototype[x] === src_class.prototype[x]) {
							continue rt;
						}
						trg_class.prototype[x] = src_class.prototype[x];
					}
				}
			}
			static import_all(toc_loc, trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list.filter(e => e[1] === toc_loc);
				for(let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					for(let x of cur[2]) {
						if(x === 'constructor') {
							continue;
						}
						trg_class.prototype[x] = this.import(toc_loc + ':' + x);
					}
				}
			}
		}
		class js_token_generator {
			static EOF_TOKEN = Symbol();
			constructor(str) {
				this.str = str;
				this.index = 0;
			}
			describe_token(token_value) {
				let tok_str = this.str.slice(token_value[2], token_value[2] + token_value[1]);
				return [token_value[0], tok_str];
			}
			next_token() {
				let tok_arr = [];
				let cur;
				let ret;
				cur = this.InputElementDiv(this.str, this.index);
				if(cur[0] !== null) {
					if(cur[1] === 0) {
						ret = [cur[0], cur[1], this.index];
						return ret;
					}
					ret = [cur[0], cur[1], this.index];
					this.index += cur[1];
					return ret;
				}
				if(this.index > (this.str.length - 1)) {
					return [js_token_generator.EOF_TOKEN, 0, this.index];
				}
			}
			InputElementDiv(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
				let max_item = null, max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.DivPunctuator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'div_punct';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RightBracePunctuator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementRegExp(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken,
				// RightBracePunctuator, RegularExpressionLiteral
				let max_item = null, max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RightBracePunctuator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RegularExpressionLiteral(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementRegExpOrTemplateTail(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
				let max_item = null, max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.RegularExpressionLiteral(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.TemplateSubstitutionTail(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			InputElementTemplateTail(str, index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
				let max_item = null, max_val = 0;
				let rb_len, item, tree;
				let cur_res = this.WhiteSpace(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'whitespace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.LineTerminator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'line_term';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.Comment(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'comment';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.CommonToken(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'common';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.DivPunctuator(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				cur_res = this.TemplateSubstitutionTail(str, index);
				if(cur_res[1] > max_val) {
					//max_item = 'r_brace';
					max_item = cur_res[0];
					max_val = cur_res[1];
				}
				return [max_item, max_val];
			}
			static add_proto() {
				js_root.import_all_items(this);
			}
		}
		js_token_generator.add_proto();
		let parse_str = 'function x(){}';
		let token_gen = new js_token_generator(code);
		let res_item;
		res_item = token_gen.next_token();
		let res_description = token_gen.describe_token(res_item);
		console.log(res_description);
	}
	//# sourceURL=https://github.dev/mjz19910/javascript_parser/blob/master/js_lex_only_ver_1.js
}
