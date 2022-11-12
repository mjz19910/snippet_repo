import {LocalOrRemoteIdVarType} from "./LocalOrRemoteIdVarType.js"
import {MakeReplyDataType} from "./MakeReplyDataType.js"

export class MakeReplyData {
	t: number
	v: MakeReplyDataType
	constructor(reply: number,info: number,from: LocalOrRemoteIdVarType|number,{}) {
		this.t=reply
		this.v={
			t: info,
			v: from
		}
	}
}
