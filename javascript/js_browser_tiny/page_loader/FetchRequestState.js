import {ClientRequest, IncomingMessage} from "http";
import {fake} from "../fake_dom/mod.js";
import {get_repl_activator} from "../repl_support/repl_activator.js";
import {FetchStateFlags} from "./FetchStateFlags.js";
import {fetch_url} from "./fetch_url.js";
import {data} from "./mod.js";
import {on_page_data_loaded} from "./on_page_data_loaded.js";
export class FetchRequestState extends FetchStateFlags {
	on_redirect_status_code() {
		if(!this.m_incoming_message) return;
		let msg_headers = this.m_incoming_message.headers;
		if(msg_headers.location) {
			this.m_incoming_message.resume();
			if(this.follow_redirects) {
				console.log('redirect to', msg_headers.location);
				let req = new FetchRequestState(msg_headers.location);
				req.silent = true;
				fetch_url(req);
			} else {
				this.url = msg_headers.location;
				console.log('header says redirect to', msg_headers.location);
			}
		}
		this.on_request_finished();
	}
	/**
	 * @param {string|null} page_content
	 */
	on_incoming_message_result(page_content) {
		if(!fake.document)
			throw new Error("Missing document");
		if(!fake.window)
			throw new Error("Missing window");
		if(page_content !== null) {
			console.log("https stream end handler %o bytes\n\"%s\"", page_content.length, page_content.slice(0, 48));
			if(page_content.length < 300) {
				console.log("all content\n%s", page_content);
			}
			on_page_data_loaded(fake.window, fake.document, this, null, page_content);
			console.log('in_message_result_tag loaded', this.url);
		}
		console.log('do on_request_finished');
		this.on_request_finished();
	}
	/** @param {IncomingMessage} message */
	on_incoming_message(message) {
		this.m_incoming_message = message;
		switch(this.m_incoming_message.statusCode) {
			case 302:
			case 301: this.on_redirect_status_code(); break;
			case 200: this.on_ok_status_code(); break;
			default:
				console.log('Headers with statusCode=%o ', this.m_incoming_message.statusCode, this.m_incoming_message.headers);
				console.log('Unexpected statusCode in request_callback', this.m_incoming_message.statusCode);
				this.on_incoming_message_result(null);
		}
	}
	on_ok_status_code() {
		if(!this.m_incoming_message) return;
		let chunk_offset = 0;
		let chunk_sz = 2 ** 12 + 128;
		process.stdout.write('.');
		this.m_incoming_message.on('data', (/** @type {Uint8Array} */ e) => {
			chunk_offset += e.length;
			while(chunk_offset > chunk_sz) {
				process.stdout.write('.');
				chunk_offset -= chunk_sz;
			}
			data.push(Buffer.from(e));
		});
		this.m_incoming_message.on('error', (err) => {
			this.on_error_result(err);
			this.on_incoming_message_result(null);
		});
		this.m_incoming_message.on('end', () => {
			process.stdout.write("\n");
			let page_content = Buffer.concat(data).toString();
			this.on_incoming_message_result(page_content);
		});
	}
	/**
	 * @param {Error} e
	 */
	on_error_result(e) {
		console.error(e);
		this.on_request_finished();
	}
	on_request_finished() {
		let repl = get_repl_activator(this);
		console.log('activated repl');
		if(repl && !this.no_repl) {
			repl.on_finished();
		}
	}
	/**
	 * @arg {string | null} url
	 * @arg {Partial<FetchStateFlags>} [opts]
	 */
	constructor(url, opts) {
		super(opts);
		this.url = url;
		/**@type {import("../preload/types/http_type.js").http_type | undefined} */
		this.m_start_request_module = undefined;
		/** @type {ClientRequest | undefined} */
		this.m_client_request = undefined;
		/** @type {IncomingMessage | undefined} */
		this.m_incoming_message = undefined;
	}
}
