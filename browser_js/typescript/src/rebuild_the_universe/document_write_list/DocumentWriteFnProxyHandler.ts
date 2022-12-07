import {DocumentWriteFn} from "./DocumentWriteFn.js"
import {DocumentWriteList} from "./DocumentWriteList.js"

export class DocumentWriteFnProxyHandler {
	other: DocumentWriteList|null=null
	apply(...a: [target: DocumentWriteFn,thisArg: any,argArray: string[]]) {
		if(this.other)
			this.other.write(...a)
	}
}
