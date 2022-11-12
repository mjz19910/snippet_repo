// static constexpr bool is_octal_digit(char ch)
export function is_octal_digit(ch: string): boolean {
	return ch.charCodeAt(0)>='0'.charCodeAt(0)&&
		ch.charCodeAt(0)<='7'.charCodeAt(0);
}
