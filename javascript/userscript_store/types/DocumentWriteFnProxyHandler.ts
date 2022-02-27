import {DocumentWriteFn} from "../rebuild_the_universe_auto_typed_v0.2";
import {DocumentWriteList} from "./DocumentWriteList";

export class DocumentWriteFnProxyHandler {
	other: DocumentWriteList | null = null;
	apply(...a: [target: DocumentWriteFn, thisArg: any, argArray: string[]]) {
		if(this.other)
			this.other.write(...a);
	}
}
