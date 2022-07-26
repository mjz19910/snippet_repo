import {LexerBase} from "./LexerBase"
import {JSParseError} from "../JSParseError"
export class section_12_4 extends LexerBase {
	Comment(str: string,index: number): [string|null,number] {
		let ml_len=this.MultiLineComment(str,index)
		let sl_len=this.SingleLineComment(str,index)
		if(!ml_len)
			throw new JSParseError("no MultiLineComment")
		if(!sl_len)
			throw new JSParseError("no SingleLineComment")
		if(ml_len[1]&&ml_len[1]>0) {
			return ml_len
		}
		if(sl_len[1]&&sl_len[1]>0) {
			return sl_len
		}
		return [null,0]
	}
	MultiLineComment(str: string,index: number): [string|null,number] {
		let off=0
		if(str.slice(index,index+2)==='/*') {
			off+=2
			if(str.slice(index+off,index+off+2)==='*/') {
				return ['MultiLineComment',4]
			}
			let [,com_len]=this.MultiLineCommentChars(str,index+off)
			if(com_len===0) {
				return [null,0]
			}
			console.log([str.slice(index,index+off+com_len+2)])
			if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {
				return ['MultiLineComment',off+com_len+2]
			}
		}
		return [null,0]
	}
	dep=0
	MultiLineCommentChars(str: string,index: number): [string|null,number] {
		let slen=0
		if(this.dep>64) {
			throw Error('stack overflow')
		}
		this.dep++
		let ml_na=this.MultiLineNotAsteriskChar(str,index+slen)
		if(ml_na[1]>0) {
			slen++
			for(;;) {
				let [,ml_na]=this.MultiLineNotAsteriskChar(str,index+slen)
				if(ml_na>0) {
					slen+=ml_na
					continue
				}
				if(str[index+slen]==='*') {
					let [,pac]=this.PostAsteriskCommentChars(str,index+slen+1)
					if(pac>0) {
						slen++
						slen+=pac
					}
				}
				break
			}
		}
		if(str[index+slen]==='*') {
			let [,pac]=this.PostAsteriskCommentChars(str,index+slen+1)
			if(pac>0) {
				slen++
				slen+=pac
			}
		}
		this.dep--
		return [null,slen]
	}
	PostAsteriskCommentChars(str: string,index: number): [string,number] {
		let idxoff=0
		let cxlen=this.MultiLineNotForwardSlashOrAsteriskChar(str,index+idxoff)
		if(cxlen[0]===null) throw new Error("Parse error")
		if(cxlen[1]>0) {
			idxoff+=cxlen[1]
			let la=this.MultiLineCommentChars(str,index+idxoff)
			idxoff+=la[1]
			return ["PostAsteriskCommentChars",idxoff]
		}
		if(cxlen[1]===0) {
			if(str[index+idxoff]==='*') {
				idxoff++
				let len=this.PostAsteriskCommentChars(str,index+idxoff)
				if(!len[0]) throw new Error("Recursive call to PostAsteriskCommentChars failed")
				if(len[0]&&len[1]>0) {
					return ["PostAsteriskCommentChars",len[1]+idxoff]
				}
			}
		}
		return ["PostAsteriskCommentChars",idxoff]
	}
	MultiLineNotAsteriskChar(str: string,index: number): [string|null,number] {
		if(str[index]!=='*') {
			return [str[index],1]
		}
		return [null,0]
	}
	MultiLineNotForwardSlashOrAsteriskChar(str: string,index: number): [string|null,number] {
		if(str[index]==='*'||str[index]==='/') {
			return [null,0]
		}
		return [str[index],1]
	}
	SingleLineComment(str: string,index: number): [string|null,number] {
		if(str.slice(index,index+2)==='//') {
			let comment_length=this.SingleLineCommentChars(str,index+2)
			if(!comment_length[0]) throw new Error("Failed to parse single line comment")
			return ['SingleLineComment',comment_length[1]+2]
		}
		return [null,0]
	}
	SingleLineCommentChars(str: string,index: number): [string|null,number] {
		if(index>=str.length) {
			return [null,0]
		}
		let s_index=index
		while(str[s_index]!=='\n') {
			s_index++
			if(s_index>str.length) {
				break
			}
		}
		return ["SingleLineCommentChars",s_index-index]
	}
}
