import {FlyString} from "../AK/FlyString";
import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./LexerBase";
import {LexReturnType} from "./LexReturnType";
import {JSTokenizerTokenType as TokenType} from "./JSTokenizerTokenType";
import {IterationDecision} from "./IterationDecision";
import {HashMap} from "./HashMap";

// HashMap<FlyString, TokenType> Lexer::s_keywords;
const s_keywords = new HashMap<FlyString, TokenType>();
// HashMap<String, TokenType> Lexer::s_three_char_tokens;
const s_three_char_tokens = new HashMap<FlyString, TokenType>();
// HashMap<String, TokenType> Lexer::s_two_char_tokens;
const s_two_char_tokens = new HashMap<FlyString, TokenType>();
// HashMap<char, TokenType> Lexer::s_single_char_tokens;
const s_single_char_tokens = new HashMap<FlyString, TokenType>();

export class ecma_12_7 extends ecma_base {
	constructor(dis: Dispatcher) {
		super(dis);
		/*
		if (s_keywords.is_empty()) {
			s_keywords.set("async", TokenType::Async);
			s_keywords.set("await", TokenType::Await);
			s_keywords.set("break", TokenType::Break);
			s_keywords.set("case", TokenType::Case);
			s_keywords.set("catch", TokenType::Catch);
			s_keywords.set("class", TokenType::Class);
			s_keywords.set("const", TokenType::Const);
			s_keywords.set("continue", TokenType::Continue);
			s_keywords.set("debugger", TokenType::Debugger);
			s_keywords.set("default", TokenType::Default);
			s_keywords.set("delete", TokenType::Delete);
			s_keywords.set("do", TokenType::Do);
			s_keywords.set("else", TokenType::Else);
			s_keywords.set("enum", TokenType::Enum);
			s_keywords.set("export", TokenType::Export);
			s_keywords.set("extends", TokenType::Extends);
			s_keywords.set("false", TokenType::BoolLiteral);
			s_keywords.set("finally", TokenType::Finally);
			s_keywords.set("for", TokenType::For);
			s_keywords.set("function", TokenType::Function);
			s_keywords.set("if", TokenType::If);
			s_keywords.set("import", TokenType::Import);
			s_keywords.set("in", TokenType::In);
			s_keywords.set("instanceof", TokenType::Instanceof);
			s_keywords.set("let", TokenType::Let);
			s_keywords.set("new", TokenType::New);
			s_keywords.set("null", TokenType::NullLiteral);
			s_keywords.set("return", TokenType::Return);
			s_keywords.set("super", TokenType::Super);
			s_keywords.set("switch", TokenType::Switch);
			s_keywords.set("this", TokenType::This);
			s_keywords.set("throw", TokenType::Throw);
			s_keywords.set("true", TokenType::BoolLiteral);
			s_keywords.set("try", TokenType::Try);
			s_keywords.set("typeof", TokenType::Typeof);
			s_keywords.set("var", TokenType::Var);
			s_keywords.set("void", TokenType::Void);
			s_keywords.set("while", TokenType::While);
			s_keywords.set("with", TokenType::With);
			s_keywords.set("yield", TokenType::Yield);
		}*/
		if(s_keywords.is_empty()) {
			s_keywords.set("async", TokenType.Async);
			s_keywords.set("await", TokenType.Await);
			s_keywords.set("break", TokenType.Break);
			s_keywords.set("case", TokenType.Case);
			s_keywords.set("catch", TokenType.Catch);
			s_keywords.set("class", TokenType.Class);
			s_keywords.set("const", TokenType.Const);
			s_keywords.set("continue", TokenType.Continue);
			s_keywords.set("debugger", TokenType.Debugger);
			s_keywords.set("default", TokenType.Default);
			s_keywords.set("delete", TokenType.Delete);
			s_keywords.set("do", TokenType.Do);
			s_keywords.set("else", TokenType.Else);
			s_keywords.set("enum", TokenType.Enum);
			s_keywords.set("export", TokenType.Export);
			s_keywords.set("extends", TokenType.Extends);
			s_keywords.set("false", TokenType.BoolLiteral);
			s_keywords.set("finally", TokenType.Finally);
			s_keywords.set("for", TokenType.For);
			s_keywords.set("function", TokenType.Function);
			s_keywords.set("if", TokenType.If);
			s_keywords.set("import", TokenType.Import);
			s_keywords.set("in", TokenType.In);
			s_keywords.set("instanceof", TokenType.Instanceof);
			s_keywords.set("let", TokenType.Let);
			s_keywords.set("new", TokenType.New);
			s_keywords.set("null", TokenType.NullLiteral);
			s_keywords.set("return", TokenType.Return);
			s_keywords.set("super", TokenType.Super);
			s_keywords.set("switch", TokenType.Switch);
			s_keywords.set("this", TokenType.This);
			s_keywords.set("throw", TokenType.Throw);
			s_keywords.set("true", TokenType.BoolLiteral);
			s_keywords.set("try", TokenType.Try);
			s_keywords.set("typeof", TokenType.Typeof);
			s_keywords.set("var", TokenType.Var);
			s_keywords.set("void", TokenType.Void);
			s_keywords.set("while", TokenType.While);
			s_keywords.set("with", TokenType.With);
			s_keywords.set("yield", TokenType.Yield);
		}
		/*
		if (s_three_char_tokens.is_empty()) {
			s_three_char_tokens.set("===", TokenType::EqualsEqualsEquals);
			s_three_char_tokens.set("!==", TokenType::ExclamationMarkEqualsEquals);
			s_three_char_tokens.set("**=", TokenType::DoubleAsteriskEquals);
			s_three_char_tokens.set("<<=", TokenType::ShiftLeftEquals);
			s_three_char_tokens.set(">>=", TokenType::ShiftRightEquals);
			s_three_char_tokens.set("&&=", TokenType::DoubleAmpersandEquals);
			s_three_char_tokens.set("||=", TokenType::DoublePipeEquals);
			s_three_char_tokens.set("\?\?=", TokenType::DoubleQuestionMarkEquals);
			s_three_char_tokens.set(">>>", TokenType::UnsignedShiftRight);
			s_three_char_tokens.set("...", TokenType::TripleDot);
		}*/
		// 4 char token is only [">>>="]
		if(s_three_char_tokens.is_empty()) {
			// === is OtherPunctuator
			s_three_char_tokens.set("===", TokenType.EqualsEqualsEquals);
			// !== is OtherPunctuator
			s_three_char_tokens.set("!==", TokenType.ExclamationMarkEqualsEquals);
			// **= is OtherPunctuator
			s_three_char_tokens.set("**=", TokenType.DoubleAsteriskEquals);
			// <<= is OtherPunctuator
			s_three_char_tokens.set("<<=", TokenType.ShiftLeftEquals);
			// >>= is OtherPunctuator
			s_three_char_tokens.set(">>=", TokenType.ShiftRightEquals);
			// &&= is OtherPunctuator
			s_three_char_tokens.set("&&=", TokenType.DoubleAmpersandEquals);
			// ||= is OtherPunctuator
			s_three_char_tokens.set("||=", TokenType.DoublePipeEquals);
			// ??= is OtherPunctuator
			s_three_char_tokens.set("\?\?=", TokenType.DoubleQuestionMarkEquals);
			// >>> is OtherPunctuator
			s_three_char_tokens.set(">>>", TokenType.UnsignedShiftRight);
			// ... is OtherPunctuator
			s_three_char_tokens.set("...", TokenType.TripleDot);
		}
		/*
		if (s_two_char_tokens.is_empty()) {
			s_two_char_tokens.set("=>", TokenType::Arrow);
			s_two_char_tokens.set("+=", TokenType::PlusEquals);
			s_two_char_tokens.set("-=", TokenType::MinusEquals);
			s_two_char_tokens.set("*=", TokenType::AsteriskEquals);
			s_two_char_tokens.set("/=", TokenType::SlashEquals);
			s_two_char_tokens.set("%=", TokenType::PercentEquals);
			s_two_char_tokens.set("&=", TokenType::AmpersandEquals);
			s_two_char_tokens.set("|=", TokenType::PipeEquals);
			s_two_char_tokens.set("^=", TokenType::CaretEquals);
			s_two_char_tokens.set("&&", TokenType::DoubleAmpersand);
			s_two_char_tokens.set("||", TokenType::DoublePipe);
			s_two_char_tokens.set("??", TokenType::DoubleQuestionMark);
			s_two_char_tokens.set("**", TokenType::DoubleAsterisk);
			s_two_char_tokens.set("==", TokenType::EqualsEquals);
			s_two_char_tokens.set("<=", TokenType::LessThanEquals);
			s_two_char_tokens.set(">=", TokenType::GreaterThanEquals);
			s_two_char_tokens.set("!=", TokenType::ExclamationMarkEquals);
			s_two_char_tokens.set("--", TokenType::MinusMinus);
			s_two_char_tokens.set("++", TokenType::PlusPlus);
			s_two_char_tokens.set("<<", TokenType::ShiftLeft);
			s_two_char_tokens.set(">>", TokenType::ShiftRight);
			s_two_char_tokens.set("?.", TokenType::QuestionMarkPeriod);
		}
		*/
		if(s_two_char_tokens.is_empty()) {
			// => is OtherPunctuator
			s_two_char_tokens.set("=>", TokenType.Arrow);
			// += is OtherPunctuator
			s_two_char_tokens.set("+=", TokenType.PlusEquals);
			// -= is OtherPunctuator
			s_two_char_tokens.set("-=", TokenType.MinusEquals);
			// *= is OtherPunctuator
			s_two_char_tokens.set("*=", TokenType.AsteriskEquals);
			// /= is DivPunctuator
			s_two_char_tokens.set("/=", TokenType.SlashEquals);
			// %= is OtherPunctuator
			s_two_char_tokens.set("%=", TokenType.PercentEquals);
			// &= is OtherPunctuator
			s_two_char_tokens.set("&=", TokenType.AmpersandEquals);
			// |= is OtherPunctuator
			s_two_char_tokens.set("|=", TokenType.PipeEquals);
			// ^= is OtherPunctuator
			s_two_char_tokens.set("^=", TokenType.CaretEquals);
			// && is OtherPunctuator
			s_two_char_tokens.set("&&", TokenType.DoubleAmpersand);
			// || is OtherPunctuator
			s_two_char_tokens.set("||", TokenType.DoublePipe);
			// ?? is OtherPunctuator
			s_two_char_tokens.set("??", TokenType.DoubleQuestionMark);
			// ** is OtherPunctuator
			s_two_char_tokens.set("**", TokenType.DoubleAsterisk);
			// == is OtherPunctuator
			s_two_char_tokens.set("==", TokenType.EqualsEquals);
			// <= is OtherPunctuator
			s_two_char_tokens.set("<=", TokenType.LessThanEquals);
			// >= is OtherPunctuator
			s_two_char_tokens.set(">=", TokenType.GreaterThanEquals);
			// != is OtherPunctuator
			s_two_char_tokens.set("!=", TokenType.ExclamationMarkEquals);
			// ++ is OtherPunctuator
			s_two_char_tokens.set("--", TokenType.MinusMinus);
			// -- is OtherPunctuator
			s_two_char_tokens.set("++", TokenType.PlusPlus);
			// << is OtherPunctuator
			s_two_char_tokens.set("<<", TokenType.ShiftLeft);
			// >> is OtherPunctuator
			s_two_char_tokens.set(">>", TokenType.ShiftRight);
			// ?. needs special handling
			s_two_char_tokens.set("?.", TokenType.QuestionMarkPeriod);
		}
		/*
		if (s_single_char_tokens.is_empty()) {
			s_single_char_tokens.set('&', TokenType::Ampersand);
			s_single_char_tokens.set('*', TokenType::Asterisk);
			s_single_char_tokens.set('[', TokenType::BracketOpen);
			s_single_char_tokens.set(']', TokenType::BracketClose);
			s_single_char_tokens.set('^', TokenType::Caret);
			s_single_char_tokens.set(':', TokenType::Colon);
			s_single_char_tokens.set(',', TokenType::Comma);
			s_single_char_tokens.set('{', TokenType::CurlyOpen);
			s_single_char_tokens.set('}', TokenType::CurlyClose);
			s_single_char_tokens.set('=', TokenType::Equals);
			s_single_char_tokens.set('!', TokenType::ExclamationMark);
			s_single_char_tokens.set('-', TokenType::Minus);
			s_single_char_tokens.set('(', TokenType::ParenOpen);
			s_single_char_tokens.set(')', TokenType::ParenClose);
			s_single_char_tokens.set('%', TokenType::Percent);
			s_single_char_tokens.set('.', TokenType::Period);
			s_single_char_tokens.set('|', TokenType::Pipe);
			s_single_char_tokens.set('+', TokenType::Plus);
			s_single_char_tokens.set('?', TokenType::QuestionMark);
			s_single_char_tokens.set(';', TokenType::Semicolon);
			s_single_char_tokens.set('/', TokenType::Slash);
			s_single_char_tokens.set('~', TokenType::Tilde);
			s_single_char_tokens.set('<', TokenType::LessThan);
			s_single_char_tokens.set('>', TokenType::GreaterThan);
		}
		*/
		if(s_single_char_tokens.is_empty()) {
			// & is OtherPunctuator
			s_single_char_tokens.set('&', TokenType.Ampersand);
			// * is OtherPunctuator
			s_single_char_tokens.set('*', TokenType.Asterisk);
			// [ is OtherPunctuator
			s_single_char_tokens.set('[', TokenType.BracketOpen);
			// ] is OtherPunctuator
			s_single_char_tokens.set(']', TokenType.BracketClose);
			// ^ is OtherPunctuator
			s_single_char_tokens.set('^', TokenType.Caret);
			// : is OtherPunctuator
			s_single_char_tokens.set(':', TokenType.Colon);
			// , is OtherPunctuator
			s_single_char_tokens.set(',', TokenType.Comma);
			// { is OtherPunctuator
			s_single_char_tokens.set('{', TokenType.CurlyOpen);
			// } is RightBracePunctuator
			s_single_char_tokens.set('}', TokenType.CurlyClose);
			// = is OtherPunctuator
			s_single_char_tokens.set('=', TokenType.Equals);
			// ! is OtherPunctuator
			s_single_char_tokens.set('!', TokenType.ExclamationMark);
			// - is OtherPunctuator
			s_single_char_tokens.set('-', TokenType.Minus);
			// ( is OtherPunctuator
			s_single_char_tokens.set('(', TokenType.ParenOpen);
			// ) is OtherPunctuator
			s_single_char_tokens.set(')', TokenType.ParenClose);
			// % is OtherPunctuator
			s_single_char_tokens.set('%', TokenType.Percent);
			// . is OtherPunctuator
			s_single_char_tokens.set('.', TokenType.Period);
			// | is OtherPunctuator
			s_single_char_tokens.set('|', TokenType.Pipe);
			// + is OtherPunctuator
			s_single_char_tokens.set('+', TokenType.Plus);
			// ? is OtherPunctuator
			s_single_char_tokens.set('?', TokenType.QuestionMark);
			// ; is OtherPunctuator
			s_single_char_tokens.set(';', TokenType.Semicolon);
			// / is DivPunctuator
			s_single_char_tokens.set('/', TokenType.Slash);
			// ~ is OtherPunctuator
			s_single_char_tokens.set('~', TokenType.Tilde);
			// < is OtherPunctuator
			s_single_char_tokens.set('<', TokenType.LessThan);
			// > is OtherPunctuator
			s_single_char_tokens.set('>', TokenType.GreaterThan);
		}
	}
	Punctuator(str: string, index: number): LexReturnType {
		var len = 0, type = null, ret;
		ret = this.OptionalChainingPunctuator(str, index);
		if(ret[0] && ret[1] > len) {
			type = ret[0];
			len = ret[1];
		}
		ret = this.OtherPunctuator(str, index);
		if(ret[0] && ret[1] > len) {
			type = ret[0];
			len = ret[1];
		}
		return [type, len];
	}
	OptionalChainingPunctuator(str: string, index: number): LexReturnType {
		if(str.slice(index, index + 2) === '?.') {
			let [, num_len] = this.DecimalDigit(str, index + 2);
			if(num_len > 0) {
				return [null, 0];
			}
			return ["OptionalChainingPunctuator", 2];
		}
		return [null, 0];
	}
	private DecimalDigit(str: string, index: number): LexReturnType {
		return this.m_dispatcher.DecimalDigit(str, index);
	}
	OtherPunctuator(str: string, index: number): LexReturnType {
		// >>>= is the only production of length 4
		if(str.startsWith('>>>=', index)) {
			return ['OtherPunctuator', 4];
		}
		let result: string | null = null;
		s_three_char_tokens.iterate(function(key, value) {
			// I think all the 3 char tokens are valid as OtherPunctuator productions
			if(str.startsWith(key, index)) {
				result = key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result) return [true, 3];
		result = null;
		s_two_char_tokens.iterate(function(key, value) {
			// skip DivPunctuator with length 2
			if(key === '/=') return IterationDecision.Continue;
			// TODO: exclude some tokens that are parsed elsewhere
			if(str.startsWith(key, index)) {
				result = key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result) return [true, 2];
		result = null;
		s_single_char_tokens.iterate(function(key, _value) {
			// skip a DivPunctuator with length 1
			if(key === '/') return IterationDecision.Continue;
			// skip a RightBracePunctuator
			if(key === '{}'[1]) return IterationDecision.Continue;
			if(str[index] === key) {
				result = key;
				return IterationDecision.Break;
			}
			return IterationDecision.Continue;
		});
		if(result){
			return ['OtherPunctuator', 1];
		}
		return [null, 0];
	}
	DivPunctuator(str: string, index: number):LexReturnType {
		let char_len = 0;
		// `/`
		if(str.startsWith('/', index)) {
			char_len = 1;
		}
		// `/=`
		if(str.startsWith('/=', index)) {
			char_len = 2;
		}
		if(char_len > 0) {
			return ["DivPunctuator", char_len];
		}
		return [null, 0];
	}
	RightBracePunctuator(str: string, index: number):LexReturnType {
		if(str[index] === '{}'[1]) {
			return ['RightBracePunctuator', 1];
		}
		return [null, 0];
	}
}
