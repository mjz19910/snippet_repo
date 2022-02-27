import {DocumentWriteList} from "./DocumentWriteList";

export class DocumentWriteFnProxyHandler {
	other: DocumentWriteList | null = null;
	apply(...a: [target: ((...text: string[]) => void), thisArg: Document, argArray: string[]]) {
		if(this.other)
			this.other.write(...a);
	}
}
