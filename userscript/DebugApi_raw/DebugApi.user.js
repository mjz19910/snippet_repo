// ==UserScript==
// @name		DebugApi userscript
// @namespace	https://github.com/mjz19910/
// @version		0.1.2.7
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

// #region Use module
// Use module constants
const DebugApiH_o={
	/** @type {unique symbol} */
	InjectApi: Symbol.for("InjectApi"),
	/** @type {unique symbol} */
	Repeat_0: Symbol.for("Repeat_0"),
};
// Use module types
/** @type {import("./__global.js")} */
// #endregion
// #region InjectApi
/** @readonly */
const InjectApiStr="inject_api";
class InjectApi {
	/** @arg {{name:string}} function_obj */
	add_function(function_obj) {
		if(!this.saved_function_objects) return;
		this.saved_function_objects.push([function_obj.name,function_obj]);
	}
}
let inject_api=new InjectApi;
let z=inject_api;
window.inject_api=inject_api;
// #endregion InjectApi
// #region saved
inject_api.saved_function_objects=[];
inject_api.saved_object_arrays=[];
/** @arg {{}[]} ids_dec */
function add_array(ids_dec) {
	if(!inject_api.saved_object_arrays) return;
	inject_api.saved_object_arrays.push(ids_dec);
}
inject_api.add_array=add_array;

inject_api.saved_instances=[];
/** @arg {string} name @arg {{}} object */
function add_object_with_name(name,object) {
	if(!inject_api.saved_instances) return;
	/** @type {MetaTagForPrototypeOf} */
	const instance_meta={
		/** @type {"meta_for_prototype_of"}*/
		_tag: "meta_for_prototype_of",
		name,
		prototype_meta: Object.getPrototypeOf(object),
	};
	/** @type {SavedInstanceSubType} */
	const instance_obj=[instance_meta,object];
	/** @type {SavedInstanceType} */
	const instance_item=[name,instance_obj];
	inject_api.saved_instances?.push(instance_item);
}
inject_api.add_object_with_name=add_object_with_name;
/** @template {{}} U @template {new (...args: any) => U} T @arg {T} constructor_ @arg {U} object */
function add_object(constructor_,object) {
	if(!inject_api.saved_instances) return;
	const name=constructor_.name;
	/** @type {MetaTagForConstructor} */
	const instance_meta={
		/** @type {"for_constructor"}*/
		_tag: "for_constructor",
		name,
		constructor_meta: constructor_,
	};
	/** @type {SavedInstanceSubType} */
	const instance_obj=[instance_meta,object];
	/** @type {SavedInstanceType} */
	const instance_item=[name,instance_obj];
	inject_api.saved_instances.push(instance_item);
}
z.add_function(add_object);
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
		if(this.m_data===null) {
			return true;
		}
		if(this.m_data.size===0) {
			return true;
		}
		return false;
	}
	/** @arg {K} key @arg {V} value */
	set(key,value) {
		if(!this.m_data) {
			this.m_data=new Map;
		}
		this.m_data.set(key,value);
		return this;
	}
	clear() {
		if(this.m_data) {
			this.m_data.clear();
		}
	}
	/** @arg {K} key */
	get(key) {
		if(!this.m_data) return;
		return this.m_data.get(key);
	}
	/** @arg {K} key */
	has(key) {
		if(!this.m_data) {
			return false;
		}
		return this.m_data.has(key);
	}
	/** @arg {(this: this,arg1: K,arg2: V) => "Break"|"Continue"} callback */
	iterate(callback) {
		// from https://github.com/SerenityOS/serenity/blob/master/Userland/DevTools/Profiler/Profile.cpp
		// on my fs file://home/wsl2/dev/serenity/Userland/DevTools/Profiler/Profile.cpp
		if(!this.m_data)
			return;
		for(let x of this.m_data.entries()) {
			if(callback.apply(this,x)==="Break") {
				break;
			}
		}
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
	/** @arg {JsLexerOutputState} state @arg {JsLexerReturnType} lex_return @arg {string} type */
	modify_output(state,lex_return,type) {
		if(lex_return[0]&&lex_return[2]>state.length) {
			state.type=type;
			state.item=lex_return[1];
			state.length=lex_return[2];
		}
	}
	_str="";
	get str() {
		if(!this.B) {
			return this._str;
		}
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
		if(!this.B) {
			return this._len;
		}
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
		if(base) {
			this._C=base;
		}
	}
}

/** @typedef {[true,string,number,...([]|[{}])]|[false,null,number]} JsLexerReturnType */

