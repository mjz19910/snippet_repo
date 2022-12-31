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
/** @type {Set<string>} uses enum JSTokenizerTokenType as string */
const s_keywords=new Set();
{
	s_keywords.add("async");
	s_keywords.add("await");
	s_keywords.add("break");
	s_keywords.add("case");
	s_keywords.add("catch");
	s_keywords.add("class");
	s_keywords.add("const");
	s_keywords.add("continue");
	s_keywords.add("debugger");
	s_keywords.add("default");
	s_keywords.add("delete");
	s_keywords.add("do");
	s_keywords.add("else");
	s_keywords.add("enum");
	s_keywords.add("export");
	s_keywords.add("extends");
	s_keywords.add("false");
	s_keywords.add("finally");
	s_keywords.add("for");
	s_keywords.add("function");
	s_keywords.add("if");
	s_keywords.add("import");
	s_keywords.add("in");
	s_keywords.add("instanceof");
	s_keywords.add("let");
	s_keywords.add("new");
	s_keywords.add("null");
	s_keywords.add("return");
	s_keywords.add("super");
	s_keywords.add("switch");
	s_keywords.add("this");
	s_keywords.add("throw");
	s_keywords.add("true");
	s_keywords.add("try");
	s_keywords.add("typeof");
	s_keywords.add("var");
	s_keywords.add("void");
	s_keywords.add("while");
	s_keywords.add("with");
	s_keywords.add("yield");
}

// tokens len=4
// 4 char token is only >>>=

// HashMap<String, TokenType> Lexer::s_three_char_tokens
/** @type {HashMap<string,string>} */
const s_three_char_tokens=new HashMap();
{
	s_three_char_tokens.set("===","EqualsEqualsEquals");
	s_three_char_tokens.set("!==","ExclamationMarkEqualsEquals");
	s_three_char_tokens.set("**=","DoubleAsteriskEquals");
	s_three_char_tokens.set("<<=","ShiftLeftEquals");
	s_three_char_tokens.set(">>=","ShiftRightEquals");
	s_three_char_tokens.set("&&=","DoubleAmpersandEquals");
	s_three_char_tokens.set("||=","DoublePipeEquals");
	s_three_char_tokens.set("\?\?=","DoubleQuestionMarkEquals");
	s_three_char_tokens.set(">>>","UnsignedShiftRight");
	s_three_char_tokens.set("...","TripleDot");
}

// HashMap<String, TokenType> Lexer::s_two_char_tokens
/** @type {HashMap<string,string>} */
const s_two_char_tokens=new HashMap();
{
	s_two_char_tokens.set("=>","Arrow");
	s_two_char_tokens.set("+=","PlusEquals");
	s_two_char_tokens.set("-=","MinusEquals");
	s_two_char_tokens.set("*=","AsteriskEquals");
	// "/=" is one of the productions of DivPunctuator
	s_two_char_tokens.set("/=","SlashEquals");
	s_two_char_tokens.set("%=","PercentEquals");
	s_two_char_tokens.set("&=","AmpersandEquals");
	s_two_char_tokens.set("|=","PipeEquals");
	s_two_char_tokens.set("^=","CaretEquals");
	s_two_char_tokens.set("&&","DoubleAmpersand");
	s_two_char_tokens.set("||","DoublePipe");
	s_two_char_tokens.set("??","DoubleQuestionMark");
	s_two_char_tokens.set("**","DoubleAsterisk");
	s_two_char_tokens.set("==","EqualsEquals");
	s_two_char_tokens.set("<=","LessThanEquals");
	s_two_char_tokens.set(">=","GreaterThanEquals");
	s_two_char_tokens.set("!=","ExclamationMarkEquals");
	s_two_char_tokens.set("--","MinusMinus");
	s_two_char_tokens.set("++","PlusPlus");
	s_two_char_tokens.set("<<","ShiftLeft");
	s_two_char_tokens.set(">>","ShiftRight");
	// "?." is the production of OptionalChainingPunctuator
	s_two_char_tokens.set("?.","QuestionMarkPeriod");
}

// HashMap<char, TokenType> Lexer::s_single_char_tokens
/** @type {HashMap<string,string>} */
const s_single_char_tokens=new HashMap();
{
	// "&" is OtherPunctuator
	s_single_char_tokens.set("&","Ampersand");
	// "*" is OtherPunctuator
	s_single_char_tokens.set("*","Asterisk");
	// "[" is OtherPunctuator
	s_single_char_tokens.set("[","BracketOpen");
	// "]" is OtherPunctuator
	s_single_char_tokens.set("]","BracketClose");
	// "^" is OtherPunctuator
	s_single_char_tokens.set("^","Caret");
	// ":" is OtherPunctuator
	s_single_char_tokens.set(":","Colon");
	// "," is OtherPunctuator
	s_single_char_tokens.set(",","Comma");
	// "{" is OtherPunctuator
	s_single_char_tokens.set("{","CurlyOpen");
	// "}" is the production of RightBracePunctuator
	s_single_char_tokens.set("}","CurlyClose");
	// "=" is OtherPunctuator
	s_single_char_tokens.set("=","Equals");
	// "!" is OtherPunctuator
	s_single_char_tokens.set("!","ExclamationMark");
	// "-" is OtherPunctuator
	s_single_char_tokens.set("-","Minus");
	// "(" is OtherPunctuator
	s_single_char_tokens.set("(","ParenOpen");
	// ")" is OtherPunctuator
	s_single_char_tokens.set(")","ParenClose");
	// "%" is OtherPunctuator
	s_single_char_tokens.set("%","Percent");
	// "." is OtherPunctuator
	s_single_char_tokens.set(".","Period");
	// "|" is OtherPunctuator
	s_single_char_tokens.set("|","Pipe");
	// "+" is OtherPunctuator
	s_single_char_tokens.set("+","Plus");
	// "?" is OtherPunctuator
	s_single_char_tokens.set("?","QuestionMark");
	// ";" is OtherPunctuator
	s_single_char_tokens.set(";","Semicolon");
	// "/" is one of the productions by DivPunctuator
	s_single_char_tokens.set("/","Slash");
	// "~" is OtherPunctuator
	s_single_char_tokens.set("~","Tilde");
	// "<" is OtherPunctuator
	s_single_char_tokens.set("<","LessThan");
	// ">" is OtherPunctuator
	s_single_char_tokens.set(">","GreaterThan");
}

class ECMA262Base {
	/** @arg {ecma_root} parent */
	constructor(parent) {
		this.parent=parent;
	}
}

/** @typedef {[true,string,number]|[false,null,number]} LexReturnTyShort */

