import {down_convert_type} from "./down_convert_type";
import {DocumentWriteFnProxyHandler} from "./DocumentWriteFnProxyHandler";

export class DocumentWriteList {
	list: (string[] | null)[];
	attached; end_symbol;
	constructor() {
		this.list = [];
		this.attached = false;
		this.end_symbol = Symbol(void 0);
		this.attached_document = document;
		this.document_write = document.write;
		const proxy_for_write = {
			other: this,
			apply(target: (...text: string[]) => void, thisArg: Document, argArray: string[]) {
				this.other.write(target, thisArg, argArray);
			}
		};
		this.document_write_proxy = new Proxy(document.write, proxy_for_write);
		if(this.document_write_proxy)
			document.write = this.document_write_proxy;
	}
	attach_proxy(document: Document) {
		if(this.attached) {
			let was_destroyed = this.destroy(true);
			if(!was_destroyed) {
				throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
			}
		}
		this.attached_document = document;
		this.document_write = document.write;
		let obj = new DocumentWriteFnProxyHandler;
		obj.other = this;
		this.document_write_proxy = new Proxy(document.write, obj);
		document.write = this.document_write_proxy;
	}
	document_write: ((...text: string[]) => void) | {other: DocumentWriteList;} | null;
	attached_document: Document | null;
	write(target: (...text: string[]) => void, thisArg: any, argArray: string[]) {
		console.assert(target === this.document_write);
		console.assert(thisArg === this.attached_document);
		this.list.push(argArray, null);
	}
	document_write_proxy: ((...text: string[]) => void) | {other: any;} | null;
	destroy(should_try_to_destroy: boolean) {
		if(this.attached_document && this.document_write_proxy) {
			console.assert(this.attached_document.write === this.document_write_proxy);
			if(this.attached_document.write !== this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy DocumentWriteList: document.write is not equal to document_write_proxy");
			}
			if(this.document_write) {
				if(down_convert_type<this['document_write'], Document['write']>(this.document_write)) {
					this.attached_document.write = this.document_write;
				}
			}
		}
		if(this.document_write_proxy) {
			this.document_write_proxy = null;
		}
		if(this.document_write) {
			this.document_write = null;
		}
		if(this.attached_document) {
			this.attached_document = null;
		}
		if(should_try_to_destroy) {
			return true;
		}
	}
}