// https://tc39.es/ecma262/#sec-white-space
class JSWhiteSpace extends ECMA262Base {
	// https://tc39.es/ecma262/#prod-WhiteSpace
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		if(len>0) {
			return [true,"LineTerminator",1];
		}
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
		if(ml_len[2]>0) {
			return ml_len;
		}
		let sl_len=this.SingleLineComment(str,index);
		if(sl_len[2]>0) {
			return sl_len;
		}
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
				if(offset_2[0]) {
					return [true,"PostAsteriskCommentChars",offset_2[2]+index_offset];
				}
			}
		}
		return [true,"PostAsteriskCommentChars",index_offset];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineNotAsteriskChar(str,index) {
		if(str[index]!=="*") {
			return [true,"MultiLineNotAsteriskChar",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	MultiLineNotForwardSlashOrAsteriskChar(str,index) {
		if(str[index]==="*"||str[index]==="/") {
			return [false,null,0];
		}
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
		if(item===null||!item[0]) {
			return [false,null,0];
		}
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierStart(str,index) {
		if(index>=str.length) {
			return [false,null,0];
		}
		if(str[index]==="\\") {
			let res=this.C.string_literals.UnicodeEscapeSequence(index+1);
			if(res[0]) return [true,"IdentifierStart",res[2]+1];
		}
		if(str[index].match(NamesAndKeywords.id_start_regex)) {
			return [true,"IdentifierStart",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierPart(str,index) {
		if(str[index].match(NamesAndKeywords.id_continue_regex)) {
			return [true,"IdentifierPart",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	IdentifierStartChar(str,index) {
		if(str[index].match(NamesAndKeywords.id_start_regex)) {
			return [true,"IdentifierStartChar",1];
		}
		return [false,null,0];
	}
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
			if(num_len>0) {
				return [false,null,0];
			}
			return [true,"OptionalChainingPunctuator",2];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-OtherPunctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		if(result) {
			return [true,"OtherPunctuator",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-DivPunctuator
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		if(this.str[index]==="_") {
			return [true,"NumericLiteralSeparator",1];
		}
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
			res=this.NumericLiteralSeparator(index+len);
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
		if(str[index]==="n") {
			return [true,"",1];
		}
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
		if(len>0&&str[index+len]===".") {
			console.error("handle numbers like 0.0");
		};
		if(len>max_len) max_len=len;
		len=0;
		return [true,"DecimalLiteral",max_len];
	}
	// https://tc39.es/ecma262/#prod-DecimalIntegerLiteral
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
				[,,res]=this.NumericLiteralSeparator(index+tmp_len);
				if(res>0) {
					tmp_len+=res;
				}
				let prev_sep_flag=this.C.flags.sep;
				this.C.flags.sep=true;
				[,,res]=this.DecimalDigits(str,index+tmp_len);
				this.C.flags.sep=prev_sep_flag;
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
		if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {
			return [true,"DecimalDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NonZeroDigit
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonZeroDigit(str,index) {
		if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {
			return [true,"NonZeroDigit",1];
		}
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
		if(str[index]==="e"||str[index]==="E") {
			return [true,"ExponentIndicator",1];
		}
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
			if(res_peek_digit[0]) {
				res=res_peek_digit;
			} else if(res_sep[0]&&res_sep_peek[0]) {
				res=res_sep;
			} else {
				break;
			}
		}
		if(!res[0]&&this.len==0) {
			return [false,null,0];
		}
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
			if(res_peek_digit[0]) {
				res=res_peek_digit;
			} else {
				break;
			}
		}
		if(!res[0]&&this.len==0) {
			return [false,null,0];
		}
		if(this.len>0) return [true,"BinaryDigits",this.len];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-BinaryDigit
	/** @arg {number} i @returns {JsLexerReturnType} */
	BinaryDigit(i) {
		if(this.str[i]==="0"||this.str[i]==="1") {
			return [true,"BinaryDigit",1];
		}
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
		if(str.charCodeAt(index)>="0".charCodeAt(0)&&str.charCodeAt(index)<="7".charCodeAt(0)) {
			return [true,"OctalDigit",1];
		}
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
				if(num_sep[0]) {
					res=num_sep;
				} else if(res_digit[0]) {
					res=res_digit;
				} else {
					break;
				}
			}
			if(!res[0]&&this.len==0) {
				return [false,null,0];
			}
			if(this.len>0) return [true,"HexDigits",this.len];
			return [false,null,0];
		}
		this.len=0;
		let res=this.HexDigit(i+this.len);
		while(res[0]) {
			this.len++;
			let res_digit=this.HexDigit(i+this.len);
			if(res_digit[0]) {
				res=res_digit;
			} else {
				break;
			}
		}
		if(!res[0]&&this.len==0) {
			return [false,null,0];
		}
		if(this.len>0) return [true,"HexDigits",this.len];
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexDigit
	/** @arg {number} index @returns {JsLexerReturnType} */
	HexDigit(index) {
		let str=this.str;
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
			if(str[index]==="\"") {
				return [false,null,0];
			}
			if(str[index]==="\\") {
				break x;
			}
			let len=this.C.line_terminators.LineTerminator(str,index);
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
		if(!off) {
			return [false,null,0];
		}
		return [true,"SingleStringCharacters",off];
	}
	// https://tc39.es/ecma262/#prod-SingleStringCharacter
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleStringCharacter(str,index) {
		x: {
			if(str[index]==="'") {
				return [false,null,0];
			}
			if(str[index]==="\\") {
				break x;
			}
			let len=this.C.line_terminators.LineTerminator(str,index);
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	LineContinuation(str,index) {
		if(str[index]==="\\") {
			let [,,lt_len]=this.C.line_terminators.LineTerminatorSequence(str,index+1);
			if(lt_len>0) {
				return [true,"LineContinuation",lt_len+1];
			}
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-EscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	EscapeSequence(str,index) {
		let len=this.CharacterEscapeSequence(str,index);
		if(len[2]>0) {
			return len;
		}
		x: {
			if(str[index]==="0") {
				let peek=this.C.numeric_literals.DecimalDigit(str,index);
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
		len=this.UnicodeEscapeSequence(index);
		if(len[2]>0) {
			return len;
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-CharacterEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	SingleEscapeCharacter(str,index) {
		let val=["'","\"","\\","b","f","n","r","t","v"];
		let cur=str[index];
		if(val.includes(cur)) {
			return [true,"SingleEscapeCharacter",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonEscapeCharacter(str,index) {
		if(this.EscapeCharacter(str,index)) {
			return [false,null,0];
		}
		if(this.C.line_terminators.LineTerminator(str,index)) {
			return [false,null,0];
		}
		return [true,"NonEscapeCharacter",1];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	EscapeCharacter(str,index) {
		let len0=this.SingleEscapeCharacter(str,index);
		let len1=this.C.numeric_literals.DecimalDigit(str,index);
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
			let n_len=this.C.numeric_literals.OctalDigit(str,index+1);
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
			len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {
				break x;
			}
			len=this.C.numeric_literals.OctalDigit(str,index+2);
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
			len=this.C.numeric_literals.OctalDigit(str,index+1);
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
			len=this.C.numeric_literals.OctalDigit(str,index+1);
			if(!len[0]) {
				break x;
			}
			len=this.C.numeric_literals.OctalDigit(str,index+2);
			if(!len[0]) {
				break x;
			}
			return [true,"LegacyOctalEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonZeroOctalDigit(str,index) {
		if(str[index]==="0") {
			return [false,null,0];
		}
		let len=this.C.numeric_literals.OctalDigit(str,index);
		if(len[2]>0) {
			return [true,"NonZeroOctalDigit",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	ZeroToThree(str,index) {
		let cur=str[index];
		let chk="0123";
		if(chk.includes(cur)) {
			return [true,"ZeroToThree",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	FourToSeven(str,index) {
		let cur=str[index];
		let chk="4567";
		if(chk.includes(cur)) {
			return [true,"FourToSeven",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NonOctalDecimalEscapeSequence(str,index) {
		if(str[index]==="8"||str[index]==="9") {
			return [true,"NonOctalDecimalEscapeSequence",1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-HexEscapeSequence
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	HexEscapeSequence(str,index) {
		if(str[index]==="x") {
			let len=this.C.numeric_literals.HexDigit(index+1);
			if(!len) {
				return [false,null,0];
			}
			len=this.C.numeric_literals.HexDigit(index+2);
			if(!len) {
				return [false,null,0];
			}
			return [true,"HexEscapeSequence",3];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-UnicodeEscapeSequence
	/** @arg {number} index @returns {JsLexerReturnType} */
	UnicodeEscapeSequence(index) {
		let off=0;
		if(this.str[index]==="u") {
			off++;
		}
		let len0=this.Hex4Digits(index+off);
		if(len0[2]>0) {
			return [true,"UnicodeEscapeSequence",len0[2]+1];
		}
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
		if(!len) {
			return [false,null,0];
		}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {
			return [false,null,0];
		}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {
			return [false,null,0];
		}
		len=this.C.numeric_literals.HexDigit(index);
		if(!len) {
			return [false,null,0];
		}
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
		let res=this.C.string_literals.LineContinuation(str,index);
		if(res[0]) {
			return [true,"TemplateCharacter",res[2]];
		}
		res=this.C.line_terminators.LineTerminatorSequence(str,index);
		if(res[0]) {
			return [true,"TemplateCharacter",res[2]];
		}
		/* SourceCharacter but not one of ` or \ or $ or LineTerminator */
		if(str[index]==="`"||str[index]==="\\"||str[index]==="$") {
			return [false,null,0];
		}
		res=this.C.line_terminators.LineTerminator(str,index);
		if(res[0]) {
			return [false,null,0];
		}
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
		if(tmp[0]) {
			return [true,"TemplateEscapeSequence",tmp[2]];
		}
		/* 0 [lookahead ∉ DecimalDigit]*/
		if(str[index]==="0") {
			len++;
			let la=this.C.numeric_literals.DecimalDigit(str,index);
			if(!la[0]) {
				return [true,"TemplateEscapeSequence",len];
			}
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
			if(res[0]) {
				return [true,"NotEscapeSequence",res[2]+1];
			}
		} else {
			let res=this.C.numeric_literals.DecimalDigit(str,index);
			if(res[0]) {
				return [true,"NotEscapeSequence",res[2]];
			}
		}
		if(str[index]==="x") {
			let lookahead=this.C.numeric_literals.HexDigit(index+1);
			if(!lookahead[0]) {
				return [true,"NotEscapeSequence",1];
			} else {
				lookahead=this.C.numeric_literals.HexDigit(index+1);
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
		let lookahead_res_1=this.C.numeric_literals.HexDigit(index+len);
		if(!lookahead_res_1[0]&&str[index+1]!=="{}"[0]) {
			return [true,"NotEscapeSequence",1];
		}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",2];
		}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		res_2=this.C.numeric_literals.HexDigit(index+len+1);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+3);
		if(res_1[0]&&res_2[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",3];
		}
		res_1=this.C.numeric_literals.HexDigit(index+len);
		res_2=this.C.numeric_literals.HexDigit(index+len+1);
		res_3=this.C.numeric_literals.HexDigit(index+len+2);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+3);
		if(res_1[0]&&res_2[0]&&res_3[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",4];
		}
		if(str[index+len]!=="{}"[1]) {
			return [false,null,0];
		}
		len++;
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len);
		if(!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len];
		}
		res_1=this.NotCodePoint(str,index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len];
		}
		res_1=this.CodePoint(str,index+len);
		lookahead_res_1=this.C.numeric_literals.HexDigit(index+len+1);
		if(res_1[0]&&!lookahead_res_1[0]) {
			return [true,"NotEscapeSequence",len+1];
		}
		if(lookahead_res_1[0]&&str[index+len+1]!=="{}"[1]) {
			return [true,"NotEscapeSequence",len+1];
		}
		return [false,null,0];
	}
	// https://tc39.es/ecma262/#prod-NotCodePoint
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	NotCodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF
		let res=this.C.numeric_literals.HexDigits({sep: false},index);
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	CodePoint(str,index) {
		// HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF
		let res=this.C.numeric_literals.HexDigits({sep: false},index);
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
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
			if(!is_class_chars[0]) {
				break;
			}
		}
		return [true,"RegularExpressionClassChars",len];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChar
	/** @arg {string} str @arg {number} index @returns {JsLexerReturnType} */
	RegularExpressionClassChar(str,index) {
		// RegularExpressionNonTerminator but not one of ] or \
		if(str[index]==="[]"[1]||str[index]==="\\") {
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
	/** @arg {JsLexerOutputState} state @arg {JsLexerReturnType} lex_return @arg {string} type */
	modify_output(state,lex_return,type) {
		if(lex_return[0]&&lex_return[2]>state.length) {
			state.type=type;
			state.item=lex_return[1];
			state.length=lex_return[2];
		}
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseWhiteSpace(in_state,out_state) {
		let res=this.white_space.WhiteSpace(in_state.str,in_state.index);
		this.modify_output(out_state,res,"WhiteSpace");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseLineTerminator(in_state,out_state) {
		let res=this.line_terminators.LineTerminator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"LineTerminator");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseComment(in_state,out_state) {
		let res=this.comments.Comment(in_state.str,in_state.index);
		this.modify_output(out_state,res,"Comment");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseRightBracePunctuator(in_state,out_state) {
		let res=this.punctuators.RightBracePunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RightBracePunctuator");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseDivPunctuator(in_state,out_state) {
		let res=this.punctuators.DivPunctuator(in_state.str,in_state.index);
		this.modify_output(out_state,res,"DivPunctuator");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseCommonToken(in_state,out_state) {
		let res=this.tokens.CommonToken(in_state.str,in_state.index);
		this.modify_output(out_state,res,"CommonToken");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseRegularExpressionLiteral(in_state,out_state) {
		let res=this.RegularExpressionLiterals.RegularExpressionLiteral(in_state.str,in_state.index);
		this.modify_output(out_state,res,"RegularExpressionLiteral");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
	ParseTemplateSubstitutionTail(in_state,out_state) {
		let res=this.template_literal_lexical_components.TemplateSubstitutionTail(in_state.str,in_state.index);
		this.modify_output(out_state,res,"TemplateSubstitutionTail");
	}
	/** @arg {JsLexerInputState} in_state @arg {JsLexerOutputState} out_state */
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
		/** @type {JsLexerOutputState} */
		let out_state={
			type: null,
			item: null,
			length: 0,
		};
		this.ParseCommonElements(this,out_state);
		this.ParseDivPunctuator(this,out_state);
		this.ParseRightBracePunctuator(this,out_state);
		if(!out_state.item) {
			return [false,null,0];
		}
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
		if(!out_state.item) {
			return [false,null,0];
		}
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
		if(!out_state.item) {
			return [false,null,0];
		}
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
		if(!out_state.item) {
			return [false,null,0];
		}
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
		this.len=0;
		/** @type {number[]} */
		this.index_stack=[];
	}
}
class js_token_generator {
	get index() {
		return this.root.index;
	}
	set index(value) {
		this.root.index=value;
	}
	static EOF_TOKEN=Symbol();
	/** @type {ecma_root} */
	root;
	/** @arg {string} str */
	constructor(str) {
		this.root=new ecma_root(str,0);
	}
}
// #endregion
// #region parse_javascript_str
/** @arg {string} code_str */
function parse_javascript_str(code_str) {
	if("code" in window&&typeof window.code==="string") {
		code_str=window.code;
	}
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
}
inject_api.parse_javascript_str=parse_javascript_str;
// #endregion

var api_debug_enabled=false;
// #region console
const base_console=window.console;
add_object_with_name("Console",base_console);

/** @type {Console} */
var console={...window.console};
console.log=console.log.bind(window.console);
// #endregion

class LoggingEventTarget {
	dispatchEvent=console.log.bind(console);
}
inject_api.LoggingEventTarget=LoggingEventTarget;

class ApiProxyManager {
	/** @arg {LoggingEventTarget} event_handler */
	constructor(event_handler) {
		this.event_handler=event_handler;
	}
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
	static attach_to_api() {
		inject_api.ApiProxyManager=this;
		let any_api_logger=new this(new LoggingEventTarget);
		inject_api.any_api_logger=any_api_logger;
		if(!this.do_postMessage_logging) return;
		any_api_logger.start_postMessage_proxy();
	}
}
ApiProxyManager.attach_to_api();

class ReversePrototypeChain {
	/** @typedef {{__proto__:null,prototypes:destination_index_type[],values:{}[]}} destination_child_type */
	/** @typedef {{__proto__:null,name:string,prototype:{}|null,child:destination_child_type}} destination_index_type */
	/** @arg {{}} base @arg {{}[]} targets */
	constructor(base,targets) {
		this.window_list=[];
		for(let i=0;i<window.length;i++) {
			this.window_list.push(window[i]);
		}
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
		for(let target of this.targets) {
			this.process_target(target);
		}
		if(top===window) {
			if(api_debug_enabled) console.log(this.destination);
		}
	}
	/** @arg {{}|null} value */
	get_cache_key(value) {
		if(!this.object_cache.includes(value)) {
			this.object_cache.push(value);
		}
		let object_index=this.object_cache.indexOf(value);
		if(!value) {
			return `a_null::${object_index}`;
		}
		if(value instanceof Window&&this.window_list.includes(value)) {
			return "window_id::"+this.window_list.indexOf(value);
		}
		if(value===inject_api)
			return `self::inject_api:${object_index}`;
		let key;
		if(Symbol.toStringTag in value) {
			key=value[Symbol.toStringTag];
		}
		if(value.hasOwnProperty("constructor")) {
			let constructor_name=value.constructor.name;
			if(key) {
				return `constructor_key::${constructor_name}:${key}:${object_index}`;
			} else {
				return `constructor_key::${constructor_name}:${object_index}`;
			}
		} else if(key) {
			return `to_string_tag::${key}:${object_index}`;
		}
		try {
			if(value.hasOwnProperty("constructor")) {
			}
		} catch {}
		let index=this.object_cache.indexOf(value);
		if(index<0) {
			index=this.object_cache.push(value)-1;
		}
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
		if(dest_value) {
			prototypes.push(dest_value);
		} else {
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
			if(!this.destination[cache_key]) {
				this.cache_prototype(cache_key,prototype);
			}
			let values=this.destination[cache_key].child.values;
			if(values.includes(x)) {
				continue;
			}
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
	static attach_to_api() {
		inject_api.ReversePrototypeChain=this;
		inject_api.reversePrototypeChain=new this(Object.prototype,[]);
	}
}
ReversePrototypeChain.attach_to_api();
/** @arg {AddEventListenerExtension} obj */
function overwrite_addEventListener(obj) {
	/** @type {arg_list_item_type[][]} */
	let arg_list=[];
	let t=obj;
	let prototype=obj.get_target_prototype();
	let target=prototype.addEventListener;
	let new_target=new Proxy(target,{
		/** @arg {[type: string, callback: EventListenerOrEventListenerObject|null, options?: boolean|AddEventListenerOptions|undefined]} argArray */
		apply(target,callback,argArray) {
			/** @type {{}[]} */
			let cq=[callback,argArray.length,...argArray];
			/** @type {arg_list_item_type[]} */
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
						if(e.length<128) {
							rq.push(e);
						} else {
							rq.push(JSON.stringify(e.slice(0,128-15))+"...(truncated)");
						}
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
				if(t.elevated_event_handlers.includes(handler)) {
					break x;
				}
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
			if(handler===null) {
				throw new Error("invalid handler");
			}
			handler.handleEvent(event);
			return;
		}
		if(event instanceof MessageEvent) {
			/** @type {unknown} */
			let d=event.data;
			if(typeof d==="object"&&d!==null&&"type" in d) {
				if(d.type===post_message_connect_message_type) {
					if(api_debug_enabled) console.log("skip page event handler for "+d.type);
					return;
				}
			}
		}
		handler.call(this,event);
	};
}

class ProxyTargetMap {
	constructor() {
		inject_api.proxyTargetMap=this;
	}
	weak_map=new WeakMap();
}
inject_api.ProxyTargetMap=ProxyTargetMap;
let proxyTargetMap=new ProxyTargetMap;

/** @type {((arg0: EventListenersT) => void)[]} */
let new_elevated_event_handlers=[];
inject_api.elevate_event_handlers=new_elevated_event_handlers;

/** @arg {EventListenersT} event_handler */
function elevate_event_handler(event_handler) {
	if(!inject_api.addEventListenerExtension) return;
	inject_api.addEventListenerExtension.elevate_handler(event_handler);
}

class AddEventListenerExtension {
	static attach_to_api() {
		inject_api.AddEventListenerExtension=this;
		inject_api.addEventListenerExtension=new this;
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
	/** @private @readonly @type {`__${typeof InjectApiStr}_${commit_id_sha1}_namespace`} */
	namespace_key=`__${InjectApiStr}_${commit_id_sha1}_namespace`;
	/** @type {EventListenersT[]} */
	elevated_event_handlers=[];
	/** @private */
	clear_count=0;
	/** @private @type {WeakRef<WeakRef<Node>[]>} */
	node_list=new WeakRef([]);
	/** @private @type {WeakRef<WeakRef<{value:number}>[]>} */
	node_list_ids=new WeakRef([]);
	/** @private */
	node_id_max=0;
	constructor() {
		overwrite_addEventListener(this);
		new_elevated_event_handlers.push(this.elevate_handler.bind(this));
		if(!api_debug_enabled) return;
		this.init_overwrite("addEventListener");
		this.init_overwrite("dispatchEvent");
		this.init_overwrite("removeEventListener");
	}
	get_target_prototype() {
		return this.target_prototype;
	}
	/** @arg {EventListenersT} handler */
	elevate_handler(handler) {
		this.elevated_event_handlers.push(handler);
	}
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
		if(val instanceof Socket) {
			this.convert_to_id_key(real_value,key,val,"Socket:client_"+val.client_id());
			return;
		}
		if(val instanceof ListenSocket) {
			this.convert_to_id_key(real_value,key,val,"ListenSocket:client_"+val.client_id);
			return;
		}
		if(val===window) {
			real_value[key]="window:"+this.window_list.indexOf(window);
			return;
		}
		if(val instanceof Node) {
			real_value[key]=this.generate_node_id(val);
			return;
		}
		if(val instanceof Document) {
			real_value[key]=this.generate_node_id(val);
			return;
		}
		let is_react_element=false;
		if("__reactContainer$" in val) {
			is_react_element=true;
		}
		if("__reactFiber$" in val) {
			is_react_element=true;
		}
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
	args_iter_on_function(real_value,key,val) {
		this.convert_to_id_key(real_value,key,val,"function");
	}
	/** @private @arg {[any, any, any[]]} list */
	add_to_call_list(list) {
		if(!api_debug_enabled) return;
		if(this.failed_obj) return;
		try {
			this.add_to_call_list_impl(list);
		} catch(e) {
			console.log("err in add to call list",e);
		}
	}
	/** @private @arg {Node} val */
	generate_node_id(val) {
		if(val.__id_holder) {
			return val.__id_holder.value;
		}
		let list=this.node_list.deref();
		if(!list) {
			list=[];
		}
		let ids=this.node_list_ids.deref();
		if(!ids) {
			ids=[];
		}
		list.push(new WeakRef(val));
		let node_id=this.node_id_max++;
		let id_holder={value: node_id};
		val.__id_holder=id_holder;
		ids.push(new WeakRef(id_holder));
		this.node_list=new WeakRef(list);
		return node_id;
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
						args[1]=function(...args) {
							t.eventFireInterceptor(original_function,this,args);
						};
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
		if(args[0] instanceof MessageEvent) {
			/** @type {MessageEvent<unknown>} */
			let msg_event=args[0];
			let d=msg_event.data;
			if(typeof d==="object"&&d!==null&&"type" in d) {
				if(d.type===post_message_connect_message_type) {
					if(api_debug_enabled) console.log("skip page event handler for "+d.type);
					return;
				}
			}
		}
		if(typeof arg_function==="function") {
			return arg_function.apply(arg_this,args);
		} else {
			return arg_function.handleEvent(...args);
		}
	}
}
AddEventListenerExtension.attach_to_api();

class IterExtensions {
	static attach_to_api() {
		inject_api.IterExtensions=this;
	}
	static init() {
		let map=new Map;
		let val_iter=map.values();
		let proto=Object.getPrototypeOf(val_iter);
		proto.map=function(/** @type {(arg0: any) => any} */ func) {
			return {
				b: this,
				next() {
					let iter=this.b.next();
					if(iter.done) return iter;
					iter.value=func(iter.value);
					return iter;
				},
				[Symbol.iterator]() {
					return this;
				}
			};
		};
	}
}
IterExtensions.attach_to_api();

/** @arg {boolean} include_uninteresting */
function getPlaybackRateMap(include_uninteresting) {
	let progress_map=new Map;
	if(include_uninteresting) {
		let elem_list=document.querySelectorAll("ytd-compact-video-renderer:has(#overlays:not(* > #progress))");
		elem_list.length>0&&progress_map.set("none",[...elem_list]);
	}
	let sel=(/** @type {string}*/e) => `ytd-compact-video-renderer:has(#progress[style="width: ${e}%;"])`;
	for(let i=0;i<=100;i++) {
		if(!include_uninteresting&&i===100) continue;
		let elem=document.querySelectorAll(sel(i.toString()));
		if(elem.length==1) {
			progress_map.set("some:"+i,[...elem]);
		} else if(elem.length>0) {
			progress_map.set("some:"+i,[...elem]);
		}
	}; return progress_map;
};
inject_api.getPlaybackRateMap=getPlaybackRateMap;

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
	static enable() {
		this.update_scope(this.getScope());
	}
	static disable() {
		this.update_scope(this.originalScope);
	}
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
			if(cache_value) {
				CreateObjURLCache.expired.push(cache_value);
			}
			let ret=base.revokeObjectURL(...args);
			return ret;
		}
	}
}
inject_api.CreateObjURLCache=CreateObjURLCache;
CreateObjURLCache.enable();

/** @template T @implements {Repeat_0<T>} */
class RepeatImpl_0 {
	/** @type {Map<string,Map<number,Repeat_0<string>>>} */
	static map=new Map;
	/** @type {Map<number,Map<number,Repeat_0<number>>>} */
	static map_num=new Map;
	/** @arg {string} value @arg {number} times */
	static get(value,times) {
		if(!this.map.has(value)) {
			this.map.set(value,new Map);
		}
		let tm_map=this.map.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/** @arg {number} value @arg {number} times */
	static get_num(value,times) {
		if(!this.map_num.has(value)) {
			this.map_num.set(value,new Map);
		}
		let tm_map=this.map_num.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/** @type {T} */
	value;
	/** @type {number} */
	times;
	/** @arg {T} value @arg {number} times */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}

inject_api.Repeat=RepeatImpl_0;
class CompressRepeated {
	/** @template T @arg {T[]} src @arg {(T|RepeatImpl_0<T>)[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {(T|RepeatImpl_0<T>)[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @arg {string[]} src @arg {(string|RepeatImpl_0<string>)[]} dst @returns {[boolean, (string|RepeatImpl_0<string>)[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @arg {(string|RepeatImpl_0<string>)[]} src @arg {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
	/** @arg {string|any[]} arr */
	static can_compress_items(arr) {
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(typeof item!=="string") return false;
			if(item.match(/[a-zA-Z]/)===null) return false;
		}
		return true;
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		/** @type {(string|RepeatImpl_0<string>)[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length&&item===arr[i+1]) {
				let off=0;
				while(item===arr[i+off+1]) off++;
				if(off>0) {
					let rep_count=off+1;
					ret.push(RepeatImpl_0.get(item,rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/** @arg {(string|RepeatImpl_0<string>)[]} arr */
	try_decompress(arr) {
		/** @type {string[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item) continue;
			if(item instanceof RepeatImpl_0) {
				let {value,times}=item;
				for(let j=0;j<times;j++)ret.push(value);
				continue;
			}
			ret.push(item);
		}
		return this.decompress_result(arr,ret);
	}
	/** @arg {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		{
			let [success,res]=this.try_compress(arr);
			this.try_decompress(res);
			if(success) return res;
		}
		return arr;
	}
}
inject_api.CompressRepeated=CompressRepeated;

/** @template T */
class W {
	/** @arg {T} val */
	constructor(val) {
		this.val=val;
	}
}
z.add_function(W);

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
inject_api.to_tuple_arr=to_tuple_arr;

/** @arg {any[]} arr @arg {number} index @arg {number} value */
function range_matches(arr,value,index) {
	for(let i=index;i<arr.length;i++) {
		if(arr[i]!==value) return false;
	}
	return true;
}

class BaseCompression {
	/** @arg {CompressDual} arg0 @returns {DualR_0} */
	compress_result_state_dual(arg0) {
		return this.compress_result_dual(arg0.arr,arg0.ret);
	}
	/** @arg {AltPair<string,number>[]} src @arg {AnyOrRepeat2_0<string, number>[]} dst @returns {DualR_0} */
	compress_result_dual(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @template T,U @arg {CompressStateBase<T, U>} state */
	compress_result_state(state) {
		return this.compress_result(state.arr,state.ret);
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]]|[false, T[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src,dst) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
}

/** @template T @template U */
class CompressStateBase {
	/** @type {number} */
	i;
	/** @type {T[]} */
	arr;
	/** @type {U[]} */
	ret;
	/** @arg {number} i @arg {T[]} arr @arg {U[]} ret */
	constructor(i,arr,ret) {
		this.i=i;
		this.arr=arr;
		this.ret=ret;
	}
}

/** @template T @template U @extends {CompressStateBase<T,U>} */
class CompressState extends CompressStateBase {
	/** @type {T|null} */
	item;
	/** @arg {T[]} arr */
	constructor(arr) {
		super(0,arr,[]);
		this.item=null;
	}
}

class MulCompression extends BaseCompression {
	/** @arg {{i:number,arr:string[],ret:string[]}} state @arg {string} item */
	compress_rle(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(`${item}${off}`);
		state.i+=off-1;
		return true;
	}
	/** @arg {{i:number,arr:number[],ret:(number|RepeatImpl_0<number>)[]}} state @arg {number} item */
	compress_rle_number(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(new RepeatImpl_0(item,off));
		state.i+=off-1;
		return true;
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		/** @type {CompressState<string, string>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.compress_result_state(state);
	}
	/** @arg {number[]} arr */
	try_compress_number(arr) {
		/** @type {CompressState<number, number>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_number(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.compress_result_state(state);
	}
	/** @arg {string[]} arr @returns {[res: boolean,dst: string[]]} */
	try_decompress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				let [item_type,num_data]=[item[0],item.slice(1)];
				let parsed=parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j=0;j<parsed;j++) ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	/** @arg {string[]} arr @returns {string[]} */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		for(let i=0;i<4;i++) {
			stats_calculator_info.stats_calculator.calc_for_stats_index(stats_calculator_info.compression_stats,arr,i);
			let ls=stats_calculator_info.compression_stats[i];
			if(ls.length>0) continue;
			break;
		}
		let res_1=this.try_compress(arr);
		if(res_1[0]) return res_1[1];
		return arr;
	}
}

/** @typedef {typeof DisabledMulCompression} DisabledMulCompressionT */
class DisabledMulCompression extends MulCompression {
	/** @template T @arg {T[]} arr @returns {[true, AnyOrRepeat_0<T>[]]|[false,T[]]} */
	try_compress_T(arr) {
		/** @type {CompressState<T,AnyOrRepeat_0<T>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.compress_result_state(state);
	}
	/** @template {RecordKey<symbol>} U @template {InstanceType<U>} T @arg {CompressState<T, AnyOrRepeat_0<T>>} state @arg {T} item */
	compress_rle_T_X(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(new RepeatImpl_0(item,off));
		state.i+=off-1;
		return true;
	}
	/** @template {InstanceType<U>} T @template {new (...args: any) => any} U @arg {U} _ @arg {T[]} arr @arg {AnyOrRepeat_0<T>[]} ret @returns {[true, AnyOrRepeat_0<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(this.did_compress(arr,ret)) return [true,ret];
		return [false,arr];
	}
}
inject_api.DisabledMulCompression=DisabledMulCompression;
/** @type {HTMLIFrameElement|null} */
let cached_iframe=null;
/** @type {string[]} */
let function_as_string_vec=[];
inject_api.function_as_string_vec=function_as_string_vec

function resolve_function_constructor() {
	if(globalThis.Node===void 0) {
		throw new Error("Javascript Runtime without DOM not supported (node js)");
	}
	if(!cached_iframe) {
		let iframe_element=document.createElement("iframe");
		document.head.append(iframe_element);
		cached_iframe=iframe_element;
	}

	if(!cached_iframe.contentWindow) throw new Error("No content window");

	let content_window_r=cached_iframe.contentWindow;
	let content_window=content_window_r.self;

	return content_window.Function;
}

/** @arg {number} id @arg {number[]} arr */
function wasm_encode_section(id,arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [id,arr.length,...arr];
}
z.add_function(wasm_encode_section);

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
z.add_function(wasm_encode_string);

/** @type {<T>(v:T|null)=>T} */
function not_null(value) {
	if(value===null) throw new Error("Unexpected null");
	return value;
}
z.add_function(not_null);

/** @template {any[]} T @template U */
class VoidCallback {
	/** @arg {(...arg0:T)=>U} callback @arg {T} params */
	constructor(callback,params) {
		this.m_callback=callback;
		this.m_params=params;
	}
	execute() {
		this.m_callback(...this.m_params);
	}
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
inject_api.run_wasm_plugin=new VoidCallback(run_wasm_plugin,[]);

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
		let pa=[{
			type: "init"
		}];
		for(;pa.length>0;) {
			if(state.aborted) {
				break;
			}
			let iter=await Promise.race(pa);
			await remove_awaited(pa,iter);
			if(iter.type==="read_result") {
				let inner=iter.value;
				if(inner.done) {
					pa.push({
						type: "done"
					});
					continue;
				}
				let value=inner.value;
				yield {
					type: "read_value",
					value,
				};
				pa.push({
					type: "read"
				});
			} else if(iter.type==="wait_result") {
				pa.push({
					type: "wait_start"
				});
			} else if(iter.type==="wait_start") {
				pa.push(new Promise(function(a) {
					state.timeout_id=setTimeout(a,30,{
						type: "wait_result"
					});
				}));
			} else if(iter.type==="read") {
				pa.push(state.reader.read().then(e => ({
					type: "read_result",
					value: e
				})));
			} else if(iter.type==="init") {
				pa.push({
					type: "wait_start"
				},{
					type: "read"
				});
			} else if(iter.type==="done") {
				break;
			} else {
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
			if(cur.done) {
				break;
			}
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
z.add_function(decode_wasm_data);

/** @arg {SafeFunctionPrototype} safe_function_prototype */
function gen_function_prototype_use(safe_function_prototype) {
	/** @type {["apply","bind","call"]}*/
	let keys=["apply","bind","call"];
	let apply_=safe_function_prototype[keys[0]];
	let bind_=safe_function_prototype[keys[1]];
	let call_=safe_function_prototype[keys[2]];
	/** @type {[typeof apply_,typeof bind_,typeof call_]}*/
	let funcs=[apply_,bind_,call_];

	let bound_bind=apply_.bind(bind_);
	let bound_call=apply_.bind(call_);
	let bound_apply=apply_.bind(apply_);

	/** @type {[typeof bound_apply,typeof bound_bind,typeof bound_call]}*/
	let bound_funcs=[
		bound_apply,
		bound_call,
		bound_apply,
	];
	return {funcs,bound_funcs};
}

function run_modules_plugin() {
	if(!inject_api.function_as_string_vec) throw 1;
	let function_prototype=resolve_function_constructor().prototype;

	let function_prototype_call=function_prototype.call;
	let function_prototype_apply=function_prototype.apply;
	let function_prototype_bind=function_prototype.bind;

	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_call=function_prototype_call.bind(function_prototype_call);
	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_apply=function_prototype_call.bind(function_prototype_apply);
	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_bind=function_prototype_call.bind(function_prototype_bind);

	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_call=function_prototype_bind.bind(function_prototype_call);
	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_apply=function_prototype_bind.bind(function_prototype_apply);
	/** @type {(thisArg:Function, bindThisArg:any, ...argArray:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_bind=function_prototype_bind.bind(function_prototype_bind);

	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_apply_call=function_prototype_apply.bind(function_prototype_call);
	/** @type {(thisArg:Function, applyArgs:[thisArg:any, argArray?:any])=>any} */
	let bound_apply_apply=function_prototype_apply.bind(function_prototype_apply);
	/** @type {(thisArg:Function, applyArgs:[thisArg:any, ...bindArgs:any[]])=>(...args:any[])=>any}*/
	let bound_apply_bind=function_prototype_apply.bind(function_prototype_bind);

	let safe_function_prototype={
		apply: function_prototype.apply,
		bind: function_prototype.bind,
		call: function_prototype.call,
	};
	console.log(safe_function_prototype);

	let info=gen_function_prototype_use(safe_function_prototype);
	console.log(info);

	let bound_function_prototype_vec=[
		[function_prototype_call,function_prototype_call,bound_call_call],
		[function_prototype_call,function_prototype_apply,bound_call_apply],
		[function_prototype_call,function_prototype_bind,bound_call_bind],
		[function_prototype_apply,function_prototype_call,bound_apply_call],
		[function_prototype_apply,function_prototype_apply,bound_apply_apply],
		[function_prototype_apply,function_prototype_bind,bound_apply_bind],
		[function_prototype_bind,function_prototype_call,bound_bind_call],
		[function_prototype_bind,function_prototype_apply,bound_bind_apply],
		[function_prototype_bind,function_prototype_bind,bound_bind_bind],
	];
	console.log(bound_function_prototype_vec);
	Function.prototype.call=function_prototype_call_inject;
	/** @this {Function} @arg {any} thisArg @arg {any[]} argArray */
	function function_prototype_call_inject(thisArg,...argArray) {
		if(!inject_api.function_as_string_vec) throw 1;
		let ret=bound_apply_call(this,[thisArg,...argArray]);
		if(inject_api.function_as_string_vec.indexOf(this.toString())==-1) {
			inject_api.function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	/** @this {()=>void} @arg {any} tv @arg {any} r */
	function function_prototype_apply_inject(tv,r) {
		if(!inject_api.function_as_string_vec) throw 1;
		if(r===void 0||r===null) r=[];
		let ret=bound_apply_call(this,[tv,...r]);
		if(inject_api.function_as_string_vec.indexOf(this.toString())==-1) {
			inject_api.function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	Function.prototype.apply=function_prototype_apply_inject;
}
inject_api.run_modules_plugin=new VoidCallback(run_modules_plugin,[]);

class CompressionStatsCalculator {
	constructor() {
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
		/** @type {MulCompression} */
		this.compressor=new MulCompression;
	}
	/** @arg {[string, number][][]} stats_arr @arg {string[]} arr @arg {number} index */
	calc_for_stats_index(stats_arr,arr,index) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
	/** @arg {number} index */
	add_hit(index) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index]=1;
		} else this.hit_counts[index]++;
	}
	/** @arg {string} key */
	add_item(key) {
		let index=this.cache.indexOf(key);
		if(index==-1) {
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset() {
		this.cache.length=0;
		this.hit_counts.length=0;
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	/** @arg {string[]} arr @arg {number} win_size */
	calc_compression_stats(arr,win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		let keys=this.map_keys();
		let values=this.map_values();
		return to_tuple_arr(keys,values);
	}
	/** @template T @template U @arg {T[]} arr @arg {number} range @arg {U} replacement @returns {(["T", T]|["U", U])[]} */
	replace_range(arr,range,replacement) {
		/** @type {(["T", T]|["U", U])[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			if(range_matches(arr,range,i)) {
				i+=1;
				ret.push(["U",replacement]);
				continue;
			}
			let rest=arr[i];
			ret.push(["T",rest]);
		}
		return ret;
	}
	test() {
		let obj={
			arr: [],
		};
		let rep_val=0.03/(100*4*1);
		let res=this.replace_range(obj.arr,rep_val,max_id);
		console.log("compressed",res);
	}
}
inject_api.CompressionStatsCalculator=CompressionStatsCalculator;

let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/** @type {[string, number][][]} */
	compression_stats: [],
};

inject_api.range_matches=range_matches;
let compressionStatsCalc=stats_calculator_info.stats_calculator;
/** @arg {[unknown, number][]} stats */
function log_stats(stats) {
	console.log(...stats.sort((a,b) => b[1]-a[1]));
}
z.add_function(log_stats);
/** @arg {string[]} arr @arg {number} calc_win */
function sorted_comp_stats(arr,calc_win) {
	let ret=compressionStatsCalc.calc_compression_stats(arr,calc_win);
	ret.sort((a,b) => b[1]-a[1]);
	return ret;
}
/** @arg {any[]} arr @arg {number} start */
function next_chunk(arr,start) {
	let s_arr=null;
	let last;
	let c_len;
	for(let i=start;i<start+30;i++) {
		if(s_arr) {
			last=s_arr[0][1];
		}
		s_arr=sorted_comp_stats(arr,i);
		if(!last)
			continue;
		let diff=last-s_arr[0][1];
		if(diff===0)
			continue;
		if(diff===1) {
			c_len=i;
			break;
		}
		console.log(s_arr[0],...s_arr.slice(0,8).map(e => e[1]));
	}
	return c_len;
}
z.add_function(next_chunk);
/** @type {{value:string[]}} */
let ids={value: []};
/** @arg {string} value */
function get_ids(value) {
	return ids.value.indexOf(value);
}

/** @arg {CompressionStatsCalculator} this_ @arg {IDValueImpl_0} obj */
function sorted_comp_stats(this_,obj) {
	if(obj.arr_str!=null&&obj.stats_win!=null) {
		/** @type {[string,number][]} */
		let ret=[];
		let types=this_.calc_compression_stats(obj.arr_str,obj.stats_win);
		let t=types[0];
		if(!t) return;
		let [z,x]=t;
		if(typeof z==="string"&&typeof x==="number") {
			ret.push([z,x]);
		}
		obj.stats=ret;
		obj.stats.sort((a,b) => b[1]-a[1]);
	}
}

/** @arg {CompressionStatsCalculator} stats @arg {IDValueImpl_0} obj */
function calc_cur(stats,obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	sorted_comp_stats(stats,obj);
}

class IDValueImpl {
	/** @arg {number} id @arg {IDValueImpl_0|null} next */
	constructor(id,next) {
		this.id=id;
		this.next=next;
		/** @type {AltPair<string, number>[]} */
		this.arr_dual=[];
		/** @type {AnyOrRepeat2_0<string,number>[]} */
		this.arr_dual_compressed=[];
		/** @type {AnyOrRepeat_0<number>[]} */
		this.arr_rep_num=[];
		/** @type {string[]} */
		this.arr_str=[];
		/** @type {number[]} */
		this.arr_num=[];
		/** @type {[number,"=",number]|null} */
		this.value=null;
		/** @type {number[]} */
		this.arr_rep=[];
		/** @type {[number,"=",string,number]|null} */
		this.log_val=null;
		/** @type {[string, number][]} */
		this.stats=[];
		this.stats_win=0;
	}
}
z.add_function(IDValueImpl);

/** @arg {IDValueImpl_0} next */
function get_next({next}) {
	if(next===null)
		throw new Error("Unexpected type");
	return next;
}

/** @implements {IDValue_0} */
class IDValueImpl_0 {
	/** @template {{}} T @arg {T[]} arr */
	set_arr_T(arr) {
		if(arr.length===0)
			throw new Error("Unable to use zero length array");
		let item=arr[0];
		console.log("new_proto_keys",Object.keys(item));
		console.log("new_proto",Object.getPrototypeOf(item));
	}
	/** @type {number} */
	id;
	/** @type {IDValueImpl_0|null} */
	next;
	/** @type {AltPair<string,number>[]} */
	arr_dual;
	/** @type {AltPair<AnyOrRepeat_0<string>,AnyOrRepeat_0<number>>[]} */
	arr_dual_x;
	/** @type {AnyOrRepeat_0<string>[]} */
	arr_rep_str;
	/** @type {AnyOrRepeat_0<number>[]} */
	arr_rep_num;
	/** @type {string[]} */
	arr_str;
	/** @type {number[]} */
	arr_num;
	/** @type {AnyOrRepeat2_0<string,number>[]} */
	arr_dual_compressed;
	/** @type {[number,"=",number]|null} */
	value;
	/** @type {number[]} */
	arr_rep;
	/** @type {[number,"=",string,number]|null} */
	log_val;
	/** @type {[string,number][]} */
	stats;
	stats_win=0;
	/** @arg {number} id @arg {IDValueImpl_0|null} next */
	constructor(id,next) {
		this.id=id;
		this.next=next;
		this.arr_dual=[];
		this.arr_dual_x=[];
		this.arr_rep_str=[];
		this.arr_rep_num=[];
		this.arr_str=[];
		this.arr_num=[];
		this.arr_dual_compressed=[];
		this.value=null;
		this.arr_rep=[];
		this.log_val=null;
		this.stats=[];
	}
}

class DoCalc {
	get_result() {
		return this.m_return_value;
	}
	/** @type {DualR_0|null} */
	m_return_value=null;
	run() {
		this.obj.stats_win=2;
		calc_cur(this.stats,this.obj);
		if(!this.obj.stats) {
			return null;
		}
		if(this.obj.stats.length===0) {
			return null;
		}
		max_id.value++;
		this.br_obj=Object.assign({},this.obj);
		if(!this.br_obj.stats_win) {
			return null;
		}
		this.br_obj.stats_win++;
		calc_cur(this.stats,this.br_obj);
		this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
		console.log("br_res",this.br_res);
		this.m_return_value=calc_next(this.stats,this.obj,max_id.value);
		this.br_next=get_next(this.br_obj);
		this.next=get_next(this.obj);
		while(true) {
			if(!this.next||this.next.arr_str===void 0) break;
			if(!this.br_next||this.br_next.arr_str===void 0) break;
			if(this.obj.stats_win>30) break;
			if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
			let br_st=this.br_next.arr_str.length;
			this.br_obj.stats_win++;
			this.obj.stats_win++;
			calc_cur(this.stats,this.br_obj);
			this.br_next=new IDValueImpl_0(this.obj.id+1,this.br_obj);
			this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
			calc_cur(this.stats,this.obj);
			this.next=new IDValueImpl_0(this.obj.id+1,this.br_obj);
			this.res=calc_next(this.stats,this.obj,max_id.value);
			if(!this.br_next.arr_str) continue;
			let cd=br_st-this.br_next.arr_str.length;
			if(cd<=1) break;
		}
		return null;
	}
	/** @arg {CompressionStatsCalculator} stats @arg {IDValueImpl_0} obj */
	constructor(stats,obj) {
		this.stats=stats;
		x: {
			this.obj=obj;
			this.obj.stats_win=2;
			calc_cur(stats,this.obj);
			if(!this.obj.stats) {
				this.m_return_value=null;
				break x;
			}
			if(this.obj.stats.length===0) {
				this.m_return_value=null;
				break x;
			}
			max_id.value++;
			this.br_obj=Object.assign({},this.obj);
			if(!this.br_obj.stats_win) {
				this.m_return_value=null;
				break x;
			}
			this.br_obj.stats_win++;
			calc_cur(stats,this.br_obj);
			this.br_res=calc_next(stats,this.br_obj,max_id.value);
			console.log("br_res",this.br_res);
			this.m_return_value=calc_next(stats,this.obj,max_id.value);
			this.br_next=get_next(this.br_obj);
			this.next=get_next(this.obj);
			while(true) {
				if(!this.next||this.next.arr_str===void 0) break;
				if(!this.br_next||this.br_next.arr_str===void 0) break;
				if(this.obj.stats_win>30) break;
				if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
				let br_st=this.br_next.arr_str.length;
				this.br_obj.stats_win++;
				this.obj.stats_win++;
				calc_cur(stats,this.br_obj);
				this.br_next=new IDValueImpl_0(this.obj.id+1,this.br_obj);
				this.br_res=calc_next(stats,this.br_obj,max_id.value);
				calc_cur(stats,this.obj);
				this.next=new IDValueImpl_0(this.obj.id+1,this.br_obj);
				this.res=calc_next(stats,this.obj,max_id.value);
				if(!this.br_next.arr_str) continue;
				let cd=br_st-this.br_next.arr_str.length;
				if(cd<=1) break;
			}
		}
	}
}
inject_api.DoCalc=DoCalc;

class CompressDual {
	/** @type {number} */
	i;
	/** @type {AltPair<string,number>[]} */
	arr=[];
	/** @type {AnyOrRepeat2_0<string,number>[]} */
	ret=[];
	m_base=new BaseCompression;
	/** @returns {DualR_0} */
	try_compress_dual() {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.m_base.compress_result_state_dual(this);
	}
	/** @arg {AltPair<string,number>} item */
	compress_rle_TU_to_TX(item) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(item);
		this.i+=off-1;
		return true;
	}
	/** @arg {AltPair<string,number>[]} arr */
	constructor(arr) {
		this.i=0;
		this.arr=arr;
		this.ret=[];
	}
}


/** @arg {CompressionStatsCalculator} stats @arg {IDValueImpl_0} obj @arg {number} max_id */
function calc_next(stats,obj,max_id) {
	if(obj.stats===void 0||(obj.stats!==void 0&&obj.stats.length===0)) {
		return null;
	}
	let f_val=obj.stats[0];
	let rep_val=f_val[1];
	if(!obj.next) {
		return null;
	}
	/** @type {IDValueImpl_0} */
	let next=obj;
	next.value=[max_id,"=",rep_val];
	next.log_val=[max_id,"=",f_val[0],f_val[1]];
	if(obj.arr_str===void 0)
		throw new Error("No arr");
	let rep_range=stats.replace_range(obj.arr_str,rep_val,max_id);
	next.arr_dual=[];
	for(let i of rep_range) {
		switch(i[0]) {
			case "T": next.arr_dual.push(["T",i[1]]); break;
			case "U": next.arr_dual.push(["U",i[1]]); break;
		}
	}
	if(next.arr_str)
		return null;
	let com=new CompressDual(next.arr_dual);
	/** @type {DualR_0} */
	let compress_result=com.try_compress_dual();
	if(!compress_result[0]) {
		next.arr_dual=compress_result[1];
	} else {
		next.arr_dual_compressed=compress_result[1];
	}
	return compress_result;
}

/** @arg {IDValueImpl_0} value @arg {IDValueImpl_0} next */
function assign_next(value,next) {
	value.next=next;
	return next;
}
z.add_function(assign_next);
/** @implements {IDValueImpl_0} */
class Value {
	set_arr_T() {}
	/** @type {AltPair<AnyOrRepeat_0<string>,AnyOrRepeat_0<number>>[]} */
	arr_dual_x=[];
	/** @type {AnyOrRepeat_0<string>[]} */
	arr_rep_str=[];
	/** @arg {number} id */
	constructor(id) {
		this.id=id;
	}
	/** @type {any} */
	next;
	/** @type {any} */
	arr_dual;
	/** @type {any} */
	arr_dual_compressed;
	/** @type {any} */
	arr_rep_num;
	/** @type {any} */
	arr_str;
	/** @type {any} */
	arr_num;
	/** @type {any} */
	value;
	/** @type {any} */
	arr_rep;
	/** @type {any} */
	log_val;
	/** @type {any} */
	stats;
	/** @type {any} */
	stats_win;
}
z.add_function(Value);

let max_id={value: 0};
/** @arg {IDValueImpl_0} obj @arg {CompressionStatsCalculator} stats */
function run_calc(stats,obj) {
	let calc_value=new DoCalc(stats,obj);
	let res=calc_value.get_result();
	if(!res) return [false,null];
	return [true,res];
}
/** @arg {IDValueImpl_0} obj */
function flat_obj(obj) {
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		obj=next;
	}
	ret.push(obj);
	return ret;
}
/** @type {{value:IDValueImpl_0[]}} */
let g_obj_arr={value: []};

/** @arg {number|string} val @arg {unknown} e */
function find_matching_value(val,e) {
	if(typeof val==="string") {
		console.log("TODO: find matching string",e,val);
		return false;
	} else {
		if(typeof e==="object"&&e!==null&&"value" in e&&e.value instanceof Array) {
			return e.value[0]===val;
		}
		return false;
	}
}

/** @arg {string|number} val */
function key_not_found(val) {
	console.log("not found",val);
}

/** @type {number[]} */
let id_map_one=[];

/** @arg {string|number} val */
function do_decode(val) {
	let fv=g_obj_arr.value.slice(1).find(e => find_matching_value(val,e));
	if(!fv) return key_not_found(val);
	if(typeof val==="number") {
		if(typeof fv==="object"&&"value" in fv&&fv.value instanceof Array) {
			let [,,keep]=fv.value;
			id_map_one[val]=keep;
		}
		console.log("not found",val,fv);
	} else {
		if(typeof fv==="object"&&"value" in fv&&fv.value instanceof Array) {
			let [,,keep]=fv.value;
			id_map_str.set(val,keep);
		}
		console.log("not found",val,fv);
	}
}

/** @type {(string|number)[][]} */
let dr_map_num=[];

/** @type {(string|number)[][]} */
let ids_dec_num=[];

/** @type {RepeatImpl_0<(string|number)[]>[]} */
let dr_map_rep=[];

/** @type {(string|number)[][]} */
let id_map_rep=[];

/** @type {(string|number)[][]} */
let id_map_num=[];

/** @type {number[]} */
let ids_dec_rep=[];

/** @arg {string|number|RepeatImpl_0<number>} e @returns {["dr_map_num", any]|["id_map_num",any]|["dr_map_rep", any]|["ids_dec_rep",any]|["ids_dec_num",any]|null} */
function try_decode(e,deep=true) {
	if(typeof e==="number") {
		if(dr_map_num[e]) {
			return ["dr_map_num",dr_map_num[e]];
		}
		if(id_map_num[e]) {
			/** @type {(string|number)[]} */
			let res=id_map_num[e];
			if(!deep)
				return ["id_map_num",res];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			dr_map_num[e]=dec_res;
			return ["dr_map_num",dec_res];
		}
		if(ids_dec_num[e]) {
			return ["ids_dec_num",ids_dec_num[e]];
		}
	}
	if(e instanceof RepeatImpl_0) {
		if(dr_map[e.value]) {
			return ["dr_map_rep",dr_map[e.value]];
		}
		if(id_map_rep[e.value]) {
			/** @type {(string|number)[]} */
			let res=id_map_rep[e.value];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			let ret=new RepeatImpl_0(dec_res,e.times);
			dr_map_rep[e.value]=ret;
			return ["dr_map_rep",ret];
		}
		if(ids_dec_rep[e.value]) {
			return ["ids_dec_rep",new RepeatImpl_0(ids_dec_rep[e.value],e.times)];
		}
	}
	return null;
}

/** @type {number[][]} */
let id_map=[];
/** @type {Map<string, number>} */
let id_map_str=new Map;
/** @type {JsonValueBox[]} */
let ids_dec=[];
/** @type {(RepeatImpl_0<string|number>|RepeatImpl_0<(string|number)[]>|(string|number)[])[]} */
let dr_map=[];
add_array(ids_dec);

class JsonNullBox {
	type="null";
	value=null;
}

class JsonValueBox {
	value;
	/** @arg {JsonNullBox|JsonArrayBox} value */
	constructor(value) {
		this.value=value;
	}
}

class JsonArrayBox {
	type="array";
	value;
	/** @arg {JsonValueBox[]} value */
	constructor(value) {
		this.value=value;
	}
}

class SafeJsonParser {
	/** @arg {string} e */
	parse(e) {
		/** @type {unknown} */
		let res_unk=JSON.parse(e);
		return this.convert(res_unk);
	}
	/** @arg {unknown} obj */
	convert(obj) {
		if(obj===null) {
			return new JsonValueBox(new JsonNullBox);
		}
		if(obj instanceof Array) {
			/** @type {JsonValueBox[]} */
			let new_arr=[];
			for(let [k,v] of obj.entries()) {
				let res=this.convert(v);
				new_arr[k]=res;
			}
			return new JsonValueBox(new JsonArrayBox(new_arr));
		}
		console.log("don't know how to handle",obj);
		throw new Error("parse more");
	}
}

function init_decode() {
	let parser=new SafeJsonParser;
	ids_dec=ids.value.map(e => parser.parse(e));
}
/** @arg {string|number} value @returns {string|number} */
function decode_map(value) {
	if(!id_map)
		init_decode();
	let dec=try_decode(value);
	if(!dec) {
		do_decode(value);
	}
	dec=try_decode(value);
	if(!dec) {
		console.log(value);
	} else {
		console.log("handle decode_map",value);
		throw new Error("1");
	}
	return value;
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
			if(!deep_eq(cur,cur_other)) {
				return false;
			}
		}
		return true;
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2));
		if(is_eq)
			return true;
		return false;
	}
	if(obj_1 instanceof Map&&obj_2 instanceof Map) {
		return deep_eq([...obj_1.entries()],[...obj_2.entries()]);
	}
	throw new Error("Fixme");
}
z.add_function(deep_eq);

/** @arg {string[][]} arr_2d @arg {number} key @arg {string} value */
function make_group_from_item(arr_2d,key,value) {
	arr_2d[key]??=[];
	let arr=arr_2d[key];
	for(let i=0;i<arr.length;i++) {
		if(arr[i]!==value) continue;
		return;
	}
	arr_2d[key].push(value);
}


/** @type {import("../rebuild_the_universe_raw/rebuild_the_universe.user").AutoBuyImplR} */
let g_auto_buy;
/** @type {{value:string[]}} */
let src_arr={value: []};
function compress_init() {
	dr_map=[];
}
/** @type {{value:string[][]}} */
let id_groups={value: []};
/** @type {{value:number[]}} */
let el_ids={value: []};

/** @arg {CompressionStatsCalculator} stats */
function compress_main(stats) {
	compress_init();
	if(g_auto_buy) {
		src_arr.value=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1];
	} else {
		console.log("TODO: use event_log (can't find it)");
		return;
	}
	ids.value=[...new Set(src_arr.value)];
	id_groups.value=[];
	for(let value of src_arr.value) {
		make_group_from_item(id_groups.value,ids.value.indexOf(value),value);
	}
	el_ids.value=src_arr.value.map(get_ids);
	max_id.value=new Set(el_ids.value).size;
	let disabled_com=new DisabledMulCompression;
	let arr=disabled_com.try_compress_T(el_ids.value);
	let obj_start=new IDValueImpl_0(0,null);
	obj_start.arr_rep=el_ids.value;
	if(arr[0]===true) {
		obj_start.arr_rep_num=arr[1];
	} else if(arr[0]===false) {
		obj_start.arr_num=arr[1];
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(stats,cur);
		if(!cur.stats) break;
		if(cur.log_val&&comp_res===null) {
			console.log("id:"+cur.id,"[",...cur.log_val,"]",cur.stats_win);
		}
		if(cur.stats.length===0) break;
		if(cur.stats[0][1]===1) break;
		if(!cur.next) break;
		if(!(cur.next instanceof IDValueImpl_0)) {
			throw new Error("Don't know how to use this type (cur.next is not IDValue_0)");
		}
		cur=cur.next;
	}
	g_obj_arr.value=flat_obj(obj_start);
}

inject_api.compress_main=new VoidCallback(compress_main,[new CompressionStatsCalculator]);

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
	reset_part() {
		this.cur_part=null;
	}
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
inject_api.HexRandomDataGenerator=HexRandomDataGenerator;
const random_data_generator=new HexRandomDataGenerator;

class EventListenerValue {
	/** @arg {EventListenerOrEventListenerObject|null} callback @arg {boolean|EventListenerOptions} options */
	constructor(callback,options) {
		/** @type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/** @type {boolean|EventListenerOptions} */
		this.options=options;
	}
}
inject_api.EventListenerValue=EventListenerValue;

class GenericEvent {
	#default_prevented=false;
	type="unknown";
	/** @arg {string} type */
	constructor(type) {
		if(type) {
			this.type=type;
		}
	}
	preventDefault() {
		this.#default_prevented=true;
	}
	get defaultPrevented() {
		return this.#default_prevented;
	}
}
inject_api.GenericEvent=GenericEvent;

class GenericDataEvent extends GenericEvent {
	/** @arg {string} type @arg {any} data */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
inject_api.GenericDataEvent=GenericDataEvent;

//#region is_helpers
/** @template {{}|null} T @template {string} U @arg {CM<T>|null} x @arg {U} k @returns {x is CM<T&Record<U,string>>} */
function is_record_with_string_type(x,k) {
	if(!x?.data) return false;
	if(!is_record_with_T(x.data,k)) return false;
	if(typeof x.data[k]!=="string") return false;
	return true;
}

/** @template T @template {string} U @arg {CM<MessageEvent<T>>} x @arg {U} k @returns {x is CM<MessageEvent<T>&MessageEvent<Record<U,unknown>>>} */
function is_record_with_T_msg_m(x,k) {
	if(!is_record_with_T(x.data,k)) return false;
	return true;
}

/** @template T @arg {CM<T>|null} x @returns {x is CM<T&{}>} */
function is_object(x) {
	if(!x?.data) return false;
	if(typeof x.data!=="object") return false;
	return true;
}

/** @template {{}} T @template {string} U @arg {T} x @arg {U} k @returns {x is T&Record<U,unknown>} */
function is_record_with_T(x,k) {
	if(x===null) return false;
	if(!(k in x)) return false;
	return true;
}
//#endregion

//#region cast_monad
/** @template T @arg {T} x @returns {CM<T>} */
function new_cast_monad(x) {
	return {tag: "cast_tag",data: x};
}

/** @template T @arg {CM<T>|null} x @returns {CM<T&{}|null>|null} */
function cast_to_object(x) {
	if(!is_object(x)) return null;
	return x;
}

/** @template T @arg {CM<T>|null} x @returns {CM<T&{type:string}>|null} */
function cast_to_record_with_string_type(x) {
	let cast_result=cast_to_object(x);
	if(!is_record_with_string_type(cast_result,"type")) return null;
	return cast_result;
}
/** @template T @arg {CM<MessageEvent<T>>|null} x @returns {x is CM<MessageEvent<T&{}>>} */
function is_object_msg(x) {
	if(!x?.data) return false;
	if(typeof x.data.data!=="object") return false;
	if(x.data.data===null) return false;
	return true;
}

/** @template T @arg {CM<MessageEvent<T>>|null} x @returns {CM<MessageEvent<T&{}>>|null} */
function cast_to_object_msg(x) {
	if(!is_object_msg(x)) return null;
	return x;
}
/** @template {{}} T @template {string} U @arg {CM<MessageEvent<T>>} x @arg {U} k @returns {x is CM<MessageEvent<T&Record<U,string>>>} */
function is_record_with_string_type_msg(x,k) {
	if(x.data===null) return false;
	if(x.data.data===null) return false;
	return is_record_with_string_type(new_cast_monad(x.data.data),k);
}

/** @template T @arg {CM<MessageEvent<T>>|null} x @returns {CM<MessageEvent<T&{type:string}>>|null} */
function cast_to_record_with_string_type_msg(x) {
	let cast_result=cast_to_object_msg(x);
	if(!cast_result?.data?.data) return null;
	if(!is_record_with_string_type_msg(cast_result,"type")) return null;
	return cast_result;
}

/** @template {CM<MessageEvent<any>>} T @arg {T} x @returns {CM<MessageEvent<T["data"]["data"]&{data:unknown}>>|null} */
function cast_to_record_with_string_type_msg_data(x) {
	if(!is_record_with_T_msg_m(x,"data")) return null;
	/** @type {CM<MessageEvent<T&{data:unknown}>>} */
	let xr=x;
	return xr;
}

/** @arg {CM<MessageEvent<{type:string,data:unknown}>>} x @returns {x is CM<MessageEvent<WrappedMessage<unknown>>>} */
function is_record_with_string_type_msg_data_wrapped(x) {
	if(x.data.data.type===post_message_connect_message_type) return true;
	return false;
}

/** @arg {CM<MessageEvent<{type:string,data:unknown}>>} x @returns {CM<MessageEvent<WrappedMessage<unknown>>>|null} */
function cast_to_record_with_string_type_msg_data_wrapped(x) {
	if(!is_record_with_string_type_msg_data_wrapped(x)) return null;
	return x;
}

/** @template {string} U @template {{}} T @arg {CM<T>|null} x @arg {U} k @returns {CM<T&{[P in U]:string}>|null} */
function cast_to_record_with_key_and_string_type(x,k) {
	if(x===null) return null;
	if(!is_record_with_string_type(x,k)) return null;
	return x;
}
z.add_function(cast_to_record_with_key_and_string_type);
//#endregion


/** @readonly @type {`CrossOriginConnection_${typeof commit_id_sha1}`} */
const post_message_connect_message_type=`CrossOriginConnection_${commit_id_sha1}`;

class FlagHandler {
	is_none() {
		return this.f===0;
	}
	is_syn() {
		return (this.f&1)==1;
	}
	is_ack() {
		return (this.f&2)==2;
	}
	get_flags() {
		return this.f;
	}
	valueOf() {
		return this.f;
	}
	/** @arg {import("./__global.js").ConnectFlag} flags */
	constructor(flags) {
		this.f=flags;
	}
}

/** @typedef {import("./__global.js").ConnectFlag} ConnectFlag */
/** @type {1} */
const tcp_syn=1;
/** @type {(typeof import("./__global.js").ConnectFlag)["Syn"]} */
const val_tcp_syn=tcp_syn; val_tcp_syn;
/** @type {2} */
const tcp_ack=2;
/** @readonly @type {(typeof import("./__global.js").ConnectFlag)["Ack"]} */
const val_tcp_ack=tcp_ack; val_tcp_ack;

const ack_win=5000;
class TCPMessage {
	/** @readonly */
	type="tcp";
	/** @arg {ConnectFlag} flags @arg {number} client_id @arg {number} seq @arg {number|null} ack @arg {ConnectionMessage["data"]} data */
	constructor(flags,client_id,seq,ack,data) {
		this.flags=flags;
		this.client_id=client_id;
		this.seq=seq;
		this.ack=ack;
		/** @type {ConnectionMessage["data"]} */
		this.data=data;
	}
	/** @arg {number} client_id @returns {ConnectionMessage} */
	static make_syn(client_id) {
		let seq=(Math.random()*ack_win)%ack_win|0;
		if(testing_tcp) {
			seq=100;
		}
		return new TCPMessage(tcp_syn,client_id,seq,null,null);
	}
	/** @arg {number} client_id @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	static make_message(client_id,data,seq,ack) {
		return new TCPMessage(0,client_id,seq,ack,data);
	}
}

let testing_tcp=false;

class Socket {
	static direct_message=false;
	/** @readonly */
	m_side="client";
	/** @private */
	m_debug=false;
	/** @private */
	m_local_log=false;
	/** @private */
	m_client_id;
	/** @private */
	m_port;
	/** @private */
	m_remote_target;
	/** @private */
	m_event_source;
	/** @arg {number} connection_timeout @arg {number} client_id @arg {Window} remote_target */
	constructor(connection_timeout,client_id,remote_target) {
		this.m_connection_timeout=connection_timeout;
		this.m_client_id=client_id;
		this.m_remote_target=remote_target;
		this.m_event_source=remote_target;
		if(this.m_remote_target===window) {
			throw new Error("Sending messages to self is means i have a bad time");
		}
		let {ports,client_port}=this.init_syn_data();
		this.m_port=client_port;
		this.send_syn(ports);
	}
	client_id() {
		return this.m_client_id;
	}
	/** @returns {{ports:[MessagePort],client_port:MessagePort}} */
	init_syn_data() {
		let {
			port1: server_port,
			port2: client_port,
		}=new MessageChannel;
		return {ports: [server_port],client_port};
	}
	reconnect() {
		let {ports,client_port}=this.init_syn_data();
		this.m_port=client_port;
		this.send_syn(ports);
	}
	init_handler() {
		this.m_port.addEventListener("message",this);
		this.m_port.start();
		elevate_event_handler(this);
	}
	/** @arg {[MessagePort]} ports */
	send_syn(ports) {
		if(testing_tcp) {// <group syn>
			console.group("syn");
		}
		this.init_handler();
		this.send_init_request(TCPMessage.make_syn(this.m_client_id),ports);
	}
	/** @arg {ConnectionMessage} data @arg {[MessagePort]} ports */
	send_init_request(data,ports) {
		if(this.m_debug) {
			console.log("post request ConnectOverPostMessage");
		}
		if(testing_tcp) {
			console.groupCollapsed("-tx-C-> Socket<"+data.seq+","+data.ack+">");
			console.log("Socket ->");
			console.log("top.onmessage.handleEvent ->");
			console.log("-C> CrossOriginConnection",data);
			console.groupEnd();
			console.log("<?-");
		}
		this.post_wrapped(data,ports);
	}
	/** @arg {ConnectionMessage} data @arg {[MessagePort]} ports */
	post_wrapped(data,ports) {
		/** @type {WrappedMessage<ConnectionMessage>} */
		let msg={
			type: post_message_connect_message_type,
			data,
		};
		this.m_remote_target.postMessage(msg,"*",ports);
	}
	/** @arg {ConnectionMessage} data */
	push_tcp_message(data) {
		if(testing_tcp) {
			console.groupCollapsed("-tx-L-> Socket<"+data.seq+","+data.ack+">");
			console.log("Socket ->");
			console.log("l_port.onmessage.handleEvent ->");
			console.log("-L> ListenSocket",data);
			console.groupEnd();
			console.log("<?-");
		}
		if(ListenSocket.direct_message) {
			ListenSocket.prototype.handleEvent(new MessageEvent("message",{data: data}));
		} else {
			this.m_port.postMessage(data);
		}
	}
	/** @arg {ConnectionMessage} message */
	client_connect(message) {
		if(testing_tcp) {
			console.log("on_client_connect",message,this.m_event_source);
		}
	}
	/** @arg {MessageEvent<ConnectionMessage>} event */
	handleEvent(event) {
		if(Socket.prototype===this) return;
		let data=event.data;
		if(data.type!=="tcp") throw new Error();
		if(testing_tcp) {
			console.groupCollapsed("-rx-S?-> Socket<"+data.seq+","+data.ack+","+data.flags+">");
			console.log("ListenSocket ->");
			console.log("s_port.onmessage.handleEvent ->");
			console.log("-?> Socket",data);
			console.groupEnd();
			console.log("<?-");

		}
		this.handle_tcp_data(data);
	}
	/** @arg {ConnectionMessage} tcp_message @arg {ConnectFlag} flags */
	send_ack(tcp_message,flags) {
		// seq=number & ack=number;
		let seq=tcp_message.ack;
		if(!seq) {
			seq=(Math.random()*ack_win)%ack_win|0;
			if(testing_tcp) {
				seq=300;
			}
		}
		this.push_tcp_message({
			type: "tcp",
			client_id: this.m_client_id,
			ack: tcp_message.seq+1,
			seq,
			flags: flags|tcp_ack,
			data: null,
		});
	}
	/** @arg {ConnectionMessage} tcp_message */
	handle_tcp_data(tcp_message) {
		let f=new FlagHandler(tcp_message.flags);
		if(this.m_local_log) {
			console.log("local",tcp_message);
		}
		if(f.is_syn()&&f.is_ack()) {
			this.send_ack(tcp_message,0);
		}
		if(tcp_message.flags==0) {
			this.send_ack(tcp_message,0);
		}
		if(!tcp_message.data) return;
		let tcp_data=tcp_message.data;
		if(testing_tcp) {
			console.log("Socket.handle_tcp_data(message.data())");
		}
		switch(tcp_data.type) {
			case "connected": {
				this.client_connect(tcp_message);
			} break;
			case "will_disconnect": {
				this.m_can_reconnect=tcp_data.can_reconnect;
				this.m_disconnect_start=performance.now();
			} break;
			case "disconnected": {
				if(!this.m_disconnect_start) throw new Error("missed will_disconnect");
				console.log("before_unload took",performance.now()-this.m_disconnect_start);
				this.client_disconnect(tcp_message);
			} break;
			case "side":
		}
	}
	client_start_connect() {
		if(!this.m_port) {
			throw new Error("No remote port to communicate with");
		}
	}
	/** @arg {ConnectionMessage} message */
	client_disconnect(message) {
		if(testing_tcp) {
			console.log("on_client_disconnect",message);
		}
		this.m_connected=false;
		if(!this.m_port) throw new Error("missing connection port, and disconnect was still called");
		this.m_port.removeEventListener("message",this);
		this.m_port.close();
		setTimeout(this.reconnect.bind(this),20);
	}
}
inject_api.Socket=Socket;

class OriginState {
	/** @private @readonly */
	m_top=window.top;
	/** @private @readonly @type {Window|null} */
	m_opener=window.opener;
	/** @arg {ConnectionFlags} flags */
	get_connect_target(flags) {
		if(this.m_opener) {
			flags.does_proxy_to_opener=true;
			return this.m_opener;
		} else if(this.m_top) {
			return this.m_top;
		} else {
			throw new Error("Invalid state, not top and window.top is null");
		}
	}
}
inject_api.OriginState=OriginState;

class ConnectionFlags {
	does_proxy_to_opener=false;
}

class ListenSocket {
	static direct_message=false;
	/** @private @type {ConnectionSide} */
	m_side="server";
	/** @private @type {ConnectionMessage[]} */
	m_unhandled_events=[];
	/** @private */
	m_is_connected=false;
	/** @private */
	m_log_downstream=false;
	/** @private */
	m_is_connecting=true;
	/** @private @type {ConnectionFlags} */
	m_flags;
	/** @private @type {MessagePort} */
	m_port;
	/** @private @type {number} */
	m_client_id;
	/** @private @type {MessageEventSource} */
	m_event_source;
	/** @arg {ConnectionFlags} flags @arg {MessagePort} connection_port @arg {number} client_id @arg {MessageEventSource} event_source */
	constructor(flags,connection_port,client_id,event_source) {
		this.m_flags=flags;
		this.m_client_id=client_id;
		this.m_event_source=event_source;
		this.m_port=connection_port;
		this.m_port.addEventListener("message",this);
		this.m_port.start();
	}
	get side() {
		return this.m_side;
	}
	get client_id() {
		return this.m_client_id;
	}
	get event_source() {
		return this.m_event_source;
	}
	get is_connected() {
		return this.m_is_connected;
	}
	/** @arg {ConnectionMessage} data */
	push_tcp_message(data) {
		if(testing_tcp) {
			console.groupCollapsed("-tx-S-> ListenSocket<"+data.seq+","+data.ack+">");
			console.log("ListenSocket ->");
			console.log("s_port.onmessage.handleEvent ->");
			console.log("-S> Socket",data);
			console.groupEnd();
			console.log("<?-");
		}
		if(Socket.direct_message) {
			Socket.prototype.handleEvent(new MessageEvent("message",{data}));
		} else {
			this.m_port.postMessage(data);
		}
	}
	/** @arg {ConnectionMessage} tcp_message */
	downstream_connect(tcp_message) {
		let {seq,ack}=tcp_message;
		if(!ack) throw new Error("Invalid message");
		if(testing_tcp) {
			console.log("on_server_connect",this.m_client_id,this.m_event_source);
		}
		this.push_tcp_message(TCPMessage.make_message(
			this.m_client_id,{type: "connected"},
			seq,ack,
		));
	}
	/** @arg {ConnectionMessage} info */
	downstream_handle_event(info) {
		if(!info.data) return;
		if(!inject_api.remote_origin) return;
		if(info.data.type==="forward"&&this.m_flags.does_proxy_to_opener) {
			inject_api.remote_origin.push_tcp_message(info);
			return;
		}
		if(this.m_log_downstream) {
			console.log("downstream_event",info.data,info.flags,info.client_id);
		}
	}
	disconnected() {
		this.push_tcp_message(TCPMessage.make_message(this.m_client_id,{
			type: "disconnected",
		},1,1));
	}
	/** @arg {boolean} can_reconnect */
	will_disconnect(can_reconnect) {
		this.push_tcp_message(TCPMessage.make_message(this.m_client_id,{
			type: "will_disconnect",
			can_reconnect,
		},0,0));
	}
	/** @arg {MessageEvent<ConnectionMessage>} event */
	handleEvent(event) {
		let {data}=event;
		if(data.type!=="tcp") {
			this.m_unhandled_events.push(data);
			console.log("unhandled event",data);
			return;
		}
		if(this.m_flags.does_proxy_to_opener) {
			let real_data=data.data;
			/** @type {[number,number,null][]} */
			let id_path=[];
			if(real_data&&real_data.type==="forward") {
				id_path.push(...real_data.client_id_path,[data.client_id,this.m_client_id,null]);
				real_data=real_data.data;
			}
			data.data={
				type: "forward",
				client_id_path: id_path,
				data: real_data,
			};
		}
		if(testing_tcp) {
			console.groupCollapsed("-rx-L?-> ListenSocket<"+data.seq+","+data.ack+">");
			console.log("Socket ->");
			console.log("l_port.onmessage.handleEvent ->");
			console.log("-?> ListenSocket",data);
			console.groupEnd();
			console.log("<?-");
		}
		this.handle_tcp_data(data);
	}
	/** @arg {ConnectionMessage} tcp_message @arg {ConnectFlag} flags */
	send_ack(tcp_message,flags) {
		let {seq: ack,ack: seq}=tcp_message;
		seq=(Math.random()*ack_win)%ack_win|0;
		if(testing_tcp) {
			seq=300;
		}
		ack+=1;
		this.push_tcp_message({
			type: "tcp",
			client_id: this.m_client_id,
			ack,
			seq,
			flags: flags|tcp_ack,
			data: null,
		});
	}
	/** @arg {ConnectionMessage} tcp_message */
	handle_tcp_data(tcp_message) {
		let f=new FlagHandler(tcp_message.flags);
		let {ack: seq}=tcp_message;
		if(f.is_syn()&&!f.is_ack()) {
			// seq=number & ack=null;
			this.send_ack(tcp_message,tcp_syn);
		}
		if(f.is_none()&&!f.is_syn()) {
			this.send_ack(tcp_message,0);
		}
		if(f.is_none()&&seq==null) {
			console.log("bad tcp",tcp_message);
		}
		if(f.is_ack()&&this.m_is_connecting) {
			this.m_is_connecting=false;
			this.m_connected=true;
			this.downstream_connect(tcp_message);
		}
		if(f.is_ack()&&this.m_is_connecting&&seq==null) {
			console.log("bad tcp",tcp_message);
		}
		let downstream_data=tcp_message.data;
		if(downstream_data) {
			this.downstream_handle_event(tcp_message);
		}
	}
}

class CrossOriginConnection {
	/** @private */
	m_flags=new ConnectionFlags;
	/** @private */
	m_state=new OriginState;
	/** @private @type {Socket|null} */
	m_local_handler=null;
	/** @private @type {ListenSocket[]} */
	m_connections=[];
	/** @private */
	m_client_max_id=0;
	constructor() {
		elevate_event_handler(this);
		let client_id=this.m_client_max_id++;
		this.start_root_server();
		let connect_target=this.m_state.get_connect_target(this.m_flags);
		if(connect_target!==window) {
			this.m_local_handler=new Socket(
				30000,
				client_id,
				connect_target,
			);
		}
	}
	/** @arg {MessageEvent<unknown>} event_0 */
	on_message_event(event_0) {
		let e_monad_1=cast_to_record_with_string_type_msg(new_cast_monad(event_0));
		if(!e_monad_1) return;
		if(!this.is_with_data_decay(e_monad_1)) return;
		/** @type {msg_ev_01} */
		let e_monad_2=cast_to_record_with_string_type_msg_data(e_monad_1);
		if(!e_monad_2?.data) return;
		let e_monad_3=cast_to_record_with_string_type_msg_data_wrapped(e_monad_2);
		if(!e_monad_3) return;
		let cast_monad_data=cast_to_record_with_string_type(new_cast_monad(e_monad_3.data.data.data));
		if(!cast_monad_data) return;
		let unwrapped_event=cast_monad_data.data;
		switch(unwrapped_event.type) {
			case "tcp": break;
			default: return;
		}
		if(!this.is_connection_message(event_0)) return;
		let client_id=this.m_client_max_id++;
		let connection_port=event_0.ports[0];
		if(!event_0.source) throw new Error("No event source");
		let event_source=event_0.source;
		let handler=new ListenSocket(this.m_flags,connection_port,client_id,event_source);
		let prev_connection_index=this.m_connections.findIndex(e => {
			return e.event_source===event_source;
		});
		if(testing_tcp) {
			console.groupCollapsed("-rx-C!-> CrossOriginConnection<"+event_0.data.data.seq+","+event_0.data.data.ack+">");
			console.log("CrossOriginConnection ->");
			console.log("ListenSocket.handle_tcp_data ->");
			console.log("s_port.onmessage.handleEvent ->");
			console.log("-!> Socket",event_0.data.data);
			console.groupEnd();
			console.log("<?-");
		}
		handler.handle_tcp_data(event_0.data.data);
		if(prev_connection_index>-1) {
			this.m_connections.splice(prev_connection_index,1);
		}
		this.m_connections.push(handler);
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<WrappedMessage<unknown>>} */
	is_wrapped_message(event) {
		let data=cast_to_record_with_string_type(new_cast_monad(event.data));
		if(!data) return false;
		return data.data.type===post_message_connect_message_type;
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<WrappedMessage<ConnectionMessage>>} */
	is_connection_message(event) {
		if(!this.is_wrapped_message(event)) return false;
		let data_record=cast_to_record_with_string_type(new_cast_monad(event.data.data));
		if(!data_record) return false;
		if(data_record.data.type!=="tcp") return false;
		return true;
	}
	/** @template {CM<{type:string}>} T @arg {T} data @returns {data is T&CM<{type:string,data:unknown}>} */
	is_with_data_decay(data) {
		if(!is_record_with_T(data.data,"data")) return false;
		return true;
	}
	/** @arg {ConnectionMessage} message */
	push_tcp_message(message) {
		if(!this.m_local_handler) {
			throw new Error("send tcp message to non-existent connection");
		}
		this.m_local_handler.push_tcp_message(message);
	}
	/** @arg {Event} event */
	handleEvent(event) {
		switch(event.type) {
			case "message": {
				if(event instanceof MessageEvent) {
					this.on_message_event(event);
				} else {
					console.log("Event type is \"message\" and not an instance of MessageEvent",event);
				}
			} break;
			case "beforeunload": {
				for(let connection of this.m_connections) {
					connection.will_disconnect(false);
				}
			} break;
			case "unload": {
				for(let connection of this.m_connections) {
					connection.disconnected();
				}
				this.m_connections.length=0;
			} break;
		}
	}
	start_root_server() {
		window.addEventListener("message",this);
		window.addEventListener("beforeunload",this);
		window.addEventListener("unload",this);
	}
	static connect_to_api() {
		inject_api.CrossOriginConnection=this;
		let remote_origin=new this();
		inject_api.remote_origin=remote_origin;
	}
}
CrossOriginConnection.connect_to_api();

const html_parsing_div_element=document.createElement("div");
/** @arg {string} html */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML=html;
	return Array.prototype.map.call(html_parsing_div_element.textContent,e => e.charCodeAt(0));
}
inject_api.parse_html_to_binary_arr=parse_html_to_binary_arr;

class DebugApi {
	next_remote_id=0;
	data_store=new Map;
	/** @type {DebugApi|null} */
	static m_the=null;
	/** @returns {DebugApi} */
	static the() {
		if(!this.m_the) {
			this.m_the=new this;
		}
		return this.m_the;
	}
	/** @arg {string} key @returns {boolean} */
	hasData(key) {
		return this.data_store.has(key);
	}
	/** @arg {string} key @returns {any} */
	getData(key) {
		return this.data_store.get(key);
	}
	/** @arg {"__k"} key @returns {dbg_get_ty} */
	get_k(key) {
		return this.getData(key);
	}
	/** @returns {I_debug} */
	get_d() {
		return this.getData("d");
	}
	/** @arg {"getEventListeners"} key @returns {(x:{})=>{[x: string]: EventListenerInternal[]}} */
	get_getEventListeners(key) {
		return this.data_store.get(key);
	}
	/** @arg {string} key @arg {any} value @returns {this} */
	setData(key,value) {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key @returns {boolean} */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/** @arg {any} element @returns {{[x: string]: EventListenerInternal[]}} */
	getEventListeners(element) {
		if(!this.hasData("getEventListeners"))
			throw new Error("1");
		return this.get_getEventListeners("getEventListeners")(element);
	}
	/** @arg {I_debug} debug @arg {I_undebug} undebug @arg {Constructor} func @arg {string} name @returns {dbg_result} */
	get_event_listener_var_vec_1(debug,undebug,func,name) {
		this.attach(debug,undebug,null);
		/** @arg {Constructor} func @arg {any} f_this @arg {any[]} c_args */
		function do_activate(func,f_this,c_args) {
			try {
				return Reflect.apply(func,f_this,c_args);
			} catch {}
		}
		let activate=do_activate.bind(null,func,{},[{
			get target() {
				throw new Error("1");
			}
		}]);
		return this.debuggerGetVar_a({
			type: "class-breakpoint",
			name,
			target: func,
			activate,
			activate_args: [],
		});
	}
	/** @arg {any} debug @arg {any} undebug @arg {null} getEventListeners @returns {this} */
	attach(debug,undebug,getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.get_d();
		let obj_undebug=this.getData("u");
		let get_ev_lis=this.getData("getEventListeners");
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData("d",debug);
			this.setData("u",undebug);
			this.setData("getEventListeners",getEventListeners);
		}
		return this;
	}
	/** @arg {new (...arg0: any[]) => any} class_value @arg {any[]} arg_vec @returns {boolean} */
	activateClass(class_value,arg_vec) {
		return new class_value(...arg_vec);
	}
	/** @arg {any} function_value @arg {any} target_obj @arg {any} arg_vec @returns {boolean} */
	activateApply(function_value,target_obj,arg_vec) {
		return Reflect.apply(function_value,target_obj,arg_vec);
	}
	/** @returns {void} */
	debuggerBreakpointCode() {
		window.inject_api?.DebugApi&&(window.inject_api.DebugApi.the().get_k("__k").get=(/** @type {string} */ __v) => {
			if(__v==="__v") {
				return {type: "eval-hidden-var"};
			}
			try {
				return {
					type: "var",
					data: [__v,eval(__v)]
				};
			} catch {
				return {type: "no-var"};
			}
		});
		if(window.inject_api?.DebugApi) {
			if(!window.inject_api.DebugApi.the().clearCurrentBreakpoint()) {
				console.log("failed to clear breakpoint");
			}
		} else {
			console.log("missing window.inject_api");
		}
		0;
	}
	/** @returns {boolean} */
	clearCurrentBreakpoint() {
		let undebug;
		if(undebug=this.getData("u")) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/** @argument {Function} function_value @returns {string} */
	stringifyFunction(function_value) {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/** @arg {IDebugBreakpointArgs} breakpoint_arguments @returns {dbg_result} */
	debuggerGetVarArray_a(breakpoint_arguments) {
		let function_value=breakpoint_arguments.target;
		let var_match=breakpoint_arguments.name;
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				type: "invalid-state-error"
			};
		}
		if(typeof function_value!="function") {
			return {
				type: "argument-error"
			};
		}
		let ma=var_match.matchAll(/.-.|./g);
		let sr=[];
		let qs=[...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs=j.split("-");
			let sa=fs[0].charCodeAt(0);
			let se=fs[1].charCodeAt(0);
			for(let i=sa;i<=se;i++) {
				sr.push(i);
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e));
		this.current_function_value=function_value;
		let tmp_key="__k";
		/** @type {dbg_get_ty} */
		let tmp_value={};
		this.setData(tmp_key,tmp_value);
		let debug=this.get_d();
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode);
		debug(this.current_function_value,`${breakpoint_code_string}`);
		// ---- Activate ----
		let activate_return=null;
		if(breakpoint_arguments.type==="function-breakpoint") {
			let activate_vec=breakpoint_arguments.activate_args;
			let target_fn=breakpoint_arguments.target;
			activate_return=breakpoint_arguments.activate(target_fn,...activate_vec);
		} else {
			this.getData("u")(this.current_function_value);
			return {type: "argument-error"};
		}
		let exec_res_arr=[];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res=tmp_value.get(j);
				switch(res.type) {
					case "var":
						exec_res_arr.push(res.data);
						break;
					case "no-var":
						break;
					case "eval-hidden-var":
						console.log("can't use dynamic eval for var hidden by eval argument \""+j+"\"");
				}
			}
		}
		this.deleteData(tmp_key);
		if(exec_res_arr.length) {
			return {
				type: "data-arr",
				data: {
					result: exec_res_arr,
					return: activate_return
				}
			};
		}
		return {
			type: "no-response",
			return: activate_return
		};
	}
	/** @arg {Constructor} class_value @arg {[any,any[]]} activate_args @arg {string} var_match @returns {dbg_result} */
	debuggerGetVarArray_c(class_value,activate_args,var_match) {
		return this.debuggerGetVarArray_a({
			type: "class-breakpoint",
			name: var_match,
			target: class_value,
			activate: this.activateClass,
			activate_args,
		});
	}
	/** @arg {(...x: any[]) => void} function_value @arg {[any, any[]]} activate_args @arg {string} var_match @returns {dbg_result} */
	debuggerGetVarArray(function_value,activate_args,var_match) {
		return this.debuggerGetVarArray_a({
			type: "function-breakpoint",
			name: var_match,
			target: function_value,
			activate: this.activateApply,
			activate_args,
		});
	}
	/** @arg {IDebugBreakpointArgs} breakpoint_arguments @returns {dbg_result} */
	debuggerGetVar_a(breakpoint_arguments) {
		if(!this.hasData("d")||!this.getData("u")) return {type: "invalid-state-error"};
		if(typeof breakpoint_arguments.target!="function") return {type: "argument-error"};
		this.current_function_value=breakpoint_arguments.target;
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode);
		let tmp_key="__k";
		class DebugInfoValue {
			valid=false;
			/** @arg {string} __v @returns {{type: "hidden-var",var: string}|{type: "var",data: [string,any]}|{type: "no-var", data: null}|null} */
			get(__v) {
				return null;
			}
		}
		let tmp_value=new DebugInfoValue;
		this.setData(tmp_key,tmp_value);
		/** @type {I_debug} */
		let debug=this.getData("d");
		debug(this.current_function_value,`${dbg_str_func}`);
		// ---- Activate ----
		let activate_return=null;
		if(breakpoint_arguments.type==="class-breakpoint") {
			activate_return=breakpoint_arguments.activate(breakpoint_arguments.target,breakpoint_arguments.activate_args);
		} else if(breakpoint_arguments.type==="function-breakpoint") {
			activate_return=breakpoint_arguments.activate(breakpoint_arguments.target,...breakpoint_arguments.activate_args);
		} else {
			this.getData("u")(this.current_function_value);
			return {type: "argument-error"};
		}
		let breakpoint_result=null;
		if(tmp_value.get) {
			breakpoint_result=tmp_value.get(breakpoint_arguments.name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type==="var") {
			return {
				type: "data",
				result: breakpoint_result.data,
				return: activate_return,
			};
		}
		if(breakpoint_result) {
			return {
				type: "unexpected",
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
		}
		return {
			type: "no-response",
			return: activate_return,
		};
	}
	/** @arg {Constructor} class_value @arg {any[]} activate_args @arg {string} var_name @returns {dbg_result} */
	debuggerGetVar_c(class_value,activate_args,var_name) {
		return this.debuggerGetVar_a({
			type: "class-breakpoint",
			name: var_name,
			target: class_value,
			activate: this.activateClass,
			activate_args,
		});
	}
	/** @arg {(...x: any[]) => void} function_value @arg {[any, any[]]} activate_vec @arg {string} var_name @returns {dbg_result} */
	debuggerGetVar(function_value,activate_vec,var_name) {
		if(typeof function_value!="function") {
			return {type: "argument-error"};
		}
		let ret=this.debuggerGetVar_a({
			type: "function-breakpoint",
			target: function_value,
			name: var_name,
			activate: this.activateApply,
			activate_args: activate_vec,
		});
		if(ret.type!=="data") throw new Error("Debug fail");
		return {
			type: "var-result",
			name: ret.result[0],
			result: ret.result[1],
			return: ret.return
		};
	}
}
inject_api.DebugApi=DebugApi;