// https://tc39.es/ecma262/#sec-white-space
class JSWhiteSpace extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-WhiteSpace
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	WhiteSpace(str,index) {
		if(str[index]===" ") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\t") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u000b") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u000c") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\uFEFF") {
			return [true,"WhiteSpace",1];
		}
		// Unicode Space_Separator general category
		// NBSP
		if(str[index]==="\u00a0") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u1680") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2000") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2001") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2002") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2003") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2004") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2005") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2006") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2007") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2008") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u2009") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u200a") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u202f") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u205f") {
			return [true,"WhiteSpace",1];
		}
		if(str[index]==="\u3000") {
			return [true,"WhiteSpace",1];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-line-terminators
class JSLineTerminators extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-LineTerminator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LineTerminator(str,index) {
		let len=0;
		if(str[index]==="\r")
			len=1;
		if(str[index]==="\n")
			len=1;
		//<LS>
		if(str[index]==="\u{2028}")
			len=1;
		//<PS>
		if(str[index]==="\u{2029}")
			len=1;
		if(len>0) {
			return [true,"LineTerminator",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-LineTerminatorSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LineTerminatorSequence(str,index) {
		// <LF>
		if(str[index]==="\n") return [true,"LineTerminatorSequence",1];
		// <CR> [lookahead ≠ <LF>]
		if(str[index]==="\r"&&str[index+1]!=="\n") return [true,"LineTerminatorSequence",1];
		// <LS>
		if(str[index]==="\u2028") return [true,"LineTerminatorSequence",1];
		// <PS>
		if(str[index]==="\u2029") return [true,"LineTerminatorSequence",1];
		// <CR> <LF>
		if(str[index]==="\r"&&str[index+1]==="\n") return [true,"LineTerminatorSequence",2];
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-comments
class Comments extends ECMA262Base {
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	Comment(str,index) {
		let ml_len=this.MultiLineComment(str,index);
		if(ml_len[2]>0) {
			return ml_len;
		}
		let sl_len=this.SingleLineComment(str,index);
		if(sl_len[2]>0) {
			return sl_len;
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	MultiLineComment(str,index) {
		`
			MultiLineComment ::
			/* MultiLineCommentChars opt */
			`;
		let off=0;
		if(str.slice(index,index+2)==="/*") {
			off+=2;
			if(str.slice(index+off,index+off+2)==="*/") {
				return [true,"MultiLineComment",4];
			}
			let [valid,,com_len]=this.MultiLineCommentChars(str,index+off);
			if(!valid) {
				return [false,null,0];
			}
			if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {
				return [true,"MultiLineComment",off+com_len+2];
			}
		}
		return [false,null,0];
	}
	dep=0;
	/**MultiLineCommentChars ::
	MultiLineNotAsteriskChar MultiLineCommentChars opt
	* PostAsteriskCommentChars opt */
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	MultiLineCommentChars(str,index) {
		let start_len=0;
		if(this.dep>64) {
			throw Error("stack overflow");
		}
		this.dep++;
		let ml_na=this.MultiLineNotAsteriskChar(str,index+start_len);
		if(ml_na[2]>0) {
			start_len++;
			for(;;) {
				let [,,ml_na]=this.MultiLineNotAsteriskChar(str,index+start_len);
				if(ml_na>0) {
					start_len+=ml_na;
					continue;
				}
				if(str[index+start_len]==="*") {
					let [,,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
					if(pac>0) {
						start_len++;
						start_len+=pac;
					}
				}
				break;
			}
		}
		if(str[index+start_len]==="*") {
			let [,,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
			if(pac>0) {
				start_len++;
				start_len+=pac;
			}
		}
		this.dep--;
		if(start_len===0) {
			return [false,null,0];
		}
		return [true,"MultiLineCommentChars",start_len];
	}
	/**PostAsteriskCommentChars ::
	MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars opt
	* PostAsteriskCommentChars opt */
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	PostAsteriskCommentChars(str,index) {
		let index_offset=0;
		let offset_1=this.MultiLineNotForwardSlashOrAsteriskChar(str,index+index_offset);
		if(!offset_1[0]) return [false,null,0];
		if(offset_1[2]>0) {
			index_offset+=offset_1[2];
			let la=this.MultiLineCommentChars(str,index+index_offset);
			index_offset+=la[2];
			return [true,"PostAsteriskCommentChars",index_offset];
		}
		if(offset_1[2]===0) {
			if(str[index+index_offset]==="*") {
				index_offset++;
				let offset_2=this.PostAsteriskCommentChars(str,index+index_offset);
				if(!offset_2[0]) throw new Error("Recursive call to PostAsteriskCommentChars failed");
				if(offset_2[0]) {
					return [true,"PostAsteriskCommentChars",offset_2[2]+index_offset];
				}
			}
		}
		return [true,"PostAsteriskCommentChars",index_offset];
	}
	/**MultiLineNotAsteriskChar ::
	SourceCharacter but not * */
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	MultiLineNotAsteriskChar(str,index) {
		if(str[index]!=="*") {
			return [true,"MultiLineNotAsteriskChar",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	MultiLineNotForwardSlashOrAsteriskChar(str,index) {
		if(str[index]==="*"||str[index]==="/") {
			return [false,null,0];
		}
		return [true,"MultiLineNotForwardSlashOrAsteriskChar",1];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SingleLineComment(str,index) {
		if(str.slice(index,index+2)==="//") {
			let comment_length=this.SingleLineCommentChars(str,index+2);
			if(!comment_length[0]) throw new Error("Failed to parse single line comment");
			return [true,"SingleLineComment",comment_length[2]+2];
		}
		return [false,null,0];
	}
	/*SingleLineCommentChars ::
	SingleLineCommentChar SingleLineCommentChars*/
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SingleLineCommentChars(str,index) {
		if(index>=str.length) {
			return [false,null,0];
		}
		let s_index=index;
		while(str[s_index]!=="\n") {
			s_index++;
			if(s_index>str.length) {
				break;
			}
		}
		return [true,"SingleLineCommentChars",s_index-index];
	}
}

// https://tc39.es/ecma262/#sec-hashbang
class HashbangComments extends ECMA262Base {
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HashbangComment(str,index) {
		if(str[index]==="#"&&str[index+1]==="!") {
			let res=this.parent.comments.SingleLineCommentChars(str,index+2);
			return [true,"HashbangComment",res[2]+2];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-tokens
class Tokens extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-CommonToken
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	CommonToken(str,index) {
		let cur=null;
		let item=null;
		let len=0;
		cur=this.parent.names_and_keywords.IdentifierName(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.parent.names_and_keywords.PrivateIdentifier(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.parent.punctuators.Punctuator(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.parent.numeric_literals.NumericLiteral(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.parent.string_literals.StringLiteral(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.parent.template_literal_lexical_components.Template(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		if(item===null||!item[0]) {
			return [false,null,0];
		}
		return [true,item[1],len];
	}
}

// https://tc39.es/ecma262/#sec-names-and-keywords
class NamesAndKeywords extends ECMA262Base {
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	PrivateIdentifier(str,index) {
		if(str[index]!=="#")
			return [false,null,0];
		let cur=this.IdentifierName(str,index+1);
		if(!cur[0]) return [false,null,0];
		return [true,"PrivateIdentifier",cur[2]+1];
	}
	static IdentifierName_not_start_regex=/[0-9a-zA-Z$_]+/g;
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	IdentifierName(str,index) {
		let res=this.IdentifierStart(str,index);
		if(!res[0]) {
			return [false,null,0];
		}
		let [,,id_start_len]=res;
		NamesAndKeywords.IdentifierName_not_start_regex.lastIndex=index+id_start_len;
		let id_continue_match=NamesAndKeywords.IdentifierName_not_start_regex.exec(str);
		if(!id_continue_match||id_continue_match.index!=(index+1)) {
			return [true,"IdentifierName",id_start_len];
		}
		let id_continue_len=0;
		if(id_continue_match.index==index+id_start_len) {
			id_continue_len=id_continue_match[0].length;
		}
		if(id_continue_len>0) {
			return [true,"IdentifierName",id_start_len+id_continue_len];
		}
		return [false,null,0];
	}
	static id_continue_regex=/[a-zA-Z$_0-9]/;
	static id_start_regex=/[a-zA-Z$_]/;
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	IdentifierStart(str,index) {
		if(index>=str.length) {
			return [false,null,0];
		}
		if(str[index]==="\\") {
			let res=this.parent.string_literals.UnicodeEscapeSequence(str,index+1);
			if(res[0]) return [true,"IdentifierStart",res[2]+1];
		}
		if(str[index].match(NamesAndKeywords.id_start_regex)) {
			return [true,"IdentifierStart",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	IdentifierPart(str,index) {
		if(str[index].match(NamesAndKeywords.id_continue_regex)) {
			return [true,"IdentifierPart",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	IdentifierStartChar(str,index) {
		if(str[index].match(NamesAndKeywords.id_start_regex)) {
			return [true,"IdentifierStartChar",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	IdentifierPartChar(str,index) {
		if(str[index].match(NamesAndKeywords.id_continue_regex)) {
			return [true,"IdentifierPart",1];
		}
		return [false,null,0];
	}
}

class PunctuatorsData extends ECMA262Base {
	/** @arg {ecma_root} parent */
	constructor(parent) {
		super(parent);
	}
	OtherPunctuatorArray="{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(" ");
	DivPunctuatorArray="/ /=".split(" ");
}

// https://tc39.es/ecma262/#sec-punctuators
class Punctuators extends PunctuatorsData {
	// https://tc39.es/ecma262/#prod-Punctuator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	Punctuator(str,index) {
		var max_len=0,type=null,ret;
		var new_type,new_len;
		ret=this.OptionalChainingPunctuator(str,index);
		[,new_type,new_len]=ret;
		if(new_len>max_len) {
			type=new_type;
			max_len=new_len;
		}
		ret=this.OtherPunctuator(str,index);
		[,new_type,new_len]=ret;
		if(new_len>max_len) {
			type=new_type;
			max_len=new_len;
		}
		if(type===null) return [false,null,0];
		return [true,type,max_len];
	}
	// https://tc39.es/ecma262/#prod-OptionalChainingPunctuator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	OptionalChainingPunctuator(str,index) {
		if(str.slice(index,index+2)==="?.") {
			let [,,num_len]=this.parent.numeric_literals.DecimalDigit(str,index+2);
			if(num_len>0) {
				return [false,null,0];
			}
			return [true,"OptionalChainingPunctuator",2];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-OtherPunctuator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	OtherPunctuator(str,index) {
		// >>>= is the only OtherPunctuator production of length 4
		if(str.startsWith(">>>=",index)) {
			return [true,"OtherPunctuator",4];
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
		if(result) return [true,"OtherPunctuator",3];
		result=null;
		s_two_char_tokens.iterate(function(key) {
			// skip DivPunctuator with length 2
			if(key==="/=") return "Continue";
			// skip OptionalChainingPunctuator
			if(key==="?.") return "Continue";
			if(str.startsWith(key,index)) {
				result=key;
				return "Break";
			}
			return "Continue";
		});
		if(result) return [true,"OtherPunctuator",2];
		result=null;
		s_single_char_tokens.iterate(function(key,_value) {
			// skip DivPunctuator with length 1
			if(key==="/") return "Continue";
			// skip RightBracePunctuator
			if(key==="{}"[1]) return "Continue";
			if(str[index]===key) {
				result=key;
				return "Break";
			}
			return "Continue";
		});
		if(result) {
			return [true,"OtherPunctuator",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DivPunctuator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DivPunctuator(str,index) {
		let char_len=0;
		// `/`
		if(str.startsWith("/",index)) {
			char_len=1;
		}
		// `/=`
		if(str.startsWith("/=",index)) {
			char_len=2;
		}
		if(char_len>0) {
			return [true,"DivPunctuator",char_len];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RightBracePunctuator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RightBracePunctuator(str,index) {
		if(str[index]==="{}"[1]) {
			return [true,"RightBracePunctuator",1];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar-literals
class Literals extends ECMA262Base {
	// Null Literals
	// https://tc39.es/ecma262/#prod-NullLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NullLiteral(str,index) {
		if(str.slice(index,index+4)==="null") return [true,"NullLiteral",4];
		return [false,null,0];
	}
	// Boolean Literals
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	BooleanLiteral(str,index) {
		if(str.slice(index,index+4)==="true") return [true,"BooleanLiteral",4];
		if(str.slice(index,index+5)==="false") return [true,"BooleanLiteral",5];
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-numeric-literals
class NumericLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-NumericLiteralSeparator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NumericLiteralSeparator(str,index) {
		if(str[index]==="_") {
			return [true,"NumericLiteralSeparator",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NumericLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NumericLiteral(str,index) {
		let max_len=0;
		let len=this.DecimalLiteral(str,index);
		if(len[2]>max_len) {
			max_len=len[2];
		}
		if(max_len>0) {
			return [true,"NumericLiteral",max_len];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DecimalBigIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DecimalBigIntegerLiteral(str,index) {
		if(str[index]==="0") {
			let len=1;
			let res=this.BigIntLiteralSuffix(str,index+len);
			if(res[2]>0) {
				len+=res[2];
				return [true,"DecimalBigIntegerLiteral",len];
			}
		}
		x: {
			let res=this.NonZeroDigit(str,index);
			if(!res[0]) {
				break x;
			}
			let len=1;
			res=this.DecimalDigits(str,index+len);
			len+=res[2];
			res=this.BigIntLiteralSuffix(str,index+len);
			if(res[0]) {
				len+=res[2];
				return [true,"DecimalBigIntegerLiteral",len];
			}
		}
		x: {
			let res=this.NonZeroDigit(str,index);
			if(!res[0]) {
				break x;
			}
			let len=1;
			res=this.NumericLiteralSeparator(str,index+len);
			if(!res[0]) {
				break x;
			}
			len+=res[2];
			res=this.DecimalDigits(str,index+len);
			len+=res[2];
			res=this.BigIntLiteralSuffix(str,index+len);
			if(res[0]) {
				len+=res[2];
				return [true,"DecimalBigIntegerLiteral",len];
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonDecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonDecimalIntegerLiteral(str,index) {
		let res=this.BinaryIntegerLiteral(str,index);
		res=this.OctalIntegerLiteral(str,index);
		res=this.HexIntegerLiteral(str,index);
		return res;
	}
	// https://tc39.es/ecma262/#prod-BigIntLiteralSuffix
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	BigIntLiteralSuffix(str,index) {
		if(str[index]==="n") {
			return [true,"",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DecimalLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DecimalLiteral(str,index) {
		let max_len=0;
		let len=0;
		{
			let cur=this.DecimalIntegerLiteral(str,index+len);
			len+=cur[2];
		}
		if(len>0&&str[index+len]===".") {
			console.error("handle numbers like 0.0");
		};
		if(len>max_len) max_len=len;
		len=0;
		return [true,"DecimalLiteral",max_len];
	}
	// https://tc39.es/ecma262/#prod-DecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DecimalIntegerLiteral(str,index) {
		let max_len=0;
		// 0
		if(str[index]==="0") {
			max_len=1;
		}
		let len=0;
		{
			// NonZeroDigit
			let [,,tmp]=this.NonZeroDigit(str,index);
			if(tmp>len) {
				len=tmp;
			}
		}
		if(len>max_len) max_len=len;
		len=0;
		// NonZeroDigit NumericLiteralSeparator opt DecimalDigits[+Sep]
		{
			let tmp_len=0;
			let [,,res]=this.NonZeroDigit(str,index+tmp_len);
			if(res>0) {
				tmp_len+=res;
				[,,res]=this.NumericLiteralSeparator(str,index+tmp_len);
				if(res>0) {
					tmp_len+=res;
				}
				let prev_sep_flag=this.parent.flags.sep;
				this.parent.flags.sep=true;
				[,,res]=this.DecimalDigits(str,index+tmp_len);
				this.parent.flags.sep=prev_sep_flag;
				tmp_len+=res;
			}
			len+=tmp_len;
		}
		if(len>max_len) max_len=len;
		if(max_len===0) {
			return [false,null,0];
		}
		return [true,"DecimalIntegerLiteral",max_len];
	}
	// https://tc39.es/ecma262/#prod-DecimalDigits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DecimalDigits(str,index) {
		if(this.parent.flags.is_sep()) {
			let off=0;
			for(;;) {
				// DecimalDigit
				let [,,len]=this.DecimalDigit(str,index+off);
				if(len>0) {
					off++;
					// DecimalDigits[?Sep] DecimalDigit
					continue;
				}
				// [+Sep] DecimalDigits[+Sep] (NumericLiteralSeparator DecimalDigit)
				let [,,s_len]=this.NumericLiteralSeparator(str,index+off);
				if(s_len>0) {
					let [,,exl]=this.DecimalDigit(str,index+off+1);
					if(exl>0) {
						off++;
						// [+Sep] (DecimalDigits[+Sep]) NumericLiteralSeparator DecimalDigit
						continue;
					}
					break;
				}
				break;
			}
			return [true,"DecimalDigits",off];
		} else {
			// DecimalDigit
			let off=0;
			for(;;) {
				let [,,len]=this.DecimalDigit(str,index+off);
				if(len>0) {
					off++;
					continue;
				}
				break;
			}
			return [true,"DecimalDigits",off];
		}
	}
	// https://tc39.es/ecma262/#prod-DecimalDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DecimalDigit(str,index) {
		if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {
			return [true,"DecimalDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonZeroDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonZeroDigit(str,index) {
		if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {
			return [true,"NonZeroDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-ExponentPart
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	ExponentPart(str,index) {
		this.ExponentIndicator(str,index);
		this.SignedInteger(str,index);
		throw new Error("No impl");
	}
	// https://tc39.es/ecma262/#prod-ExponentIndicator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	ExponentIndicator(str,index) {
		if(str[index]==='e'||str[index]==='E') {
			return [true,"ExponentIndicator",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-SignedInteger
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SignedInteger(str,index) {
		let res;
		if(str[index]==="+"||str[index]==="-") {
			res=this.DecimalDigits(str,index+1);
			if(res[0]) return [true,"SignedInteger",res[2]+1];
			return [false,null,0];
		}
		res=this.DecimalDigits(str,index);
		if(res[0]) return [true,"SignedInteger",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-BinaryIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	BinaryIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-BinaryDigits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	BinaryDigits(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-BinaryDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	BinaryDigit(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-OctalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	OctalIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-OctalDigits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	OctalDigits(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-LegacyOctalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LegacyOctalIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-NonOctalDecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonOctalDecimalIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-LegacyOctalLikeDecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LegacyOctalLikeDecimalIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-OctalDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	OctalDigit(str,index) {
		if(str.charCodeAt(index)>="0".charCodeAt(0)&&str.charCodeAt(index)<="7".charCodeAt(0)) {
			return [true,"OctalDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonOctalDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonOctalDigit(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-HexIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HexIntegerLiteral(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-HexDigits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HexDigits(str,index) {str; index; throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-HexDigit
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HexDigit(str,index) {
		if(str.charCodeAt(index)>="0".charCodeAt(0)&&str.charCodeAt(index)<="9".charCodeAt(0)) {
			return [true,"HexDigit",1];
		}
		if(str.charCodeAt(index)>="a".charCodeAt(0)&&str.charCodeAt(index)<="f".charCodeAt(0)) {
			return [true,"HexDigit",1];
		}
		if(str.charCodeAt(index)>="A".charCodeAt(0)&&str.charCodeAt(index)<="F".charCodeAt(0)) {
			return [true,"HexDigit",1];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-string-literals
class StringLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-StringLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	StringLiteral(str,index) {
		let cur=str[index];
		if(cur==="\"") {
			if(str[index+1]==="\"") {
				return [true,"StringLiteral",2];
			}
			let [,,double_string_chars_len]=this.DoubleStringCharacters(str,index+1);
			if(str[index+double_string_chars_len+1]==="\"") {
				return [true,"StringLiteral",double_string_chars_len+2];
			}
			return [false,null,0];
		}
		if(cur==="'") {
			if(str[index+1]==="'") {
				return [true,"StringLiteral",2];
			}
			let [,,single_string_chars_len]=this.SingleStringCharacters(str,index+1);
			if(str[index+single_string_chars_len+1]==="'") {
				return [true,"StringLiteral",single_string_chars_len+2];
			}
			return [false,null,0];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DoubleStringCharacters
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DoubleStringCharacters(str,index) {
		let off=0;
		for(;;) {
			let len=this.DoubleStringCharacter(str,index+off);
			if(len[2]>0) {
				off+=len[2];
				continue;
			}
			break;
		}
		return [true,"DoubleStringCharacters",off];
	}
	// https://tc39.es/ecma262/#prod-DoubleStringCharacter
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	DoubleStringCharacter(str,index) {
		x: {
			if(str[index]==="\"") {
				return [false,null,0];
			}
			if(str[index]==="\\") {
				break x;
			}
			let len=this.parent.line_terminators.LineTerminator(str,index);
			if(len!==null) {
				break x;
			}
			return [true,"DoubleStringCharacter",1];
		}
		if(str[index]==="\u{2028}") {
			return [true,"DoubleStringCharacter",1];
		}
		if(str[index]==="\u{2029}") {
			return [true,"DoubleStringCharacter",1];
		}
		if(str[index]==="\\") {
			let [,,esc_len]=this.EscapeSequence(str,index);
			return [true,"DoubleStringCharacter",esc_len+1];
		}
		let [,,lc_len]=this.LineContinuation(str,index);
		if(lc_len>0) {
			return [true,"DoubleStringCharacter",lc_len];
		}
		return [true,"DoubleStringCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-SingleStringCharacters
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SingleStringCharacters(str,index) {
		let off=0;
		for(;;) {
			let len=this.SingleStringCharacter(str,index+off);
			if(len[2]>0) {
				off+=len[2];
				continue;
			}
			break;
		}
		if(!off) {
			return [false,null,0];
		}
		return [true,"SingleStringCharacters",off];
	}
	// https://tc39.es/ecma262/#prod-SingleStringCharacter
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SingleStringCharacter(str,index) {
		x: {
			if(str[index]==="'") {
				return [false,null,0];
			}
			if(str[index]==="\\") {
				break x;
			}
			let len=this.parent.line_terminators.LineTerminator(str,index);
			if(len!==null) {
				break x;
			}
			return [true,"SingleStringCharacter",1];
		}
		if(str[index]==="\u{2028}") {
			return [true,"SingleStringCharacter",1];
		}
		if(str[index]==="\u{2029}") {
			return [true,"SingleStringCharacter",1];
		}
		if(str[index]==="\\") {
			let esc_len=this.EscapeSequence(str,index);
			return [true,"SingleStringCharacter",esc_len[2]+1];
		}
		let [,,lc_len]=this.LineContinuation(str,index);
		if(lc_len>0) {
			return [true,"SingleStringCharacter",lc_len];
		}
		return [true,"SingleStringCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-LineContinuation
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LineContinuation(str,index) {
		if(str[index]==="\\") {
			let [,,lt_len]=this.parent.line_terminators.LineTerminatorSequence(str,index+1);
			if(lt_len>0) {
				return [true,"LineContinuation",lt_len+1];
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-EscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	EscapeSequence(str,index) {
		let len=this.CharacterEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		x: {
			if(str[index]==="0") {
				let peek=this.parent.numeric_literals.DecimalDigit(str,index);
				if(peek[2]>0) {
					break x;
				}
				// \0 null escape found
				return [true,"EscapeSequence",1];
			}
		}
		len=this.LegacyOctalEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		len=this.NonOctalDecimalEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		len=this.HexEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		len=this.UnicodeEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-CharacterEscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	CharacterEscapeSequence(str,index) {
		let len=this.SingleEscapeCharacter(str,index);
		if(len[2]>0) {
			return len;
		}
		len=this.NonEscapeCharacter(str,index);
		if(len[2]>0) {
			return len;
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-SingleEscapeCharacter
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	SingleEscapeCharacter(str,index) {
		let val=["'","\"","\\","b","f","n","r","t","v"];
		let cur=str[index];
		if(val.includes(cur)) {
			return [true,"SingleEscapeCharacter",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonEscapeCharacter(str,index) {
		if(this.EscapeCharacter(str,index)) {
			return [false,null,0];
		}
		if(this.parent.line_terminators.LineTerminator(str,index)) {
			return [false,null,0];
		}
		return [true,"NonEscapeCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	EscapeCharacter(str,index) {
		let len0=this.SingleEscapeCharacter(str,index);
		let len1=this.parent.numeric_literals.DecimalDigit(str,index);
		let act=0;
		if(len0>len1) {
			act=1;
		}
		if(str[index]==="x") {
			return [true,"EscapeCharacter",1];
		}
		if(len0[2]>len1[2]) {
			return [true,"EscapeCharacter",len0[2]];
		}
		if(len1[2]>len0[2]) {
			return [true,"EscapeCharacter",len1[2]];
		}
		if(act===1) {
			throw new Error("TODO");
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	LegacyOctalEscapeSequence(str,index) {
		x: {
			if(str[index]!=="0") {
				break x;
			}
			if(str[index+1]==="8"||str[index+1]==="9") {
				return [true,"LegacyOctalEscapeSequence",1];
			}
		}
		x: {
			let len=this.NonZeroOctalDigit(str,index);
			if(!len[0]) {
				break x;
			}
			let n_len=this.parent.numeric_literals.OctalDigit(str,index+1);
			if(n_len[2]>0) {
				break x;
			}
			return [true,"LegacyOctalEscapeSequence",1];
		}
		x: {
			let len=this.ZeroToThree(str,index);
			if(!len[0]) {
				break x;
			}
			len=this.parent.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {
				break x;
			}
			len=this.parent.numeric_literals.OctalDigit(str,index+2);
			if(len[0]) {
				break x;
			}
			return [true,"LegacyOctalEscapeSequence",2];
		}
		x: {
			let len=this.FourToSeven(str,index);
			if(!len[0]) {
				break x;
			}
			len=this.parent.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {
				break x;
			}
			return [true,"LegacyOctalEscapeSequence",2];
		}
		x: {
			let len=this.ZeroToThree(str,index);
			if(!len[0]) {
				break x;
			}
			len=this.parent.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {
				break x;
			}
			len=this.parent.numeric_literals.OctalDigit(str,index+2);
			if(!len[0]) {
				break x;
			}
			return [true,"LegacyOctalEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonZeroOctalDigit(str,index) {
		if(str[index]==="0") {
			return [false,null,0];
		}
		let len=this.parent.numeric_literals.OctalDigit(str,index);
		if(len[2]>0) {
			return [true,"NonZeroOctalDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	ZeroToThree(str,index) {
		let cur=str[index];
		let chk="0123";
		if(chk.includes(cur)) {
			return [true,"ZeroToThree",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	FourToSeven(str,index) {
		let cur=str[index];
		let chk="4567";
		if(chk.includes(cur)) {
			return [true,"FourToSeven",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NonOctalDecimalEscapeSequence(str,index) {
		if(str[index]==="8"||str[index]==="9") {
			return [true,"NonOctalDecimalEscapeSequence",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexEscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HexEscapeSequence(str,index) {
		if(str[index]==="x") {
			let len=this.parent.numeric_literals.HexDigit(str,index+1);
			if(!len) {
				return [false,null,0];
			}
			len=this.parent.numeric_literals.HexDigit(str,index+2);
			if(!len) {
				return [false,null,0];
			}
			return [true,"HexEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-UnicodeEscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	UnicodeEscapeSequence(str,index) {
		let off=0;
		if(str[index]==="u") {
			off++;
		}
		let len0=this.Hex4Digits(str,index+off);
		if(len0[2]>0) {
			return [true,"UnicodeEscapeSequence",len0[2]+1];
		}
		if(str[index+off]==="{}"[0]) {
			off++;
			let len=this.parent.template_literal_lexical_components.CodePoint(str,index+off);
			if(len[2]>0) {
				off+=len[2];
				if(str[index+off]==="{}"[1]) {
					off++;
					return [true,"UnicodeEscapeSequence",off];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-Hex4Digits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	Hex4Digits(str,index) {
		let len=this.parent.numeric_literals.HexDigit(str,index);
		if(!len) {
			return [false,null,0];
		}
		len=this.parent.numeric_literals.HexDigit(str,index);
		if(!len) {
			return [false,null,0];
		}
		len=this.parent.numeric_literals.HexDigit(str,index);
		if(!len) {
			return [false,null,0];
		}
		len=this.parent.numeric_literals.HexDigit(str,index);
		if(!len) {
			return [false,null,0];
		}
		return [true,"Hex4Digits",4];
	}
	// https://tc39.es/ecma262/#prod-HexDigits
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	HexDigits(str,index) {
		str; index;
		throw new Error("Method not implemented.");
	}
}

// https://tc39.es/ecma262/#sec-template-literal-lexical-components
class TemplateLiteralLexicalComponents extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-Template
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
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
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NoSubstitutionTemplate
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NoSubstitutionTemplate(str,index) {
		let cur_index=index;
		//` TemplateCharacters opt `
		if(str[cur_index]==="`") {
			cur_index++;
		} else {
			return [false,null,0];
		}
		let opt=this.TemplateCharacters(str,cur_index);
		if(!opt[0]) return [false,null,0];
		return [true,"NoSubstitutionTemplate",cur_index-index+opt[2]];
	}
	// https://tc39.es/ecma262/#prod-TemplateHead
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateHead(str,index) {
		let cur_index=index;
		// ` TemplateCharacters_opt ${
		if(str[cur_index]==="`") {
			cur_index++;
			let res=this.TemplateCharacters(str,cur_index);
			if(res[0]===false) throw res[1];
			if(res[2]>0) {
				cur_index+=res[2];
			}
			if(str[cur_index]==="$"&&str[cur_index+1]==="{") {
				return [true,"TemplateHead",cur_index+2];
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateSubstitutionTail
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateSubstitutionTail(str,index) {
		// TemplateMiddle
		let res=this.TemplateMiddle(str,index);
		if(res[0]) {
			return [true,"TemplateSubstitutionTail",res[2]];
		}
		// TemplateTail
		res=this.TemplateTail(str,index);
		if(res[0]) {
			return [true,"TemplateSubstitutionTail",res[2]];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateMiddle
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateMiddle(str,index) {
		let len=0;
		// } TemplateCharacters_opt ${
		if(str[index]==="{}"[1]) {
			len++;
			if(str[index+len]==="$"&&str[index+len+1]==="{}"[0]) {
				return [true,"TemplateMiddle",len+2];
			}
			let res=this.TemplateCharacters(str,index);
			if(res[0]) {
				len+=res[2];
				if(str[index+len]==="$"&&str[index+len+1]==="{}"[0]) {
					return [true,"TemplateMiddle",len+2];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateTail
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateTail(str,index) {
		let len=0;
		// } TemplateCharacters_opt `
		if(str[index]==="{}"[0]) {
			len++;
			if(str[index+len]==="`") {
				len++;
				return [true,"TemplateTail",len];
			}
			let res=this.TemplateCharacters(str,index);
			if(res[0]) {
				len+=res[2];
				if(str[index+len]==="`") {
					len++;
					return [true,"TemplateTail",len];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateCharacters
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateCharacters(str,index) {
		let len=0;
		let tmp=this.TemplateCharacter(str,index);
		if(tmp[0]) {
			len+=tmp[2];
		}
		while(tmp[2]>0&&index<str.length) {
			tmp=this.TemplateCharacter(str,index+len);
			if(tmp[0]) {
				len+=tmp[2];
			} else {
				break;
			}
		}
		return [true,"TemplateCharacters",len];
	}
	// https://tc39.es/ecma262/#prod-TemplateCharacter
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateCharacter(str,index) {
		if(str[index]==="$"&&str[index+1]!=="{") {
			return [true,"TemplateCharacter",1];
		}
		if(str[index]==="\\") {
			let escape_res=this.TemplateEscapeSequence(str,index);
			if(escape_res[0]) {
				return [true,"TemplateCharacter",escape_res[2]];
			}
		}
		if(str[index]==="\\") {
			let not_esc=this.NotEscapeSequence(str,index);
			if(not_esc[2]>0) {
				return [false,null,0];
			}
		}
		let res=this.parent.string_literals.LineContinuation(str,index);
		if(res[0]) {
			return [true,"TemplateCharacter",res[2]];
		}
		res=this.parent.line_terminators.LineTerminatorSequence(str,index);
		if(res[0]) {
			return [true,"TemplateCharacter",res[2]];
		}
		/* SourceCharacter but not one of ` or \ or $ or LineTerminator*/
		if(str[index]==="`"||str[index]==="\\"||str[index]==="$") {
			return [false,null,0];
		}
		res=this.parent.line_terminators.LineTerminator(str,index);
		if(res[0]) {
			return [false,null,0];
		}
		/* TODO: SourceCharacter is too complex for js
				 It requires handling all of unicode */
		return [true,"TemplateCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-TemplateEscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	TemplateEscapeSequence(str,index) {
		let len=0;
		/* CharacterEscapeSequence */
		let tmp=this.parent.string_literals.CharacterEscapeSequence(str,index);
		if(tmp[0]) {
			return [true,"TemplateEscapeSequence",tmp[2]];
		}
		/* 0 [lookahead ∉ DecimalDigit]*/
		if(str[index]==="0") {
			len++;
			let la=this.parent.numeric_literals.DecimalDigit(str,index);
			if(!la[0]) {
				return [true,"TemplateEscapeSequence",len];
			}
		}
		len=0;
		let res=this.parent.string_literals.HexEscapeSequence(str,index);
		if(res[0]) return [true,"TemplateEscapeSequence",res[2]];
		res=this.parent.string_literals.UnicodeEscapeSequence(str,index);
		if(res[0]) return [true,"TemplateEscapeSequence",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NotEscapeSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NotEscapeSequence(str,index) {
		if(str[index]==="0") {
			let res=this.parent.numeric_literals.DecimalDigit(str,index+1);
			if(res[0]) {
				return [true,"NotEscapeSequence",res[2]+1];
			}
		} else {
			let res=this.parent.numeric_literals.DecimalDigit(str,index);
			if(res[0]) {
				return [true,"NotEscapeSequence",res[2]];
			}
		}
		if(str[index]==="x") {
			let lookahead=this.parent.numeric_literals.HexDigit(str,index+1);
			if(!lookahead[0]) {
				return [true,"NotEscapeSequence",1];
			} else {
				lookahead=this.parent.numeric_literals.HexDigit(str,index+1);
				if(!lookahead[0]) {
					return [true,"NotEscapeSequence",1];
				}
			}
		}
		if(str[index]!=="u") {
			return [false,null,0];
		}
		let res_1,res_2,res_3;
		let len=1;
		let lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len);
		if(!lookahead_res_1[0]&&str[index+1]!=="{}"[0]) {
			return [true,"NotEscapeSequence",1];
		}
		res_1=this.parent.numeric_literals.HexDigit(str,index+len);
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",2];
		}
		res_1=this.parent.numeric_literals.HexDigit(str,index+len);
		res_2=this.parent.numeric_literals.HexDigit(str,index+len+1);
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+3);
		if(res_1[0]&&res_2[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",3];
		}
		res_1=this.parent.numeric_literals.HexDigit(str,index+len);
		res_2=this.parent.numeric_literals.HexDigit(str,index+len+1);
		res_3=this.parent.numeric_literals.HexDigit(str,index+len+2);
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len+3);
		if(res_1[0]&&res_2[0]&&res_3[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",4];
		}
		if(str[index+len]!=="{}"[1]) {
			return [false,null,0];
		}
		len++;
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len);
		if(!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len];
		}
		res_1=this.NotCodePoint(str,index+len);
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len];
		}
		res_1=this.CodePoint(str,index+len);
		lookahead_res_1=this.parent.numeric_literals.HexDigit(str,index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len+1];
		}
		if(lookahead_res_1[0]&&str[index+len+1]!=="{}"[1]) {
			return [true,"NotEscapeSequence",len+1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NotCodePoint
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	NotCodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF
		let res=this.parent.string_literals.HexDigits(str,index);
		if(!res[0]) {
			return [false,null,0];
		}
		let mv_raw=str.slice(index,index+res[2]);
		// but only if MV of HexDigits ≤ 0x10FFFF
		let MV=parseInt(mv_raw,16);
		if(MV>0x10FFFF) {
			return [true,"NotCodePoint",res[2]];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-CodePoint
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	CodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF
		let res=this.parent.string_literals.HexDigits(str,index);
		if(!res[0]) {
			return [false,null,0];
		}
		let mv_raw=str.slice(index,index+res[2]);
		// but only if MV of HexDigits ≤ 0x10FFFF
		let MV=parseInt(mv_raw,16);
		if(MV<=0x10FFFF) {
			return [true,"CodePoint",res[2]];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-regular-expression-literals
class RegularExpressionLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-RegularExpressionLiteral
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionLiteral(str,index) {
		let len=0;
		// / RegularExpressionBody / RegularExpressionFlags
		if(str[index]==="/") {
			len++;
		} else {
			return [false,null,0];
		}
		let res=this.RegularExpressionBody(str,index);
		if(!res[0]) return [false,null,0];
		len+=res[2];
		if(str[index+len]==="/") {
			len++;
		} else {
			return [false,null,0];
		}
		res=this.RegularExpressionFlags(str,index);
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBody
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionBody(str,index) {
		// RegularExpressionFirstChar RegularExpressionChars
		let res=this.RegularExpressionFirstChar(str,index);
		if(res[2]>0) {
			let cont=this.RegularExpressionChars(str,index+1);
			if(cont[2]===0) {}
		}
		throw new Error("Method not implemented.");
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionChars
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionChars(str,index) {
		let res=this.RegularExpressionChar(str,index);
		return [true,"RegularExpressionChars",res[2]];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionChar
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionChar(str,index) {
		// RegularExpressionNonTerminator but not one of \ or / or [
		x: {
			if(str[index]==="\\"&&str[index]==="/"||str[index]==="[]"[0]) {
				break x;
			}
			let res=this.RegularExpressionNonTerminator(str,index);
			if(res[0])
				return [true,"RegularExpressionChar",res[2]];
		}
		// RegularExpressionBackslashSequence
		let res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,"RegularExpressionChar",res[2]];
		// RegularExpressionClass
		res=this.RegularExpressionClass(str,index);
		if(res[0])
			return [true,"RegularExpressionChar",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFirstChar
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionFirstChar(str,index) {
		// RegularExpressionNonTerminator but not one of * or \ or / or [
		x: {
			if(str[index]==="*"||str[index]==="\\"&&str[index]==="/"||str[index]==="[]"[0]) {
				break x;
			}
			let res=this.RegularExpressionNonTerminator(str,index);
			if(res[0])
				return [true,"RegularExpressionFirstChar",res[2]];
		}
		// RegularExpressionBackslashSequence
		let res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,"RegularExpressionFirstChar",res[2]];
		// RegularExpressionClass
		res=this.RegularExpressionClass(str,index);
		if(res[0])
			return [true,"RegularExpressionFirstChar",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClass
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionClass(str,index) {
		let len=0;
		// [ RegularExpressionClassChars ]
		if(str[index]==='[]'[0]) {
			len++;
			let res=this.RegularExpressionClassChars(str,index+len);
			if(res[0]) {
				if(str[index+res[2]]==='[]'[1]) {
					len++;
					return [true,"RegularExpressionClass",len+res[2]];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBackslashSequence
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionBackslashSequence(str,index) {
		// \ RegularExpressionNonTerminator
		if(str[index]==="\\") {
			let res=this.RegularExpressionNonTerminator(str,index+1);
			if(res[0])
				return [true,"RegularExpressionBackslashSequence",res[2]+1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionNonTerminator(str,index) {
		// SourceCharacter but not LineTerminator
		let vv=this.parent.line_terminators.LineTerminator(str,index);
		if(vv[0])
			return [false,null,0];
		return [true,"RegularExpressionNonTerminator",1];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChars
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionClassChars(str,index) {
		let len=0;
		let is_class_chars=this.RegularExpressionClassChar(str,index+len);
		// [empty]
		if(!is_class_chars[0])
			return [true,"RegularExpressionClassChars",0];
		while(is_class_chars[0]) {
			len++;
			is_class_chars=this.RegularExpressionClassChar(str,index+len);
			if(!is_class_chars[0]) {
				break;
			}
		}
		return [true,"RegularExpressionClassChars",len];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChar
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionClassChar(str,index) {
		// RegularExpressionNonTerminator but not one of ] or \
		if(str[index]==='[]'[1]||str[index]==='\\') {
			return [false,null,0];
		}
		let res=this.RegularExpressionNonTerminator(str,index);
		if(res[0])
			return [true,"RegularExpressionClassChar",res[2]];
		res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,"RegularExpressionClassChar",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFlags
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	RegularExpressionFlags(str,index) {
		// [empty]
		let len=0;
		let is_class_chars=this.parent.names_and_keywords.IdentifierPartChar(str,index+len);
		if(!is_class_chars[0])
			return [true,"RegularExpressionFlags",0];
		throw new Error("TODO");
	}
}


class ecma_root {
	constructor() {
		this.flags={
			sep: false,
			is_sep() {
				return this.sep;
			}
		};
		this.white_space=new JSWhiteSpace(this);
		this.line_terminators=new JSLineTerminators(this);
		this.comments=new Comments(this);
		this.hashbang_comments=new HashbangComments(this);
		this.tokens=new Tokens(this);
		this.names_and_keywords=new NamesAndKeywords(this);
		this.punctuators=new Punctuators(this);
		this.RegularExpressionLiterals=new RegularExpressionLiterals(this);
		{
			this.literals=new Literals(this);
			this.numeric_literals=new NumericLiterals(this);
			this.string_literals=new StringLiterals(this);
		}
		this.template_literal_lexical_components=new TemplateLiteralLexicalComponents(this);
	}
}
class js_token_generator {
	static EOF_TOKEN=Symbol();
	/** @arg {string} str */
	constructor(str) {
		this.str=str;
		this.index=0;
		this.root=new ecma_root();
	}
	/** @arg {[true,string,number,number]|[false,symbol,number,number] | null} token_value */
	describe_token(token_value) {
		if(!token_value) return ["undefined"];
		let tok_str=this.str.slice(token_value[3],token_value[3]+token_value[2]);
		return [token_value[1],tok_str];
	}
	/** @arg {LexReturnTyShort} cur @returns {[boolean,string,number,number]|[false,symbol,number,number]|null} */
	as_next_token(cur) {
		if(cur[1]!==null) {
			if(cur[2]===0) {
				return [cur[0],cur[1],cur[2],this.index];
			}
			this.index+=cur[2];
			return [cur[0],cur[1],cur[2],this.index];
		}
		if(this.index>(this.str.length-1)) {
			return [false,js_token_generator.EOF_TOKEN,0,this.index];
		}
		return null;
	}
	/** @returns {[true,string,number,number]|[false,symbol,number,number]|null} */
	next_token() {
		if(this.index>(this.str.length-1)) {
			return [false,js_token_generator.EOF_TOKEN,0,this.index];
		}
		/** @type {[true,string,number,number]} */
		let ret;
		let cur=this.InputElementDiv(this.str,this.index);
		if(cur[1]!==null) {
			if(cur[2]===0) {
				ret=[cur[0],cur[1],cur[2],this.index];
				return ret;
			}
			ret=[cur[0],cur[1],cur[2],this.index];
			this.index+=cur[2];
			return ret;
		}
		console.log("next token fallthrough",cur,this.index);
		return null;
	}
	/** @arg {{ type: string|null; item: string|null; length: number; }} state @arg {LexReturnTyShort} lex_return @arg {string} type */
	modify_output(state,lex_return,type) {
		if(lex_return[0]&&lex_return[2]>state.length) {
			state.type=type;
			state.item=lex_return[1];
			state.length=lex_return[2];
		}
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseWhiteSpace(in_state,out_state) {
		let res=this.root.white_space.WhiteSpace(in_state.str,in_state.index);
		this.modify_output(out_state,res,"WhiteSpace");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseLineTerminator(in_state,out_state) {
		let res=this.root.line_terminators.LineTerminator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"LineTerminator");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseComment(in_state,out_state) {
		let res=this.root.comments.Comment(in_state.str,in_state.index);
		this.modify_output(out_state,res,"Comment");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseRightBracePunctuator(in_state,out_state) {
		let res=this.root.punctuators.RightBracePunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RightBracePunctuator");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseDivPunctuator(in_state,out_state) {
		let res=this.root.punctuators.DivPunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"DivPunctuator");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseCommonToken(in_state,out_state) {
		let res=this.root.tokens.CommonToken(in_state.str,in_state.index);
		this.modify_output(out_state,res,"CommonToken");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseRegularExpressionLiteral(in_state,out_state) {
		let res=this.root.RegularExpressionLiterals.RegularExpressionLiteral(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RegularExpressionLiteral");
	}
	/** @arg {{ str: string; index: number; }} in_state @arg {{ type: string|null; item: string|null; length: number; }} out_state */
	ParseTemplateSubstitutionTail(in_state,out_state) {
		let res=this.root.template_literal_lexical_components.TemplateSubstitutionTail(in_state.str,in_state.index);
		this.modify_output(out_state,res,"TemplateSubstitutionTail");
	}
	/** @arg {{str:string;index:number;}} in_state @arg {{type:string|null;item:string|null;length:number}} out_state */
	ParseCommonElements(in_state,out_state) {
		this.ParseWhiteSpace(in_state,out_state);
		this.ParseLineTerminator(in_state,out_state);
		this.ParseComment(in_state,out_state);
		this.ParseCommonToken(in_state,out_state);
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	InputElementDiv(str,index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator, RightBracePunctuator
		let in_state={
			str,
			index,
		};
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(in_state,out_state);
		this.ParseDivPunctuator(in_state,out_state);
		this.ParseRightBracePunctuator(in_state,out_state);
		if(!out_state.item) {
			return [false,null,0];
		}
		return [true,out_state.item,out_state.length];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	InputElementRegExp(str,index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RightBracePunctuator, RegularExpressionLiteral
		let in_state={
			str,
			index,
		};
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(in_state,out_state);
		this.ParseRightBracePunctuator(in_state,out_state);
		this.ParseRegularExpressionLiteral(in_state,out_state);
		if(!out_state.item) {
			return [false,null,0];
		}
		return [true,out_state.item,out_state.length];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	InputElementRegExpOrTemplateTail(str,index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RegularExpressionLiteral, TemplateSubstitutionTail
		let in_state={
			str,
			index,
		};
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(in_state,out_state);
		this.ParseRegularExpressionLiteral(in_state,out_state);
		this.ParseTemplateSubstitutionTail(in_state,out_state);
		if(!out_state.item) {
			return [false,null,0];
		}
		return [true,out_state.item,out_state.length];
	}
	/** @arg {string} str @arg {number} index @returns {LexReturnTyShort} */
	InputElementTemplateTail(str,index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator, TemplateSubstitutionTail
		let in_state={
			str,
			index,
		};
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(in_state,out_state);
		this.ParseDivPunctuator(in_state,out_state);
		this.ParseTemplateSubstitutionTail(in_state,out_state);
		if(!out_state.item) {
			return [false,null,0];
		}
		return [true,out_state.item,out_state.length];
	}
}


/** @arg {string} code_str */
function parse_javascript_str(code_str) {
	let token_gen=new js_token_generator(code_str);
	let res_item;
	let i=0;
	for(;;i++) {
		res_item=token_gen.next_token();
		if(res_item===null) {
			console.log("parse error at ",token_gen.index);
			break;
		}
		let res_description=token_gen.describe_token(res_item);
		if(res_description[0]==="WhiteSpace") {
			i-=1;
		}
		if(!res_item[0]) {
			if(res_item[1]===js_token_generator.EOF_TOKEN) {
				console.log("EOF");
			}
			break;
		}
		console.log(res_description);
	}
	console.log(`parsed ${i} tokens`);
};

if(typeof exports==='object') {
	exports.parse_javascript_str=parse_javascript_str;
} else if(window.inject_api!==void 0) {
	window.inject_api.parse_javascript_str=parse_javascript_str;
}
