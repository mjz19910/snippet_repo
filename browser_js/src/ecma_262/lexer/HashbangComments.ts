import {LexerBase} from "./LexerBase.ts";
import {LexReturnType} from "./LexReturnType.ts";

export class HashbangComments extends LexerBase {
	HashbangComment(str: string,index: number): LexReturnType {
		if(str[index]==='#'&&str[index+1]==='!') {
			let res=this.m_dispatcher.comments.SingleLineCommentChars(str,index+2);
			return ["HashbangComment",res[1]+2];
		}
		return [null,0];
	}
}
