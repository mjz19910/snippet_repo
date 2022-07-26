export function ecma_parse_main() {
	'use strict'
	ecmascript: {
		class ecma_12_2 {
			static _attach(root) {
				root.export(this,'12.2',['WhiteSpace'])
			}
			WhiteSpace(str,index) {
				if(str[index]===' ') {
					return 1
				}
				if(str[index]==='\t') {
					return 1
				}
				return 0
			}
		}
		class ecma_12_3 {
			static the() {
				if(this._the)
					return this._the
				this._the=new this
			}
			static _attach(root) {
				root.export(this,'12.3',['LineTerminator','LineTerminatorSequence'])
			}
			LineTerminator(str,index) {
				if(str[index]==='\r')
					return 1
				if(str[index]==='\n')
					return 1
				//<LS>
				if(str[index]==='\u{2028}')
					return 1
				//<PS>
				if(str[index]==='\u{2029}')
					return 1
				return 0
			}
			LineTerminatorSequence() {}
		}
		class ecma_12_4 {
			static _attach(root) {
				let exports=[]
				exports=Object.getOwnPropertyNames(this.prototype)
				root.export(this,'12.4',exports)
			}
			Comment(str,index) {
				let ml_len=this.MultiLineComment(str,index)
				let sl_len=this.SingleLineComment(str,index)
				if(ml_len>0) {
					return ml_len
				}
				if(sl_len>0) {
					return sl_len
				}
				return 0
			}
			MultiLineComment(str,index) {
				`
				MultiLineComment ::
				/* MultiLineCommentChars opt */
				`
				let off=0
				let eof_off=str.length-1
				if(str.slice(index,index+2)==='/*') {
					off+=2
					if(str.slice(index+off,index+off+2)==='*/') {
						return 4
					}
					let com_len=this.MultiLineCommentChars(str,index+off)
					if(com_len===0) {
						return 0
					}
					console.log([str.slice(index,index+off+com_len+2)])
					if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {
						return off+com_len+2
					}
				}
				return 0
			}
			/**MultiLineCommentChars ::
			MultiLineNotAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			MultiLineCommentChars(str,index) {
				this.dep??=0
				let slen=0
				if(this.dep>64) {
					throw Error('stack overflow')
				}
				this.dep++
				let ml_na=this.MultiLineNotAsteriskChar(str,index+slen)
				if(ml_na>0) {
					slen++
					for(;;) {
						let ml_na=this.MultiLineNotAsteriskChar(str,index+slen)
						if(ml_na>0) {
							slen+=ml_na
							continue
						}
						if(str[index+slen]==='*') {
							let pac=this.PostAsteriskCommentChars(str,index+slen+1)
							if(pac>0) {
								slen++
								slen+=pac
							}
						}
						break
					}
				}
				if(str[index+slen]==='*') {
					let pac=this.PostAsteriskCommentChars(str,index+slen+1)
					if(pac>0) {
						slen++
						slen+=pac
					}
				}
				this.dep--
				return slen
			}
			/**PostAsteriskCommentChars ::
			MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars opt
			* PostAsteriskCommentChars opt */
			PostAsteriskCommentChars(str,index) {
				let idxoff=0
				let cxlen=this.MultiLineNotForwardSlashOrAsteriskChar(str,index+idxoff)
				if(cxlen>0) {
					idxoff+=cxlen
					let la=this.MultiLineCommentChars(str,index+idxoff)
					idxoff+=la
					return idxoff
				}
				if(cxlen===0) {
					if(str[index+idxoff]==='*') {
						idxoff++
						let len=this.PostAsteriskCommentChars(str,index+idxoff)
						if(len>0) {
							return len+idxoff
						}
					}
				}
				return idxoff
			}
			/**MultiLineNotAsteriskChar ::
			SourceCharacter but not * */
			MultiLineNotAsteriskChar(str,index) {
				if(str[index]!=='*') {
					return 1
				}
				return 0
			}
			MultiLineNotForwardSlashOrAsteriskChar(str,index) {
				if(str[index]==='*'||str[index]==='/') {
					return 0
				}
				return 1
			}
			SingleLineComment(str,index) {
				if(str.slice(index,index+2)==='//') {
					let comlen=this.SingleLineCommentChars(str,index+2)
					return comlen+2
				}
				return 0
			}
			/*SingleLineCommentChars ::
			SingleLineCommentChar SingleLineCommentChars*/
			SingleLineCommentChars(str,index) {
				let sidx=index
				while(str[sidx]!=='\n') {
					sidx++
					if(sidx>str.length) {
						break
					}
				}
				return sidx-index
			}
		}
		class ecma_12_5 {
			static _attach(root) {
				root.export(this,'12.5',['CommonToken'])
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
			CommonToken(str,index) {
				let len=0
				if((len=this.IdentifierName(str,index))>0)
					return len
				if((len=this.PrivateIdentifier(str,index))>0)
					return len
				if((len=this.Punctuator(str,index))>0)
					return len
				if((len=this.NumericLiteral(str,index))>0)
					return len
				if((len=this.StringLiteral(str,index))>0)
					return len
				if((len=this.Template(str,index))>0)
					return len
			}
		}
		class ecma_12_6 {
			static _attach(root) {
				let exports=Object.getOwnPropertyNames(this.prototype)
				root.export(this,'12.6',exports)
			}
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
			`
			PrivateIdentifier(str,index) {
				if(str[0]!=='#')
					return 0
				let id_len=this.IdentifierName(src,index+1)
				return id_len+1
			}
			IdentifierName(str,index) {
				let ids=this.IdentifierStart(str,index)
				if(ids>0) {
					for(;;) {
						let len=this.IdentifierPart(str,index+ids)
						if(len===0) {
							break
						}
						ids++
					}
					return ids
				}
				return 0
			}
			IdentifierStart(str,index) {
				if(str[index].match(/[a-zA-Z$_]/)) {
					return 1
				}
				return 0
			}
			IdentifierPart(str,index) {
				if(str[index].match(/[a-zA-Z$_0-9]/)) {
					return 1
				}
				return 0
			}
		}
		class ecma_12_7 {
			static _attach(root) {
				let exports=Object.getOwnPropertyNames(this.prototype)
				let test_class=new ecma_12_7()
				let static_names_arr=Object.getOwnPropertyNames(test_class)
				exports=exports.concat(static_names_arr)
				for(let x of static_names_arr) {
					this.prototype[x]=test_class[x]
				}
				root.export(this,'12.7',exports)
			}
			Punctuator(str,index) {
				let len=this.OptionalChainingPunctuator(str,index)
				if(len>0) {
					return len
				}
				return 0
			}
			OptionalChainingPunctuator(str,index) {
				if(str.slice(index,index+2)==='?.') {
					let num_len=this.DecimalDigit(str,index+2)
					if(num_len>0) {
						return 0
					}
					return 2
				}
				let punct_len=this.OtherPunctuator(str,index)
				if(punct_len>0) {
					return punct_len
				}
				return 0
			}
			_OtherPunct="{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ')
			OtherPunctuator(str,index) {
				let len=0
				for(let ci,i=0;i<this._OtherPunct.length;i++) {
					ci=this._OtherPunct[i]
					if(str.slice(index,index+ci.length)===ci) {
						if(ci.length>len) {
							len=ci.length
						}
					}
				}
				return len
			}
			DivPunctuator() {}
			RightBracePunctuator(str,index) {
				if(str[index]==='{}'[1]) {
					return 1
				}
				return 0
			}
		}
		class ecma_12_8 {
			static the() {
				if(ecma_12_8._the)
					return ecma_12_8._the
				ecma_12_8._the=new ecma_12_8
			}
			constructor() {}
			static _forward_imports(root) {
				let fn=root._pull_import('LineTerminator')
				this.LineTerminator=fn
			}
			RegularExpressionNonTerminator(str) {
				let _val=this.LineTerminator(str)
				if(_val[0]===0) {
					return [1,['regexpNonTerm'],null]
				}
				return [0,null,null]
			}
		}
		class ecma_12_8_3 {
			static _attach(root) {
				let exports=Object.getOwnPropertyNames(this.prototype)
				root.export(this,'12.8.3',exports)
			}
			DecimalDigit(str,index) {
				if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {
					return 1
				}
				return 0
			}
			NumericLiteral(str,index) {
				let len=this.DecimalLiteral(str,index)
				if(len>0) {
					return len
				}
				return 0
			}
			DecimalLiteral(str,index) {
				if(str[index]==='0') {
					return 1
				}
				let zd_len=this.NonZeroDigit(str,index)
				let off=0
				if(zd_len===1) {
					off+=1
					let ns_len=this.NumericLiteralSeparator(str,index+off)
					if(ns_len>0) {
						off++
					}
					let dd_len=this.DecimalDigits(str,index+off)
					return dd_len+off
				}
				return off
			}
			DecimalDigits(str,index) {
				let off=0
				for(;;) {
					let len=this.DecimalDigit(str,index+off)
					if(len>0) {
						off++
						continue
					}
					let s_len=this.NumericLiteralSeparator(str,index+off)
					if(s_len>0) {
						let exl=this.DecimalDigit(str,index+off+1)
						if(exl>0) {
							off++
							continue
						}
						break
					}
					break
				}
				return off
			}
			NonZeroDigit(str,index) {
				if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {
					return 1
				}
				return 0
			}
			NumericLiteralSeparator(str,index) {
				if(str[index]==='_') {
					return 1
				}
				return 0
			}
			DecimalIntegerLiteral(str,index) {
			}
		}
		class ecma_base {
			static _attach(root) {
				let exports=Object.getOwnPropertyNames(this.prototype)
				let ecma_section_name=this.name.slice(5).replaceAll('_','.')
				root.export(this,ecma_section_name,exports)
			}
		}
		class ecma_12_8_4 {
			static _attach(root) {
				let exports=Object.getOwnPropertyNames(this.prototype)
				root.export(this,'12.8.4',exports)
			}
			/*StringLiteral ::
			" DoubleStringCharacters opt "
			' SingleStringCharacters opt '

			DoubleStringCharacters ::
			DoubleStringCharacter DoubleStringCharacters opt

			SingleStringCharacters ::
			SingleStringCharacter SingleStringCharacters opt
		    
			DoubleStringCharacter ::
			SourceCharacter but not one of " or \ or LineTerminator
			<LS>
			<PS>
			\ EscapeSequence
			LineContinuation

			SingleStringCharacter ::
			SourceCharacter but not one of ' or \ or LineTerminator
			<LS>
			<PS>
			\ EscapeSequence
			LineContinuation

			LineContinuation ::
			\ LineTerminatorSequence

			EscapeSequence ::
			CharacterEscapeSequence
			0 [lookahead ∉ DecimalDigit]
			LegacyOctalEscapeSequence
			NonOctalDecimalEscapeSequence
			HexEscapeSequence
			UnicodeEscapeSequence

			CharacterEscapeSequence ::
			SingleEscapeCharacter
			NonEscapeCharacter

			SingleEscapeCharacter :: one of
			' " \ b f n r t v

			NonEscapeCharacter ::
			SourceCharacter but not one of EscapeCharacter or LineTerminator
		    
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
			StringLiteral(str,index) {
				let cur=str[index]
				if(cur==='"') {
					if(str[index+1]==='"') {
						return 2
					}
					let dslen=this.DoubleStringCharacters(str,index+1)
					if(str[index+dslen+1]==='"') {
						return dslen+2
					}
					return 0
				}
				if(cur==="'") {
					if(str[index+1]==="'") {
						return 2
					}
					let sslen=this.SingleStringCharacters(str,index+1)
					if(str[index+sslen+1]==="'") {
						return sslen+2
					}
					return 0
				}
			}
			DoubleStringCharacters(str,index) {
				let off=0
				for(;;) {
					let len=this.DoubleStringCharacter(str,index+off)
					if(len>0) {
						off++
						continue
					}
					break
				}
				return off
			}
			DoubleStringCharacter(str,index) {
				x: {
					if(str[index]==='"') {
						return 0
					}
					if(str[index]==='\\') {
						break x
					}
					let len=this.LineTerminator(str,index)
					if(len>0) {
						break x
					}
					return 1
				}
				if(str[index]==='\u{2028}') {
					return 1
				}
				if(str[index]==='\u{2029}') {
					return 1
				}
				if(str[index]==='\\') {
					let esc_len=this.EscapeSequence(str,index)
					return esc_len+1
				}
				let lc_len=this.LineContinuation(str,index)
				if(lc_len>0) {
					return lc_len
				}
				return 1
			}
			SingleStringCharacters(str,index) {
				let off=0
				for(;;) {
					let len=this.SingleStringCharacter(str,index+off)
					if(len>0) {
						off++
						continue
					}
					break
				}
				return off
			}
			SingleStringCharacter(str,index) {
				x: {
					if(str[index]==="'") {
						break x
					}
					if(str[index]==='\\') {
						break x
					}
					let len=this.LineTerminator(str,index)
					if(len>0) {
						break x
					}
					return 1
				}
				if(str[index]==='\u{2028}') {
					return 1
				}
				if(str[index]==='\u{2029}') {
					return 1
				}
				if(str[index]==='\\') {
					let esc_len=this.EscapeSequence(str,index)
					return esc_len+1
				}
				let lc_len=this.LineContinuation(str,index)
				if(lc_len>0) {
					return lc_len
				}
				return 1
			}
			LineContinuation(str,index) {
				if(str[index]==='\\') {
					let lt_len=this.LineTerminatorSequence(str,index+1)
					if(lt_len>0) {
						return lt_len+1
					}
					return 0
				}
			}
		}
		class ecma_12_8_6 extends ecma_base {
			/*Template ::
			NoSubstitutionTemplate
			TemplateHead*/
			Template(str,index) {
				// TODO:implement template parsing without Substitution
				return 0
			}
		}
		class js_root {
			static init() {
				this._init=true
				this.export_list=[]
				let ecma_sections=[]
				ecma_sections.push(ecma_12_2)
				ecma_sections.push(ecma_12_3)
				ecma_sections.push(ecma_12_4)
				ecma_sections.push(ecma_12_5)
				ecma_sections.push(ecma_12_6)
				ecma_sections.push(ecma_12_7)
				ecma_sections.push(ecma_12_8_3)
				ecma_sections.push(ecma_12_8_4)
				ecma_sections.push(ecma_12_8_6)
				for(let i of ecma_sections)
					i._attach(js_root)
				let pull_imp=[ecma_12_8]
				for(let i of pull_imp)
					i._forward_imports(js_root)
			}
			static _pull_import(fn_name) {
				let mat=this.export_list.find(e => e[2].includes(fn_name))
				let cls=mat[0]
				if(!cls.the) {
					console.log('missing',[cls],'the',fn_name)
				}
				let c_t=cls.the()
				return cls.prototype[fn_name].bind(c_t)
			}
			static import(name) {
				if(this._init===void 0)
					this.init()
				let item=name.split(':')
				let toc=item[0]
				let fn=item[1]
				let mat=this.export_list.find(e => e[1]===toc&&e[2].includes(fn))
				let cls=mat[0]
				return cls.prototype[fn]
			}
			static export(_class,toc_loc,name_vec) {
				if(this._init===void 0)
					this.init()
				this.export_list.push([_class,toc_loc,name_vec])
			}
			static import_all_items(trg_class) {
				let arr=this.export_list
				rt: for(let i=0;i<arr.length;i++) {
					let cur=arr[i]
					let n_arr=cur[2]
					let src_class=cur[0]
					for(let x of n_arr) {
						if(x==='constructor') {
							continue
						}
						if(trg_class.prototype[x]===src_class.prototype[x]) {
							continue rt
						}
						trg_class.prototype[x]=src_class.prototype[x]
					}
				}
			}
			static import_all(toc_loc,trg_class) {
				if(this._init===void 0)
					this.init()
				let arr=this.export_list.filter(e => e[1]===toc_loc)
				for(let i=0;i<arr.length;i++) {
					let cur=arr[i]
					for(let x of cur[2]) {
						if(x==='constructor') {
							continue
						}
						trg_class.prototype[x]=this.import(toc_loc+':'+x)
					}
				}
			}
		}
		class js_parser {
			constructor() {
			}
			lex_run(str) {
				let index=0
				let tok_arr=[]
				let cur
				for(;;) {
					cur=this.InputElementDiv(str,index)
					if(cur!==null) {
						if(cur[1]===0) {
							break
						}
						index+=cur[1]
						tok_arr.push(cur)
					}
					if(index>(str.length-1)) {
						break
					}
				}
				index=0
				let chunked_arr=[]
				for(let i of tok_arr) {
					chunked_arr.push(str.slice(index,index+i[1]))
					index+=i[1]
				}
				console.log(chunked_arr.slice(-100))
			}
			InputElementDiv(str,index=0) {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
				let max_item=null,max_val=0
				let rb_len,item,tree
				let ws_len=this.WhiteSpace(str,index)
				if(ws_len>max_val) {
					max_item='whitespace'
					max_val=ws_len
				}
				let lt_len=this.LineTerminator(str,index)
				if(lt_len>max_val) {
					max_item='line_term'
					max_val=lt_len
				}
				let comment_len=this.Comment(str,index)
				if(comment_len>max_val) {
					max_item='comment'
					max_val=comment_len
				}
				let com_len=this.CommonToken(str,index)
				if(com_len>max_val) {
					max_item='common'
					max_val=com_len
				}
				let div_len=this.DivPunctuator(str,index)
				if(div_len>max_val) {
					max_item='div_punct'
					max_val=div_len
				}
				rb_len=this.RightBracePunctuator(str,index)
				if(rb_len>max_val) {
					max_item='r_brace'
					max_val=rb_len
				}
				return [max_item,max_val]
			}
			InputElementRegExp() {
				// WhiteSpace, LineTerminator, Comment, CommonToken, RightBracePunctuator, RegularExpressionLiteral
				this.WhiteSpace()
				this.LineTerminator()
				this.Comment()
				this.CommonToken()
				this.RightBracePunctuator()
				this.RegularExpressionLiteral()
			}
			InputElementRegExpOrTemplateTail() {
				// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
				this.WhiteSpace()
				this.LineTerminator()
				this.Comment()
				this.CommonToken()
				this.RegularExpressionLiteral()
				this.TemplateSubstitutionTail()
			}
			InputElementTemplateTail() {
				// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
				this.WhiteSpace()
				this.LineTerminator()
				this.Comment()
				this.CommonToken()
				this.DivPunctuator()
				this.TemplateSubstitutionTail()
			}
			static add_proto() {
				js_root.import_all('12.2',this)
				js_root.import_all('12.3',this)
				js_root.import_all('12.4',this)
				js_root.import_all('12.5',this)
				js_root.import_all('12.6',this)
				js_root.import_all('12.7',this)
				js_root.import_all_items(this)
			}
		}
		js_parser.add_proto()
		let parse_str='function x(){}'
		let js_parser_instance=new js_parser
		let res_item
		res_item=js_parser_instance.lex_run(code)
	}
	function generate_js_regexp() {
		let regexp_str=''
		let v=(function() {
			let acc=[]
			function cf(e,...ex) {
				if(e.done) {
					return acc
				}
				let na=[e.raw[0]]
				for(let i=1;i<e.raw.length;i++) {
					na.push(ex[i-1],e.raw[i])
				}
				acc=acc.concat(na.join(''))
				return cf
			}
			return cf
		}
		)()
		let kw=[]
		kw.push("await","break","case","catch","continue","debugger","default","delete","do")
		kw.push("else","false","finally","for","function","if","in","instanceof")
		kw.push("new","null","return","switch","this","throw","true","try","typeof")
		kw.push("var","void","while","with","yield")
		v=v`(?<js_keyword>${kw.sort((a,b) => b.length-a.length).join("|")})(?=\b)`
		v=v`(?<js_fut_res_keyword>class|const|enum|export|extends|import|super)(?=\b)`
		v=v`(?<js_private_ident_start>#[a-zA-Z$_])`
		//[a-zA-Z0-9$_]
		v=v`(?<js_ident_start>[a-zA-Z$_])`
		v=v`(?<js_num>\d+)`
		v=v`(?<js_line_comment_start>\/\/)`
		v=v`(?<js_multiline_comment_start>/\*)`
		v=v`(?<js_singlequote_string_start>')`
		v=v`(?<js_doublequote_string_start>")`
		v=v`(?<js_lex_sym>[{}()\[\];\n <>=\.+-|&\/:*])`
		let ret=v({
			done: true
		})
		regexp_str=ret.join('|')
		ret=new RegExp(regexp_str,'g')
		return ret
	}
	let mt_js_kw=generate_js_regexp()
	class tt_any {
		constructor(ti) {
			this.ti=ti
		}
	}
	class tt_only {
	}
	class kw_break extends tt_only {
	}
	class kw_case extends tt_only {
	}
	class kw_catch extends tt_only {
	}
	class kw_continue extends tt_only {
	}
	class kw_debugger extends tt_only {
	}
	class kw_default extends tt_only {
	}
	class kw_delete extends tt_only {
	}
	class kw_do extends tt_only {
	}
	class kw_else extends tt_only {
	}
	class kw_finally extends tt_only {
	}
	class kw_for extends tt_only {
	}
	class kw_function extends tt_only {
	}
	class kw_if extends tt_only {
	}
	class kw_in extends tt_only {
	}
	class kw_instanceof extends tt_only {
	}
	class kw_new extends tt_only {
	}
	class kw_return extends tt_only {
	}
	class kw_switch extends tt_only {
	}
	class kw_this extends tt_only {
	}
	class kw_throw extends tt_only {
	}
	class kw_try extends tt_only {
	}
	class kw_typeof extends tt_only {
	}
	class kw_var extends tt_only {
	}
	class kw_void extends tt_only {
	}
	class kw_while extends tt_only {
	}
	class kw_with extends tt_only {
	}
	class kw_res_class extends tt_only {
	}
	class kw_res_const extends tt_only {
	}
	class kw_res_enum extends tt_only {
	}
	class kw_res_export extends tt_only {
	}
	class kw_res_extends extends tt_only {
	}
	class kw_res_import extends tt_only {
	}
	class kw_res_super extends tt_only {
	}
	class kw_sm_implements extends tt_only {
	}
	class kw_sm_interface extends tt_only {
	}
	class kw_sm_let extends tt_only {
	}
	class kw_sm_package extends tt_only {
	}
	class kw_sm_private extends tt_only {
	}
	class kw_sm_protected extends tt_only {
	}
	class kw_sm_public extends tt_only {
	}
	class kw_sm_static extends tt_only {
	}
	class kw_sm_yield extends tt_only {
	}
	class js_lit_null {
	}
	class js_lit_false {
	}
	class js_lit_true {
	}
	class tt_ss extends tt_any {
	}
	class tt_sym extends tt_any {
	}
	class tt_num extends tt_any {
	}
	class tt_ds extends tt_any {
	}
	class tt_reserved extends tt_any {
	}
	class tt_comment_block extends tt_any {
	}
	class tt_comment_line extends tt_any {
	}
	class ident extends tt_any {
	}
	class tt_type_switch {
		// used for regexp
		constructor(vec) {
			this.inner=vec
		}
	}
	window.kw_arr=["await","break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","false","finally","for","function","if","import","in","instanceof","let","new","null","return","super","switch","this","throw","true","try","typeof","var","void","while","with","yield"]
	window.js_matching_regexp=mt_js_kw
	let parse_default=Symbol('default')
	const cns_0='ident'
	const cns_1='tt_num,tt_ss,tt_ds,tt_type_switch,tt_reserved,tt_comment_block'.split(',')
	const cns_2='in,if,do,var,for,new,this,else,return,function,typeof,default'.split(',').map(e => 'kw_'+e)
	const cns_kw=cns_1.concat(cns_2).concat([cns_0])
	const js_char_arr='{}[] =\n;(),|+<>&*.?:-'.split('')
	let rx_sym=Symbol('rx')
	let reset_sym=Symbol('q')
	class parse_state {
		constructor() {
			let t=this
			t.a={}
			// class_cache_kw
			t.class_cache_kw={}
			t.c=null
			t.eof=false
			t.tt_vec=[]
			t.cur_regexp=null
		}
		reset() {
			let t=this
			t.tt_vec=[]
			t.eof=false
		}
		set_regexp(regexp) {
			this.cur_regexp=regexp
		}
		last_tt() {
			return this.tt_vec.at(-1)
		}
		static bad_find_mat(e) {
			if(e.constructor===void 0)
				return 1
			if(cns_kw.includes(e.constructor.name))
				return
			if(e.ti&&js_char_arr.includes(e.ti))
				return
			return 1
		}
		find_bad() {
			let w_idx=js_lex_state.tt_vec.findIndex(parse_state.bad_find_mat)
			if(w_idx===-1) {
				return []
			}
			return js_lex_state.tt_vec[w_idx]
		}
		lex_regex() {
			let t=this
			let orig_iter=t.cur_regexp
			let c,g
			let rx_num=0
			let c_arr=[]
			t.cur_regexp=/(?<rx>\/)|(?<br>[\[\]])|(?<escape_1>\\.)|(?<char>[a-zA-Z]+)|(?<opt_0>[\^()\|\-$?:+# \*])/g
			t.cur_regexp.lastIndex=orig_iter.lastIndex-1
			let iter_idx=t.cur_regexp.lastIndex
			for(let c,i=0;i<32;i++) {
				c=t.cur_regexp.exec(t.input_str)
				if(c===null) {
					break
				}
				let off=c.index-iter_idx
				if(off>1) {
					console.log(t.input_str.slice(iter_idx+1,c.index))
					throw 1
				}
				g=c.groups
				c_arr.push(c[0])
				iter_idx+=c[0].length
				if(g.rx) {
					rx_num++
					if(rx_num==2) {
						break
					}
					continue
				}
				if(g.opt_0) {
					continue
				}
				if(g.char) {
					continue
				}
				if(g.escape_1) {
					continue
				}
				if(g.br) {
					let c2=c[0]
					while(c2!=='[]'[1]) {
						c2=t.input_str[iter_idx]
						c_arr.push(c2)
						iter_idx++
					}
					t.cur_regexp.lastIndex=iter_idx
					continue
				}
				console.log([c[0]],t.input_str.slice(c.index-1,c.index+2))
			}
			return {
				iter_idx: t.cur_regexp.lastIndex+1,
				value: c_arr.join('')
			}
		}
		find_string_extents(t,str_type) {
			let st=t.cur_regexp.lastIndex-1
			let c,v=''
			switch(str_type) {
				case "''":
					for(let i=0;i<64;i++) {
						c=t.input_str[st++]
						if(i===0&&c.match(/'/)) {
							v+=c
							continue
						}
						if(c.match(/[^']/)==null) {
							v+=c
							break
						}
						v+=c
					}
					break
				case '""':
					for(let i=0;i<64;i++) {
						c=t.input_str[st++]
						if(i===0&&c.match(/"/)) {
							v+=c
							continue
						}
						if(c.match(/[^"]/)==null) {
							v+=c
							break
						}
						v+=c
					}
			}
			t.cur_regexp.lastIndex=st
			return {
				value: v,
			}
		}
		find_ident_extents(t) {
			let st=t.cur_regexp.lastIndex-1
			let c,v=''
			for(let i=0;i<64;i++) {
				c=t.input_str[st++]
				if(i===0) {
					if(c.match(/[a-zA-Z$_]/)===null) {
						break
					}
					v+=c
					continue
				}
				if(c.match(/[a-zA-Z$_0-9]/)==null) {
					break
				}
				v+=c
			}
			t.cur_regexp.lastIndex=st-1
			return {
				value: v,
			}
		}
		find_comment_block_extents(t) {
			let rx=/\/\*|\*\//g
			let cur
			let st=t.cur_regexp.lastIndex
			for(let i=0;i<12;i++) {
				cur=rx.exec(t.input_str)
				if(i===0&&cur[0]==='/*') {
					continue
				}
				if(cur[0]==='*/') {
					break
				}
				console.log(cur)
				throw 1
			}
			t.cur_regexp.lastIndex=rx.lastIndex
			return {
				value: t.input_str.slice(st-2,rx.lastIndex),
			}
		}
		lex_stage_1() {
			let cc,g,t=this
			let cur_obj,cur,cur_ret
			let iter_idx=0
			let gp=t.cur_regexp.exec(' ')
			t.cur_regexp.lastIndex=0
			let gn=Object.keys(gp.groups)
			for(let c,i=0;i<50000;i++) {
				c=t.cur_regexp.exec(t.input_str)
				if(c===null) {
					let left=t.input_str.length-iter_idx
					console.log(left)
					break
				}
				let diff=t.cur_regexp.lastIndex-c.index-c[0].length
				if(diff>0) {
					debugger
				}
				iter_idx+=c[0].length
				g=c.groups
				if(g.js_multiline_comment_start) {
					cur_ret=t.find_comment_block_extents(t)
					t.tt_vec.push((cur_ret.value))
					//tt_comment_block
					continue
				}
				if(g.js_singlequote_string_start) {
					cur_ret=t.find_string_extents(t,"''")
					t.tt_vec.push((cur_ret.value))
					//tt_ss
					continue
				}
				if(g.js_doublequote_string_start) {
					let diff=iter_idx
					cur_ret=t.find_string_extents(t,'""')
					if(diff>6000) {
						console.log('lt')
						debugger
					}
					t.tt_vec.push((cur_ret.value))
					//tt_ds
					continue
				}
				if(g.js_line_comment_start) {
					let prev=t.last_tt()
					if(prev==='=') {
						t.tt_vec.push(rx_sym)
						let cur_regexp=t.cur_regexp
						let new_iter_idx=t.lex_regex()
						cur_regexp.lastIndex=new_iter_idx
						t.cur_regexp=cur_regexp
						//iter_idx = new_iter_idx
						//let rx_items = t.tt_vec.splice(stlen)
						//cur_obj = new tt_type_switch(rx_items)
						//t.tt_vec.push(cur_obj)
						t.tt_vec.push(reset_sym)
						debugger; continue
					}
					console.log([prev],c)
					return
				}
				if(g.js_lex_sym) {
					if(g.js_lex_sym==='/') {
						let prev=t.last_tt()
						let rx_flag=false
						if(prev==='()'[0]) {
							rx_flag=true
						}
						if(prev==='=') {
							rx_flag=true
						}
						if(!rx_flag) {
							console.log(prev)
							debugger; continue
						}
						t.tt_vec.push(rx_sym)
						let cur_regexp=t.cur_regexp
						let resp=t.lex_regex()
						t.cur_regexp=cur_regexp
						t.cur_regexp.lastIndex=resp.iter_idx
						//iter_idx = new_iter_idx
						//let rx_items = t.tt_vec.splice(stlen)
						//cur_obj = new tt_type_switch(rx_items)
						//t.tt_vec.push(cur_obj)
						t.tt_vec.push(resp.value)
						continue
					}
					t.tt_vec.push((c[0]))
					//tt_sym
					continue
				}
				if(g.js_ident_start) {
					cur_ret=t.find_ident_extents(t)
					t.tt_vec.push(cur_ret.value)
					continue
				}
				if(g.js_num) {
					t.tt_vec.push((c[0]))
					continue
				}
				if(g.js_fut_res_keyword) {
					cur=g.js_fut_res_keyword
					switch(cur) {
						case 'class':
							t.tt_vec.push((c[0]))
							continue
						case 'const':
							t.tt_vec.push((c[0]))
							continue
						case 'export':
							t.tt_vec.push((c[0]))
							//tt_reserved
							continue
						default:
							console.log('uh',cur)
							return
							continue
					}
				}
				if(g.js_keyword) {
					cur=g.js_keyword
					let cv=['null','function','typeof','if','throw','new','return','this','var','for','in','void']
					let cx
					if(cv.includes(cur)) {
						continue
					}
					cv=['break','else','try','catch','finally','while','do','continue']
					if(cv.includes(cur)) {
						continue
					}
					cv=['delete','instanceof']
					if(cv.includes(cur)) {
						continue
					}
					switch(cur) {
						default:
					}
					console.log(g.js_keyword)
					return
					continue
				}
				let g2={}
				for(let x of gn) {
					if(g[x]!==void 0) {
						g2={
							...g2,
							[x]: g[x],
						}
					}
				}
				console.log(g2)
				if(t.eof) {
					break
				}
				return
			}
		}
		lex() {
			let t=this
			let ts=performance.now()
			try {
				t.lex_stage_1()
			} finally {
				console.log(performance.now()-ts)
				console.log(t)
			}
		}
		set_input(str) {
			this.input_str=str
		}
	}
	let state=new parse_state
	window.js_lex_state=state
	state.set_regexp(mt_js_kw)
	state.set_input(code)
	//state.lex()
	//let ret = js_lex_state.find_bad()
	//return ret
	//# sourceURL=https://github.dev/mjz19910/javascript_parser/blob/572930e8a33dab08b49b27f29890424f6a5ef5e4/js_lex_only_ver_0.js#L2029-L2029
}
