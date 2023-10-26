import {DocumentWriteFn} from "./DocumentWriteFn.ts"
import {DocumentWriteList} from "./DocumentWriteList.ts"

export class DocumentWriteFnProxyHandler {
	other: DocumentWriteList|null=null
	apply(...a: [target: DocumentWriteFn,thisArg: any,argArray: string[]]) {
		if(this.other)
			this.other.write(...a)
	}
}
