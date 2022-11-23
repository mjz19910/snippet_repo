import window from "./window_def.js";

export function ecma_parse_main() {
	'use strict';
	{
		class ecma_base {
			/** @arg {ecma_root} parent */
			constructor(parent) {
				this.parent=parent;
			}
		}
		class ecma_12_2 extends ecma_base {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			WhiteSpace(str,index) {
				if(str[index]===' ') {
					return ['WhiteSpace',1];
				}
				if(str[index]==='\t') {
					return ['WhiteSpace',1];
				}
				return [null,0];
			}
		}
		class ecma_12_3 extends ecma_base {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			LineTerminator(str,index) {
				let len=0;
				if(str[index]==='\r')
					len=1;
				if(str[index]==='\n')
					len=1;
				//<LS>
				if(str[index]==='\u{2028}')
					len=1;
				//<PS>
				if(str[index]==='\u{2029}')
					len=1;
				if(len>0) {
					return ['LineTerminator',1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			LineTerminatorSequence(str,index) {
				console.info('LineTerminatorSequence not implemented');
				return [null,0];
			}
		}
		class ecma_12_4 extends ecma_base {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			Comment(str,index) {
				let ml_len=this.MultiLineComment(str,index);
				let sl_len=this.SingleLineComment(str,index);
				if(ml_len[1]>0) {
					return ml_len;
				}
				if(sl_len[1]>0) {
					return sl_len;
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			MultiLineComment(str,index) {
				`
				MultiLineComment ::
				/* MultiLineCommentChars opt */
				`;
				let off=0;
				if(str.slice(index,index+2)==='/*') {
					off+=2;
					if(str.slice(index+off,index+off+2)==='*/') {
						return ['MultiLineComment',4];
					}
					let [,com_len]=this.MultiLineCommentChars(str,index+off);
					if(com_len===0) {
						return [null,0];
					}
					console.log([str.slice(index,index+off+com_len+2)]);
					if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {
						return ['MultiLineComment',off+com_len+2];
					}
				}
				return [null,0];
			}
			dep=0;
			/**MultiLineCommentChars ::
			MultiLineNotAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			MultiLineCommentChars(str,index) {
				let start_len=0;
				if(this.dep>64) {
					throw Error('stack overflow');
				}
				this.dep++;
				let ml_na=this.MultiLineNotAsteriskChar(str,index+start_len);
				if(ml_na[1]>0) {
					start_len++;
					for(;;) {
						let [,ml_na]=this.MultiLineNotAsteriskChar(str,index+start_len);
						if(ml_na>0) {
							start_len+=ml_na;
							continue;
						}
						if(str[index+start_len]==='*') {
							let [,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
							if(pac>0) {
								start_len++;
								start_len+=pac;
							}
						}
						break;
					}
				}
				if(str[index+start_len]==='*') {
					let [,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
					if(pac>0) {
						start_len++;
						start_len+=pac;
					}
				}
				this.dep--;
				return [null,start_len];
			}
			/**PostAsteriskCommentChars ::
			MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			PostAsteriskCommentChars(str,index) {
				let index_offset=0;
				let offset_1=this.MultiLineNotForwardSlashOrAsteriskChar(str,index+index_offset);
				if(offset_1[0]===null) throw new Error("Parse error");
				if(offset_1[1]>0) {
					index_offset+=offset_1[1];
					let la=this.MultiLineCommentChars(str,index+index_offset);
					index_offset+=la[1];
					return ["PostAsteriskCommentChars",index_offset];
				}
				if(offset_1[1]===0) {
					if(str[index+index_offset]==='*') {
						index_offset++;
						let offset_2=this.PostAsteriskCommentChars(str,index+index_offset);
						if(!offset_2[0]) throw new Error("Recursive call to PostAsteriskCommentChars failed");
						if(offset_2[0]&&offset_2[1]>0) {
							return ["PostAsteriskCommentChars",offset_2[1]+index_offset];
						}
					}
				}
				return ["PostAsteriskCommentChars",index_offset];
			}
			/**MultiLineNotAsteriskChar ::
			SourceCharacter but not * */
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			MultiLineNotAsteriskChar(str,index) {
				if(str[index]!=='*') {
					return [str[index],1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			MultiLineNotForwardSlashOrAsteriskChar(str,index) {
				if(str[index]==='*'||str[index]==='/') {
					return [null,0];
				}
				return [str[index],1];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			SingleLineComment(str,index) {
				if(str.slice(index,index+2)==='//') {
					let comment_length=this.SingleLineCommentChars(str,index+2);
					if(!comment_length[0]) throw new Error("Failed to parse single line comment");
					return ['SingleLineComment',comment_length[1]+2];
				}
				return [null,0];
			}
			/*SingleLineCommentChars ::
			SingleLineCommentChar SingleLineCommentChars*/
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			SingleLineCommentChars(str,index) {
				if(index>=str.length) {
					return [null,0];
				}
				let s_index=index;
				while(str[s_index]!=='\n') {
					s_index++;
					if(s_index>str.length) {
						break;
					}
				}
				return ["SingleLineCommentChars",s_index-index];
			}
		}
		class ecma_12_5 extends ecma_base {
			/*
			CommonToken ::
				IdentifierName
				PrivateIdentifier
				Punctuator
				NumericLiteral
				StringLiteral
				Template
			*/
			get ecma_12_3() {
				return this.parent.ecma_12_3;
			}
			get ecma_12_6() {
				return this.parent.ecma_12_6;
			}
			get ecma_12_7() {
				return this.parent.ecma_12_7;
			}
			get ecma_12_8_3() {
				return this.parent.ecma_12_8_3;
			}
			get ecma_12_8_4() {
				return this.parent.ecma_12_8_4;
			}
			get ecma_12_8_6() {
				return this.parent.ecma_12_8_6;
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			CommonToken(str,index) {
				let cur=null;
				let item=null;
				let len=0;
				cur=this.parent.ecma_12_6.IdentifierName(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				cur=this.ecma_12_6.PrivateIdentifier(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				cur=this.ecma_12_7.Punctuator(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				cur=this.ecma_12_8_3.NumericLiteral(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				cur=this.ecma_12_8_4.StringLiteral(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				cur=this.ecma_12_8_6.Template(str,index);
				if(cur[1]>len) {
					len=cur[1];
					item=cur;
				}
				if(item===null) throw new Error("Parse Error");
				return [item[0],len];
			}
		}
		class ecma_12_6 extends ecma_base {
			static source=`
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
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			PrivateIdentifier(str,index) {
				if(str[index]!=='#')
					return [null,0];
				let cur=this.IdentifierName(str,index+1);
				if(!cur[0]) return [null,0];
				return ["PrivateIdentifier",cur[1]+1];
			}
			static IdentifierName_not_start_regex=/[0-9a-zA-Z$_]+/g;
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			IdentifierName(str,index) {
				let res=this.IdentifierStart(str,index);
				if(!res[0]) {
					console.log('not IdentifierName',str[index]);
					return [null,0];
				}
				let [,id_start_len]=res;
				ecma_12_6.IdentifierName_not_start_regex.lastIndex=index+id_start_len;
				let id_continue_match=ecma_12_6.IdentifierName_not_start_regex.exec(str);
				if(!id_continue_match) {
					console.log('IdentifierName is start only',str.slice(index,index+id_start_len));
					return ["IdentifierName",id_start_len];
				}
				let id_continue_len=0;
				if(id_continue_match.index==index+id_start_len) {
					id_continue_len=id_continue_match[0].length;
				}
				if(id_continue_len>0) {
					console.log('IdentifierName with continue',str.slice(index,index+id_start_len+id_continue_len));
					return ["IdentifierName",id_start_len+id_continue_len];
				}
				return [null,0];
			}
			static id_continue_regex=/[a-zA-Z$_0-9]/;
			static id_start_regex=/[a-zA-Z$_]/;
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			IdentifierStart(str,index) {
				if(index>=str.length) {
					return [null,0];
				}
				if(str[index]==='\\') {
					let res=this.parent.ecma_12_9_4.UnicodeEscapeSequence(str,index+1);
					if(res[0]) return ["IdentifierStart",res[1]+1];
				}
				if(str[index].match(ecma_12_6.id_start_regex)) {
					return ["IdentifierStart",1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			IdentifierPart(str,index) {
				if(str[index].match(ecma_12_6.id_continue_regex)) {
					return ["IdentifierPart",1];
				}
				return [null,0];
			}
		}
		/** @template K,V */
		class HashMap {
			/** @type {Map<K,V>|null} */
			backing_map=null;
			is_empty() {
				if(this.backing_map===null) {
					return true;
				}
				if(this.backing_map.size===0) {
					return true;
				}
				return false;
			}
			/** @arg {K} key @arg {V} value */
			set(key,value) {
				if(!this.backing_map) {
					this.backing_map=new Map;
				}
				this.backing_map.set(key,value);
				return this;
			}
			clear() {
				if(this.backing_map) {
					this.backing_map.clear();
				}
			}
			/** @arg {K} key */
			get(key) {
				return this.backing_map?.get(key);
			}
			/** @arg {K} key */
			has(key) {
				if(!this.backing_map) {
					return false;
				}
				return this.backing_map.has(key);
			}
			/** @arg {(this: this,arg1: K,arg2: V) => "Break"|"Continue"} callback */
			iterate(callback) {
				// from https://github.com/SerenityOS/serenity/blob/master/Userland/DevTools/Profiler/Profile.cpp
				// on my fs file://home/wsl2/dev/serenity/Userland/DevTools/Profiler/Profile.cpp
				if(!this.backing_map)
					return;
				for(let x of this.backing_map.entries()) {
					if(callback.apply(this,x)==="Break") {
						break;
					}
				}
			}
		}
		// HashMap<FlyString, TokenType> Lexer::s_keywords
		/** @type {HashMap<string,string>} uses enum JSTokenizerTokenType as string */
		const s_keywords=new HashMap();
		s_keywords;
		// HashMap<String, TokenType> Lexer::s_three_char_tokens
		/** @type {HashMap<string,string>} */
		const s_three_char_tokens=new HashMap();
		// HashMap<String, TokenType> Lexer::s_two_char_tokens
		/** @type {HashMap<string,string>} */
		const s_two_char_tokens=new HashMap();
		// HashMap<char, TokenType> Lexer::s_single_char_tokens
		/** @type {HashMap<string,string>} */
		const s_single_char_tokens=new HashMap();
		class ecma_12_7 extends ecma_base {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			Punctuator(str,index) {
				var len=0,type=null,ret;
				ret=this.OptionalChainingPunctuator(str,index);
				if(ret[0]&&ret[1]>len) {
					type=ret[0];
					len=ret[1];
				}
				ret=this.OtherPunctuator(str,index);
				if(ret[0]&&ret[1]>len) {
					type=ret[0];
					len=ret[1];
				}
				return [type,len];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			OptionalChainingPunctuator(str,index) {
				if(str.slice(index,index+2)==='?.') {
					let [,num_len]=this.parent.ecma_12_8_3.DecimalDigit(str,index+2);
					if(num_len>0) {
						return [null,0];
					}
					return ["OptionalChainingPunctuator",2];
				}
				return [null,0];
			}
			_OtherPunct="{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			OtherPunctuator(str,index) {
				// >>>= is the only production of length 4
				if(str.startsWith('>>>=',index)) {
					return ['OtherPunctuator',4];
				}
				/** @type {string|null} */
				let result=null;
				s_three_char_tokens.iterate(function(key) {
					// I think all the 3 char tokens are valid as OtherPunctuator productions
					if(str.startsWith(key,index)) {
						result=key;
						return "Break";
					}
					return "Continue";
				});
				if(result) return [true,3];
				result=null;
				s_two_char_tokens.iterate(function(key) {
					// skip DivPunctuator with length 2
					if(key==='/=') return "Continue";
					// TODO: exclude some tokens that are parsed elsewhere
					if(str.startsWith(key,index)) {
						result=key;
						return "Break";
					}
					return "Continue";
				});
				if(result) return [true,2];
				result=null;
				s_single_char_tokens.iterate(function(key,_value) {
					// skip a DivPunctuator with length 1
					if(key==='/') return "Continue";
					// skip a RightBracePunctuator
					if(key==='{}'[1]) return "Continue";
					if(str[index]===key) {
						result=key;
						return "Break";
					}
					return "Continue";
				});
				if(result) {
					return ['OtherPunctuator',1];
				}
				return [null,0];
			}
			_DivPunct="/ /=".split(' ');
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DivPunctuator(str,index) {
				let char_len=0;
				// `/`
				if(str.startsWith('/',index)) {
					char_len=1;
				}
				// `/=`
				if(str.startsWith('/=',index)) {
					char_len=2;
				}
				if(char_len>0) {
					return ["DivPunctuator",char_len];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			RightBracePunctuator(str,index) {
				if(str[index]==='{}'[1]) {
					return ['RightBracePunctuator',1];
				}
				return [null,0];
			}
		}
		class ecma_12_8 extends ecma_base {
			/** @param {string} str @arg {number} index @returns {[number,null,null]|[number,["regexpNonTerm"],null]} */
			RegularExpressionNonTerminator(str,index) {
				let _val=this.parent.ecma_12_3.LineTerminator(str,index);
				if(!_val) {
					return [1,['regexpNonTerm'],null];
				}
				return [0,null,null];
			}
		}
		class ecma_12_8_3 extends ecma_base {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalDigit(str,index) {
				if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {
					return ["DecimalDigit",1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			NumericLiteral(str,index) {
				let len=this.DecimalLiteral(str,index);
				if(len>0) {
					return len;
				}
				return 0;
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalLiteral(str,index) {
				if(str[index]==='0') {
					return ["DecimalLiteral",1];
				}
				let [,zd_len]=this.NonZeroDigit(str,index);
				let off=0;
				if(zd_len===1) {
					off+=1;
					let [,ns_len]=this.NumericLiteralSeparator(str,index+off);
					if(ns_len>0) {
						off++;
					}
					let dd_r=this.DecimalDigits(str,index+off);
					if(!dd_r[0]) throw dd_r[1];
					return ["DecimalLiteral",dd_r[1]+off];
				}
				return ["DecimalLiteral",off];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalDigits(str,index) {
				if(this.parent.flags.is_sep()) {
					return this.DecimalDigits_Sep(str,index);
				} else {
					return this.DecimalDigits_NoSep(str,index);
				}
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalDigits_NoSep(str,index) {
				// DecimalDigit
				let off=0;
				for(;;) {
					let [,len]=this.DecimalDigits_NoSep(str,index+off);
					if(len>0) {
						off++;
						continue;
					}
					break;
				}
				return ["DecimalDigits_NoSep",off];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			NonZeroDigit(str,index) {
				if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {
					return ["NonZeroDigit",1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			NumericLiteralSeparator(str,index) {
				if(str[index]==='_') {
					return ["NumericLiteralSeparator",1];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalIntegerLiteral(str,index) {
				let len=0;
				// 0
				if(str[index]==='0') {
					len++;
				}
				{
					// NonZeroDigit
					let tmp=this.NonZeroDigit(str,index);
					if(tmp[0]&&tmp[1]>len) {
						len=tmp[1];
					}
				}
				// NonZeroDigit NumericLiteralSeparator opt DecimalDigits[+Sep]
				{
					let tmp_len=0;
					let tmp=this.NonZeroDigit(str,index+tmp_len);
					if(tmp[0]) {
						tmp_len+=tmp[1];
						let t2=this.NumericLiteralSeparator(str,index+tmp_len);
						if(t2[0]) {
							tmp_len+=t2[1];
						}
						this.DecimalDigits_Sep(str,index);
					}
				}
				return [null,0];
			}
			// DecimalDigits[+Sep]
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DecimalDigits_Sep(str,index) {
				let off=0;
				for(;;) {
					// DecimalDigit
					let [,len]=this.DecimalDigit(str,index+off);
					if(len>0) {
						off++;
						// DecimalDigits[?Sep] DecimalDigit
						continue;
					}
					// [+Sep] DecimalDigits[+Sep] (NumericLiteralSeparator DecimalDigit)
					let [,s_len]=this.NumericLiteralSeparator(str,index+off);
					if(s_len>0) {
						let [,exl]=this.DecimalDigit(str,index+off+1);
						if(exl>0) {
							off++;
							// [+Sep] (DecimalDigits[+Sep]) NumericLiteralSeparator DecimalDigit
							continue;
						}
						break;
					}
					break;
				}
				return ["DecimalDigits[+Sep]",off];
			}
		}
		class ecma_12_9_4 extends ecma_base {
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
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			StringLiteral(str,index) {
				let cur=str[index];
				if(cur==='"') {
					if(str[index+1]==='"') {
						return ['StringLiteral',2];
					}
					let dslen=this.DoubleStringCharacters(str,index+1);
					if(str[index+dslen+1]==='"') {
						return ['StringLiteral',dslen+2];
					}
					return [null,0];
				}
				if(cur==="'") {
					if(str[index+1]==="'") {
						return ['StringLiteral',2];
					}
					let sslen=this.SingleStringCharacters(str,index+1);
					if(str[index+sslen+1]==="'") {
						return ['StringLiteral',sslen+2];
					}
					return [null,0];
				}
				return [null,0];
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DoubleStringCharacters(str,index) {
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
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DoubleStringCharacter(str,index) {
				x: {
					if(str[index]==='"') {
						return 0;
					}
					if(str[index]==='\\') {
						break x;
					}
					let len=this.parent.ecma_12_3.LineTerminator(str,index);
					if(len!==null) {
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
					return esc_len+1;
				}
				let lc_len=this.LineContinuation(str,index);
				if(lc_len>0) {
					return lc_len;
				}
				return 1;
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			SingleStringCharacters(str,index) {
				let off=0;
				for(;;) {
					let len=this.SingleStringCharacter(str,index+off);
					if(len>0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			SingleStringCharacter(str,index) {
				x: {
					if(str[index]==="'") {
						return 0;
					}
					if(str[index]==='\\') {
						break x;
					}
					let len=this.parent.ecma_12_3.LineTerminator(str,index);
					if(len!==null) {
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
					return esc_len+1;
				}
				let lc_len=this.LineContinuation(str,index);
				if(lc_len>0) {
					return lc_len;
				}
				return 1;
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			LineContinuation(str,index) {
				if(str[index]==='\\') {
					let lt_len=this.parent.ecma_12_3.LineTerminatorSequence(str,index+1);
					if(lt_len[0]&&lt_len[1]>0) {
						return [true,lt_len[1]+1];
					}
				}
				return [null,0];
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
			EscapeSequence(str,index) {
				let len=this.CharacterEscapeSequence(str,index);
				if(len>0) {
					return len;
				}
				x: {
					if(str[index]==='0') {
						let peek=this.parent.ecma_12_8_3.DecimalDigit(str,index);
						if(peek>0) {
							break x;
						}
						// \0 null escape found
						return 1;
					}
				}
				len=this.LegacyOctalEscapeSequence(str,index);
				if(len>0) {
					return len;
				}
				len=this.NonOctalDecimalEscapeSequence(str,index);
				if(len>0) {
					return len;
				}
				len=this.HexEscapeSequence(str,index);
				if(len>0) {
					return len;
				}
				len=this.UnicodeEscapeSequence(str,index);
				if(len>0) {
					return len;
				}
				return 0;
			}
			CharacterEscapeSequence(str,index) {
				let len=this.SingleEscapeCharacter(str,index);
				if(len>0) {
					return len;
				}
				len=this.NonEscapeCharacter(str,index);
				if(len>0) {
					return len;
				}
				return 0;
			}
			SingleEscapeCharacter(str,index) {
				let val=["'","\"","\\","b","f","n","r","t","v"];
				let cur=str[index];
				if(val.includes(cur)) {
					return 1;
				}
				return 0;
			}
			NonEscapeCharacter(str,index) {
				if(this.EscapeCharacter(str,index)) {
					return 0;
				}
				if(this.parent.ecma_12_3.LineTerminator(str,index)) {
					return 0;
				}
				return 1;
			}
			EscapeCharacter(str,index) {
				let len0=this.SingleEscapeCharacter(str,index);
				let len1=this.parent.ecma_12_8_3.DecimalDigit(str,index);
				let act=0;
				if(len0>len1) {
					act=1;
				}
				if(str[index]==='x') {
					return 1;
				}
				if(len0>0&&len0>=len1) {
					return len0;
				}
				if(len1>0&&len1>len0) {
					return len1;
				}
				if(act===1) {
					throw new Error("TODO");
				}
			}
			/*LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit
			 */
			LegacyOctalEscapeSequence(str,index) {
				x: {
					if(str[index]==='0') {
						if(str[index+1]==='8'||str[index+1]==='9') {
							return 1;
						}
						break x;
					}
				}
				x: {
					let len=this.NonZeroOctalDigit(str,index);
					if(len>0) {
						let n_len=this.OctalDigit(str,index+1);
						if(n_len>0) {
							break x;
						}
						return 1;
					}
				}
				x: {
					let len=this.ZeroToThree(str,index);
					if(len>0) {
						len=this.OctalDigit(str,index+1);
						if(len>0) {
							let n_len=this.OctalDigit(str,index+2);
							if(n_len>0) {
								break x;
							}
							return 2;
						}
					}
				}
				x: {
					let len=this.FourToSeven(str,index);
					if(len>0) {
						len=this.OctalDigit(str,index+1);
						if(len>0) {
							return 2;
						}
					}
				}
				x: {
					let len=this.ZeroToThree(str,index);
					if(!len) {
						break x;
					}
					len=this.OctalDigit(str,index+1);
					if(!len) {
						break x;
					}
					len=this.OctalDigit(str,index+2);
					if(!len) {
						break x;
					}
					return 3;
				}
				return 0;
			}
			/** @returns {number} */
			OctalDigit(str,arg1) {
				throw new Error("Method not implemented.");
			}
			NonZeroOctalDigit(str,index) {
				if(str[index]==='0') {
					return 0;
				}
				let len=this.OctalDigit(str,index);
				if(len>0) {
					return 1;
				}
				return 0;
			}
			ZeroToThree(str,index) {
				let cur=str[index];
				let chk='0123';
				if(chk.includes(cur)) {
					return 1;
				}
				return 0;
			}
			FourToSeven(str,index) {
				let cur=str[index];
				let chk='4567';
				if(chk.includes(cur)) {
					return 1;
				}
				return 0;
			}
			NonOctalDecimalEscapeSequence(str,index) {
				if(str[index]==='8'||str[index]==='9') {
					return 1;
				}
				return 0;
			}
			HexEscapeSequence(str,index) {
				if(str[index]==='x') {
					let len=this.HexDigit(str,index);
					if(!len) {
						return 0;
					}
					len=this.HexDigit(str,index+1);
					if(!len) {
						return 0;
					}
					return 3;
				}
				return 0;
			}
			UnicodeEscapeSequence(str,index) {
				let off=0;
				if(str[index]==='u') {
					off++;
				}
				let len0=this.Hex4Digits(str,index+off);
				if(len0>0) {
					return len0+1;
				}
				if(str[index+off]==='{}'[0]) {
					off++;
					let len=this.CodePoint(str,index+off);
					if(len>0) {
						off+=len;
						if(str[index+off]==='{}'[1]) {
							off++;
							return off;
						}
					}
				}
				return 0;
			}
			/** @returns {number} */
			CodePoint(str,arg1) {
				throw new Error("Method not implemented.");
			}
			Hex4Digits(str,index) {
				let len=this.HexDigit(str,index);
				if(!len) {
					return 0;
				}
				len=this.HexDigit(str,index);
				if(!len) {
					return 0;
				}
				len=this.HexDigit(str,index);
				if(!len) {
					return 0;
				}
				len=this.HexDigit(str,index);
				if(!len) {
					return 0;
				}
				return 4;
			}
			/** @returns {number} */
			HexDigit(str,index) {
				throw new Error("Method not implemented.");
			}
		}
		/** @typedef {[string,number]|[true,number]|[null,number]|[['Error',string],number]} LexReturnTyShort */
		class ecma_12_8_6 extends ecma_base {
			// https://tc39.es/ecma262/#prod-TemplateSubstitutionTail
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			TemplateSubstitutionTail(str,index) {
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
			TemplateTail(str,index) {
				throw new Error("Method not implemented.");
			}
			TemplateMiddle(str,index) {
				throw new Error("Method not implemented.");
			}
			/*Template ::
			NoSubstitutionTemplate
			TemplateHead*/
			/** @returns {[string,number]|[null,number]} */
			Template(str,index) {
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
			TemplateHead(str,index) {
				throw new Error("Method not implemented.");
			}
			NoSubstitutionTemplate(str,index) {
				throw new Error("Method not implemented.");
			}
		}
		class ecma_root {
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			TemplateSubstitutionTail(str,index) {
				return this.ecma_12_8_6.TemplateSubstitutionTail(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			RegularExpressionLiteral(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			RightBracePunctuator(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			DivPunctuator(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			CommonToken(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			Comment(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			LineTerminator(str,index) {
				return this.ecma_12_3.LineTerminator(str,index);
			}
			/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
			WhiteSpace(str,index) {
				return this.ecma_12_2.WhiteSpace(str,index);
			}
			constructor() {
				this.ecma_12_2=new ecma_12_2(this);
				this.ecma_12_3=new ecma_12_3(this);
				this.ecma_12_4=new ecma_12_4(this);
				this.ecma_12_5=new ecma_12_5(this);
				this.ecma_12_6=new ecma_12_6(this);
				this.ecma_12_7=new ecma_12_7(this);
				this.ecma_12_8=new ecma_12_8(this);
				this.ecma_12_8_3=new ecma_12_8_3(this);
				this.ecma_12_8_4=new ecma_12_9_4(this);
				this.ecma_12_8_6=new ecma_12_8_6(this);
				this.ecma_12_9_4=new ecma_12_9_4(this);
				this.flags={
					sep:false,
					is_sep() {
						return this.sep;
					}
				};
			}
		}
		class js_token_generator {
			static EOF_TOKEN=Symbol();
			/** @param {string} str */
			constructor(str) {
				this.str=str;
				this.index=0;
				this.root=new ecma_root;
			}
			describe_token(token_value) {
				let tok_str=this.str.slice(token_value[2],token_value[2]+token_value[1]);
				return [token_value[0],tok_str];
			}
			next_token() {
				let cur;
				let ret;
				cur=this.InputElementDiv(this.str,this.index);
				if(cur[0]!==null) {
					if(cur[1]===0) {
						ret=[cur[0],cur[1],this.index];
						return ret;
					}
					ret=[cur[0],cur[1],this.index];
					this.index+=cur[1];
					return ret;
				}
				if(this.index>(this.str.length-1)) {
					return [js_token_generator.EOF_TOKEN,0,this.index];
				}
			}
			InputElementDiv(str,index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
				let max_item=null,max_val=0;
				let cur_res=this.root.WhiteSpace(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'whitespace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.LineTerminator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'line_term'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.Comment(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'comment'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.CommonToken(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'common'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.DivPunctuator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'div_punct'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.RightBracePunctuator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				return [max_item,max_val];
			}
			InputElementRegExp(str,index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken,
				// RightBracePunctuator, RegularExpressionLiteral
				let max_item=null,max_val=0;
				let cur_res=this.root.WhiteSpace(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'whitespace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.LineTerminator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'line_term'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.Comment(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'comment'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.CommonToken(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'common'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.RightBracePunctuator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.RegularExpressionLiteral(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				return [max_item,max_val];
			}
			InputElementRegExpOrTemplateTail(str,index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
				let max_item=null,max_val=0;
				let cur_res=this.root.WhiteSpace(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'whitespace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.LineTerminator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'line_term'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.Comment(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'comment'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.CommonToken(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'common'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.RegularExpressionLiteral(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.TemplateSubstitutionTail(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				return [max_item,max_val];
			}
			InputElementTemplateTail(str,index) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
				let max_item=null,max_val=0;
				let cur_res=this.root.WhiteSpace(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'whitespace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.LineTerminator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'line_term'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.Comment(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'comment'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.CommonToken(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'common'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.DivPunctuator(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				cur_res=this.root.TemplateSubstitutionTail(str,index);
				if(cur_res[1]>max_val) {
					//max_item = 'r_brace'
					max_item=cur_res[0];
					max_val=cur_res[1];
				}
				return [max_item,max_val];
			}
		}
		let parse_str='function x(){}';
		if('code' in window&&typeof window.code==='string') {
			parse_str=window.code;
		}
		let token_gen=new js_token_generator(parse_str);
		let res_item;
		res_item=token_gen.next_token();
		let res_description=token_gen.describe_token(res_item);
		console.log(res_description);
	}
}
