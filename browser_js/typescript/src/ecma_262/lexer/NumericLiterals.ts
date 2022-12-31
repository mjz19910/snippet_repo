import {Dispatcher} from "./Dispatcher.js"
import {is_octal_digit} from "../is_octal_digit.js"
import {LexerBase} from "./LexerBase.js"
import {LexReturnType} from "./LexReturnType.js"
import {TokenType} from "../TokenType.js"
import {is_ascii_digit} from "./is_ascii_digit";

// https://tc39.es/ecma262/#sec-literals-numeric-literals
export class NumericLiterals extends LexerBase {
	result_error_token: ['Error',string]|null=null
	/*HexDigits[Sep] */
	// https://tc39.es/ecma262/#prod-HexDigits
	HexDigits(str: string,index: number): LexReturnType {
		let cur
		cur=this.HexDigit(str,index)
		let nx=this.HexDigit(str,index)
		if(cur[0]&&cur[1]>0&&(!nx[0])) {
			return ["HexDigits",1]
		}
		// HexDigit
		// HexDigits[?Sep] HexDigit
		cur=this.HexDigits(str,index)
		if(cur[0]&&cur[1]) {
			nx=this.HexDigit(str,index)
			if(nx[0]&&nx[1]>0) {
				return ["HexDigits",cur[1]+nx[1]]
			}
		}
		// [+Sep] HexDigits[+Sep] NumericLiteralSeparator HexDigit
		// Alternative omitted ([+Sep])
		return [null,0]

	}
	HexDigits_Sep(str: string,index: number): LexReturnType {
		let cur=this.HexDigit(str,index)
		let nx=this.HexDigit(str,index)
		if(cur[0]&&cur[1]>0&&(!nx[0])) {
			return ["HexDigits_Sep",1]
		}
		// HexDigits[?Sep] HexDigit
		cur=this.HexDigits_Sep(str,index)
		if(cur[0]&&cur[1]) {
			nx=this.HexDigits_Sep(str,index)
			if(nx[0]&&nx[1]>0) {
				return ["HexDigits_Sep",cur[1]+nx[1]]
			}
		}
		// [+Sep] HexDigits[+Sep] NumericLiteralSeparator HexDigit
		cur=this.HexDigits_Sep(str,index)
		if(cur[0]&&cur[1]) {
			nx=this.NumericLiteralSeparator(str,index+cur[1])
			if(nx[0]&&nx[1]>0) {
				let n3=this.HexDigit(str,index+cur[1]+nx[1])
				if(n3[0]&&n3[1]>0) {
					return ["HexDigits_Sep",cur[1]+nx[1]+n3[1]]
				}
			}
		}
		return [null,0]
	}
	token_type: TokenType
	token_message: string
	constructor(dis: Dispatcher) {
		super(dis)
		this.token_type=TokenType.Invalid
		this.token_message="There is no token"
	}
	m_source!: string
	m_position!: number
	m_current_char!: string
	m_initialized=false
	init() {
		this.m_current_char=this.m_source[this.m_position]
	}
	consume() {
		/*
	auto did_reach_eof = [this] {
		if (m_position < m_source.length())
			return false
		m_eof = true
		m_current_char = '\0'
		m_position = m_source.length() + 1
		m_line_column++
		return true
	}

	if (m_position > m_source.length())
		return

	if (did_reach_eof())
		return

	if (is_line_terminator()) {
		if constexpr (LEXER_DEBUG) {
			String type
			if (m_current_char == '\n')
				type = "LINE FEED"
			else if (m_current_char == '\r')
				type = "CARRIAGE RETURN"
			else if (m_source[m_position + 1] == (char)0xa8)
				type = "LINE SEPARATOR"
			else
				type = "PARAGRAPH SEPARATOR"
			dbgln("Found a line terminator: {}", type)
		}
		// This is a three-char line terminator, we need to increase m_position some more.
		// We might reach EOF and need to check again.
		if (m_current_char != '\n' && m_current_char != '\r') {
			m_position += 2
			if (did_reach_eof())
				return
		}

		// If the previous character is \r and the current one \n we already updated line number
		// and column - don't do it again. From https://tc39.es/ecma262/#sec-line-terminators:
		//   The sequence <CR><LF> is commonly used as a line terminator.
		//   It should be considered a single SourceCharacter for the purpose of reporting line numbers.
		auto second_char_of_crlf = m_position > 1 && m_source[m_position - 2] == '\r' && m_current_char == '\n'

		if (!second_char_of_crlf) {
			m_line_number++
			m_line_column = 1
			dbgln_if(LEXER_DEBUG, "Incremented line number, now at: line {}, column 1", m_line_number)
		} else {
			dbgln_if(LEXER_DEBUG, "Previous was CR, this is LF - not incrementing line number again.")
		}
	} else if (is_unicode_character()) {
		size_t char_size = 1
		if ((m_current_char & 64) == 0) {
			m_hit_invalid_unicode = m_position
		} else if ((m_current_char & 32) == 0) {
			char_size = 2
		} else if ((m_current_char & 16) == 0) {
			char_size = 3
		} else if ((m_current_char & 8) == 0) {
			char_size = 4
		}

		VERIFY(char_size >= 1)
		--char_size

		for (size_t i = m_position; i < m_position + char_size; i++) {
			if (i >= m_source.length() || (m_source[i] & 0b11000000) != 0b10000000) {
				m_hit_invalid_unicode = m_position
				break
			}
		}

		if (m_hit_invalid_unicode.has_value())
			m_position = m_source.length()
		else
			m_position += char_size

		if (did_reach_eof())
			return

		m_line_column++
	} else {
		m_line_column++
	}

	m_current_char = m_source[m_position++] */
		this.m_position++
		this.m_current_char=this.m_source[this.m_position]
	}
	m_current_char_() {
		return this.m_current_char
	}
	// template<typename Callback>
	// bool Lexer::match_numeric_literal_separator_followed_by(Callback callback) const
	match_numeric_literal_separator_followed_by<Callback extends Function>(callback: Callback): boolean {
		if(this.m_position>=this.m_source.length) return false
		return this.m_current_char=='_'&&callback(this.m_source[this.m_position])
	}
	consume_decimal_number(): boolean {
		if(!is_ascii_digit(this.m_current_char))
			return false

		while(is_ascii_digit(this.m_current_char)||this.match_numeric_literal_separator_followed_by(is_ascii_digit)) {
			this.consume()
		}
		return true
	}
	consume_exponent(): boolean {
		this.consume()
		if(this.m_current_char=='-'||this.m_current_char=='+') {
			this.consume()
		}
		if(!is_ascii_digit(this.m_current_char)) return false
		return this.consume_decimal_number()
	}
	DecimalDigit(str: string,index: number): LexReturnType {
		if(str.charCodeAt(index)>=48&&str.charCodeAt(index)<=57) {
			return ["DecimalDigit",1]
		}
		return [null,0]
	}
	/*bool Lexer::is_numeric_literal_start() const
	{
		return is_ascii_digit(m_current_char) || (m_current_char == '.' && m_position < m_source.length() && is_ascii_digit(m_source[m_position]))
	}*/
	is_numeric_literal_start() {
		return is_ascii_digit(this.m_current_char)||
			(
				this.m_current_char=='.'&&
				this.m_position<this.m_source.length&&
				is_ascii_digit(this.m_source[this.m_position])
			)
	}
	/*
	// C++ from SerenityOS's LibJS Lexer::next()
	if (is_numeric_literal_start()) { */
	NumericLiteral(str: string,index: number): LexReturnType {
		// token_type = TokenType::NumericLiteral
		this.token_type=TokenType.NumericLiteral
		// bool is_invalid_numeric_literal = false
		let is_invalid_numeric_literal=false
		if(index>=str.length) {
			return [null,0]
		}
		this.m_source=str
		this.m_position=index
		this.init()
		if(!this.is_numeric_literal_start()) {
			return [null,0]
		}
		/*if (m_current_char == '0') {
			// into js
		}*/
		if(this.m_current_char_()==='0') {
			this.consume()
			// typechecking failed us, need to use a
			// function return type to indirectly access
			// m_current_char as that was inferred to be '0'
			/*if (m_current_char == '.') {
				// to_js
			}*/
			if(this.m_current_char_()=='.') {
				// decimal
				this.consume()
				while(is_ascii_digit(this.m_current_char)) {
					this.consume()
				}
				if(this.m_current_char_()=='e'||this.m_current_char_()=='E') {
					is_invalid_numeric_literal=!this.consume_exponent()
				}
			}
			/*else if (m_current_char == 'e' || m_current_char == 'E') {
				is_invalid_numeric_literal = !consume_exponent()
			}*/
			else if(this.m_current_char_()=='e'||this.m_current_char_()=='E') {
				is_invalid_numeric_literal=!this.consume_exponent()
			}
			/*else if (m_current_char == 'o' || m_current_char == 'O') {
				// octal
				is_invalid_numeric_literal = !consume_octal_number()
				if (m_current_char == 'n') {
					consume()
					token_type = TokenType::BigIntLiteral
				}
			}*/
			else if(this.m_current_char_()=='o'||this.m_current_char_()=='O') {
				// octal
				is_invalid_numeric_literal=!this.consume_octal_number()
				if(this.m_current_char_()=='n') {
					this.consume()
					this.token_type=TokenType.BigIntLiteral
				}
			}
			/*else if (m_current_char == 'b' || m_current_char == 'B') {
				// binary
				is_invalid_numeric_literal = !consume_binary_number()
				if (m_current_char == 'n') {
					consume()
					token_type = TokenType::BigIntLiteral
				}
			}*/
			else if(this.m_current_char_()=='b'||this.m_current_char_()=='B') {
				// binary
				is_invalid_numeric_literal=!this.consume_binary_number()
				if(this.m_current_char_()=='n') {
					this.consume()
					this.token_type=TokenType.BigIntLiteral
				}
			}
			/*else if (m_current_char == 'x' || m_current_char == 'X') {
				// hexadecimal
				is_invalid_numeric_literal = !consume_hexadecimal_number()
				if (m_current_char == 'n') {
					consume()
					token_type = TokenType::BigIntLiteral
				}
			}*/
			else if(this.m_current_char_()=='x'||this.m_current_char_()=='X') {
				// hexadecimal
				is_invalid_numeric_literal=!this.consume_hexadecimal_number()
				if(this.m_current_char_()=='n') {
					this.consume()
					this.token_type=TokenType.BigIntLiteral
				}
			}
			/*else if (m_current_char == 'n') {
				consume()
				token_type = TokenType::BigIntLiteral
			}*/
			else if(this.m_current_char=='n') {
				this.consume()
				this.token_type=TokenType.BigIntLiteral
			}
			/*else if (is_ascii_digit(m_current_char)) {
				// octal without '0o' prefix. Forbidden in 'strict mode'
				do {
					consume()
				} while (is_ascii_digit(m_current_char))
			}*/
			else if(is_ascii_digit(this.m_current_char)) {
				// octal without '0o' prefix. Forbidden in 'strict mode'
				if(this.m_dispatcher.environment_settings.is_strict) {
					this.result_error_token=['Error',"Strict mode violation"]
				}
				do {
					this.consume()
				} while(is_ascii_digit(this.m_current_char))
			}
		}
		/*else {
			// to_js_block
		}*/
		else {
			// 1...9 or period
			/*while (is_ascii_digit(m_current_char) || match_numeric_literal_separator_followed_by(is_ascii_digit))
				consume()*/
			while(is_ascii_digit(this.m_current_char)||this.match_numeric_literal_separator_followed_by(is_ascii_digit))
				this.consume()
			/*if (m_current_char == 'n') {
				consume()
				token_type = TokenType::BigIntLiteral
			}*/
			if(this.m_current_char=='n') {
				this.consume()
				this.token_type=TokenType.BigIntLiteral
			}
			/*
			else {
				// to_js_block
			}*/
			else {
				/*if (m_current_char == '.') {
					consume()
					if (m_current_char == '_')
						is_invalid_numeric_literal = true

					while (is_ascii_digit(m_current_char) || match_numeric_literal_separator_followed_by(is_ascii_digit)) {
						consume()
					}
				}*/
				if(this.m_current_char=='.') {
					this.consume()
					if(this.m_current_char_()=='_')
						is_invalid_numeric_literal=true

					while(is_ascii_digit(this.m_current_char)||this.match_numeric_literal_separator_followed_by(is_ascii_digit)) {
						this.consume()
					}
				}
				/*if (m_current_char == 'e' || m_current_char == 'E')
					is_invalid_numeric_literal = is_invalid_numeric_literal || !consume_exponent()*/
				if(this.m_current_char=='e'||this.m_current_char=='E')
					is_invalid_numeric_literal=is_invalid_numeric_literal||!this.consume_exponent()
			}

		}
		if(is_invalid_numeric_literal) {
			this.token_type=TokenType.Invalid
			this.token_message="Invalid numeric literal"
		}
		if(this.token_type===TokenType.Invalid) {
			return [null,0]
		}
		if(this.result_error_token) {
			return [this.result_error_token,this.m_position-index]
		}
		return ["NumericLiteral",this.m_position-index]
	}
	consume_hexadecimal_number(): boolean {
		throw new Error("Method not implemented.")
	}
	consume_binary_number(): boolean {
		throw new Error("Method not implemented.")
	}
	consume_octal_number() {
		//consume()
		this.consume()
		/*if (!is_octal_digit(m_current_char))
			return false*/
		if(!is_octal_digit(this.m_current_char))
			return false

		/*while (is_octal_digit(m_current_char) || match_numeric_literal_separator_followed_by(is_octal_digit))
		consume()*/
		while(is_octal_digit(this.m_current_char)||this.match_numeric_literal_separator_followed_by(is_octal_digit))
			this.consume()

		return true
	}
	DecimalLiteral(str: string,index: number): LexReturnType {
		if(str[index]==='0') {
			return ["DecimalLiteral",1]
		}
		let [,zd_len]=this.NonZeroDigit(str,index)
		let off=0
		if(zd_len===1) {
			off+=1
			let [,ns_len]=this.NumericLiteralSeparator(str,index+off)
			if(ns_len>0) {
				off++
			}
			let dd_r=this.DecimalDigits(str,index+off)
			if(!dd_r[0]) throw dd_r[1]
			return ["DecimalLiteral",dd_r[1]+off]
		}
		return ["DecimalLiteral",off]
	}
	// DecimalDigits[~Sep]
	DecimalDigits(str: string,index: number): LexReturnType {
		// DecimalDigit
		let off=0
		for(;;) {
			let [,len]=this.DecimalDigit(str,index+off)
			if(len>0) {
				off++
				continue
			}
			break
		}
		return ["DecimalDigits",off]
	}
	// DecimalDigits[+Sep]
	DecimalDigits_Sep(str: string,index: number): LexReturnType {
		let off=0
		for(;;) {
			// DecimalDigit
			let [,len]=this.DecimalDigit(str,index+off)
			if(len>0) {
				off++
				// DecimalDigits[?Sep] DecimalDigit
				continue
			}
			// [+Sep] DecimalDigits[+Sep] (NumericLiteralSeparator DecimalDigit)
			let [,s_len]=this.NumericLiteralSeparator(str,index+off)
			if(s_len>0) {
				let [,exl]=this.DecimalDigit(str,index+off+1)
				if(exl>0) {
					off++
					// [+Sep] (DecimalDigits[+Sep]) NumericLiteralSeparator DecimalDigit
					continue
				}
				break
			}
			break
		}
		return ["DecimalDigits",off]
	}
	NonZeroDigit(str: string,index: number): LexReturnType {
		if(str.charCodeAt(index)>=49&&str.charCodeAt(index)<=57) {
			return ["NonZeroDigit",1]
		}
		return [null,0]
	}
	NumericLiteralSeparator(str: string,index: number): LexReturnType {
		if(str[index]==='_') {
			return ["NumericLiteralSeparator",1]
		}
		return [null,0]
	}
	// https://tc39.es/ecma262/#prod-DecimalIntegerLiteral
	DecimalIntegerLiteral(str: string,index: number) {
		let len=0
		// 0
		if(str[index]==='0') {
			len++
		}
		{
			// NonZeroDigit
			let tmp=this.NonZeroDigit(str,index)
			if(tmp[0]&&tmp[1]>len) {
				len=tmp[1]
			}
		}
		// NonZeroDigit NumericLiteralSeparator opt DecimalDigits[+Sep]
		{
			let tmp_len=0
			let tmp=this.NonZeroDigit(str,index+tmp_len)
			if(tmp[0]) {
				tmp_len+=tmp[1]
				let t2=this.NumericLiteralSeparator(str,index+tmp_len)
				if(t2[0]) {
					tmp_len+=t2[1]
				}
				this.DecimalDigits_Sep(str,index)
			}
		}
	}
	NonOctalDecimalIntegerLiteral(str: string,index: number): LexReturnType {
		// 0 NonOctalDigit
		non_oct: if(str[index]==='0') {
			let tmp=this.NonOctalDigit(str,index+1)
			if(!tmp[0]) {
				break non_oct
			}
			return ["NonOctalDecimalIntegerLiteral",1+tmp[1]]
		}
		// LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit
		let tmp=this.LegacyOctalLikeDecimalIntegerLiteral(str,index)
		not_int_1: if(tmp[0]===true) {
			let tmp2=this.NonOctalDigit(str,index+1)
			if(tmp2[0]===true) {
				return ["NonOctalDecimalIntegerLiteral",2]
			}
		}
		throw new Error("Not implemented")
	}
	OctalDigit(str: string,index: number): LexReturnType {
		// 0 1 2 3 4 5 6 7
		if(str.charCodeAt(index)>='0'.charCodeAt(0)&&str.charCodeAt(index)<='7'.charCodeAt(0)) {
			return ["OctalDigit",1]
		}
		return [null,0]
	}
	LegacyOctalLikeDecimalIntegerLiteral(str: string,index: number): LexReturnType {
		let len=0
		// 0 OctalDigit
		is_oct: if(str[index]==='0') {
			len++
			let tmp=this.OctalDigit(str,index+len)
			while(tmp[0]) {
				tmp=this.OctalDigit(str,index+len)
				if(tmp[0]) {
					len++
				}
			}
			return ["LegacyOctalLikeDecimalIntegerLiteral",len+1]
		}
		let tmp=this.OctalDigit(str,index+2);
		console.error("todo", tmp);
		throw new Error("Not implemented");
	}
	NonOctalDigit(str: string,index: number): LexReturnType {
		if(str[index]==='8'||str[index]==='9') {
			return ["NonOctalDigit",1]
		}
		return [null,0]
	}
	HexDigit(str: string,index: number): LexReturnType {
		if(str.charCodeAt(index)>='0'.charCodeAt(0)&&str.charCodeAt(index)<='9'.charCodeAt(0)) {
			return ["HexDigit",1]
		}
		if(str.charCodeAt(index)>='a'.charCodeAt(0)&&str.charCodeAt(index)<='f'.charCodeAt(0)) {
			return ["HexDigit",1]
		}
		if(str.charCodeAt(index)>='A'.charCodeAt(0)&&str.charCodeAt(index)<='F'.charCodeAt(0)) {
			return ["HexDigit",1]
		}
		return [null,0]
	}
}
