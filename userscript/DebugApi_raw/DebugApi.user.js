// ==UserScript==
// @name		DebugApi userscript
// @namespace	https://github.com/mjz19910/
// @version		0.1.9
// @description	DebugApi.js from https://github.com/mjz19910/snippet_repo/blob/master/userscript/DebugApi_raw/DebugApi.user.js
// @author		@mjz19910
// @copyright   @mjz19910 2019-2022
// @match		https://*/*
// @match		http://*/*
// @run-at		document-start
// @grant		none
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/DebugApi_raw/DebugApi.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/DebugApi_raw/DebugApi.user.js
// ==/UserScript==
// @sha1		ce87fbfd
// @hash_for_version 0.1.2
/* eslint-disable no-undef */

let page_require=typeof require==="undefined"? __module_require__:require,delete_require=false,reset_require=false;
if(typeof require==="undefined"||page_require!==__module_require__) {
	delete_require=typeof require==="undefined";
	require=__module_require__;
	reset_require=true;
}
const {do_export}=require("../base_require_raw/BaseRequire.user");

const __module_name__="DebugApi";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
// #region saved
/** @type {[string,{name:string}][]} */
const saved_function_objects=[];
/** @arg {{name:string}} function_obj */
function add_function(function_obj) {
	saved_function_objects.push([function_obj.name,function_obj]);
}
export_(exports => {exports.add_function=add_function;});
/** @type {{type:"array",value:{}[]}[]} */
const saved_object_arrays=[];
export_(exports => {exports.saved_object_arrays=saved_object_arrays;});
/** @arg {{}[]} ids_dec */
function add_array(ids_dec) {
	saved_object_arrays.push({type: "array",value: ids_dec});
}
export_(exports => {exports.add_array=add_array;});
/** @type {SavedInstanceType[]} */
const saved_instances=[];
export_(exports => {exports.saved_instances=saved_instances;});
/** @arg {string} name @arg {{}} object */
function add_object_with_name(name,object) {
	/** @type {MetaTagForPrototypeOf} */
	const instance_meta={
		/** @type {"meta_for_prototype_of"}*/
		type: "meta_for_prototype_of",
		name,
		prototype_meta: Object.getPrototypeOf(object),
	};
	/** @type {SavedInstanceSubType} */
	const instance_obj=[instance_meta,object];
	/** @type {SavedInstanceType} */
	const instance_item=[name,instance_obj];
	saved_instances.push(instance_item);
}
export_(exports => {exports.add_object_with_name=add_object_with_name;});
/** @template {{}} U @template {new (...args: any) => U} T @arg {T} constructor_ @arg {U} object */
function add_object(constructor_,object) {
	const name=constructor_.name;
	/** @type {MetaTagForConstructor} */
	const instance_meta={
		/** @type {"for_constructor"}*/
		type: "for_constructor",
		name,
		constructor_meta: constructor_,
	};
	/** @type {SavedInstanceSubType} */
	const instance_obj=[instance_meta,object];
	/** @type {SavedInstanceType} */
	const instance_item=[name,instance_obj];
	saved_instances.push(instance_item);
}
add_function(add_object);
// #endregion saved
// #region sha1_hash
const commit_id_sha1=/* @sha1 */"ce87fbfd";
// #endregion sha1_hash
// #region parse_javascript_str_support
/** @template K,V */
class HashMap {
	/** @type {Map<K,V>|null} */
	m_data=null;
	is_empty() {
		if(this.m_data===null) return true;
		if(this.m_data.size===0) return true;
		return false;
	}
	/** @arg {K} key @arg {V} value */
	set(key,value) {
		if(!this.m_data) this.m_data=new Map;
		this.m_data.set(key,value);
		return this;
	}
	clear() {if(this.m_data) {this.m_data.clear();} }
	/** @arg {K} key */
	get(key) {
		if(!this.m_data) return;
		return this.m_data.get(key);
	}
	/** @arg {K} key */
	has(key) {
		if(!this.m_data) return false;
		return this.m_data.has(key);
	}
	/** @arg {(this:this,arg1:K,arg2:V)=>"Break"|"Continue"} callback */
	iterate(callback) {
		// from https://github.com/SerenityOS/serenity/blob/master/Userland/DevTools/Profiler/Profile.cpp
		// on my fs file://home/wsl2/dev/serenity/Userland/DevTools/Profiler/Profile.cpp
		if(!this.m_data) return;
		for(let x of this.m_data.entries()) if(callback.apply(this,x)==="Break") break;
	}
}

/** @type {Set<string>} uses enum JSTokenizerTokenType as string */
const s_keywords=new Set();
/** @type {HashMap<string,string>} */
const s_three_char_tokens=new HashMap();
/** @type {HashMap<string,string>} */
const s_two_char_tokens=new HashMap();
/** @type {HashMap<string,string>} */
const s_single_char_tokens=new HashMap();
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
	// 4 char token is only >>>=

	// Section: s_three_char_tokens
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

	// Section: s_two_char_tokens
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

	// Section: s_single_char_tokens
	s_single_char_tokens.set("&","Ampersand");
	s_single_char_tokens.set("*","Asterisk");
	s_single_char_tokens.set("[","BracketOpen");
	s_single_char_tokens.set("]","BracketClose");
	s_single_char_tokens.set("^","Caret");
	s_single_char_tokens.set(":","Colon");
	s_single_char_tokens.set(",","Comma");
	s_single_char_tokens.set("{","CurlyOpen");
	// "}" is the production of RightBracePunctuator
	s_single_char_tokens.set("}","CurlyClose");
	s_single_char_tokens.set("=","Equals");
	s_single_char_tokens.set("!","ExclamationMark");
	s_single_char_tokens.set("-","Minus");
	s_single_char_tokens.set("(","ParenOpen");
	s_single_char_tokens.set(")","ParenClose");
	s_single_char_tokens.set("%","Percent");
	s_single_char_tokens.set(".","Period");
	s_single_char_tokens.set("|","Pipe");
	s_single_char_tokens.set("+","Plus");
	s_single_char_tokens.set("?","QuestionMark");
	s_single_char_tokens.set(";","Semicolon");
	// "/" is one of the productions by DivPunctuator
	s_single_char_tokens.set("/","Slash");
	s_single_char_tokens.set("~","Tilde");
	s_single_char_tokens.set("<","LessThan");
	s_single_char_tokens.set(">","GreaterThan");
}

class ECMA262Base {
	/** @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} state @arg {JsLexerReturnType} lex_return @arg {string} type */
	modify_output(state,lex_return,type) {
		if(lex_return[0]&&lex_return[2]>state.length) {
			state.type=type;
			state.item=lex_return[1];
			state.length=lex_return[2];
		}
	}
	_str="";
	get str() {
		if(!this.B) {return this._str;}
		return this.B.str;
	}
	set str(value) {
		if(!this.B) {
			this._str=value;
			return;
		}
		this.B.str=value;
	}
	_len=0;
	/** @returns {number} */
	get len() {
		if(!this.B) {return this._len;}
		return this.B.len;
	}
	set len(value) {
		if(!this.B) {
			this._len=value;
			return;
		}
		this.B.len=value;
	}
	/** @type {ecma_root|null} */
	_C=null;
	get C() {
		if(!this._C) throw 1;
		return this._C;
	}
	/** @arg {ecma_root|null} base */
	constructor(base) {
		this.B=base;
		if(base) {this._C=base;}
	}
}

/** @typedef {[true,string,number,...([]|[{}])]|[false,null,number]} JsLexerReturnType */

// https://tc39.es/ecma262/#sec-white-space
class JSWhiteSpace extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-WhiteSpace
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	WhiteSpace(str,index) {
		if(str[index]===" ") {return [true,"WhiteSpace",1];}
		if(str[index]==="\t") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u000b") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u000c") {return [true,"WhiteSpace",1];}
		if(str[index]==="\uFEFF") {return [true,"WhiteSpace",1];}
		// Unicode Space_Separator general category
		// NBSP
		if(str[index]==="\u00a0") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u1680") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2000") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2001") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2002") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2003") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2004") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2005") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2006") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2007") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2008") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u2009") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u200a") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u202f") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u205f") {return [true,"WhiteSpace",1];}
		if(str[index]==="\u3000") {return [true,"WhiteSpace",1];}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-line-terminators
