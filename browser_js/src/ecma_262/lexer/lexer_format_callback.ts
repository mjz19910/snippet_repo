import {LexReturnType} from "./LexReturnType.ts"
import {LexerStateData} from "./LexerStateData.ts"
export function lexer_format_callback(state: LexerStateData,code: string,res: LexReturnType) {
	if(res[0]) {
		let ret: [typeof res[0],string]=[res[0],code.slice(state.cur_index,state.cur_index+res[1])]
		state.cur_index+=res[1]
		if(!ret[1].includes(',')) {
			return ret[1]
		}
		if(ret[1].includes("`")&&!ret[1].includes("'")) {
			return `"${ret[1]}"`
		}
		if(ret[1].includes("'")&&!ret[1].includes("`")) {
			return `\`${ret[1]}\``
		}
		return `'${ret[1]}'`
	}
	if(state.cur_index<=(code.length-1)) {
		return `E\`${code[state.cur_index]}\``
	}
	return "[eof]";
}
