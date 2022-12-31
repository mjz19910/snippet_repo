import {ClientRequest,IncomingMessage} from "http";
import {fetch_url} from "./fetch_url.js";
import {PageLoaderHTMLState} from "./PageLoaderHTMLState.js";
import {RequestModule} from "./RequestModule.js";

/** @type {Buffer[]} */
export let cached_data_buffer=[];

export class PageLoaderState {
	/** @type {RequestModule} */
	m_start_request_module=new RequestModule;
	/** @type {ClientRequest|null} */
	m_client_request=null;
	/** @type {IncomingMessage|null} */
	m_incoming_message=null;
	/** @type {PageLoaderHTMLState} */
	html_state=new PageLoaderHTMLState;
	silent=false;
	no_repl=false;
	follow_redirects=false;
	async on_redirect_status_code() {
		if(!this.m_incoming_message) return;
		let msg_headers=this.m_incoming_message.headers;
		if(msg_headers.location) {
			this.m_incoming_message.resume();
			if(this.follow_redirects) {
				console.log('redirect to',msg_headers.location);
				this.url=msg_headers.location;
				this.silent=true;
				console.log('on_redirect_status_code -> fetch_url');
				await fetch_url(this);
			} else {
				this.url=msg_headers.location;
				console.log('header says redirect to',msg_headers.location);
			}
		}
	}
	/** @arg {IncomingMessage} message */
	async on_incoming_message(message) {
		this.m_incoming_message=message;
		switch(this.m_incoming_message.statusCode) {
			case 302:
			case 301: await this.on_redirect_status_code(); break;
			case 200: await this.on_ok_status_code(); break;
			default:
				console.log('Headers with statusCode=%o ',this.m_incoming_message.statusCode,this.m_incoming_message.headers);
				console.log('Unexpected statusCode in request_callback',this.m_incoming_message.statusCode);
		}
	}
	async on_ok_status_code() {
		let chunk_offset=0;
		let chunk_sz=2**12;
		process.stdout.write('.');
		/** @type {Promise<void>} */
		let promise=new Promise((accept,reject) => {
			if(!this.m_incoming_message) return reject(new Error("No incoming message"));
			this.m_incoming_message.on('data',(/** @type {Uint8Array} */ e) => {
				chunk_offset+=e.length;
				while(chunk_offset>chunk_sz) {
					process.stdout.write('.');
					chunk_offset-=chunk_sz;
				}
				cached_data_buffer.push(Buffer.from(e));
			});
			this.m_incoming_message.on('error',(err) => {
				reject(err);
			});
			this.m_incoming_message.on('end',() => {
				process.stdout.write("\n");
				accept();
			});
		});
		await promise;
	}
	/** @arg {Error} e */
	on_error_result(e) {
		console.error(e);
	}
	/** @arg {string} url @arg {Partial<PageLoaderState>} [opts] */
	constructor(url,opts) {
		if(opts) {
			if(opts.no_repl!==void 0) {
				this.no_repl=opts.no_repl;
			}
			if(opts.follow_redirects!==void 0) {
				this.follow_redirects=opts.follow_redirects;
			}
			if(opts.silent!==void 0) {
				this.silent=opts.silent;
			}
		}
		this.url=url;
	}
}
