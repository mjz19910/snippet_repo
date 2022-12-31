import {Dispatcher} from "./Dispatcher.js";
import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";
import {JSTokenizerTokenType} from "../JSTokenizerTokenType.js";
import {IterationDecision} from "../IterationDecision.js";
import {HashMap} from "../HashMap.js";

// HashMap<FlyString, TokenType> Lexer::s_keywords
const s_keywords=new HashMap<string,JSTokenizerTokenType>();
// HashMap<String, TokenType> Lexer::s_three_char_tokens
const s_three_char_tokens=new HashMap<string,JSTokenizerTokenType>();
// HashMap<String, TokenType> Lexer::s_two_char_tokens
const s_two_char_tokens=new HashMap<string,JSTokenizerTokenType>();
// HashMap<char, TokenType> Lexer::s_single_char_tokens
const s_single_char_tokens=new HashMap<string,JSTokenizerTokenType>();

export class JSPunctuators extends LexerBase {
	constructor(dis: Dispatcher) {
		super(dis);
		if(s_keywords.is_empty()) {
			s_keywords.set("async",JSTokenizerTokenType.Async);
			s_keywords.set("await",JSTokenizerTokenType.Await);
			s_keywords.set("break",JSTokenizerTokenType.Break);
			s_keywords.set("case",JSTokenizerTokenType.Case);
			s_keywords.set("catch",JSTokenizerTokenType.Catch);
			s_keywords.set("class",JSTokenizerTokenType.Class);
			s_keywords.set("const",JSTokenizerTokenType.Const);
			s_keywords.set("continue",JSTokenizerTokenType.Continue);
			s_keywords.set("debugger",JSTokenizerTokenType.Debugger);
			s_keywords.set("default",JSTokenizerTokenType.Default);
			s_keywords.set("delete",JSTokenizerTokenType.Delete);
			s_keywords.set("do",JSTokenizerTokenType.Do);
			s_keywords.set("else",JSTokenizerTokenType.Else);
			s_keywords.set("enum",JSTokenizerTokenType.Enum);
			s_keywords.set("export",JSTokenizerTokenType.Export);
			s_keywords.set("extends",JSTokenizerTokenType.Extends);
			s_keywords.set("false",JSTokenizerTokenType.BoolLiteral);
			s_keywords.set("finally",JSTokenizerTokenType.Finally);
			s_keywords.set("for",JSTokenizerTokenType.For);
			s_keywords.set("function",JSTokenizerTokenType.Function);
			s_keywords.set("if",JSTokenizerTokenType.If);
			s_keywords.set("import",JSTokenizerTokenType.Import);
			s_keywords.set("in",JSTokenizerTokenType.In);
			s_keywords.set("instanceof",JSTokenizerTokenType.Instanceof);
			s_keywords.set("let",JSTokenizerTokenType.Let);
			s_keywords.set("new",JSTokenizerTokenType.New);
			s_keywords.set("null",JSTokenizerTokenType.NullLiteral);
			s_keywords.set("return",JSTokenizerTokenType.Return);
			s_keywords.set("super",JSTokenizerTokenType.Super);
			s_keywords.set("switch",JSTokenizerTokenType.Switch);
			s_keywords.set("this",JSTokenizerTokenType.This);
			s_keywords.set("throw",JSTokenizerTokenType.Throw);
			s_keywords.set("true",JSTokenizerTokenType.BoolLiteral);
			s_keywords.set("try",JSTokenizerTokenType.Try);
			s_keywords.set("typeof",JSTokenizerTokenType.Typeof);
			s_keywords.set("var",JSTokenizerTokenType.Var);
			s_keywords.set("void",JSTokenizerTokenType.Void);
			s_keywords.set("while",JSTokenizerTokenType.While);
			s_keywords.set("with",JSTokenizerTokenType.With);
			s_keywords.set("yield",JSTokenizerTokenType.Yield);
		}
		// 4 char token is only [">>>="]
		if(s_three_char_tokens.is_empty()) {
			// === is OtherPunctuator
			s_three_char_tokens.set("===",JSTokenizerTokenType.EqualsEqualsEquals);
			// !== is OtherPunctuator
			s_three_char_tokens.set("!==",JSTokenizerTokenType.ExclamationMarkEqualsEquals);
			// **= is OtherPunctuator
			s_three_char_tokens.set("**=",JSTokenizerTokenType.DoubleAsteriskEquals);
			// <<= is OtherPunctuator
			s_three_char_tokens.set("<<=",JSTokenizerTokenType.ShiftLeftEquals);
			// >>= is OtherPunctuator
			s_three_char_tokens.set(">>=",JSTokenizerTokenType.ShiftRightEquals);
			// &&= is OtherPunctuator
			s_three_char_tokens.set("&&=",JSTokenizerTokenType.DoubleAmpersandEquals);
			// ||= is OtherPunctuator
			s_three_char_tokens.set("||=",JSTokenizerTokenType.DoublePipeEquals);
			// ??= is OtherPunctuator
			s_three_char_tokens.set("\?\?=",JSTokenizerTokenType.DoubleQuestionMarkEquals);
			// >>> is OtherPunctuator
			s_three_char_tokens.set(">>>",JSTokenizerTokenType.UnsignedShiftRight);
			// ... is OtherPunctuator
			s_three_char_tokens.set("...",JSTokenizerTokenType.TripleDot);
		}
		if(s_two_char_tokens.is_empty()) {
			// => is OtherPunctuator
			s_two_char_tokens.set("=>",JSTokenizerTokenType.Arrow);
			// += is OtherPunctuator
			s_two_char_tokens.set("+=",JSTokenizerTokenType.PlusEquals);
			// -= is OtherPunctuator
			s_two_char_tokens.set("-=",JSTokenizerTokenType.MinusEquals);
			// *= is OtherPunctuator
			s_two_char_tokens.set("*=",JSTokenizerTokenType.AsteriskEquals);
			// /= is DivPunctuator
			s_two_char_tokens.set("/=",JSTokenizerTokenType.SlashEquals);
			// %= is OtherPunctuator
			s_two_char_tokens.set("%=",JSTokenizerTokenType.PercentEquals);
			// &= is OtherPunctuator
			s_two_char_tokens.set("&=",JSTokenizerTokenType.AmpersandEquals);
			// |= is OtherPunctuator
			s_two_char_tokens.set("|=",JSTokenizerTokenType.PipeEquals);
			// ^= is OtherPunctuator
			s_two_char_tokens.set("^=",JSTokenizerTokenType.CaretEquals);
			// && is OtherPunctuator
			s_two_char_tokens.set("&&",JSTokenizerTokenType.DoubleAmpersand);
			// || is OtherPunctuator
			s_two_char_tokens.set("||",JSTokenizerTokenType.DoublePipe);
			// ?? is OtherPunctuator
			s_two_char_tokens.set("??",JSTokenizerTokenType.DoubleQuestionMark);
			// ** is OtherPunctuator
			s_two_char_tokens.set("**",JSTokenizerTokenType.DoubleAsterisk);
			// == is OtherPunctuator
			s_two_char_tokens.set("==",JSTokenizerTokenType.EqualsEquals);
			// <= is OtherPunctuator
			s_two_char_tokens.set("<=",JSTokenizerTokenType.LessThanEquals);
			// >= is OtherPunctuator
			s_two_char_tokens.set(">=",JSTokenizerTokenType.GreaterThanEquals);
			// != is OtherPunctuator
			s_two_char_tokens.set("!=",JSTokenizerTokenType.ExclamationMarkEquals);
			// ++ is OtherPunctuator
			s_two_char_tokens.set("--",JSTokenizerTokenType.MinusMinus);
			// -- is OtherPunctuator
			s_two_char_tokens.set("++",JSTokenizerTokenType.PlusPlus);
			// << is OtherPunctuator
			s_two_char_tokens.set("<<",JSTokenizerTokenType.ShiftLeft);
			// >> is OtherPunctuator
			s_two_char_tokens.set(">>",JSTokenizerTokenType.ShiftRight);
			// ?. needs special handling
			s_two_char_tokens.set("?.",JSTokenizerTokenType.QuestionMarkPeriod);
		}
		if(s_single_char_tokens.is_empty()) {
			// & is OtherPunctuator
			s_single_char_tokens.set('&',JSTokenizerTokenType.Ampersand);
			// * is OtherPunctuator
			s_single_char_tokens.set('*',JSTokenizerTokenType.Asterisk);
			// [ is OtherPunctuator
			s_single_char_tokens.set('[',JSTokenizerTokenType.BracketOpen);
			// ] is OtherPunctuator
			s_single_char_tokens.set(']',JSTokenizerTokenType.BracketClose);
			// ^ is OtherPunctuator
			s_single_char_tokens.set('^',JSTokenizerTokenType.Caret);
			// : is OtherPunctuator
			s_single_char_tokens.set(':',JSTokenizerTokenType.Colon);
			// , is OtherPunctuator
			s_single_char_tokens.set(',',JSTokenizerTokenType.Comma);
			// { is OtherPunctuator
			s_single_char_tokens.set('{',JSTokenizerTokenType.CurlyOpen);
			// } is RightBracePunctuator
			s_single_char_tokens.set('}',JSTokenizerTokenType.CurlyClose);
			// = is OtherPunctuator
			s_single_char_tokens.set('=',JSTokenizerTokenType.Equals);
			// ! is OtherPunctuator
			s_single_char_tokens.set('!',JSTokenizerTokenType.ExclamationMark);
			// - is OtherPunctuator
			s_single_char_tokens.set('-',JSTokenizerTokenType.Minus);
			// ( is OtherPunctuator
			s_single_char_tokens.set('(',JSTokenizerTokenType.ParenOpen);
			// ) is OtherPunctuator
			s_single_char_tokens.set(')',JSTokenizerTokenType.ParenClose);
			// % is OtherPunctuator
			s_single_char_tokens.set('%',JSTokenizerTokenType.Percent);
			// . is OtherPunctuator
			s_single_char_tokens.set('.',JSTokenizerTokenType.Period);
			//|is OtherPunctuator
			s_single_char_tokens.set('|',JSTokenizerTokenType.Pipe);
			// + is OtherPunctuator
			s_single_char_tokens.set('+',JSTokenizerTokenType.Plus);
			// ? is OtherPunctuator
			s_single_char_tokens.set('?',JSTokenizerTokenType.QuestionMark);
			// ; is OtherPunctuator
			s_single_char_tokens.set(';',JSTokenizerTokenType.Semicolon);
			// / is DivPunctuator
			s_single_char_tokens.set('/',JSTokenizerTokenType.Slash);
			// ~ is OtherPunctuator
			s_single_char_tokens.set('~',JSTokenizerTokenType.Tilde);
			// < is OtherPunctuator
			s_single_char_tokens.set('<',JSTokenizerTokenType.LessThan);
			// > is OtherPunctuator
			s_single_char_tokens.set('>',JSTokenizerTokenType.GreaterThan);
		}
	}
	Punctuator(str: string,index: number): LexReturnType {
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
	OptionalChainingPunctuator(str: string,index: number): LexReturnType {
		if(str.slice(index,index+2)==='?.') {
			let [,num_len]=this.DecimalDigit(str,index+2);
			if(num_len>0) {
				return [null,0];
			}
			return ["OptionalChainingPunctuator",2];
		}
		return [null,0];
	}
	private DecimalDigit(str: string,index: number): LexReturnType {
		return this.m_dispatcher.DecimalDigit(str,index);
	}
	OtherPunctuator(str: string,index: number): LexReturnType {
		// >>>= is the only production of length 4
		if(str.startsWith('>>>=',index)) {
			return ['OtherPunctuator',4];
		}
		let result: string|null=null;
		s_three_char_tokens.iterate(function(key) {
			// I think all the 3 char tokens are valid as OtherPunctuator productions
			if(str.startsWith(key,index)) {
				result=key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result) return [true,3];
		result=null;
		s_two_char_tokens.iterate(function(key) {
			// skip DivPunctuator with length 2
			if(key==='/=') return IterationDecision.Continue;
			// TODO: exclude some tokens that are parsed elsewhere
			if(str.startsWith(key,index)) {
				result=key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result) return [true,2];
		result=null;
		s_single_char_tokens.iterate(function(key,_value) {
			// skip a DivPunctuator with length 1
			if(key==='/') return IterationDecision.Continue;
			// skip a RightBracePunctuator
			if(key==='{}'[1]) return IterationDecision.Continue;
			if(str[index]===key) {
				result=key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result) {
			return ['OtherPunctuator',1];
		}
		return [null,0];
	}
	DivPunctuator(str: string,index: number): LexReturnType {
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
	RightBracePunctuator(str: string,index: number): LexReturnType {
		if(str[index]==='{}'[1]) {
			return ['RightBracePunctuator',1];
		}
		return [null,0];
	}
}