class JSLineTerminators extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-LineTerminator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		if(len>0) {return [true,"LineTerminator",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-LineTerminatorSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	Comment(str,index) {
		let ml_len=this.MultiLineComment(str,index);
		if(ml_len[2]>0) {return ml_len;}
		let sl_len=this.SingleLineComment(str,index);
		if(sl_len[2]>0) {return sl_len;}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineComment(str,index) {
		`
			MultiLineComment ::
			/* MultiLineCommentChars opt */
			`;
		let off=0;
		if(str.slice(index,index+2)==="/*") {
			off+=2;
			if(str.slice(index+off,index+off+2)==="*/") {return [true,"MultiLineComment",4];}
			let [valid,,com_len]=this.MultiLineCommentChars(str,index+off);
			if(!valid) {return [false,null,0];}
			if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {return [true,"MultiLineComment",off+com_len+2];}
		}
		return [false,null,0];
	}
	dep=0;
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineCommentChars(str,index) {
		let start_len=0;
		if(this.dep>64) {throw Error("stack overflow");}
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
		if(start_len===0) {return [false,null,0];}
		return [true,"MultiLineCommentChars",start_len];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
				if(offset_2[0]) {return [true,"PostAsteriskCommentChars",offset_2[2]+index_offset];}
			}
		}
		return [true,"PostAsteriskCommentChars",index_offset];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineNotAsteriskChar(str,index) {
		if(str[index]!=="*") {return [true,"MultiLineNotAsteriskChar",1];}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineNotForwardSlashOrAsteriskChar(str,index) {
		if(str[index]==="*"||str[index]==="/") {return [false,null,0];}
		return [true,"MultiLineNotForwardSlashOrAsteriskChar",1];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleLineComment(str,index) {
		if(str.slice(index,index+2)==="//") {
			let comment_length=this.SingleLineCommentChars(str,index+2);
			if(!comment_length[0]) throw new Error("Failed to parse single line comment");
			return [true,"SingleLineComment",comment_length[2]+2];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleLineCommentChars(str,index) {
		if(index>=str.length) {return [false,null,0];}
		let s_index=index;
		while(str[s_index]!=="\n") {
			s_index++;
			if(s_index>str.length) {break;}
		}
		return [true,"SingleLineCommentChars",s_index-index];
	}
}

// https://tc39.es/ecma262/#sec-hashbang
class HashbangComments extends ECMA262Base {
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	HashbangComment(str,index) {
		this.len=0;
		if(str[index]==="#"&&str[index+1]==="!") {
			this.len+=2;
			let res=this.C.comments.SingleLineCommentChars(str,index+2);
			return [true,"HashbangComment",res[2]+2];
		}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-tokens
class Tokens extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-CommonToken
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	CommonToken(str,index) {
		let cur=null;
		let item=null;
		let len=0;
		cur=this.C.names_and_keywords.IdentifierName(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.C.names_and_keywords.PrivateIdentifier(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.C.punctuators.Punctuator(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.C.numeric_literals.NumericLiteral(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.C.string_literals.StringLiteral(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		cur=this.C.template_literal_lexical_components.Template(str,index);
		if(cur[2]>len) {
			len=cur[2];
			item=cur;
		}
		if(item===null||!item[0]) {return [false,null,0];}
		return [true,item[1],len];
	}
}

// https://tc39.es/ecma262/#sec-names-and-keywords
class NamesAndKeywords extends ECMA262Base {
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	PrivateIdentifier(str,index) {
		if(str[index]!=="#")
			return [false,null,0];
		let cur=this.IdentifierName(str,index+1);
		if(!cur[0]) return [false,null,0];
		return [true,"PrivateIdentifier",cur[2]+1];
	}
	static IdentifierName_not_start_regex=/[0-9a-zA-Z$_]+/g;
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierName(str,index) {
		let res=this.IdentifierStart(str,index);
		if(!res[0]) {return [false,null,0];}
		let [,,id_start_len]=res;
		NamesAndKeywords.IdentifierName_not_start_regex.lastIndex=index+id_start_len;
		let id_continue_match=NamesAndKeywords.IdentifierName_not_start_regex.exec(str);
		if(!id_continue_match||id_continue_match.index!=(index+1)) {return [true,"IdentifierName",id_start_len];}
		let id_continue_len=0;
		if(id_continue_match.index==index+id_start_len) {id_continue_len=id_continue_match[0].length;}
		if(id_continue_len>0) {return [true,"IdentifierName",id_start_len+id_continue_len];}
		return [false,null,0];
	}
	static id_continue_regex=/[a-zA-Z$_0-9]/;
	static id_start_regex=/[a-zA-Z$_]/;
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierStart(str,index) {
		if(index>=str.length) {return [false,null,0];}
		if(str[index]==="\\") {
			let res=this.C.string_literals.UnicodeEscapeSequence(index+1);
			if(res[0]) return [true,"IdentifierStart",res[2]+1];
		}
		if(str[index].match(NamesAndKeywords.id_start_regex)) {return [true,"IdentifierStart",1];}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierPart(str,index) {
		if(str[index].match(NamesAndKeywords.id_continue_regex)) {return [true,"IdentifierPart",1];}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierStartChar(str,index) {
		if(str[index].match(NamesAndKeywords.id_start_regex)) {return [true,"IdentifierStartChar",1];}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierPartChar(str,index) {
		if(str[index].match(NamesAndKeywords.id_continue_regex)) {return [true,"IdentifierPart",1];}
		return [false,null,0];
	}
}

class PunctuatorsData extends ECMA262Base {
	/** @arg {ecma_root} parent */
	constructor(parent) {super(parent);}
	OtherPunctuatorArray="{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> &|^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(" ");
	DivPunctuatorArray="/ /=".split(" ");
}

// https://tc39.es/ecma262/#sec-punctuators
class Punctuators extends PunctuatorsData {
	// https://tc39.es/ecma262/#prod-Punctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	OptionalChainingPunctuator(str,index) {
		if(str.slice(index,index+2)==="?.") {
			let [,,num_len]=this.C.numeric_literals.DecimalDigit(str,index+2);
			if(num_len>0) {return [false,null,0];}
			return [true,"OptionalChainingPunctuator",2];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-OtherPunctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	OtherPunctuator(str,index) {
		// >>>= is the only OtherPunctuator production of length 4
		if(str.startsWith(">>>=",index)) {return [true,"OtherPunctuator",4];}
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
			// TODO: exclude some tokens that are parsed elsewhere
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
		if(result) {return [true,"OtherPunctuator",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DivPunctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DivPunctuator(str,index) {
		let char_len=0;
		// `/`
		if(str.startsWith("/",index)) {char_len=1;}
		// `/=`
		if(str.startsWith("/=",index)) {char_len=2;}
		if(char_len>0) {return [true,"DivPunctuator",char_len];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RightBracePunctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RightBracePunctuator(str,index) {
		if(str[index]==="{}"[1]) {return [true,"RightBracePunctuator",1];}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar-literals
class Literals extends ECMA262Base {
	// Null Literals
	// https://tc39.es/ecma262/#prod-NullLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NullLiteral(str,index) {
		if(str.slice(index,index+4)==="null") return [true,"NullLiteral",4];
		return [false,null,0];
	}
	// Boolean Literals
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	BooleanLiteral(str,index) {
		if(str.slice(index,index+4)==="true") return [true,"BooleanLiteral",4];
		if(str.slice(index,index+5)==="false") return [true,"BooleanLiteral",5];
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-numeric-literals
class NumericLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-NumericLiteralSeparator
	/** @arg {number} index @returns {JsLexerReturnType} */
	NumericLiteralSeparator(index) {
		if(this.str[index]==="_") {return [true,"NumericLiteralSeparator",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NumericLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NumericLiteral(str,index) {
		let res;
		let max_len=0;
		/** @type {{}} */
		let max_item=[];
		let res_len=0;
		res=this.NonDecimalIntegerLiteral_Sep(index);
		if(res[0]) {
			let big_int=this.BigIntLiteralSuffix(str,index+res[2]);
			if(big_int[0]) {
				let res_len=res[2]+big_int[2];
				if(res_len>max_len) {
					max_item=[res,big_int];
					max_len=res_len;
				}
			} else {
				res_len=res[2];
				if(res_len>max_len) {
					max_item=[res];
					max_len=res_len;
				}
			}
		}
		res=this.DecimalBigIntegerLiteral(str,index);
		if(res[2]>max_len) {
			max_item=[res];
			max_len=res[2];
		}
		res=this.DecimalLiteral(str,index);
		if(res[2]>max_len) {
			max_item=[res];
			max_len=res[2];
		}
		if(max_len>0) {
			if(!max_item) throw new Error("Internal error: Invalid state");
			return [true,"NumericLiteral",max_len,max_item];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DecimalBigIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
			if(!res[0]) {break x;}
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
			if(!res[0]) {break x;}
			let len=1;
			res=this.NumericLiteralSeparator(index+len);
			if(!res[0]) {break x;}
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
	/** @arg {number} index @returns {JsLexerReturnType} */
	NonDecimalIntegerLiteral_Sep(index) {
		let res=this.BinaryIntegerLiteral_Sep(index);
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		res=this.OctalIntegerLiteral_Sep(index);
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		res=this.HexIntegerLiteral_Sep(index);
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		return res;
	}
	// https://tc39.es/ecma262/#prod-NonDecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonDecimalIntegerLiteral(str,index) {
		let res=this.BinaryIntegerLiteral(str,index);
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		res=this.OctalIntegerLiteral();
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		res=this.HexIntegerLiteral(index);
		if(res[0]) return [true,"NonDecimalIntegerLiteral",res[2]];
		return res;
	}
	// https://tc39.es/ecma262/#prod-BigIntLiteralSuffix
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	BigIntLiteralSuffix(str,index) {
		if(str[index]==="n") {return [true,"",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DecimalLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DecimalLiteral(str,index) {
		let max_len=0;
		let len=0;
		{
			let cur=this.DecimalIntegerLiteral(str,index+len);
			len+=cur[2];
		}
		if(len>0&&str[index+len]===".") {console.error("handle numbers like 0.0");};
		if(len>max_len) max_len=len;
		len=0;
		return [true,"DecimalLiteral",max_len];
	}
	// https://tc39.es/ecma262/#prod-DecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DecimalIntegerLiteral(str,index) {
		let max_len=0;
		// 0
		if(str[index]==="0") {max_len=1;}
		let len=0;
		{
			// NonZeroDigit
			let [,,tmp]=this.NonZeroDigit(str,index);
			if(tmp>len) {len=tmp;}
		}
		if(len>max_len) max_len=len;
		len=0;
		// NonZeroDigit NumericLiteralSeparator opt DecimalDigits[+Sep]
		{
			let tmp_len=0;
			let [,,res]=this.NonZeroDigit(str,index+tmp_len);
			if(res>0) {
				tmp_len+=res;
				[,,res]=this.NumericLiteralSeparator(index+tmp_len);
				if(res>0) {tmp_len+=res;}
				let prev_sep_flag=this.C.flags.sep;
				this.C.flags.sep=true;
				[,,res]=this.DecimalDigits(str,index+tmp_len);
				this.C.flags.sep=prev_sep_flag;
				tmp_len+=res;
			}
			len+=tmp_len;
		}
		if(len>max_len) max_len=len;
		if(max_len===0) {return [false,null,0];}
		return [true,"DecimalIntegerLiteral",max_len];
	}
	// https://tc39.es/ecma262/#prod-DecimalDigits
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DecimalDigits(str,index) {
		if(this.C.flags.is_sep()) {
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
				let [,,s_len]=this.NumericLiteralSeparator(index+off);
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DecimalDigit(str,index) {
		if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {return [true,"DecimalDigit",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonZeroDigit
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonZeroDigit(str,index) {
		if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {return [true,"NonZeroDigit",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-ExponentPart
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	ExponentPart(str,index) {
		this.ExponentIndicator(str,index);
		this.SignedInteger(str,index);
		throw new Error("No impl");
	}
	// https://tc39.es/ecma262/#prod-ExponentIndicator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	ExponentIndicator(str,index) {
		if(str[index]==="e"||str[index]==="E") {return [true,"ExponentIndicator",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-SignedInteger
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {number} index @returns {JsLexerReturnType} */
	BinaryIntegerLiteral_Sep(index) {
		if(this.str.startsWith("0b",index)||this.str.startsWith("0B",index)) {
			let res=this.BinaryDigits_Sep(index);
			if(res[0]) return [true,"BinaryIntegerLiteral",res[2]+2];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-BinaryIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	BinaryIntegerLiteral(str,index) {
		if(str.startsWith("0b",index)||str.startsWith("0B",index)) {
			let res=this.BinaryDigits(index+2);
			if(res[0]) return [true,"BinaryIntegerLiteral",res[2]+2];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-BinaryDigits
	/** @arg {number} index @returns {JsLexerReturnType} */
	BinaryDigits_Sep(index) {
		this.len=0;
		this.C.index_stack.push(this.C.index);
		let res=this.BinaryDigit(index);
		while(res[0]) {
			this.len++;
			this.C.index++;
			let res_peek_digit=this.BinaryDigit(this.C.index);
			let res_sep=this.NumericLiteralSeparator(this.C.index);
			let res_sep_peek=this.BinaryDigit(this.C.index+1);
			if(res_peek_digit[0]) {res=res_peek_digit;} else if(res_sep[0]&&res_sep_peek[0]) {res=res_sep;} else {break;}
		}
		if(!res[0]&&this.len==0) {return [false,null,0];}
		if(this.len>0) return [true,"BinaryDigits",this.len];
		return [false,null,0];
	}
	/** @arg {number} i @returns {JsLexerReturnType} */
	BinaryDigits(i) {
		this.len=0;
		let res=this.BinaryDigit(i);
		while(res[0]) {
			this.len++;
			let res_peek_digit=this.BinaryDigit(i+this.len);
			if(res_peek_digit[0]) {res=res_peek_digit;} else {break;}
		}
		if(!res[0]&&this.len==0) {return [false,null,0];}
		if(this.len>0) return [true,"BinaryDigits",this.len];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-BinaryDigit
	/** @arg {number} i @returns {JsLexerReturnType} */
	BinaryDigit(i) {
		if(this.str[i]==="0"||this.str[i]==="1") {return [true,"BinaryDigit",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-OctalIntegerLiteral
	/** @arg {number} i @returns {JsLexerReturnType} */
	OctalIntegerLiteral_Sep(i) {
		if(this.str.startsWith("0o",i)||this.str.startsWith("0O",i)) {
			let res=this.BinaryDigits(i+2);
			if(res[0]) return [true,"SignedInteger",res[2]+2];
		}
		return [false,null,0];
	}
	/** @returns {JsLexerReturnType} */
	OctalIntegerLiteral() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-OctalDigits
	/** @returns {JsLexerReturnType} */
	OctalDigits() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-LegacyOctalIntegerLiteral
	/** @returns {JsLexerReturnType} */
	LegacyOctalIntegerLiteral() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-NonOctalDecimalIntegerLiteral
	/** @returns {JsLexerReturnType} */
	NonOctalDecimalIntegerLiteral() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-LegacyOctalLikeDecimalIntegerLiteral
	/** @returns {JsLexerReturnType} */
	LegacyOctalLikeDecimalIntegerLiteral() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-OctalDigit
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	OctalDigit(str,index) {
		if(str.charCodeAt(index)>="0".charCodeAt(0)&&str.charCodeAt(index)<="7".charCodeAt(0)) {return [true,"OctalDigit",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonOctalDigit
	/** @returns {JsLexerReturnType} */
	NonOctalDigit() {throw new Error("No impl");}
	// https://tc39.es/ecma262/#prod-HexIntegerLiteral
	/** @arg {number} i @returns {JsLexerReturnType} */
	HexIntegerLiteral_Sep(i) {
		if(this.str.startsWith("0x",i)||this.str.startsWith("0x",i)) {
			let res=this.HexDigits({sep: true},i+2);
			if(res[0]) return [true,"HexIntegerLiteral",res[2]+2,["sep",res]];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexIntegerLiteral
	/** @arg {number} i @returns {JsLexerReturnType} */
	HexIntegerLiteral(i) {
		if(this.str.startsWith("0x",i)||this.str.startsWith("0x",i)) {
			let res=this.HexDigits({sep: false},i+2);
			if(res[0]) return [true,"HexIntegerLiteral",res[2]+2,["sep",res]];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexDigits
	/** @returns {JsLexerReturnType} @arg {{sep:boolean}} grammar_params @arg {number} i */
	HexDigits(grammar_params,i) {
		if(grammar_params.sep) {
			this.len=0;
			let res=this.HexDigit(i+this.len);
			while(res[0]&&(i+this.len)<this.str.length) {
				this.len++;
				let res_digit=this.HexDigit(i+this.len);
				let num_sep=this.NumericLiteralSeparator(i+this.len);
				if(num_sep[0]) {res=num_sep;} else if(res_digit[0]) {res=res_digit;} else {break;}
			}
			if(!res[0]&&this.len==0) {return [false,null,0];}
			if(this.len>0) return [true,"HexDigits",this.len];
			return [false,null,0];
		}
		this.len=0;
		let res=this.HexDigit(i+this.len);
		while(res[0]) {
			this.len++;
			let res_digit=this.HexDigit(i+this.len);
			if(res_digit[0]) {res=res_digit;} else {break;}
		}
		if(!res[0]&&this.len==0) {return [false,null,0];}
		if(this.len>0) return [true,"HexDigits",this.len];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexDigit
	/** @arg {number} index @returns {JsLexerReturnType} */
	HexDigit(index) {
		let str=this.str;
		if(str.charCodeAt(index)>="0".charCodeAt(0)&&str.charCodeAt(index)<="9".charCodeAt(0)) {return [true,"HexDigit",1];}
		if(str.charCodeAt(index)>="a".charCodeAt(0)&&str.charCodeAt(index)<="f".charCodeAt(0)) {return [true,"HexDigit",1];}
		if(str.charCodeAt(index)>="A".charCodeAt(0)&&str.charCodeAt(index)<="F".charCodeAt(0)) {return [true,"HexDigit",1];}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-string-literals
class StringLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-StringLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	StringLiteral(str,index) {
		let cur=str[index];
		if(cur==="\"") {
			if(str[index+1]==="\"") {return [true,"StringLiteral",2];}
			let [,,double_string_chars_len]=this.DoubleStringCharacters(str,index+1);
			if(str[index+double_string_chars_len+1]==="\"") {return [true,"StringLiteral",double_string_chars_len+2];}
			return [false,null,0];
		}
		if(cur==="'") {
			if(str[index+1]==="'") {return [true,"StringLiteral",2];}
			let [,,single_string_chars_len]=this.SingleStringCharacters(str,index+1);
			if(str[index+single_string_chars_len+1]==="'") {return [true,"StringLiteral",single_string_chars_len+2];}
			return [false,null,0];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DoubleStringCharacters
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	DoubleStringCharacter(str,index) {
		x: {
			if(str[index]==="\"") {return [false,null,0];}
			if(str[index]==="\\") {break x;}
			let len=this.C.line_terminators.LineTerminator(str,index);
			if(len!==null) {break x;}
			return [true,"DoubleStringCharacter",1];
		}
		if(str[index]==="\u{2028}") {return [true,"DoubleStringCharacter",1];}
		if(str[index]==="\u{2029}") {return [true,"DoubleStringCharacter",1];}
		if(str[index]==="\\") {
			let [,,esc_len]=this.EscapeSequence(str,index);
			return [true,"DoubleStringCharacter",esc_len+1];
		}
		let [,,lc_len]=this.LineContinuation(str,index);
		if(lc_len>0) {return [true,"DoubleStringCharacter",lc_len];}
		return [true,"DoubleStringCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-SingleStringCharacters
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		if(!off) {return [false,null,0];}
		return [true,"SingleStringCharacters",off];
	}
	// https://tc39.es/ecma262/#prod-SingleStringCharacter
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleStringCharacter(str,index) {
		x: {
			if(str[index]==="'") {return [false,null,0];}
			if(str[index]==="\\") {break x;}
			let len=this.C.line_terminators.LineTerminator(str,index);
			if(len!==null) {break x;}
			return [true,"SingleStringCharacter",1];
		}
		if(str[index]==="\u{2028}") {return [true,"SingleStringCharacter",1];}
		if(str[index]==="\u{2029}") {return [true,"SingleStringCharacter",1];}
		if(str[index]==="\\") {
			let esc_len=this.EscapeSequence(str,index);
			return [true,"SingleStringCharacter",esc_len[2]+1];
		}
		let [,,lc_len]=this.LineContinuation(str,index);
		if(lc_len>0) {return [true,"SingleStringCharacter",lc_len];}
		return [true,"SingleStringCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-LineContinuation
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	LineContinuation(str,index) {
		if(str[index]==="\\") {
			let [,,lt_len]=this.C.line_terminators.LineTerminatorSequence(str,index+1);
			if(lt_len>0) {return [true,"LineContinuation",lt_len+1];}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-EscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	EscapeSequence(str,index) {
		let len=this.CharacterEscapeSequence(str,index);
		if(len[2]>0) {return len;}
		x: {
			if(str[index]==="0") {
				let peek=this.C.numeric_literals.DecimalDigit(str,index);
				if(peek[2]>0) {break x;}
				// \0 null escape found
				return [true,"EscapeSequence",1];
			}
		}
		len=this.LegacyOctalEscapeSequence(str,index);
		if(len[2]>0) {return len;}
		len=this.NonOctalDecimalEscapeSequence(str,index);
		if(len[2]>0) {return len;}
		len=this.HexEscapeSequence(str,index);
		if(len[2]>0) {return len;}
		len=this.UnicodeEscapeSequence(index);
		if(len[2]>0) {return len;}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-CharacterEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	CharacterEscapeSequence(str,index) {
		let len=this.SingleEscapeCharacter(str,index);
		if(len[2]>0) {return len;}
		len=this.NonEscapeCharacter(str,index);
		if(len[2]>0) {return len;}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-SingleEscapeCharacter
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleEscapeCharacter(str,index) {
		let val=["'","\"","\\","b","f","n","r","t","v"];
		let cur=str[index];
		if(val.includes(cur)) {return [true,"SingleEscapeCharacter",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonEscapeCharacter(str,index) {
		if(this.EscapeCharacter(str,index)) {return [false,null,0];}
		if(this.C.line_terminators.LineTerminator(str,index)) {return [false,null,0];}
		return [true,"NonEscapeCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	EscapeCharacter(str,index) {
		let len0=this.SingleEscapeCharacter(str,index);
		let len1=this.C.numeric_literals.DecimalDigit(str,index);
		let act=0;
		if(len0>len1) {act=1;}
		if(str[index]==="x") {return [true,"EscapeCharacter",1];}
		if(len0[2]>len1[2]) {return [true,"EscapeCharacter",len0[2]];}
		if(len1[2]>len0[2]) {return [true,"EscapeCharacter",len1[2]];}
		if(act===1) {throw new Error("TODO");}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	LegacyOctalEscapeSequence(str,index) {
		x: {
			if(str[index]!=="0") {break x;}
			if(str[index+1]==="8"||str[index+1]==="9") {return [true,"LegacyOctalEscapeSequence",1];}
		}
		x: {
			let len=this.NonZeroOctalDigit(str,index);
			if(!len[0]) {break x;}
			let n_len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(n_len[2]>0) {break x;}
			return [true,"LegacyOctalEscapeSequence",1];
		}
		x: {
			let len=this.ZeroToThree(str,index);
			if(!len[0]) {break x;}
			len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {break x;}
			len=this.C.numeric_literals.OctalDigit(str,index+2);
			if(len[0]) {break x;}
			return [true,"LegacyOctalEscapeSequence",2];
		}
		x: {
			let len=this.FourToSeven(str,index);
			if(!len[0]) {break x;}
			len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {break x;}
			return [true,"LegacyOctalEscapeSequence",2];
		}
		x: {
			let len=this.ZeroToThree(str,index);
			if(!len[0]) {break x;}
			len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {break x;}
			len=this.C.numeric_literals.OctalDigit(str,index+2);
			if(!len[0]) {break x;}
			return [true,"LegacyOctalEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonZeroOctalDigit(str,index) {
		if(str[index]==="0") {return [false,null,0];}
		let len=this.C.numeric_literals.OctalDigit(str,index);
		if(len[2]>0) {return [true,"NonZeroOctalDigit",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	ZeroToThree(str,index) {
		let cur=str[index];
		let chk="0123";
		if(chk.includes(cur)) {return [true,"ZeroToThree",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	FourToSeven(str,index) {
		let cur=str[index];
		let chk="4567";
		if(chk.includes(cur)) {return [true,"FourToSeven",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonOctalDecimalEscapeSequence(str,index) {
		if(str[index]==="8"||str[index]==="9") {return [true,"NonOctalDecimalEscapeSequence",1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	HexEscapeSequence(str,index) {
		if(str[index]==="x") {
			let len=this.C.numeric_literals.HexDigit(index+1);
			if(!len) {return [false,null,0];}
			len=this.C.numeric_literals.HexDigit(index+2);
			if(!len) {return [false,null,0];}
			return [true,"HexEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-UnicodeEscapeSequence
	/** @arg {number} index @returns {JsLexerReturnType} */
	UnicodeEscapeSequence(index) {
		let off=0;
		if(this.str[index]==="u") {off++;}
		let len0=this.Hex4Digits(index+off);
		if(len0[2]>0) {return [true,"UnicodeEscapeSequence",len0[2]+1];}
		if(this.str[index+off]==="{}"[0]) {
			off++;
			let len=this.C.template_literal_lexical_components.CodePoint(this.str,index+off);
			if(len[2]>0) {
				off+=len[2];
				if(this.str[index+off]==="{}"[1]) {
					off++;
					return [true,"UnicodeEscapeSequence",off];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-Hex4Digits
	/** @arg {number} index @returns {JsLexerReturnType} */
	Hex4Digits(index) {
		let len=this.C.numeric_literals.HexDigit(index);
		if(!len) {return [false,null,0];}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {return [false,null,0];}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {return [false,null,0];}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {return [false,null,0];}
		return [true,"Hex4Digits",4];
	}
}

// https://tc39.es/ecma262/#sec-template-literal-lexical-components
class TemplateLiteralLexicalComponents extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-Template
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	Template(str,index) {
		// NoSubstitutionTemplate
		let ret=this.NoSubstitutionTemplate(str,index);
		if(ret[0]) {return ret;}
		// TemplateHead
		ret=this.TemplateHead(str,index);
		if(ret[0]) {return ret;}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NoSubstitutionTemplate
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NoSubstitutionTemplate(str,index) {
		let cur_index=index;
		//` TemplateCharacters opt `
		if(str[cur_index]==="`") {cur_index++;} else {return [false,null,0];}
		let opt=this.TemplateCharacters(str,cur_index);
		if(!opt[0]) return [false,null,0];
		return [true,"NoSubstitutionTemplate",cur_index-index+opt[2]];
	}
	// https://tc39.es/ecma262/#prod-TemplateHead
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateHead(str,index) {
		let cur_index=index;
		// ` TemplateCharacters_opt ${
		if(str[cur_index]==="`") {
			cur_index++;
			let res=this.TemplateCharacters(str,cur_index);
			if(res[0]===false) throw res[1];
			if(res[2]>0) {cur_index+=res[2];}
			if(str[cur_index]==="$"&&str[cur_index+1]==="{") {return [true,"TemplateHead",cur_index+2];}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateSubstitutionTail
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateSubstitutionTail(str,index) {
		// TemplateMiddle
		let res=this.TemplateMiddle(str,index);
		if(res[0]) {return [true,"TemplateSubstitutionTail",res[2]];}
		// TemplateTail
		res=this.TemplateTail(str,index);
		if(res[0]) {return [true,"TemplateSubstitutionTail",res[2]];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateMiddle
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateMiddle(str,index) {
		let len=0;
		// } TemplateCharacters_opt ${
		if(str[index]==="{}"[1]) {
			len++;
			if(str[index+len]==="$"&&str[index+len+1]==="{}"[0]) {return [true,"TemplateMiddle",len+2];}
			let res=this.TemplateCharacters(str,index);
			if(res[0]) {
				len+=res[2];
				if(str[index+len]==="$"&&str[index+len+1]==="{}"[0]) {return [true,"TemplateMiddle",len+2];}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-TemplateTail
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateCharacters(str,index) {
		let len=0;
		let tmp=this.TemplateCharacter(str,index);
		if(tmp[0]) {len+=tmp[2];}
		while(tmp[2]>0&&index<str.length) {
			tmp=this.TemplateCharacter(str,index+len);
			if(tmp[0]) {len+=tmp[2];} else {break;}
		}
		return [true,"TemplateCharacters",len];
	}
	// https://tc39.es/ecma262/#prod-TemplateCharacter
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateCharacter(str,index) {
		if(str[index]==="$"&&str[index+1]!=="{") {return [true,"TemplateCharacter",1];}
		if(str[index]==="\\") {
			let escape_res=this.TemplateEscapeSequence(str,index);
			if(escape_res[0]) {return [true,"TemplateCharacter",escape_res[2]];}
		}
		if(str[index]==="\\") {
			let not_esc=this.NotEscapeSequence(str,index);
			if(not_esc[2]>0) {return [false,null,0];}
		}
		let res=this.C.string_literals.LineContinuation(str,index);
		if(res[0]) {return [true,"TemplateCharacter",res[2]];}
		res=this.C.line_terminators.LineTerminatorSequence(str,index);
		if(res[0]) {return [true,"TemplateCharacter",res[2]];}
		/* SourceCharacter but not one of ` or \ or $ or LineTerminator */
		if(str[index]==="`"||str[index]==="\\"||str[index]==="$") {return [false,null,0];}
		res=this.C.line_terminators.LineTerminator(str,index);
		if(res[0]) {return [false,null,0];}
		// TODO: SourceCharacter is too complex for js
		//		 It requires handling all of unicode
		return [true,"TemplateCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-TemplateEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	TemplateEscapeSequence(str,index) {
		let len=0;
		/* CharacterEscapeSequence */
		let tmp=this.C.string_literals.CharacterEscapeSequence(str,index);
		if(tmp[0]) {return [true,"TemplateEscapeSequence",tmp[2]];}
		/* 0 [lookahead ∉ DecimalDigit]*/
		if(str[index]==="0") {
			len++;
			let la=this.C.numeric_literals.DecimalDigit(str,index);
			if(!la[0]) {return [true,"TemplateEscapeSequence",len];}
		}
		len=0;
		let res=this.C.string_literals.HexEscapeSequence(str,index);
		if(res[0]) return [true,"TemplateEscapeSequence",res[2]];
		res=this.C.string_literals.UnicodeEscapeSequence(index);
		if(res[0]) return [true,"TemplateEscapeSequence",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NotEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NotEscapeSequence(str,index) {
		if(str[index]==="0") {
			let res=this.C.numeric_literals.DecimalDigit(str,index+1);
			if(res[0]) {return [true,"NotEscapeSequence",res[2]+1];}
		} else {
			let res=this.C.numeric_literals.DecimalDigit(str,index);
			if(res[0]) {return [true,"NotEscapeSequence",res[2]];}
		}
		if(str[index]==="x") {
			let lookahead=this.C.numeric_literals.HexDigit(index+1);
			if(!lookahead[0]) {return [true,"NotEscapeSequence",1];} else {
				lookahead=this.C.numeric_literals.HexDigit(index+1);
				if(!lookahead[0]) {return [true,"NotEscapeSequence",1];}
			}
		}
		if(str[index]!=="u") {return [false,null,0];}
		let res_1,res_2,res_3;
		let len=1;
		let lookahead_res_1=this.C.numeric_literals.HexDigit(index+len);
		if(!lookahead_res_1[0]&&str[index+1]!=="{}"[0]) {return [true,"NotEscapeSequence",1];}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {return [true,"NotEscapeSequence",2];}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		res_2=this.C.numeric_literals.HexDigit(index+len+1);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+3);
		if(res_1[0]&&res_2[0]&&!lookahead_res_1[0]) {return [true,"NotEscapeSequence",3];}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		res_2=this.C.numeric_literals.HexDigit(index+len+1);
		res_3=this.C.numeric_literals.HexDigit(index+len+2);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+3);
		if(res_1[0]&&res_2[0]&&res_3[0]&&!lookahead_res_1[0]) {return [true,"NotEscapeSequence",4];}
		if(str[index+len]!=="{}"[1]) {return [false,null,0];}
		len++;
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len);
		if(!lookahead_res_1[0]) {return [true,"NotEscapeSequence",len];}
		res_1=this.NotCodePoint(str,index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {return [true,"NotEscapeSequence",len];}
		res_1=this.CodePoint(str,index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {return [true,"NotEscapeSequence",len+1];}
		if(lookahead_res_1[0]&&str[index+len+1]!=="{}"[1]) {return [true,"NotEscapeSequence",len+1];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NotCodePoint
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NotCodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF
		let res=this.C.numeric_literals.HexDigits({sep: false},index);
		if(!res[0]) {return [false,null,0];}
		let mv_raw=str.slice(index,index+res[2]);
		// but only if MV of HexDigits ≤ 0x10FFFF
		let MV=parseInt(mv_raw,16);
		if(MV>0x10FFFF) {return [true,"NotCodePoint",res[2]];}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-CodePoint
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	CodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF
		let res=this.C.numeric_literals.HexDigits({sep: false},index);
		if(!res[0]) {return [false,null,0];}
		let mv_raw=str.slice(index,index+res[2]);
		// but only if MV of HexDigits ≤ 0x10FFFF
		let MV=parseInt(mv_raw,16);
		if(MV<=0x10FFFF) {return [true,"CodePoint",res[2]];}
		return [false,null,0];
	}
}

// https://tc39.es/ecma262/#sec-literals-regular-expression-literals
class RegularExpressionLiterals extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-RegularExpressionLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionLiteral(str,index) {
		let len=0;
		// / RegularExpressionBody / RegularExpressionFlags
		if(str[index]==="/") {len++;} else {return [false,null,0];}
		let res=this.RegularExpressionBody(str,index);
		if(!res[0]) return [false,null,0];
		len+=res[2];
		if(str[index+len]==="/") {len++;} else {return [false,null,0];}
		res=this.RegularExpressionFlags(str,index);
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBody
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionChars(str,index) {
		let res=this.RegularExpressionChar(str,index);
		return [true,"RegularExpressionChars",res[2]];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionChar
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionChar(str,index) {
		// RegularExpressionNonTerminator but not one of \ or / or [
		x: {
			if(str[index]==="\\"&&str[index]==="/"||str[index]==="[]"[0]) {break x;}
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionFirstChar(str,index) {
		// RegularExpressionNonTerminator but not one of * or \ or / or [
		x: {
			if(str[index]==="*"||str[index]==="\\"&&str[index]==="/"||str[index]==="[]"[0]) {break x;}
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionClass(str,index) {
		let len=0;
		// [ RegularExpressionClassChars ]
		if(str[index]==="[]"[0]) {
			len++;
			let res=this.RegularExpressionClassChars(str,index+len);
			if(res[0]) {
				if(str[index+res[2]]==="[]"[1]) {
					len++;
					return [true,"RegularExpressionClass",len+res[2]];
				}
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBackslashSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionNonTerminator(str,index) {
		// SourceCharacter but not LineTerminator
		let vv=this.C.line_terminators.LineTerminator(str,index);
		if(vv[0])
			return [false,null,0];
		return [true,"RegularExpressionNonTerminator",1];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChars
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionClassChars(str,index) {
		let len=0;
		let is_class_chars=this.RegularExpressionClassChar(str,index+len);
		// [empty]
		if(!is_class_chars[0])
			return [true,"RegularExpressionClassChars",0];
		while(is_class_chars[0]) {
			len++;
			is_class_chars=this.RegularExpressionClassChar(str,index+len);
			if(!is_class_chars[0]) {break;}
		}
		return [true,"RegularExpressionClassChars",len];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChar
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionClassChar(str,index) {
		// RegularExpressionNonTerminator but not one of ] or \
		if(str[index]==="[]"[1]||str[index]==="\\") {return [false,null,0];}
		let res=this.RegularExpressionNonTerminator(str,index);
		if(res[0])
			return [true,"RegularExpressionClassChar",res[2]];
		res=this.RegularExpressionBackslashSequence(str,index);
		if(res[0])
			return [true,"RegularExpressionClassChar",res[2]];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFlags
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionFlags(str,index) {
		// [empty]
		let len=0;
		let is_class_chars=this.C.names_and_keywords.IdentifierPartChar(str,index+len);
		if(!is_class_chars[0])
			return [true,"RegularExpressionFlags",0];
		throw new Error("TODO");
	}
}


class ecma_root {
	/** @type {string} */
	str;
	/** @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} state @arg {JsLexerReturnType} lex_return @arg {string} type */
	modify_output(state,lex_return,type) {
		if(lex_return[0]&&lex_return[2]>state.length) {
			state.type=type;
			state.item=lex_return[1];
			state.length=lex_return[2];
		}
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseWhiteSpace(in_state,out_state) {
		let res=this.white_space.WhiteSpace(in_state.str,in_state.index);
		this.modify_output(out_state,res,"WhiteSpace");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseLineTerminator(in_state,out_state) {
		let res=this.line_terminators.LineTerminator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"LineTerminator");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseComment(in_state,out_state) {
		let res=this.comments.Comment(in_state.str,in_state.index);
		this.modify_output(out_state,res,"Comment");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseRightBracePunctuator(in_state,out_state) {
		let res=this.punctuators.RightBracePunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RightBracePunctuator");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseDivPunctuator(in_state,out_state) {
		let res=this.punctuators.DivPunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"DivPunctuator");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseCommonToken(in_state,out_state) {
		let res=this.tokens.CommonToken(in_state.str,in_state.index);
		this.modify_output(out_state,res,"CommonToken");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseRegularExpressionLiteral(in_state,out_state) {
		let res=this.RegularExpressionLiterals.RegularExpressionLiteral(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RegularExpressionLiteral");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseTemplateSubstitutionTail(in_state,out_state) {
		let res=this.template_literal_lexical_components.TemplateSubstitutionTail(in_state.str,in_state.index);
		this.modify_output(out_state,res,"TemplateSubstitutionTail");
	}
	/** @arg {import("./support/dbg/JsLexerInputState.js").JsLexerInputState} in_state @arg {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} out_state */
	ParseCommonElements(in_state,out_state) {
		this.ParseWhiteSpace(in_state,out_state);
		this.ParseLineTerminator(in_state,out_state);
		this.ParseComment(in_state,out_state);
		this.ParseCommonToken(in_state,out_state);
	}
	/** @returns {JsLexerReturnType} */
	InputElementDiv() {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator, RightBracePunctuator
		/** @type {import("./support/dbg/JsLexerOutputState.js").JsLexerOutputState} */
		let out_state={
			type: null,
			item: null,
			length: 0,
		};
		this.ParseCommonElements(this,out_state);
		this.ParseDivPunctuator(this,out_state);
		this.ParseRightBracePunctuator(this,out_state);
		if(!out_state.item) {return [false,null,0];}
		return [true,out_state.item,out_state.length];
	}
	/** @returns {JsLexerReturnType} */
	InputElementRegExp() {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RightBracePunctuator, RegularExpressionLiteral
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(this,out_state);
		this.ParseRightBracePunctuator(this,out_state);
		this.ParseRegularExpressionLiteral(this,out_state);
		if(!out_state.item) {return [false,null,0];}
		return [true,out_state.item,out_state.length];
	}
	/** @returns {JsLexerReturnType} */
	InputElementRegExpOrTemplateTail() {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RegularExpressionLiteral, TemplateSubstitutionTail
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(this,out_state);
		this.ParseRegularExpressionLiteral(this,out_state);
		this.ParseTemplateSubstitutionTail(this,out_state);
		if(!out_state.item) {return [false,null,0];}
		return [true,out_state.item,out_state.length];
	}
	/** @returns {JsLexerReturnType} */
	InputElementTemplateTail() {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator, TemplateSubstitutionTail
		let out_state={
			/** @type {string|null} */
			type: null,
			/** @type {string|null} */
			item: null,
			length: 0,
		};
		this.ParseCommonElements(this,out_state);
		this.ParseDivPunctuator(this,out_state);
		this.ParseTemplateSubstitutionTail(this,out_state);
		if(!out_state.item) {return [false,null,0];}
		return [true,out_state.item,out_state.length];
	}
	/** @arg {[true,string,number,number]|[false,symbol,number,number]|null} token_value */
	describe_token(token_value) {
		if(!token_value) return ["undefined"];
		let tok_str=this.str.slice(token_value[3],token_value[3]+token_value[2]);
		return [token_value[1],tok_str];
	}
	/** @arg {JsLexerReturnType} cur @returns {[boolean,string,number,number]|[false,symbol,number,number]|null} */
	as_next_token(cur) {
		if(cur[1]!==null) {
			if(cur[2]===0) {return [cur[0],cur[1],cur[2],this.index];}
			this.index+=cur[2];
			return [cur[0],cur[1],cur[2],this.index];
		}
		if(this.index>(this.str.length-1)) {return [false,js_token_generator.EOF_TOKEN,0,this.index];}
		return null;
	}
	/** @returns {[true,string,number,number]|[false,symbol,number,number]|null} */
	next_token() {
		if(this.index>(this.str.length-1)) {return [false,js_token_generator.EOF_TOKEN,0,this.index];}
		/** @type {[true,string,number,number]} */
		let ret;
		let cur=this.InputElementDiv();
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
	/** @arg {string} source_code @arg {number} start_index */
	constructor(source_code,start_index) {
		this.source_code=source_code;
		this.start_index=start_index;
		this.index=this.start_index;
		this.str=this.source_code;
		this.flags={
			sep: false,
			is_sep() {return this.sep;}
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
		this.len=0;
		/** @type {number[]} */
		this.index_stack=[];
	}
}
class js_token_generator {
	get index() {return this.root.index;}
	set index(value) {this.root.index=value;}
	static EOF_TOKEN=Symbol();
	/** @type {ecma_root} */
	root;
	/** @arg {string} str */
	constructor(str) {this.root=new ecma_root(str,0);}
}
// #endregion
// #region parse_javascript_str
/** @arg {string} code_str */
function parse_javascript_str(code_str) {
	if("code" in window&&typeof window.code==="string") {code_str=window.code;}
	// code_str="function x(){}";
	// code_str="(function(){return function x(){}})()";
	let token_gen=new js_token_generator(code_str);
	let res_item;
	let i=0;
	for(;;i++) {
		res_item=token_gen.root.next_token();
		if(res_item===null) {
			console.log("parse error at ",token_gen.index);
			break;
		}
		let res_description=token_gen.root.describe_token(res_item);
		if(res_description[0]==="WhiteSpace") {i-=1;}
		if(!res_item[0]) {
			if(res_item[1]===js_token_generator.EOF_TOKEN) {console.log("EOF");}
			break;
		}
		console.log(res_description);
	}
	console.log(`parsed ${i} tokens`);
}
export_(exports => {exports.parse_javascript_str=parse_javascript_str;});
// #endregion

var api_debug_enabled=false;
// #region console
const base_console=window.console;
add_object_with_name("Console",base_console);

/** @type {Console} */
var console={...window.console};
console.log=console.log.bind(window.console);
// #endregion

class LoggingEventTarget {dispatchEvent=console.log.bind(console);}
export_(exports => {exports.LoggingEventTarget=LoggingEventTarget;});

class ApiProxyManager {
	/** @arg {LoggingEventTarget} event_handler */
	constructor(event_handler) {this.event_handler=event_handler;}
	/** @template {(...x:any[])=>any} T @arg {string} message_to_send @arg {T} function_value @returns {T} */
	create_proxy_for_function(message_to_send,function_value) {
		let t=this.event_handler;
		/** @arg {[target: T, thisArg: any, argArray: any[]]} post_message_proxy_spread */
		function do_apply(...post_message_proxy_spread) {
			t.dispatchEvent({
				type: message_to_send,
				data: post_message_proxy_spread
			});
			let ret=Reflect.apply(...post_message_proxy_spread);
			return ret;
		}
		return new Proxy(function_value,{apply: do_apply});
	}
	start_postMessage_proxy() {
		if(!api_debug_enabled) return;
		window.postMessage=this.create_proxy_for_function("postMessage_sent",window.postMessage);
	}
	static do_postMessage_logging=true;
	/** @arg {ApiProxyManager} instance */
	static attach_to_api(instance) {
		if(!this.do_postMessage_logging) return;
		instance.start_postMessage_proxy();
	}
}
export_(exports => {
	exports.ApiProxyManager=ApiProxyManager;
	let any_api_logger=new ApiProxyManager(new LoggingEventTarget);
	ApiProxyManager.attach_to_api(any_api_logger);
	exports.any_api_logger=any_api_logger;
});

class ReversePrototypeChain {
	/** @typedef {{__proto__:null,prototypes:destination_index_type[],values:{}[]}} destination_child_type */
	/** @typedef {{__proto__:null,name:string,prototype:{}|null,child:destination_child_type}} destination_index_type */
	/** @arg {{}} base @arg {{}[]} targets */
	constructor(base,targets) {
		this.window_list=[];
		for(let i=0;i<window.length;i++) {this.window_list.push(window[i]);}
		this.base=base;
		this.targets=targets;
		/** @type {{}[]} */
		this.values=[];
		/** @type {{[x: string]: destination_index_type}} */
		this.destination=Object.create(null);
		/** @type {({}|null)[]} */
		this.object_cache=[];
		this.null_cache_key=this.get_cache_key(null);
		this.cache_prototype(this.null_cache_key,null);
	}
	generate() {
		if(!api_debug_enabled) return;
		for(let i=0;i<window.length;i++) {
			if(this.window_list.includes(window[i]))
				continue;
			this.window_list.push(window[i]);
		}
		for(let target of this.targets) {this.process_target(target);}
		if(top===window) {if(api_debug_enabled) console.log(this.destination);}
	}
	/** @arg {{}|null} value */
	get_cache_key(value) {
		if(!this.object_cache.includes(value)) {this.object_cache.push(value);}
		let object_index=this.object_cache.indexOf(value);
		if(!value) {return `a_null::${object_index}`;}
		if(value instanceof Window&&this.window_list.includes(value)) {return "window_id::"+this.window_list.indexOf(value);}
		let key;
		if(Symbol.toStringTag in value) {key=value[Symbol.toStringTag];}
		if(value.hasOwnProperty("constructor")) {
			let constructor_name=value.constructor.name;
			if(key) {return `constructor_key::${constructor_name}:${key}:${object_index}`;} else {return `constructor_key::${constructor_name}:${object_index}`;}
		} else if(key) {return `to_string_tag::${key}:${object_index}`;}
		try {
			if(value.hasOwnProperty("constructor")) {}
		} catch {}
		let index=this.object_cache.indexOf(value);
		if(index<0) {index=this.object_cache.push(value)-1;}
		return "cache_id::"+index;
	}
	/** @arg {string} cache_key @arg {{}|null} prototype */
	cache_prototype(cache_key,prototype) {
		this.destination[cache_key]??={
			__proto__: null,
			name: cache_key,
			prototype,
			child: {
				__proto__: null,
				prototypes: [],
				values: [],
			}
		};
	}
	/** @arg {{}|undefined} prototype @arg {{}|undefined} next_proto @arg {number} index */
	add_one(prototype,next_proto,index) {
		if(!this.list)
			throw new Error("No prototype list");
		if(prototype===void 0)
			return;
		let cache_key=this.get_cache_key(prototype);
		this.cache_prototype(cache_key,prototype);
		x: if(next_proto) {
			let next=this.add_one(next_proto,this.list.at(index-1),index-1);
			if(!next)
				break x;
			let non_null_next=next;
			let idx=this.destination[cache_key].child.prototypes.findIndex(e => e.name===non_null_next.name);
			if(idx<0)
				this.destination[cache_key].child.prototypes.push(next);
		}
		let ret=this.destination[cache_key];
		return ret;
	}
	/** @arg {string} key @arg {{}} value */
	add_prototype_value(key,value) {
		let prototypes=this.destination[key].child.prototypes;
		let index=prototypes.findIndex(e => e.prototype===value);
		if(index>=0)
			return;
		let sub_key=this.get_cache_key(value);
		let dest_value=this.destination[sub_key];
		if(dest_value) {prototypes.push(dest_value);} else {
			/** @type {destination_index_type} */
			let sub_value={
				__proto__: null,
				name: sub_key,
				prototype: value,
				/** @type {destination_child_type} */
				child: {
					__proto__: null,
					prototypes: [],
					values: []
				}
			};
			this.destination[sub_key]=sub_value;
			prototypes.push(sub_value);
		}
	}
	/** @arg {{}} target */
	process_target(target) {
		let proto=target;
		/** @type {{}[]} */
		this.list=[];
		while(proto) {
			this.list.push(proto);
			proto=Object.getPrototypeOf(proto);
		}
		if(this.list.length===0)
			return;
		let final=this.list.at(-1);
		if(final===void 0) throw new Error("Unexpected");
		this.add_prototype_value(this.null_cache_key,final);
		let item_0=this.list.at(-2);
		this.add_one(final,item_0,-2);
		for(let x of this.values) {
			let prototype=Object.getPrototypeOf(x);
			let cache_key=this.get_cache_key(prototype);
			if(!this.destination[cache_key]) {this.cache_prototype(cache_key,prototype);}
			let values=this.destination[cache_key].child.values;
			if(values.includes(x)) {continue;}
			values.push(x);
		}
	}
	/** @arg {{}} target */
	add_target(target) {
		let prototype=Object.getPrototypeOf(target);
		p: {
			if(prototype===null)
				break p;
			if(this.targets.includes(prototype))
				break p;
			this.targets.push(prototype);
		}
		v: {
			if(this.values.includes(target))
				break v;
			this.values.push(target);
		}
	}
}
export_(exports => {
	exports.ReversePrototypeChain=ReversePrototypeChain;
	exports.reversePrototypeChain=new ReversePrototypeChain(Object.prototype,[]);
});

/** @arg {AddEventListenerExtension} obj */
function overwrite_addEventListener(obj) {
	/** @type {import("./support/dbg/arg_list_item_type.js").arg_list_item_type[][]} */
	let arg_list=[];
	let t=obj;
	let prototype=obj.get_target_prototype();
	let target=prototype.addEventListener;
	let new_target=new Proxy(target,{
		/** @arg {[type: string, callback: EventListenerOrEventListenerObject|null, options?: boolean|AddEventListenerOptions|undefined]} argArray */
		apply(target,callback,argArray) {
			/** @type {{}[]} */
			let cq=[callback,argArray.length,...argArray];
			/** @type {import("./support/dbg/arg_list_item_type.js").arg_list_item_type[]} */
			let rq=[];
			cq.forEach(e => {
				switch(typeof e) {
					case "function":
					case "object": {
						if(e===null) {
							rq.push(e);
							return;
						}
						rq.push(new WeakRef(e));
					} break;
					case "string": {
						if(e.length<128) {rq.push(e);} else {rq.push(JSON.stringify(e.slice(0,128-15))+"...(truncated)");}
					} break;
					case "bigint":
					case "boolean":
					case "number":
					case "symbol":
					case "undefined": rq.push(e); break;
				}
			});
			arg_list.push(rq);
			x: if(argArray[0]==="message") {
				let handler=argArray[1];
				if(handler===null) break x;
				if(t.elevated_event_handlers.includes(handler)) {break x;}
				argArray[1]=do_message_handler_overwrite(handler);
			}
			return Reflect.apply(target,callback,argArray);
		}
	});
	prototype.addEventListener=new_target;
	proxyTargetMap.weak_map.set(new_target,target);
	/** @arg {{}} obj @arg {PropertyKey} key @arg {{}} value */
	function define_property_as_value(obj,key,value) {
		Object.defineProperty(obj,key,{
			configurable: true,
			enumerable: true,
			writable: true,
			value: value,
		});
	}
	define_property_as_value(prototype.constructor,"__arg_list_for_add_event_listeners",arg_list);
}

/** @arg {EventListenerOrEventListenerObject} handler */
function do_message_handler_overwrite(handler) {
	/** @this {{}} */
	return function(/** @type {Event} */ event) {
		if(typeof handler==="object") {
			if(handler===null) {throw new Error("invalid handler");}
			handler.handleEvent(event);
			return;
		}
		handler.call(this,event);
	};
}

class ProxyTargetMap {
	constructor() {export_(exports => {exports.proxyTargetMap=this;});}
	weak_map=new WeakMap();
}
export_(exports => {exports.ProxyTargetMap=ProxyTargetMap;});
let proxyTargetMap=new ProxyTargetMap;

/** @type {((arg0: import("./support/dbg/EventListenersT.js").EventListenersT) => void)[]} */
let new_elevated_event_handlers=[];
export_(exports => {exports.new_elevated_event_handlers=new_elevated_event_handlers;});

class AddEventListenerExtension {
	static attach_to_api() {
		export_(exports => {
			exports.AddEventListenerExtension=this;
			exports.addEventListenerExtension=new this;
		});
	}
	/** @private */
	original_prototype={
		addEventListener: EventTarget.prototype.addEventListener,
		dispatchEvent: EventTarget.prototype.dispatchEvent,
		removeEventListener: EventTarget.prototype.removeEventListener,
	};
	/** @private */
	target_prototype=EventTarget.prototype;
	/** @private @type {Window[]} */
	window_list=[window];
	/** @private @type {null|{v:any}} */
	failed_obj=null;
	/** @private @type {WeakRef<{}>[]} */
	object_ids=[];
	/** @private @readonly @type {`__inject_api_${commit_id_sha1}_namespace`} */
	namespace_key=`__inject_api_${commit_id_sha1}_namespace`;
	/** @type {import("./support/dbg/EventListenersT.js").EventListenersT[]} */
	elevated_event_handlers=[];
	/** @private */
	clear_count=0;
	constructor() {
		overwrite_addEventListener(this);
		new_elevated_event_handlers.push(this.elevate_handler.bind(this));
		if(!api_debug_enabled) return;
		this.init_overwrite("addEventListener");
		this.init_overwrite("dispatchEvent");
		this.init_overwrite("removeEventListener");
	}
	get_target_prototype() {return this.target_prototype;}
	/** @arg {import("./support/dbg/EventListenersT.js").EventListenersT} handler */
	elevate_handler(handler) {this.elevated_event_handlers.push(handler);}
	/** @private @arg {unknown[]} real_value @arg {{}} val @arg {number} key @arg {number} index */
	convert_to_namespaced_string(real_value,val,key,index) {
		if(!(this.namespace_key in val))
			throw new Error("Unreachable");
		if(typeof val[this.namespace_key]!=="string") {
			console.log("unable to find namespace (not a string)",val);
			real_value[key]=`weak_id:${index}`;
			return;
		}
		real_value[key]=`weak_id:${val[this.namespace_key]}:${index}`;
		return;
	}
	/** @private @arg {{}} val */
	add_object_id(val) {
		if(!(this.namespace_key in val)) throw new Error("Invalid");
		return this.object_ids.push(new WeakRef(val))-1;
	}
	/** @private @returns {void} @arg {[unknown,number,unknown,...unknown[]]} real_value @arg {number} key @arg {{}|null} val */
	args_iter_on_object(real_value,key,val) {
		if(val===null)
			return;
		if(val===window) {
			real_value[key]="window:"+this.window_list.indexOf(window);
			return;
		}
		if(val instanceof Node) {
			real_value[key]=null;
			return;
		}
		if(val instanceof Document) {
			real_value[key]=null;
			return;
		}
		let is_react_element=false;
		if("__reactContainer$" in val) {is_react_element=true;}
		if("__reactFiber$" in val) {is_react_element=true;}
		if(is_react_element) {
			console.log("react_element",val);
			this.convert_to_id_key(real_value,key,val,"react");
			return;
		} else if(val instanceof IDBDatabase||val instanceof IDBTransaction) {
			// IDBDatabase might have a `closure_lm_${random}` attached on gmail;
			this.convert_to_id_key(real_value,key,val,"idb");
			return;
		} else if("ServiceWorkerContainer" in window&&val instanceof ServiceWorkerContainer) {
			this.convert_to_id_key(real_value,key,val,"ServiceWorkerContainer");
			return;
		}
		real_value[key]="cleared_out:"+this.clear_count++;
		return;
	}
	/** @private @arg {[unknown, unknown, unknown[]]} list */
	add_to_call_list_impl(list) {
		let [target,orig_this,args]=list;
		/** @type {[unknown,number,unknown,...unknown[]]} */
		let real_value=[target,args.length+1,orig_this,...args];
		for(let [key,val] of real_value.entries()) {
			switch(typeof val) {
				case "object": this.args_iter_on_object(real_value,key,val); break;
				case "function": this.args_iter_on_function(real_value,key,val); break;
				default: break;
			}
		}
	}
	/** @private @arg {unknown[]} real_value @arg {number} key @arg {{}|CallableFunction} val @arg {string} namespace */
	convert_to_id_key(real_value,key,val,namespace) {
		/** @arg {{}} obj @arg {PropertyKey} key @arg {{}} value */
		function define_property_as_value(obj,key,value) {
			Object.defineProperty(obj,key,{
				configurable: true,
				enumerable: true,
				writable: true,
				value: value,
			});
		}
		define_property_as_value(val,this.namespace_key,namespace);
		this.convert_to_namespaced_string(real_value,val,key,this.add_object_id(val));
	}
	/** @private @template {CallableFunction} T @arg {unknown[]} real_value @arg {number} key @arg {T} val */
	args_iter_on_function(real_value,key,val) {this.convert_to_id_key(real_value,key,val,"function");}
	/** @private @arg {[any, any, any[]]} list */
	add_to_call_list(list) {
		if(!api_debug_enabled) return;
		if(this.failed_obj) return;
		try {this.add_to_call_list_impl(list);} catch(e) {console.log("err in add to call list",e);}
	}
	/** @private @arg {Extract<keyof EventTarget,string>} target */
	init_overwrite(target) {
		let t=this;
		switch(target) {
			case "addEventListener":
				/** @arg {[string,EventListenerOrEventListenerObject,any?]} args */
				t.target_prototype[target]=function(...args) {
					if(api_debug_enabled) t.add_to_call_list([target,this,args]);
					let original_function=args[1];
					if(!t.elevated_event_handlers.includes(original_function)) {
						/** @arg {[evt: Event]} args */
						args[1]=function(...args) {t.eventFireInterceptor(original_function,this,args);};
					}
					return t.original_prototype.addEventListener.call(this,...args);
				}; break;
			case "removeEventListener": t.target_prototype[target]=function(...args) {
				if(api_debug_enabled) t.add_to_call_list([target,this,args]);
				return t.original_prototype[target].call(this,...args);
			}; break;
			case "dispatchEvent": t.target_prototype[target]=function(...args) {
				if(api_debug_enabled) t.add_to_call_list([target,this,args]);
				return t.original_prototype[target].call(this,...args);
			}; return;
			default: throw new Error("1");
		}
	}
	/** @typedef {EventListenerOrEventListenerObject} InterceptFuncType @typedef {[string, InterceptFuncType, any?]} InterceptThis @arg {InterceptThis[1]} arg_function @arg {InterceptThis} arg_this @arg {[evt: Event]} args @private */
	eventFireInterceptor(arg_function,arg_this,args) {
		if(typeof arg_function==="function") {return arg_function.apply(arg_this,args);} else {return arg_function.handleEvent(...args);}
	}
}
AddEventListenerExtension.attach_to_api();
/** @template CLS_T,CLS_U */
class MappedIterableIterator {
	/** @arg {IterableIterator<CLS_T>} iterator @arg {(arg0:CLS_T)=>CLS_U} mapper */
	constructor(iterator,mapper) {
		/** @template T,U @this {MappedIterableIterator<T,U>} */
		this.next=() => {
			const result=iterator.next();
			if(result.done===true) {
				const {done,value}=result;
				return {done,value: mapper(value)};
			} else if(result.done===false) {
				const {done,value}=result;
				return {done,value: mapper(value)};
			} else {
				const {done,value}=result;
				return {done,value: mapper(value)};
			}
		};
		this[Symbol.iterator]=function() {return this;};
	}
}
/** @template T,U @this {IterableIterator<T>} @arg {(arg0:T)=>U} func @returns {IterableIterator<U>} */
function iterable_iterator_map(func) {
	return new MappedIterableIterator(this,func);
}
MappedIterableIterator.prototype.map=iterable_iterator_map;
class CreateObjURLCache {
	/** @readonly */
	static originalScope={
		createObjectURL: URL.createObjectURL,
		revokeObjectURL: URL.revokeObjectURL,
	};
	/** @type {[(Blob|MediaSource)[], string, boolean][]} */
	static expired=[];
	/** @type {Map<string, [(Blob|MediaSource)[], string, boolean]>} */
	static cache=new Map;
	static enable() {this.update_scope(this.getScope());}
	static disable() {this.update_scope(this.originalScope);}
	/** @arg {CreateObjURLCache.originalScope} scope */
	static update_scope(scope) {
		URL.createObjectURL=scope.createObjectURL;
		URL.revokeObjectURL=scope.revokeObjectURL;
	}
	static getScope() {
		let base=this.originalScope;
		/** @type {CreateObjURLCache.originalScope} */
		let scope={createObjectURL,revokeObjectURL};
		return scope;
		/** @arg {[Blob|MediaSource]} args */
		function createObjectURL(...args) {
			let ret=base.createObjectURL(...args);
			CreateObjURLCache.cache.set(ret,[args,ret,true]);
			return ret;
		}
		/** @arg {[string]} args */
		function revokeObjectURL(...args) {
			let key=args[0];
			let cache_value=CreateObjURLCache.cache.get(key);
			CreateObjURLCache.cache.delete(key);
			if(cache_value) {CreateObjURLCache.expired.push(cache_value);}
			let ret=base.revokeObjectURL(...args);
			return ret;
		}
	}
}
export_(exports => {exports.CreateObjURLCache=CreateObjURLCache;});
CreateObjURLCache.enable();
/** @template T */
class W {
	/** @arg {T} val */
	constructor(val) {this.val=val;}
}
add_function(W);

/** @type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys,values) {
	/** @type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		/** @type {[typeof k, typeof v]} */
		let item=[k,v];
		ret.push(item);
	}
	return ret;
}
export_(exports => {exports.to_tuple_arr=to_tuple_arr;});

/** @arg {any[]} arr @arg {number} index @arg {number} value */
function range_matches(arr,value,index) {
	for(let i=index;i<arr.length;i++) {if(arr[i]!==value) return false;}
	return true;
}


/** @type {string[]} */
let function_as_string_vec=[];
export_(exports => {exports.function_as_string_vec=function_as_string_vec;});


/** @arg {number} id @arg {number[]} arr */
function wasm_encode_section(id,arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [id,arr.length,...arr];
}
add_function(wasm_encode_section);

// Looked at .zz impl for https://github.com/little-core-labs/varint-wasm
/** @arg {number[]} arr */
function wasm_encode_string(arr) {
	let out=[];
	let n=arr.length;
	while((n&~0x7f)!=0) {
		out.push(n&0xff|0x80);
		n>>=7;
	}
	return [...out,n,...arr];
}
add_function(wasm_encode_string);

/** @type {<T>(v:T|null)=>T} */
function not_null(value) {
	if(value===null) throw new Error("Unexpected null");
	return value;
}
add_function(not_null);

/** @template {any[]} T @template U */
class VoidCallback {
	/** @arg {(...arg0:T)=>U} callback @arg {T} params */
	constructor(callback,params) {
		this.m_callback=callback;
		this.m_params=params;
	}
	execute() {this.m_callback(...this.m_params);}
}

let wasm_header=null;
let wasm_global_memory=null;
let wasm_global_memory_view=null;

function run_wasm_plugin() {
	wasm_header=new Uint8Array([0,0x61,0x73,0x6d,1,0,0,0]);

	wasm_global_memory=new WebAssembly.Memory({initial: 1});

	wasm_global_memory_view=new Uint8Array(wasm_global_memory.buffer);

	wasm_global_memory_view.set(wasm_header,0);
}
export_(exports => {exports.run_wasm_plugin=new VoidCallback(run_wasm_plugin,[]);});

/** @arg {(Promise<{}>|{})[]} arr @arg {Promise<{}>|{}} item */
async function remove_awaited(arr,item) {
	let obj_idx=arr.indexOf(item);
	if(obj_idx>-1) {
		arr.splice(obj_idx,1);
		return;
	}
	for(let i=arr.length-1;i>=0;i--) {
		let ready_res=await Promise.race([arr[i],null]);
		if(ready_res===item) {
			arr.splice(i,1);
			return;
		}
	}
	throw new Error("Not found");
}

class DataFetcher {
	timeout_id=-1;
	/** @arg {string} url */
	constructor(url) {
		this.target_url=url;
		this.aborted=false;
	}
	async begin_fetch() {
		let data=await fetch(this.target_url);
		if(!data.body) throw new Error("InvalidResponse: Response has no body");
		this.reader=data.body.getReader();
	}

	async *read_body_generator() {
		let state=this;
		if(!state.reader) throw new Error("InvalidState: reader missing, call `DataFetcher.start` first");
		/** @typedef {ReadableStreamReadResult<Uint8Array>} ReadRes */
		/** @typedef {{type:"init"}|{type:"done"|"read"|"wait_start"|"wait_result"}|{type:"read_result",value:ReadRes}} Res */
		/** @type {(Promise<Res>|Res)[]} */
		let pa=[{type: "init"}];
		for(;pa.length>0;) {
			if(state.aborted) {break;}
			let iter=await Promise.race(pa);
			await remove_awaited(pa,iter);
			if(iter.type==="read_result") {
				let inner=iter.value;
				if(inner.done) {
					pa.push({type: "done"});
					continue;
				}
				let value=inner.value;
				yield {
					type: "read_value",
					value,
				};
				pa.push({type: "read"});
			} else if(iter.type==="wait_result") {pa.push({type: "wait_start"});} else if(iter.type==="wait_start") {
				pa.push(new Promise(function(a) {state.timeout_id=setTimeout(a,30,{type: "wait_result"});}));
			} else if(iter.type==="read") {
				pa.push(state.reader.read().then(e => ({
					type: "read_result",
					value: e
				})));
			} else if(iter.type==="init") {pa.push({type: "wait_start"},{type: "read"});} else if(iter.type==="done") {break;} else {
				console.log("unexpected",iter);
				throw new Error("Unexpected tag type");
			}
		}
		return;
	}
	async read_body() {
		await this.begin_fetch();
		var wasm_return=this.read_body_generator();
		let req=new Uint8Array(0);
		let idx=0;
		for(;;) {
			var cur=await wasm_return.next();
			if(cur.done) {break;}
			let result=cur.value;
			let inner=result.value;
			req=new Uint8Array(idx+inner.length);
			req.set(inner,idx);
			idx+=inner.length;
		}
		return req;
	}
}

async function decode_wasm_data() {
	async function fetch_wasm_module() {
		let fetcher=new DataFetcher("https://raw.githack.com/little-core-labs/varint-wasm/master/varint.wasm");
		return fetcher.read_body();

	}
	let wasm_module_bytes=await fetch_wasm_module();
	console.log(wasm_module_bytes);
}
add_function(decode_wasm_data);
export_(exports => {exports.range_matches=range_matches;});
/** @arg {[unknown, number][]} stats */
function log_stats(stats) {console.log(...stats.sort((a,b) => b[1]-a[1]));}
add_function(log_stats);
class JsonNullBox {
	type="null";
	value=null;
}

class JsonValueBox {
	value;
	/** @arg {JsonNullBox|JsonArrayBox} value */
	constructor(value) {this.value=value;}
}

class JsonArrayBox {
	type="array";
	value;
	/** @arg {JsonValueBox[]} value */
	constructor(value) {this.value=value;}
}

/** @template {{}} T @arg {T} obj_1 @arg {T} obj_2 @returns {boolean} */
function deep_eq(obj_1,obj_2) {
	if(obj_1===obj_2)
		return true;
	if(obj_1 instanceof Array&&obj_2 instanceof Array) {
		if(obj_1.length!==obj_2.length) return false;
		for(let i=0;i<obj_1.length;i++) {
			let cur=obj_1[i];
			let cur_other=obj_2[i];
			if(!deep_eq(cur,cur_other)) {return false;}
		}
		return true;
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2));
		if(is_eq)
			return true;
		return false;
	}
	if(obj_1 instanceof Map&&obj_2 instanceof Map) {return deep_eq([...obj_1.entries()],[...obj_2.entries()]);}
	throw new Error("Fixme");
}
add_function(deep_eq);

class HexRandomDataGenerator {
	constructor() {
		this.random_num=Math.random();
		this.used_bits=0;
		/** @type {{value:number,bit_count:number}|null} */
		this.cur_part={
			value: 0,
			bit_count: 0,
		};
	}
	reset() {
		this.random_num=Math.random();
		this.used_bits=0;
	}
	/** @arg {number} bit_count */
	next(bit_count) {
		let random_size=1<<bit_count;
		let num=~~(this.random_num*random_size);
		this.used_bits+=bit_count;
		this.random_num*=random_size;
		this.random_num-=num;
		return num;
	}
	reset_part() {this.cur_part=null;}
	/** @arg {number} bit_count */
	next_part(bit_count) {
		let cur_num=this.next(bit_count);
		if(this.used_bits>=48) {
			console.log("before_rng_reset",this.random_num);
			this.reset();
		}
		if(this.cur_part) {
			cur_num+=this.cur_part.value*bit_count;
			bit_count+=this.cur_part.bit_count;
			this.cur_part={
				value: cur_num,
				bit_count,
			};
		} else {
			this.cur_part={
				value: cur_num,
				bit_count: bit_count
			};
		}
	}
	complete() {
		if(!this.cur_part) throw new Error("unable to complete");
		return this.cur_part.value;
	}
	next_byte() {
		let size=1<<8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num=this.complete();
		return (size+num).toString(16).slice(1);
	}
}
export_(exports => {exports.HexRandomDataGenerator=HexRandomDataGenerator;});
const random_data_generator=new HexRandomDataGenerator;
export_(exports => {exports.random_data_generator=random_data_generator;});

class EventListenerValue {
	/** @arg {EventListenerOrEventListenerObject|null} callback @arg {boolean|EventListenerOptions} options */
	constructor(callback,options) {
		/** @type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/** @type {boolean|EventListenerOptions} */
		this.options=options;
	}
}
export_(exports => {exports.EventListenerValue=EventListenerValue;});

class GenericEvent {
	#default_prevented=false;
	type="unknown";
	/** @arg {string} type */
	constructor(type) {if(type) {this.type=type;} }
	preventDefault() {this.#default_prevented=true;}
	get defaultPrevented() {return this.#default_prevented;}
}
export_(exports => {exports.GenericEvent=GenericEvent;});

class GenericDataEvent extends GenericEvent {
	/** @arg {string} type @arg {any} data */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
export_(exports => {exports.GenericDataEvent=GenericDataEvent;});

const html_parsing_div_element=document.createElement("div");
/** @arg {string} html */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML=html;
	return Array.prototype.map.call(html_parsing_div_element.textContent,e => e.charCodeAt(0));
}
export_(exports => {exports.parse_html_to_binary_arr=parse_html_to_binary_arr;});

class DebugApi {
	next_remote_id=0;
	data_store=new Map;
	/** @type {DebugApi|null} */
	static m_the=null;
	/** @returns {DebugApi} */
	static the() {
		if(!this.m_the) {this.m_the=new this;}
		return this.m_the;
	}
	/** @arg {string} key @returns {boolean} */
	hasData(key) {return this.data_store.has(key);}
	/** @arg {string} key @returns {any} */
	getData(key) {return this.data_store.get(key);}
	/** @arg {string} key @arg {any} value @returns {this} */
	setData(key,value) {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key @returns {boolean} */
	deleteData(key) {return this.data_store.delete(key);}
	/** @arg {new (...arg0: any[]) => any} class_value @arg {any[]} arg_vec @returns {boolean} */
	activateClass(class_value,arg_vec) {return new class_value(...arg_vec);}
	/** @arg {any} function_value @arg {any} target_obj @arg {any} arg_vec @returns {boolean} */
	activateApply(function_value,target_obj,arg_vec) {return Reflect.apply(function_value,target_obj,arg_vec);}
	/** @argument {Function} function_value @returns {string} */
	stringifyFunction(function_value) {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {function_code=function_code.slice(function_code.indexOf("{}"[0]));} else {console.log(function_code);}
		return function_code;
	}
}
export_(exports => {exports.DebugApi=DebugApi;});
export_(exports => {
	exports.__REACT_DEVTOOLS_GLOBAL_HOOK__={
		isDisabled: false,
		supportsFiber: true,
		/** @type {import("./support/ReactDevtoolsHook.js").ReactDevtoolsHook|null} */
		hook_ref: null,
		/** @arg {import("./support/ReactDevtoolsHook.js").ReactDevtoolsHook} react_devtools_scope */
		inject(react_devtools_scope) {
			this.hook_ref=react_devtools_scope;
		}
	};
},{global: true});
export_(exports => {
	const proxy_map=new Map;
	const proxy_revoke_fn_map=new Map;
	exports.__proxy_map__=proxy_map;
	const proxy_make=window.Proxy;
	const proxy_revocable_make=proxy_make.revocable;
	/** @type {ProxyHandler<ProxyConstructor["revocable"]>} */
	const proxy_revocable_handler={
		apply(...args) {
			/** @type {ReturnType<ProxyConstructor["revocable"]>} */
			let ret=Reflect.apply(...args);
			proxy_revoke_fn_map.set(ret.proxy,ret.revoke);
			proxy_map.set(ret.proxy,args);
			return ret;
		},
		get(obj,key,rx) {
			let ret=Reflect.get(obj,key,rx);
			console.log("Proxy.revocable.",key);
			return ret;
		}
	};
	let proxy_revocable_proxy=new window.Proxy(proxy_revocable_make,new Proxy(proxy_revocable_handler,{
		/** @arg {typeof proxy_revocable_handler} o @arg {keyof typeof proxy_revocable_handler} k */
		get(o,k) {
			if(k in o) return o[k];
			console.log("Proxy.revocable proxy key",o,k);
			return void 0;
		}
	}));
	/** @type {ProxyHandler<ProxyConstructor>} */
	const proxy_construct_handler={
		construct(...args) {
			let ret=Reflect.construct(...args);
			proxy_map.set(ret,args);
			return ret;
		},
		get(obj,key,rx) {
			let ret=Reflect.get(obj,key,rx);
			if(key==="revocable") return proxy_revocable_proxy;
			return ret;
		}
	};
	exports.Proxy=new window.Proxy(proxy_make,new Proxy(proxy_construct_handler,{
		/** @arg {typeof proxy_construct_handler} o @arg {keyof typeof proxy_construct_handler} k */
		get(o,k) {
			if(k in o) return o[k];
			console.log("Proxy proxy key",o,k);
			return void 0;
		}
	}));
},{global: true});
export_(exports => exports.__module_loaded__=true);
if(delete_require) {
	delete window.require;
} else if(reset_require) {
	require=page_require;
}
