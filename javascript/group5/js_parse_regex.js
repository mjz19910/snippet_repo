let type_count = 0;
const TAG_STATE_IN_FUNCTION = 1;
const TAG_STATE_VAR_DEFINE = 2;
const TAG_STATE_LET_DEFINE = 3;
/**
 * @typedef {import("./js_parse_regex_1.js").JS_BLOCK_OPEN_CHARS} JS_BLOCK_OPEN_CHARS
 * @typedef {import("./js_parse_regex_1.js").JS_BLOCK_CLOSE_CHARS2} JS_BLOCK_CLOSE_CHARS
 * @typedef {"|"|"("|")"|"{"|"}"|";"|"."|"="|":"} JS_SPECIAL_CHARS
 * @typedef {typeof TAG_STATE_IN_FUNCTION} StateInFunction
 * @typedef {typeof TAG_STATE_VAR_DEFINE} StateVarDefine
 * @typedef {typeof TAG_STATE_LET_DEFINE} StateLetDefine
 * @typedef {StateInFunction|StateVarDefine} StateType
 * @typedef {[TAG_BOXED_STATES, StateType[]]} BoxedStatesValue
 * @typedef {BoxedStatesValue|BoxedTokensValue} BoxedValue
 * @typedef {[typeof TAG_BOXED_TOKENS, TokenType[]]} BoxedTokensValue
* @typedef {[typeof TAG_TYPE_SPECIAL, JS_SPECIAL_CHARS]} TokenTypeSpecial
* @typedef {" "|"\n"|"\t"} WhitespaceType
* @typedef {[typeof TAG_TYPE_WHITESPACE, WhitespaceType]} TokenTypeWhitespace
* @typedef {"function"|"var"|"let"} JSKeywordType
* @typedef {[typeof TAG_TYPE_KEYWORD, JSKeywordType]} TokenTypeKeyword
* @typedef {[typeof TAG_TYPE_WORD, string]} TokenTypeWord
* @typedef {[typeof TAG_TYPE_INVALID]} TokenTypeInvalid
* @typedef {TokenTypeKeyword|TokenTypeWord|TokenTypeWhitespace|TokenTypeSpecial|TokenTypeInvalid|BoxedTokensValue} TokenType
*/
/**@type {["function", "var", "let"]} */
const keywords = ["function", "var", "let"];
const TAG_TYPE_WORD = 1;
const TAG_TYPE_WHITESPACE = 2;
const TAG_TYPE_SPECIAL = 3;
const TAG_TYPE_KEYWORD = 4;
const TAG_BOXED_START = 5;
const TAG_BOXED_STATES = 6;
const TAG_BOXED_TOKENS = 7;
const TAG_BOXED_END = 8;
const TAG_TYPE_INVALID = 9;
const TAG_TYPE_ERROR = 10;
type_count = 0;
const code = `(function (rebuild) {
    var global;
    (function (global) {
        g_worker_state: WorkerState;
    })(global = rebuild.global || (rebuild.global = {}));
})(rebuild || (rebuild = {}));`;
/**@arg {number} index */
function step_template(index) {
	switch(this.code[index]) {
		case '': {} break;
		default: {
			console.log("??(\"%s\")", this.code[index]);
		}
	}
}
/**@type {(keyword:string)=>keyword is JSKeywordType} */
function is_keyword(keyword) {
	for(let i = 0; i < keywords.length; i++) {
		if(keyword === keywords[i]) {
			return true;
		}
	}
	return false;
}
/**@type {(v:string)=>JSKeywordType|null} */
function convert_to_keyword(keyword) {
	if(is_keyword(keyword)) {
		return keyword;
	}
	return null;
}
/**@arg {string} char @returns {char is WhitespaceType} */
function is_whitespace_type(char) {
	if(char === " ") {
		return true;
	}
	if(char === "\n") {
		return true;
	}
	if(char === "\t") {
		return true;
	}
	console.log('ws', char);
	return false;
}
/**@arg {string} char @returns {WhitespaceType|null} */
function convert_to_whitespace_type(char) {
	if(is_whitespace_type(char)) {
		/**@type {any} */
		let any_val = char;
		/**@type {WhitespaceType} */
		let whitespace_value = any_val;
		return whitespace_value;
	}
	return null;
}
/**@arg {JS_SPECIAL_CHARS} token_value @returns {JS_SPECIAL_CHARS|"{}"|"()"} */
function get_char_type(token_value) {
	switch(token_value) {
		case "{": case "}": return "{}";
		case "(": case ")": return "()";
	}
}
/**@arg {JS_SPECIAL_CHARS} token_value @returns {token_value is BracketOpen} */
function is_open_token(token_value) {
	let ret = false;
	switch(token_value) {
		case "{": ret = true; case "}": break;
		case "(": ret = true; case ")": break;
	}
	return ret;
}
/**@arg {JS_SPECIAL_CHARS} token_value @returns {token_value is JS_BLOCK_CLOSE_CHARS} */
function is_close_token(token_value) {
	let ret = false;
	switch(token_value) {
		case "{": case "}": ret = true; break;
		case "(": case ")": ret = true; break;
	}
	return ret;
}
class EOF {}
let parse_depth = 0;
class Parser {
	/**@arg {string} code */
	constructor(code) {
		let self = this;
		self.code = code;
		/**@type {TokenType[]} */
		self.tokens = [];
		/**@type {BoxedValue[]} */
		self.stack = [];
		/**@type {StateType[]} */
		self.states = [];
		self.step_index = 0;
		self.cursor_pos = 0;
		/**@type {((self:Parser, index:number, in_tokens?:TokenType[])=>number)[]} */
		self.steps = [
			/**@arg {Parser} self @arg {number} index*/
			function step_1(self, index) {
				let ret = 1;
				let cur = self.code[index];
				/**@type {typeof self.tokens[0][0]} */
				let out_type = TAG_TYPE_INVALID;
				switch(cur) {
					case "(": case ")": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					case "{": case "}": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					case ";": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					case ":": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					case "=": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					case ".": {
						out_type = TAG_TYPE_SPECIAL;
						/**@type {[typeof out_type, typeof cur]} */
						const test_val = [out_type, cur];
						self.tokens.push(test_val);
					} break;
					case "|": {
						out_type = TAG_TYPE_SPECIAL;
						self.tokens.push([out_type, cur]);
					} break;
					default: {
						if(cur === void 0) {
							throw new EOF;
						}
						let rx = /\s/;
						if(cur.match(rx)) {
							if(is_whitespace_type(cur)) {
								let whitespace_value = convert_to_whitespace_type(cur);
								self.tokens.push([TAG_TYPE_WHITESPACE, whitespace_value]);
							} else {
								console.log('untyped whitespace', JSON.stringify(cur));
							}
							return 1;
						}
						rx = /\w+/g;
						rx.lastIndex = index;
						let mat = rx.exec(self.code);
						if(mat.index === index) {
							let match = mat[0];
							if(is_keyword(match)) {
								let keyword_value = convert_to_keyword(match);
								/**@type {TokenTypeKeyword} */
								const new_item = [TAG_TYPE_KEYWORD, keyword_value];
								self.tokens.push(new_item);
							} else {
								self.tokens.push([TAG_TYPE_WORD, match]);
							}
							return mat[0].length;
						}
						console.log("??(\"%s\", 1)", self.code[index]);
						ret = 0;
					}
				}
				return ret;
			},
			/**@arg {Parser}self @arg {number} index @arg {TokenType[]} in_tokens */
			function step_2(self, index, in_tokens) {
				let ret = 0;
				let cur_tok = in_tokens[index];
				const token_type = cur_tok[0];
				switch(token_type) {
					case TAG_TYPE_WORD: {
						const token_value = cur_tok[1];
						switch(token_value) {
							default: {
								console.log('might want to parse word', token_value);
								self.tokens.push([token_type, token_value]);
								ret = 1;
							} break;
						}
					} break;
					case TAG_TYPE_KEYWORD: {
						const token_value = cur_tok[1];
						switch(token_value) {
							case "function": {
								self.stack.push([TAG_BOXED_STATES, self.states]);
								self.states = [TAG_STATE_IN_FUNCTION];
							}
							case "let":
							case "var": {
								self.tokens.push([token_type, token_value]);
								ret = 1;
							} break;
						}
					} break;
					case TAG_TYPE_WHITESPACE: {
						self.tokens.push(cur_tok);
						ret = 1;
					} break;
					case TAG_TYPE_SPECIAL: {
						let token_value = cur_tok[1];

						switch(get_char_type(token_value)) {
							case '{}':
							case '()': {
								if(is_open_token(token_value)) {
									self.stack.push([TAG_BOXED_TOKENS, self.tokens]);
									self.tokens = [[token_type, token_value]];
									ret = 1;
								} else if(is_close_token(token_value)) {
									self.tokens.push([TAG_TYPE_SPECIAL, token_value]);
									let top = self.stack.pop();
									let put_back;
									while(top[0] != TAG_BOXED_TOKENS) {
										if(put_back) put_back.push(top);
										else put_back = [top];
										top = self.stack.pop();
									}
									let tok_top = top[1];
									if(put_back) self.stack.push(...put_back);
									tok_top.push([TAG_BOXED_TOKENS, self.tokens]);
									self.tokens = tok_top;
									ret = 1;
								} else {
									console.assert(false, "This should never happen, " +
										"but i can't explain it to the type system " +
										"in typescript");
								}
							} break;
							case ";":
							case "|": {
								self.tokens.push([TAG_TYPE_SPECIAL, token_value]);
								ret = 1;
							} break;
							default: {
								console.log('unk char', [TAG_TYPE_SPECIAL, token_value]);
							}
						}
					} break;
					default: {
						self.tokens.push(cur_tok);
						console.log("??(\"%s\", 2)", cur_tok);
					}
				}
				return ret;
			},
			/**@arg {Parser}self @arg {number} index @arg {TokenType[]} in_tokens */
			function step_template(self, index, in_tokens) {
				let ret = 0;
				let cur_tok = in_tokens[index];
				switch(cur_tok) {
					default: {
						self.tokens.push(cur_tok);
						console.log("??(\"%s\", 2)", cur_tok);
					}
				}
				return ret;
			}];
	}
	can_run() {
		let self = this;
		return self.step_index + 1 < self.steps.length;
	}
	run() {
		let self = this;
		let index = 0;
		let cur_step = self.steps[self.step_index];
		let in_tokens = this.tokens;
		this.tokens = [];
		for(let i = 0; i < 100; i++) {
			try {
				process.stdout.write('.');
				let ch = cur_step(self, index, in_tokens);
				if(ch) index += ch;
				else break;
			} catch(e) {
				if(e instanceof Error) {
					throw e;
				}
				continue;
			}
		}
		let lost_states = [];
		process.stdout.write("\n");
		if(self.stack.length > 0) {
			let tok_top = self.stack.pop();
			const [tag] = tok_top;
			if(tag === TAG_BOXED_STATES) {
				const value = tok_top[1];
				lost_states.push(value);
			} else if(tag === TAG_BOXED_TOKENS) {
				const value = tok_top[1];
				value.push([TAG_BOXED_TOKENS, self.tokens], null);
				self.tokens = value;
			} else {
				console.log('unk stack type', tok_top);
			}
		}
		console.log(self.tokens);
		self.step_index++;
	}
}
function main() {
	let parser = new Parser(code);
	if(parser.can_run()) {
		parser.run();
		while(parser.can_run()) {
			parser.run();
		}
	}
}
main();