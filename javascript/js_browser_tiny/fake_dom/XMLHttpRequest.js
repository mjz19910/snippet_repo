import * as https from 'https';
import * as http from 'http';
import {EventSource} from "./EventSource";

export class XMLHttpRequest extends EventSource {
	/**@type {{'Content-Type'?:string}} */
	_headers = {};
	/**@type {string|undefined} */
	_url;
	constructor() {
		super();
	}
	/**@arg {http.IncomingMessage} res */
	_on_incoming_message(res) {
		console.log('incoming message', res);
	}
	/**@arg {Error} err */
	_on_write_callback(err) {
		if(err) {
			console.error(err);
		}
	}
	abort() {
		this._aborted = true;
	}
	/**
	 * @param {any} type
	 * @param {string | undefined} url
	 * @param {any} ex
	 */
	open(type, url, ex) {
		this._type = type;
		this._url = url;
		if(ex) {
			this._ex = ex;
		}
	}
	/**
	 * @param {string} data
	 */
	send(data) {
		if(data) {
			this._sent_data = data;
		}
		if(!this._url) throw new Error("No url");
		this.sent = true;
		let url_obj = new URL(this._url);
		switch(url_obj.protocol) {
			case "https:": {
				console.log("https_send", this._type, this._url, "data_len:", data.length);
				let client_request = https.request({
					hostname: location.hostname,
					path: this._url,
					method: this._type,
					headers: {
						'Content-Type': this._headers['Content-Type'] ? this._headers['Content-Type'] : 'text/html',
					},
				});
				if(data !== void 0) {
					client_request.write(data, (a) => {
						if(a) {
							this._on_write_callback(a);
						}
					});
				}
				client_request.end();
			} break;
			case "http:": {
				let client_request = http.request({
					hostname: location.hostname,
					path: this._url,
					method: this._type,
					headers: {
						'Content-Type': this._headers['Content-Type'] ? this._headers['Content-Type'] : 'text/html',
					},
				}, this._on_incoming_message.bind(this));
				if(data !== void 0) {
					client_request.write(data, (a) => {
						if(a) {
							this._on_write_callback(a);
						}
					});
				}
				client_request.end();
			} break;
		}
	}
}