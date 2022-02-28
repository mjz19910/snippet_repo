import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

function consume_exponent(){

}

export class ecma_12_8_3 extends ecma_base {
	token_type:string;
	token_message:string;
	constructor(dis: Dispatcher){
		super(dis);
		this.token_type="None";
		this.token_message="There is no token";
	}
	m_source!:string;
	m_position!:number;
	m_current_char!:string;
	consume() {
		/*    auto did_reach_eof = [this] {
        if (m_position < m_source.length())
            return false;
        m_eof = true;
        m_current_char = '\0';
        m_position = m_source.length() + 1;
        m_line_column++;
        return true;
    };

    if (m_position > m_source.length())
        return;

    if (did_reach_eof())
        return;

    if (is_line_terminator()) {
        if constexpr (LEXER_DEBUG) {
            String type;
            if (m_current_char == '\n')
                type = "LINE FEED";
            else if (m_current_char == '\r')
                type = "CARRIAGE RETURN";
            else if (m_source[m_position + 1] == (char)0xa8)
                type = "LINE SEPARATOR";
            else
                type = "PARAGRAPH SEPARATOR";
            dbgln("Found a line terminator: {}", type);
        }
        // This is a three-char line terminator, we need to increase m_position some more.
        // We might reach EOF and need to check again.
        if (m_current_char != '\n' && m_current_char != '\r') {
            m_position += 2;
            if (did_reach_eof())
                return;
        }

        // If the previous character is \r and the current one \n we already updated line number
        // and column - don't do it again. From https://tc39.es/ecma262/#sec-line-terminators:
        //   The sequence <CR><LF> is commonly used as a line terminator.
        //   It should be considered a single SourceCharacter for the purpose of reporting line numbers.
        auto second_char_of_crlf = m_position > 1 && m_source[m_position - 2] == '\r' && m_current_char == '\n';

        if (!second_char_of_crlf) {
            m_line_number++;
            m_line_column = 1;
            dbgln_if(LEXER_DEBUG, "Incremented line number, now at: line {}, column 1", m_line_number);
        } else {
            dbgln_if(LEXER_DEBUG, "Previous was CR, this is LF - not incrementing line number again.");
        }
    } else if (is_unicode_character()) {
        size_t char_size = 1;
        if ((m_current_char & 64) == 0) {
            m_hit_invalid_unicode = m_position;
        } else if ((m_current_char & 32) == 0) {
            char_size = 2;
        } else if ((m_current_char & 16) == 0) {
            char_size = 3;
        } else if ((m_current_char & 8) == 0) {
            char_size = 4;
        }

        VERIFY(char_size >= 1);
        --char_size;

        for (size_t i = m_position; i < m_position + char_size; i++) {
            if (i >= m_source.length() || (m_source[i] & 0b11000000) != 0b10000000) {
                m_hit_invalid_unicode = m_position;
                break;
            }
        }

        if (m_hit_invalid_unicode.has_value())
            m_position = m_source.length();
        else
            m_position += char_size;

        if (did_reach_eof())
            return;

        m_line_column++;
    } else {
        m_line_column++;
    }

    m_current_char = m_source[m_position++];
	 */
		this.m_current_char = this.m_source[this.m_position++];
	}
	m_current_char_get() {
		return this.m_current_char;
	}
	// constexpr bool is_ascii_digit(u32 code_point)
	is_ascii_digit(code_point:string){
		return code_point.charCodeAt(0) >= '0'.charCodeAt(0) &&
			code_point.charCodeAt(0) <= '9'.charCodeAt(0);
	}
	// template<typename Callback>
	// bool Lexer::match_numeric_literal_separator_followed_by(Callback callback) const
	match_numeric_literal_separator_followed_by<Callback extends Function>(callback:Callback):boolean {
		if (this.m_position >= this.m_source.length) return false;
		return this.m_current_char == '_' && callback(this.m_source[this.m_position]);
	}
	consume_decimal_number():boolean {
		if (!this.is_ascii_digit(this.m_current_char))
        	return false;

    	while (this.is_ascii_digit(this.m_current_char) || this.match_numeric_literal_separator_followed_by(this.is_ascii_digit)) {
    	    this.consume();
    	}
    	return true;
	}
	consume_exponent():boolean {
		this.consume();
		if (this.m_current_char == '-' || this.m_current_char == '+'){
			this.consume();
		}
		if (!this.is_ascii_digit(this.m_current_char)) return false;
		return this.consume_decimal_number();
	}
	DecimalDigit(str:string, index:number):ecma_return_type {
		if(str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57) {
			return [true, 1];
		}
		return [null, 0];
	}
	NumericLiteral(str:string, index:number):ecma_return_type {
		/*token_type = TokenType::NumericLiteral;
        bool is_invalid_numeric_literal = false;
		*/
		let is_invalid_numeric_literal=false;
		this.m_source=str;
		this.m_position=index;
		/*
		// C++ from SerenityOS
	if (is_numeric_literal_start()) {
        // to_js
        if (m_current_char == '0') {
            // into js
        } else {
            // 1...9 or period
            while (is_ascii_digit(m_current_char) || match_numeric_literal_separator_followed_by(is_ascii_digit))
                consume();
            if (m_current_char == 'n') {
                consume();
                token_type = TokenType::BigIntLiteral;
            } else {
                if (m_current_char == '.') {
                    consume();
                    if (m_current_char == '_')
                        is_invalid_numeric_literal = true;

                    while (is_ascii_digit(m_current_char) || match_numeric_literal_separator_followed_by(is_ascii_digit)) {
                        consume();
                    }
                }
                if (m_current_char == 'e' || m_current_char == 'E')
                    is_invalid_numeric_literal = is_invalid_numeric_literal || !consume_exponent();
            }
        }
        if (is_invalid_numeric_literal) {
            token_type = TokenType::Invalid;
            token_message = "Invalid numeric literal";
        }
    
		*/
		if(this.m_current_char === '0'){
			this.consume();
			// typechecking failed us, need to use a
			// function return type to indirectly access
			// m_current_char as that was inferred to be '0'
			if (this.m_current_char_get() == '.') {
				// decimal
				this.consume();
				while (this.is_ascii_digit(this.m_current_char)){
					this.consume();
				}
				if (this.m_current_char_get() == 'e' || this.m_current_char_get() == 'E'){
					is_invalid_numeric_literal = !this.consume_exponent();
				}
			}
			/*
            if (m_current_char == '.') {
                // to_js
            } else if (m_current_char == 'e' || m_current_char == 'E') {
                is_invalid_numeric_literal = !consume_exponent();
            } else if (m_current_char == 'o' || m_current_char == 'O') {
                // octal
                is_invalid_numeric_literal = !consume_octal_number();
                if (m_current_char == 'n') {
                    consume();
                    token_type = TokenType::BigIntLiteral;
                }
            } else if (m_current_char == 'b' || m_current_char == 'B') {
                // binary
                is_invalid_numeric_literal = !consume_binary_number();
                if (m_current_char == 'n') {
                    consume();
                    token_type = TokenType::BigIntLiteral;
                }
            } else if (m_current_char == 'x' || m_current_char == 'X') {
                // hexadecimal
                is_invalid_numeric_literal = !consume_hexadecimal_number();
                if (m_current_char == 'n') {
                    consume();
                    token_type = TokenType::BigIntLiteral;
                }
            } else if (m_current_char == 'n') {
                consume();
                token_type = TokenType::BigIntLiteral;
            } else if (is_ascii_digit(m_current_char)) {
                // octal without '0o' prefix. Forbidden in 'strict mode'
                do {
                    consume();
                } while (is_ascii_digit(m_current_char));
            }
			*/

		}
		if (is_invalid_numeric_literal) {
            this.token_type = "TokenType::Invalid";
            this.token_message = "Invalid numeric literal";
        }
		throw new Error("TODO");
	}
	DecimalLiteral(str: string, index: number):ecma_return_type {
		if(str[index] === '0') {
			return [true, 1];
		}
		let [, zd_len] = this.NonZeroDigit(str, index);
		let off = 0;
		if(zd_len === 1) {
			off += 1;
			let [, ns_len] = this.NumericLiteralSeparator(str, index + off);
			if(ns_len > 0) {
				off++;
			}
			let [, dd_len] = this.DecimalDigits(str, index + off);
			return [true, dd_len + off];
		}
		return [true, off];
	}
	DecimalDigits(str: string, index: number):ecma_return_type {
		let off = 0;
		for(; ;) {
			let [, len] = this.DecimalDigit(str, index + off);
			if(len > 0) {
				off++;
				continue;
			}
			let [, s_len] = this.NumericLiteralSeparator(str, index + off);
			if(s_len > 0) {
				let [, exl] = this.DecimalDigit(str, index + off + 1);
				if(exl > 0) {
					off++;
					continue;
				}
				break;
			}
			break;
		}
		return [true, off];
	}
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	NonZeroDigit(str: string, index: number):ecma_return_type {
		if(str.charCodeAt(index) >= 49 && str.charCodeAt(index) <= 57) {
			return [true, 1];
		}
		return [null, 0];
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	NumericLiteralSeparator(str: string, index: number):ecma_return_type {
		if(str[index] === '_') {
			return [true, 1];
		}
		return [null, 0];
	}
	/*DecimalIntegerLiteral ::
	0
	NonZeroDigit
	NonZeroDigit NumericLiteralSeparator[opt] DecimalDigits[+Sep]
	NonOctalDecimalIntegerLiteral
 	*/
	DecimalIntegerLiteral(str: string, index: number) {
		let len=0;
		if(str[index] === '0'){
			len++;
		}
		let tmp=this.NonZeroDigit(str, index);
		if(tmp[0] && tmp[1] > 0){
			len++;
		} else {

		}
		do{
			let tmp=this.NonZeroDigit(str, index);
			if(tmp[0] && tmp[1] > 0){
				len+=tmp[1];
				continue;
			}
			break;
		} while(true)
	}
	NonOctalDecimalIntegerLiteral(str:string, index:number):ecma_return_type {
		// 0 NonOctalDigit
		non_oct:if(str[index] === '0'){
			let tmp=this.NonOctalDigit(str, index+1);
			if(!tmp[0]){
				break non_oct;
			}
			return [true, 1 + tmp[1]];
		}
		// LegacyOctalLikeDecimalIntegerLiteral NonOctalDigit
		let tmp=this.LegacyOctalLikeDecimalIntegerLiteral(str, index);
		not_int_1:if(tmp[0] === true) {
			let tmp2=this.NonOctalDigit(str, index+1);
			if(tmp2[0] === true){
				return [true, 2];
			}
		}
		throw new Error("Not implemented");
	}
	OctalDigit(str:string, index:number):ecma_return_type {
		// 0 1 2 3 4 5 6 7
		if(str.charCodeAt(index)>='0'.charCodeAt(0) && str.charCodeAt(index) <= '7'.charCodeAt(0)) {
			return [true, 1];
		}
		return [null, 0];
	}
	LegacyOctalLikeDecimalIntegerLiteral(str:string, index:number):ecma_return_type {
		let len=0;
		// 0 OctalDigit
		is_oct:if(str[index] === '0'){
			len++;
			let tmp=this.OctalDigit(str, index+len);
			while(tmp[0]){
				tmp=this.OctalDigit(str, index+len);
				if(tmp[0]){
					len++;
				}
			}
			return [true, len + 1];
		}
		let tmp=this.OctalDigit(str, index+2);
		throw new Error("Not implemented");
	}
	NonOctalDigit(str:string, index:number):ecma_return_type {
		if(str[index] === '8' || str[index] === '9'){
			return [true, 1];
		}
		return [null, 0];
	}
}
