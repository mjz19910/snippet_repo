import {ClientRequest,IncomingMessage} from "http";
import {fake} from "../browser_fake_dom/src/browse/mod.js";
import {HTMLLexerState} from "../tiny_html_lexer/HTMLLexerState.js";
import {fetch_url} from "./fetch_url.js";
import {get_cached_repl_plugin} from "./get_cached_repl_plugin.js";
import {data} from "./mod.js";
import {on_page_data_loaded} from "./on_page_data_loaded.js";
import {PageLoaderHTMLState} from "./PageLoaderHTMLState.js";
import {RequestModule} from "./RequestModule.js";

export class PageLoaderState {
	/**@arg {any[]} arr */
	use_types(...arr) {this.use_base(arr);}
	/**@arg {any[]} arr */
	use(...arr) {this.use_base(arr);}
	/**@arg {any[]} _arr */
	use_base(_arr) {}
	/**@type {RequestModule | null} */
	m_start_request_module=null;
	/** @type {ClientRequest | null} */
	m_client_request=null;
	/** @type {IncomingMessage | null} */
	m_incoming_message=null;
	/** @type {HTMLLexerState | null} */
	lexer_state=null;
	/**@type {PageLoaderHTMLState | null} */
	html_state=null;
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
		this.on_request_finished();
	}
	/**
	 * @param {Uint8Array | null} page_content
	 */
	async on_incoming_message_result(page_content) {
		if(!fake.document)
			throw new Error("Missing document");
		if(!fake.window)
			throw new Error("Missing window");
		if(!this.url)
			throw new Error("No url");
		if(page_content!==null) {
			console.log("https stream end handler %o bytes\n\"%s\"",page_content.length,page_content.slice(0,48));
			if(page_content.length<300) {
				console.log("all content\n%s",page_content);
			}
			/**@type {PageLoaderState} */
			let page_load_state=new PageLoaderState(this.url);
			page_load_state.no_repl=this.no_repl;
			await on_page_data_loaded(fake.window,fake.document,page_load_state,null,page_content);
			console.log('in_message_result_tag loaded',this.url);
		}
		console.log('do on_request_finished');
		this.on_request_finished();
	}
	/**
	 * @param {IncomingMessage} message
	 */
	async on_incoming_message(message) {
		if(!fake.document)
			throw new Error("Missing document");
		this.m_incoming_message=message;
		switch(this.m_incoming_message.statusCode) {
			case 302:
			case 301: await this.on_redirect_status_code(); break;
			case 200: await this.on_ok_status_code(); break;
			default:
				console.log('Headers with statusCode=%o ',this.m_incoming_message.statusCode,this.m_incoming_message.headers);
				console.log('Unexpected statusCode in request_callback',this.m_incoming_message.statusCode);
				await this.on_incoming_message_result(null);
		}
	}
	async on_ok_status_code() {
		if(!fake.document)
			throw new Error("Missing document");
		let chunk_offset=0;
		let chunk_sz=2**12+128;
		process.stdout.write('.');
		await new Promise((accept,reject) => {
			if(!this.m_incoming_message) return reject(new Error("No incoming message"));
			this.m_incoming_message.on('data',(/** @type {Uint8Array} */ e) => {
				chunk_offset+=e.length;
				while(chunk_offset>chunk_sz) {
					process.stdout.write('.');
					chunk_offset-=chunk_sz;
				}
				data.push(Buffer.from(e));
			});
			this.m_incoming_message.on('error',(err) => {
				this.on_error_result(err);
				let res=this.on_incoming_message_result(null);
				res.then(accept,reject);
			});
			this.m_incoming_message.on('end',() => {
				process.stdout.write("\n");
				let all_content_buffer=Buffer.concat(data);
				let data_u8_arr=Uint8Array.from(all_content_buffer);
				let res=this.on_incoming_message_result(data_u8_arr);
				res.then(accept,reject);
			});
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
		console.log('todo activate repl');
		get_cached_repl_plugin(this).on_finished();
	}
	/**
	 * @arg {string | null} url
	 * @arg {Partial<PageLoaderState>} [opts]
	 */
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
	/**@type {string|undefined} */
	stack_location;
	copy() {
		let copy=new PageLoaderState(this.url,this);
		copy.stack_location=new Error().stack;
		return copy;
	}
}
