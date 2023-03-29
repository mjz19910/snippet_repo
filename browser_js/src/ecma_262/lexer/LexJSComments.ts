import {LexerBase} from "./LexerBase.js";
import {JSParseError} from "../JSParseError.js";

// https://tc39.es/ecma262/#sec-comments
export class LexJSComments extends LexerBase {
	// https://tc39.es/ecma262/#prod-Comment
	Comment(str: string,index: number): [string|null,number] {
		let ml_len=this.MultiLineComment(str,index);
		let sl_len=this.SingleLineComment(str,index);
		if(!ml_len)
			throw new JSParseError("no MultiLineComment");
		if(!sl_len)
			throw new JSParseError("no SingleLineComment");
		if(ml_len[1]&&ml_len[1]>0) {
			return ml_len;
		}
		if(sl_len[1]&&sl_len[1]>0) {
			return sl_len;
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-MultiLineComment
	MultiLineComment(str: string,index: number): [string|null,number] {
		let off=0;
		if(str.slice(index,index+2)==='/*') {
			off+=2;
			if(str.slice(index+off,index+off+2)==='*/') {
				return ['MultiLineComment',4];
			}
			let [,com_len]=this.MultiLineCommentChars(str,index+off);
			if(com_len===0) {
				return [null,0];
			}
			console.log([str.slice(index,index+off+com_len+2)]);
			if(str.slice(index+off+com_len,index+off+com_len+2)==="*/") {
				return ['MultiLineComment',off+com_len+2];
			}
		}
		return [null,0];
	}
	dep=0;
	// https://tc39.es/ecma262/#prod-MultiLineCommentChars
	MultiLineCommentChars(str: string,index: number): [string|null,number] {
		let start_len=0;
		if(this.dep>64) {
			throw Error('stack overflow');
		}
		this.dep++;
		let ml_na=this.MultiLineNotAsteriskChar(str,index+start_len);
		if(ml_na[1]>0) {
			start_len++;
			for(;;) {
				let [,ml_na]=this.MultiLineNotAsteriskChar(str,index+start_len);
				if(ml_na>0) {
					start_len+=ml_na;
					continue;
				}
				if(str[index+start_len]==='*') {
					let [,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
					if(pac>0) {
						start_len++;
						start_len+=pac;
					}
				}
				break;
			}
		}
		if(str[index+start_len]==='*') {
			let [,pac]=this.PostAsteriskCommentChars(str,index+start_len+1);
			if(pac>0) {
				start_len++;
				start_len+=pac;
			}
		}
		this.dep--;
		return [null,start_len];
	}
	// https://tc39.es/ecma262/#prod-PostAsteriskCommentChars
	PostAsteriskCommentChars(str: string,index: number): [string,number] {
		let index_offset=0;
		let offset_1=this.MultiLineNotForwardSlashOrAsteriskChar(str,index+index_offset);
		if(offset_1[0]===null) throw new Error("Parse error");
		if(offset_1[1]>0) {
			index_offset+=offset_1[1];
			let la=this.MultiLineCommentChars(str,index+index_offset);
			index_offset+=la[1];
			return ["PostAsteriskCommentChars",index_offset];
		}
		if(offset_1[1]===0) {
			if(str[index+index_offset]==='*') {
				index_offset++;
				let offset_2=this.PostAsteriskCommentChars(str,index+index_offset);
				if(!offset_2[0]) throw new Error("Recursive call to PostAsteriskCommentChars failed");
				if(offset_2[0]&&offset_2[1]>0) {
					return ["PostAsteriskCommentChars",offset_2[1]+index_offset];
				}
			}
		}
		return ["PostAsteriskCommentChars",index_offset];
	}
	// https://tc39.es/ecma262/#prod-MultiLineNotAsteriskChar
	MultiLineNotAsteriskChar(str: string,index: number): [string|null,number] {
		if(str[index]!=='*') {
			return [str[index],1];
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-MultiLineNotForwardSlashOrAsteriskChar
	MultiLineNotForwardSlashOrAsteriskChar(str: string,index: number): [string|null,number] {
		if(str[index]==='*'||str[index]==='/') {
			return [null,0];
		}
		return [str[index],1];
	}
	// https://tc39.es/ecma262/#prod-SingleLineComment
	SingleLineComment(str: string,index: number): [string|null,number] {
		if(str.slice(index,index+2)==='//') {
			let comment_length=this.SingleLineCommentChars(str,index+2);
			if(!comment_length[0]) throw new Error("Failed to parse single line comment");
			return ['SingleLineComment',comment_length[1]+2];
		}
		return [null,0];
	}
	// https://tc39.es/ecma262/#prod-SingleLineCommentChars
	SingleLineCommentChars(str: string,index: number): [string|null,number] {
		if(index>=str.length) {
			return [null,0];
		}
		let s_index=index;
		// https://tc39.es/ecma262/#prod-SingleLineCommentChar
		// NOTE: Converted SingleLineCommentChar production into a loop
		while(str[s_index]!=='\n') {
			s_index++;
			if(s_index>str.length) {
				break;
			}
		}
		return ["SingleLineCommentChars",s_index-index];
	}
}
