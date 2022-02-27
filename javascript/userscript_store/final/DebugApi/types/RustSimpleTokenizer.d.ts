export interface RustSimpleTokenizer {
	index: number;
	source: string | null;
	reset(str: string | null): void;
	advance(tok_len: number): void;
	inIdentRange(char_code: number): boolean;
	isWhitespaceRange(char_code: number): boolean;
	exec(string: string): any[];
	into_tt(tok_arr: any[]): any[];
}
