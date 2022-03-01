import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";
enum TokenType {
	Async,
	Await,
	Break,
	Case,
	Catch,
	Class,
	Const,
	Continue,
	Debugger,
	Default,
	Delete,
	Do,
	Else,
	Enum,
	Export,
	Extends,
	BoolLiteral,
	Finally,
	For,
	Function,
	If,
	Import,
	In,
	Instanceof,
	Let,
	New,
	NullLiteral,
	Return,
	Super,
	Switch,
	This,
	Throw,
	Try,
	Typeof,
	Var,
	Void,
	While,
	With,
	Yield
}
interface IHashMap<K, V> {
	clear(): void;
	is_empty(): boolean;
	get(key: K): V | undefined;
	has(key: K): boolean;
	set(key: K, value: V): this;
}
// JS strings are almost always FlyString
type FlyString = string;
class HashMap<K, V> implements IHashMap<K, V> {
	backing_map: Map<K, V> | null;
	constructor() {
		this.backing_map = null;
	}
	is_empty() {
		if(this.backing_map === null) {
			return true;
		}
		if(this.backing_map.size === 0) {
			return true;
		}
		return false;
	}
	set(key: K, value: V) {
		if(!this.backing_map) {
			this.backing_map = new Map;
		}
		this.backing_map.set(key, value);
		return this;
	}
	clear() {
		if(this.backing_map) {
			this.backing_map.clear();
		}
	}
	get(key: K) {
		return this.backing_map?.get(key);
	}
	has(key: K): boolean {
		if(!this.backing_map) {
			return false;
		}
		return this.backing_map.has(key);
	}
}
let s_keywords = new HashMap<FlyString, TokenType>;

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
		}
	
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
		}*/
	}
	Punctuator(str: string, index: number): ecma_return_type {
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
	OptionalChainingPunctuator(str: string, index: number): ecma_return_type {
		if(str.slice(index, index + 2) === '?.') {
			let [, num_len] = this.DecimalDigit(str, index + 2);
			if(num_len > 0) {
				return [null, 0];
			}
			return ["OptionalChainingPunctuator", 2];
		}
		return [null, 0];
	}
	private DecimalDigit(str: string, index: number): ecma_return_type {
		return this.m_dispatcher.DecimalDigit(str, index);
	}
	_OtherPunctuator_vec = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
	OtherPunctuator(str: string, index: number): ecma_return_type {
		let char_length = 0;
		for(let punctuator of this._OtherPunctuator_vec) {
			if(str.startsWith(punctuator, index)) {
				if(punctuator.length > char_length) {
					char_length = punctuator.length;
				}
			}
		}
		return ["OtherPunctuator", char_length];
	}
	_DivPunctuator_vec = "/ /=".split(' ');
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	DivPunctuator(str, index) {
		let char_length = 0;
		let max_len = 2;
		for(let punctuator of this._DivPunctuator_vec) {
			if(str.startsWith(punctuator, index)) {
				if(punctuator.length > char_length) {
					char_length = punctuator.length;
				}
				if(char_length === max_len) {
					break;
				}
			}
		}
		return ["DivPunctuator", char_length];
	}
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	RightBracePunctuator(str, index) {
		if(str.startsWith('{}'[1], index)) {
			return ['RightBracePunctuator', 1];
		}
		return [null, 0];
	}
}
