import {DocumentWriteFn} from "../../../vm/DocumentWriteFn.js";

export class ProxyDocumentWriteList {
	list: any[];
	document_write: DocumentWriteFn|null;
	attached: boolean;
	end_symbol: symbol;
	attached_document: Document|null;
	document_write_proxy: Document['write']|null;
	constructor() {
		this.list=[];
		this.attached=false;
		this.end_symbol=Symbol(void 0);
		this.document_write=null;
		this.attached_document=null;
		this.document_write_proxy=null;
	}
	write(target: (...text: string[]) => void,thisArg: Document,argArray: string[]) {
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
		let proxy_handler={
			other: this,
			apply(target: (...text: string[]) => void,thisArg: Document,argArray: string[]) {
				this.other.write(target,thisArg,argArray);
			}
		};
		this.document_write_proxy=new Proxy(document.write,proxy_handler);
		document.write=this.document_write_proxy;
	}
	destroy(should_try_to_destroy: boolean=false) {
		if(this.attached_document&&this.document_write_proxy) {
			console.assert(this.attached_document.write===this.document_write_proxy);
			if(this.attached_document.write!==this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
			}
			let doc_1=this.attached_document;
			if(doc_1&&this.document_write) {
				let doc_var=this.document_write;
				let any_var: any=doc_var;
				let vv: Document['write']=any_var;
				doc_1.write=vv;
			}
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
	}
}
