import {DocumentWriteFnProxyHandler} from "./DocumentWriteFnProxyHandler.js";
import {DocumentWriteFn} from "./DocumentWriteFn.js";

export class DocumentWriteList {
	list: (string[]|null)[];
	attached: boolean;
	end_symbol: symbol;
	document_write: ((...text: string[]) => void)|null;
	attached_document: Document|null;
	document_write_proxy: ((...text: string[]) => void)|null;
	constructor() {
		this.list=[];
		this.attached=false;
		this.end_symbol=Symbol(1);
		this.document_write=null;
		this.attached_document=null;
		this.document_write_proxy=null;
	}
	write(target: DocumentWriteFn,thisArg: any,argArray: string[]) {
		console.assert(target===this.document_write);
		console.assert(thisArg===this.attached_document);
		this.list.push(argArray,null);
	}
	attach_proxy(document: Document) {
		if(this.attached) {
			let was_destroyed=this.destroy(true);
			if(!was_destroyed) {
				throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
			}
		}
		this.attached_document=document;
		this.document_write=document.write;
		let obj=new DocumentWriteFnProxyHandler;
		obj.other=this;
		this.document_write_proxy=new Proxy(document.write,obj);
		document.write=this.document_write_proxy;
	}
	destroy(should_try_to_destroy: boolean) {
		if(this.attached_document&&this.document_write_proxy) {
			console.assert(this.attached_document.write===this.document_write_proxy);
			if(this.attached_document.write!==this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
			}
			if(this.document_write)
				this.attached_document.write=this.document_write;
		}
		if(this.document_write_proxy) {
			this.document_write_proxy=null;
		}
		if(this.document_write) {
			this.document_write=null;
		}
		if(this.attached_document) {
			this.attached_document=null;
		}
		if(should_try_to_destroy) {
			return true;
		}
		throw new Error("TODO");
	}
}
