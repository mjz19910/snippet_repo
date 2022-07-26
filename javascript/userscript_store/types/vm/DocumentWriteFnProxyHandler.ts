import {DocumentWriteFn} from "./DocumentWriteFn"
import {DocumentWriteList} from "./DocumentWriteList"

export class DocumentWriteFnProxyHandler {
	other: DocumentWriteList|null=null
	apply(...a: [target: DocumentWriteFn,thisArg: any,argArray: string[]]) {
		if(this.other)
			this.other.write(...a)
	}
}
