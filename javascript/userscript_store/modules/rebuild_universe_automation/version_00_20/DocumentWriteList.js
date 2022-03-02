export class DocumentWriteList {
	/**
	 * @type {any[]}
	 */
	list;
	/**@type {import("types/vm/DocumentWriteFn.js").DocumentWriteFn | null} */
	document_write;
	constructor() {
		this.list = [];
		this.attached = false;
		this.end_symbol = Symbol(void 0);
		this.document_write = null;
		this.attached_document = null;
		this.document_write_proxy = null;
	}
	/**
	 * @arg {(...text: string[]) => void} target
	 * @arg {Document} thisArg
	 * @arg {string[]} argArray
	 */
	write(target, thisArg, argArray) {
		console.assert(target === this.document_write);
		console.assert(thisArg === this.attached_document);
		this.list.push(argArray, null);
	}
	/**@arg {Document} document */
	attach_proxy(document) {
		if(this.attached) {
			let was_destroyed = this.destroy(true);
			if(!was_destroyed) {
				throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
			}
		}
		this.attached_document = document;
		this.document_write = document.write;
		let proxy_handler = {
			other: this,
			//target: (...text: string[]) => void, thisArg: Document, argArray: string[]
			/**
			 * @arg {(...text: string[]) => void} target
			 * @arg {Document} thisArg
			 * @arg {string[]} argArray
			 */
			apply(target, thisArg, argArray) {
				this.other.write(target, thisArg, argArray);
			}
		};
		this.document_write_proxy = new Proxy(document.write, proxy_handler);
		document.write = this.document_write_proxy;
	}
	/**
	 * @param {boolean} should_try_to_destroy
	 */
	destroy(should_try_to_destroy = false) {
		if(this.attached_document && this.document_write_proxy) {
			console.assert(this.attached_document.write === this.document_write_proxy);
			if(this.attached_document.write !== this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
			}
			let doc_1 = this.attached_document;
			if(doc_1 && this.document_write) {
				let doc_var = this.document_write;
				/**@type {any} */
				let any_var = doc_var;
				/**@type {Document['write']} */
				let vv = any_var;
				doc_1.write = vv;
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
