// ==UserScript==
// @name		DebugApi userscript
// @namespace	https://github.com/mjz19910/
// @version		0.1.10
// @description	DebugApi
// @author		@mjz19910
// @copyright   @mjz19910 2019-2023
// @match		https://*/*
// @match		http://*/*
// @run-at		document-start
// @grant		none
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/DebugApi_raw/DebugApi.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/DebugApi_raw/DebugApi.user.js
// ==/UserScript==

const page_require = typeof require === "undefined"
	? __module_require__
	: require;
let delete_require = false,
	reset_require = false;
if (typeof require === "undefined" || page_require !== __module_require__) {
	delete_require = typeof require === "undefined";
	require = __module_require__;
	reset_require = true;
}
const { do_export } = require("../base_require_raw/BaseRequire.user.js");
/** @typedef {(import("./support/dbg/ConnectionMessage.ts") .ConnectionMessage)} ConnectionMessage */
const __module_name__ = "DebugApi";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn, flags = { global: false }) {
	do_export(fn, flags, exports, __module_name__);
}
export_((exports) => {
	exports.__is_module_flag__ = true;
});
//#region is_helpers
/** @template T @typedef {import("./support/dbg/CM.ts").CM<T>} CM */
/** @template {{}|null} T @template {string} U @arg {CM<T>|null} x @arg {U} k @returns {x is CM<T&Record<U,string>>} */
function is_obj_with_property_CM(x, k) {
	if (!x?.data) return false;
	if (!is_obj_with_property(x.data, k)) return false;
	if (typeof x.data[k] !== "string") return false;
	return true;
}
/** @template T @arg {CM<T>|null} x @returns {x is CM<T&{}>} */
function is_object_CM(x) {
	if (!x?.data) return false;
	if (typeof x.data !== "object") return false;
	return true;
}
/** @template {{}} T @template {string} U @arg {T} x @arg {U} k @returns {x is T&Record<U,unknown>} */
function is_obj_with_property(x, k) {
	if (x === null) return false;
	if (!(k in x)) return false;
	return true;
}
//#endregion

//#region cast_monad
/** @template T @arg {T} x @returns {CM<T>} */
function wrap_CM(x) {
	return { type: "cast", data: x };
}
/** @template T @arg {CM<T>|null} x */
function cast_to_object_CM(x) {
	if (!is_object_CM(x)) return null;
	return x;
}
/** @template T @arg {CM<T>} x @returns {CM<T&{type:string}>|null} */
function cast_to_event_like_CM(x) {
	const cast_result = cast_to_object_CM(x);
	if (!is_obj_with_property_CM(cast_result, "type")) return null;
	return cast_result;
}
//#endregion
class FlagHandler {
	is_none() {
		return this.f == 0;
	}
	is_syn() {
		return (this.f & 1) == 1;
	}
	is_ack() {
		return (this.f & 2) == 2;
	}
	/** @arg {import("./support/dbg/ConnectFlag.ts").ConnectFlag} flags */
	constructor(flags) {
		this.f = flags;
	}
}
/** @typedef {import("./support/dbg/ConnectFlag.ts").ConnectFlagT} ConnectFlagT */
/** @type {ConnectFlagT["Syn"]} */
const tcp_syn = 1;
/** @type {ConnectFlagT["Ack"]} */
const tcp_ack = 2;
const ack_win = 100_000;
class TCPMessage {
	/** @readonly */
	type = "tcp";
	/** @arg {import("./support/dbg/ConnectFlag.ts").ConnectFlag} flags @arg {number} client_id @arg {number} seq @arg {number} ack @arg {ConnectionMessage["data"]} data */
	constructor(flags, client_id, seq, ack, data) {
		this.flags = flags;
		this.client_id = client_id;
		this.seq = seq;
		this.ack = ack;
		/** @type {ConnectionMessage["data"]} */
		this.data = data;
	}
	/** @arg {number} client_id @returns {ConnectionMessage} */
	static make_syn(client_id) {
		const seq = (Math.random() * ack_win) % ack_win | 0;
		return new TCPMessage(tcp_syn, client_id, seq, 0, null);
	}
	/** @arg {number} client_id @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	static make_message(client_id, seq, ack, data) {
		return new TCPMessage(0, client_id, seq, ack, data);
	}
}
const testing_tcp = true;
class SocketBase {
	fmt_tag;
	/** @private */
	m_client_id;
	/** @arg {string} fmt_tag @arg {number} client_id */
	constructor(fmt_tag, client_id) {
		this.fmt_tag = fmt_tag;
		this.m_client_id = client_id;
	}
	/** @arg {import("./support/dbg/ConnectFlag.ts").ConnectFlag} flags */
	stringify_flags(flags) {
		let ret = "";
		if ((flags & 1) == 1) ret += "S";
		else ret += "_";
		if ((flags & 2) == 2) ret += "A";
		else ret += "_";
		return ret;
	}
	/**
	 * @param {string} dir
	 * @param {ConnectionMessage} tcp
	 */
	open_group(dir, tcp) {
		console.log("<?-");
		const socket_fmt = this.fmt_tag + "<" + tcp.seq + "," + tcp.ack + ">";
		const flags = this.stringify_flags(tcp.flags);
		console.groupCollapsed("-" + dir + "-" + flags + "-> " + socket_fmt);
	}
	close_group() {
		console.groupEnd();
		console.log("-?>");
	}
	/** @arg {ConnectionMessage} tcp */
	send_ack(tcp) {
		let { seq: ack, ack: seq, flags } = tcp;
		if ((flags & 2) && (flags & 1) == 1) flags ^= 1;
		flags |= tcp_ack;
		if (seq == 0) {
			seq = (Math.random() * ack_win) % ack_win | 0;
		}
		ack += 1;
		this.push_tcp_message({
			type: "tcp",
			client_id: this.client_id(),
			ack,
			seq,
			flags,
			data: null,
		});
	}
	/** @arg {ConnectionMessage} _data */
	push_tcp_message(_data) {
		throw new Error("Abstract impl");
	}
	make_syn() {
		return TCPMessage.make_syn(this.client_id());
	}
	client_id() {
		return this.m_client_id;
	}
	/** @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	make_message(seq, ack, data) {
		return TCPMessage.make_message(
			this.client_id(),
			seq,
			ack,
			data,
		);
	}
}

class ClientSocket extends SocketBase {
	static direct_message = false;
	/** @readonly */
	m_side = "client";
	/** @private */
	m_debug = false;
	/** @private */
	m_local_log = false;
	/** @private */
	m_port;
	/** @private */
	m_remote_target;
	/** @private */
	m_event_source;
	/** @arg {number} connection_timeout @arg {number} client_id @arg {Window} remote_target */
	constructor(connection_timeout, client_id, remote_target) {
		super("ClientSocket", client_id);
		this.m_connection_timeout = connection_timeout;
		this.m_remote_target = remote_target;
		this.m_event_source = remote_target;
		const { server_port, client_port } = this.init_syn_data();
		this.m_port = client_port;
		this.send_syn(server_port);
	}
	event_source() {
		return this.m_event_source;
	}
	/** @returns {{server_port:MessagePort; client_port:MessagePort}} */
	init_syn_data() {
		const {
			port1: server_port,
			port2: client_port,
		} = new MessageChannel();
		return { server_port, client_port };
	}
	reconnect() {
		const { server_port, client_port } = this.init_syn_data();
		this.m_port = client_port;
		this.send_syn(server_port);
	}
	init_handler() {
		this.m_port.addEventListener("message", this);
		this.m_port.start();
	}
	/** @arg {MessagePort} server_port */
	send_syn(server_port) {
		if (testing_tcp) {
			// <group syn>
			console.group("syn");
		}
		this.init_handler();
		this.send_init_request(this.make_syn(), server_port);
	}
	/** @arg {ConnectionMessage} data @arg {MessagePort} server_port */
	send_init_request(data, server_port) {
		if (this.m_debug) console.log("post request ConnectOverPostMessage");
		if (testing_tcp) {
			this.open_group("tx-client", data);
			console.log("client.send_init_request ->");
			console.log(".handleEvent ->");
			console.log("<remote window>", data);
			this.close_group();
		}
		this.post_wrapped(data, server_port);
	}
	/** @arg {ConnectionMessage} data @arg {MessagePort} server_port */
	post_wrapped(data, server_port) {
		/** @type {import("./support/dbg/WrappedMessage.ts").WrappedMessage<ConnectionMessage>} */
		const msg = {
			type: "WindowSocket",
			data,
		};
		this.m_remote_target.postMessage(msg, "*", [server_port]);
	}
	/** @override @arg {ConnectionMessage} data */
	push_tcp_message(data) {
		if (testing_tcp) {
			this.open_group("tx-client", data);
			console.log(".push_tcp_message ->");
			console.log("server_port.handleEvent ->");
			console.log("server", data);
			this.close_group();
		}
		if (ServerSocket.direct_message) {
			const p = ServerSocket.prototype;
			p.handleEvent(new MessageEvent("message", { data }));
		} else this.m_port.postMessage(data);
	}
	/** @arg {ConnectionMessage} tcp */
	client_connect(tcp) {
		if (testing_tcp) {
			const flags = this.stringify_flags(tcp.flags);
			const socket_fmt = this.fmt_tag + `<${tcp.seq},${tcp.ack},"${flags}">`;
			console.log("on_client_connect", socket_fmt, tcp.data);
		}
	}
	/** @arg {MessageEvent<ConnectionMessage>} event */
	handleEvent(event) {
		if (ClientSocket.prototype === this) return;
		const tcp = event.data;
		if (tcp.type !== "tcp") throw new Error();
		if (testing_tcp) {
			this.open_group("rx-client", tcp);
			console.log(".handleEvent ->");
			console.log(".handle_tcp_data ->");
			console.log("server", tcp, tcp.data);
			this.close_group();
		}
		this.handle_tcp_data(tcp);
	}
	/** @arg {ConnectionMessage} tcp */
	handle_tcp_data(tcp) {
		const f = new FlagHandler(tcp.flags);
		if (this.m_local_log) console.log("local", tcp);
		if ((f.is_syn() && f.is_ack()) || f.is_none()) {
			this.send_ack(tcp);
		}
		if (!tcp.data) return;
		const tcp_data = tcp.data;
		switch (tcp_data.type) {
			case "connected":
				this.client_connect(tcp);
				break;
			case "will_disconnect":
				this.m_can_reconnect = tcp_data.can_reconnect;
				this.m_disconnect_start = performance.now();
				break;
			case "disconnected": {
				if (!this.m_disconnect_start) {
					throw new Error("missed will_disconnect");
				}
				const perf_diff = performance.now() - this.m_disconnect_start;
				console.log("before_unload took", perf_diff);
				this.client_disconnect(tcp);
				break;
			}
			default:
				if (testing_tcp) {
					console.log("handle_tcp_data unexpected tcp_data", tcp_data);
				}
				break;
		}
	}
	client_start_connect() {
		if (!this.m_port) throw new Error("No remote port to communicate with");
	}
	/** @arg {ConnectionMessage} message */
	client_disconnect(message) {
		if (testing_tcp) console.log("on_client_disconnect", message);
		this.m_connected = false;
		if (!this.m_port) {
			throw new Error(
				"missing connection port, and disconnect was still called",
			);
		}
		this.m_port.removeEventListener("message", this);
		this.m_port.close();
		setTimeout(this.reconnect.bind(this), 20);
	}
}
export_((exports) => {
	exports.ClientSocket = ClientSocket;
});

class OriginState {
	/** @private @readonly */
	m_top = window.top;
	/** @private @readonly @type {Window|null} */
	m_opener = window.opener;
	get_connect_target() {
		if (this.m_opener) return this.m_opener;
		if (this.m_top) return this.m_top;
		throw new Error("unable to get connect target");
	}
}
export_((exports) => {
	exports.OriginState = OriginState;
});
class ServerSocket extends SocketBase {
	static direct_message = false;
	/** @private @type {import("./support/dbg/ConnectionSide.ts").ConnectionSide} */
	m_side = "server";
	/** @private @type {ConnectionMessage[]} */
	m_unhandled_events = [];
	/** @private */
	m_is_connected = false;
	/** @private */
	m_is_connecting = true;
	/** @private @type {MessagePort} */
	m_port;
	/** @private @type {MessageEventSource} */
	m_event_source;
	/** @arg {MessagePort} connection_port @arg {number} client_id @arg {MessageEventSource} event_source */
	constructor(client_id, connection_port, event_source) {
		super("ListenSocket", client_id);
		this.m_event_source = event_source;
		this.m_port = connection_port;
		this.m_port.addEventListener("message", this);
		this.m_port.start();
	}
	get side() {
		return this.m_side;
	}
	get event_source() {
		return this.m_event_source;
	}
	get is_connected() {
		return this.m_is_connected;
	}
	/** @override @arg {ConnectionMessage} tcp */
	push_tcp_message(tcp) {
		if (testing_tcp) {
			this.open_group("tx-server", tcp);
			console.log(".push_tcp_message ->");
			console.log("port.postMessage ->");
			console.log("client", tcp, tcp.data);
			this.close_group();
		}
		if (ClientSocket.direct_message) {
			const p = ClientSocket.prototype;
			p.handleEvent(new MessageEvent("message", { data: tcp }));
		} else this.m_port.postMessage(tcp);
	}
	/** @arg {ConnectionMessage} tcp_message */
	downstream_connect(tcp_message) {
		const { seq, ack } = tcp_message;
		if (!ack) throw new Error("Invalid message");
		if (testing_tcp) {
			console.log("on_server_connect", this.client_id(), this.m_event_source);
		}
		this.push_tcp_message(this.make_message(
			seq,
			ack,
			{ type: "connected" },
		));
	}
	/** @arg {ConnectionMessage} info */
	downstream_handle_event(info) {
		if (!info.data) return;
		export_((exports) => {
			exports.socket.push_tcp_message(info);
		});
		if (testing_tcp) {
			console.log("downstream_event", info.data, info.flags, info.client_id);
		}
	}
	disconnected() {
		this.push_tcp_message(this.make_message(0, 0, { type: "disconnected" }));
	}
	/** @arg {boolean} can_reconnect */
	will_disconnect(can_reconnect) {
		// <group rst>
		if (testing_tcp) {
			console.group("rst");
		}
		this.push_tcp_message(this.make_message(
			0,
			0,
			{
				type: "will_disconnect",
				can_reconnect,
			},
		));
	}
	/** @arg {MessageEvent<ConnectionMessage>} event */
	handleEvent(event) {
		const tcp = event.data;
		if (tcp.type !== "tcp") {
			this.m_unhandled_events.push(tcp);
			console.log("unhandled event", tcp);
			return;
		}
		if (testing_tcp) {
			this.open_group("rx-server", tcp);
			console.log(".handleEvent ->");
			console.log(".handle_tcp_data ->");
			console.log("client", tcp);
			this.close_group();
		}
		this.handle_tcp_data(tcp);
	}
	/** @arg {ConnectionMessage} tcp */
	handle_tcp_data(tcp) {
		const f = new FlagHandler(tcp.flags);
		this.m_current_seq = tcp.seq;
		this.m_current_ack = tcp.ack;
		if (f.is_syn() && !f.is_ack()) {
			// seq=number & ack=null;
			this.send_ack(tcp);
		}
		if (f.is_none()) this.send_ack(tcp);
		if (f.is_ack() && this.m_is_connecting) {
			this.m_is_connecting = false;
			this.m_connected = true;
			this.downstream_connect(tcp);
		}
		this.downstream_handle_event(tcp);
	}
}

class WindowSocket extends SocketBase {
	/** @private */
	m_state = new OriginState();
	/** @private */
	m_local_handler;
	/** @private @type {ServerSocket[]} */
	m_connections = [];
	/** @private */
	m_client_max_id = 0;
	constructor() {
		super("WindowSocket", -1);
		const client_id = this.m_client_max_id++;
		this.start_root_server();
		const connect_target = this.m_state.get_connect_target();
		this.m_local_handler = new ClientSocket(
			30000,
			client_id,
			connect_target,
		);
	}
	/** @arg {MessageEvent<unknown>} event_0 */
	on_message_event(event_0) {
		console.log(event_0.data);
		if (!this.is_connection_message(event_0)) return;
		const wrapped_msg = event_0.data;
		if (wrapped_msg.type !== "WindowSocket") return;
		const client_id = this.m_client_max_id++;
		const connection_port = event_0.ports[0];
		if (!event_0.source) throw new Error("No event source");
		const event_source = event_0.source;
		const handler = new ServerSocket(
			client_id,
			connection_port,
			event_source,
		);
		const prev_connection_index = this.m_connections.findIndex((e) => {
			return e.event_source === event_source;
		});
		const data = event_0.data.data;
		if (testing_tcp) {
			this.open_group("rx-window", data);
			console.log(".on_message_event ->");
			console.log("server.handle_tcp_data ->");
			console.log("client", data);
			this.close_group();
		}
		handler.handle_tcp_data(data);
		if (prev_connection_index > -1) {
			this.m_connections.splice(prev_connection_index, 1);
		}
		this.m_connections.push(handler);
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<import("./support/dbg/WrappedMessage.ts").WrappedMessage<unknown>>} */
	is_wrapped_message(event) {
		const data = cast_to_event_like_CM(wrap_CM(event.data));
		if (!data) return false;
		return data.data.type === "WindowSocket";
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<import("./support/dbg/WrappedMessage.ts").WrappedMessage<ConnectionMessage>>} */
	is_connection_message(event) {
		if (!this.is_wrapped_message(event)) return false;
		const data_record = cast_to_event_like_CM(wrap_CM(event.data.data));
		if (!data_record) return false;
		if (data_record.data.type !== "tcp") return false;
		return true;
	}
	/** @template {CM<{type:string}>} T @arg {T|null} data @returns {data is T&CM<{type:string,data:unknown}>} */
	is_with_data_decay(data) {
		if (data === null) return false;
		if (!is_obj_with_property(data.data, "data")) return false;
		return true;
	}
	/** @override @arg {ConnectionMessage} message */
	push_tcp_message(message) {
		this.m_local_handler.push_tcp_message(message);
	}
	/** @arg {MessageEvent<unknown>} event */
	handleEvent(event) {
		switch (event.type) {
			case "message":
				this.on_message_event(event);
				break;
			case "beforeunload":
				for (const connection of this.m_connections) {
					connection.will_disconnect(false);
				}
				break;
			case "unload":
				for (const connection of this.m_connections) {
					connection.disconnected();
				}
				this.m_connections.length = 0;
				break;
		}
	}
	start_root_server() {
		self.addEventListener("message", this);
		self.addEventListener("beforeunload", this);
		self.addEventListener("unload", this);
	}
	static connect_to_api() {
		export_((exports) => {
			exports.WindowSocket = this;
			exports.socket = new this();
		});
	}
}
WindowSocket.connect_to_api();

const html_parsing_div_element = document.createElement("div");
/** @arg {string} html */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML = html;
	return Array.prototype.map.call(
		html_parsing_div_element.textContent,
		(e) => e.charCodeAt(0),
	);
}
export_((exports) => {
	exports.parse_html_to_binary_arr = parse_html_to_binary_arr;
});
class DebugInfoValue {
	valid = false;
	/** @arg {string} __v @returns {{type: "eval-hidden-var",var: string}|{type: "var",data: [string,unknown]}|{type: "no-var", data: null}|null} */
	get(__v) {
		return null;
	}
}
/** @template CLS_T */
class StoredData2 {
	/** @template T @arg {StoredData<T>|null} x @returns {x is StoredData<CLS_T>} */
	assume_is_stored_data(x) {
		if (x === null) return false;
		return true;
	}
}
/** @template T */
class StoredData {
	/** @arg {"tmp"|"u"|"d"|"getEventListeners"} tag @arg {T} data */
	constructor(tag, data) {
		this.store = data;
		const g_this = () => {
			return this;
		};
		switch (tag) {
			case "u": {
				/** @type {StoredData2<import("./support/dbg/I_undebug.ts").I_undebug>} */
				const a = new StoredData2();
				const o = g_this();
				if (!a.assume_is_stored_data(o)) break;
				this._u = o.store;
				break;
			}
			case "tmp": {
				/** @type {StoredData2<DebugInfoValue>} */
				const a = new StoredData2();
				const o = g_this();
				if (!a.assume_is_stored_data(o)) break;
				this._tmp = o.store;
				break;
			}
			case "d": {
				/** @type {StoredData2<import("./support/dbg/I_debug.ts").I_debug>} */
				const a = new StoredData2();
				const o = g_this();
				if (!a.assume_is_stored_data(o)) break;
				this._d = o.store;
				break;
			}
			case "getEventListeners": {
				/** @type {StoredData2<((x:unknown)=>{[x: string]: import("./support/dbg/EventListenerInternal.ts").EventListenerInternal[]})>} */
				const a = new StoredData2();
				const o = g_this();
				if (!a.assume_is_stored_data(o)) break;
				this._getEventListeners = o.store;
				break;
			}
		}
	}
	store;
	/** @private @type {((x:unknown)=>{[x: string]: import("./support/dbg/EventListenerInternal.ts").EventListenerInternal[]})|null} */
	_getEventListeners = null;
	get getEventListeners() {
		if (this._getEventListeners === null) throw new Error("missing data");
		return this._getEventListeners;
	}
	/** @private @type {DebugInfoValue|null} */
	_tmp = null;
	get tmp() {
		if (this._tmp === null) throw new Error("missing data");
		return this._tmp;
	}
	/** @private @type {import("./support/dbg/I_debug.ts").I_debug|null} */
	_d = null;
	/** @returns {import("./support/dbg/I_debug.ts").I_debug} */
	get d() {
		if (this._d === null) throw new Error("missing data");
		return this._d;
	}
	/** @private @type {import("./support/dbg/I_undebug.ts").I_undebug|null} */
	_u = null;
	/** @returns {import("./support/dbg/I_undebug.ts").I_undebug} */
	get u() {
		if (this._u === null) throw new Error("missing data");
		return this._u;
	}
}
class DebugApi {
	next_remote_id = 0;
	/** @type {Map<string, StoredData<unknown>>} */
	data_store = new Map();
	/** @type {DebugApi|null} */
	static m_the = null;
	/** @returns {DebugApi} */
	static the() {
		if (!this.m_the) this.m_the = new this();
		return this.m_the;
	}
	/** @arg {string} key @returns {boolean} */
	hasData(key) {
		return this.data_store.has(key);
	}
	/** @arg {string} key */
	getData(key) {
		return this.data_store.get(key);
	}
	/** @arg {string} key */
	ensureData(key) {
		const v = this.data_store.get(key);
		if (!v) throw new Error("missing data");
		return v;
	}
	/** @returns {import("./support/dbg/I_undebug.ts").I_undebug} */
	get_u() {
		const u = this.getData("u");
		if (!u) throw new Error("missing data");
		return u.u;
	}
	/** @returns {DebugInfoValue} */
	get_k() {
		return this.ensureData("k").tmp;
	}
	/** @returns {import("./support/dbg/I_debug.ts").I_debug} */
	get_d() {
		return this.ensureData("d").d;
	}
	/** @arg {"getEventListeners"} key @returns {(x:unknown)=>{[x: string]: import("./support/dbg/EventListenerInternal.ts").EventListenerInternal[]}} */
	get_getEventListeners(key) {
		return this.ensureData(key).getEventListeners;
	}
	/** @arg {string} key @arg {StoredData<unknown>} value @returns {this} */
	setData(key, value) {
		this.data_store.set(key, value);
		return this;
	}
	/** @arg {string} key @returns {boolean} */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/** @arg {unknown} element @returns {{[x: string]: import("./support/dbg/EventListenerInternal.ts").EventListenerInternal[]}} */
	getEventListeners(element) {
		if (!this.hasData("getEventListeners")) {
			throw new Error("1");
		}
		return this.get_getEventListeners("getEventListeners")(element);
	}
	/** @arg {import("./support/dbg/I_debug.ts").I_debug} debug @arg {import("./support/dbg/I_undebug.ts").I_undebug} undebug @arg {import("./support/types/Constructor.ts").Constructor} func @arg {string} name @returns {import("./__global.ts").dbg_result} */
	get_event_listener_var_vec_1(debug, undebug, func, name) {
		this.attach(debug, undebug, null);
		/** @arg {import("./support/types/Constructor.ts").Constructor} func @arg {unknown} f_this @arg {unknown[]} c_args */
		function do_activate(func, f_this, c_args) {
			try {
				return Reflect.apply(func, f_this, c_args);
			} catch (e) {
				console.log("do_activate swallow error", e);
			}
		}
		const activate = do_activate.bind(null, func, {}, [{
			get target() {
				throw new Error("1");
			},
		}]);
		return this.debuggerGetVar_a({
			type: "class-breakpoint",
			name,
			target: func,
			activate,
			activate_args: [],
		});
	}
	/** @arg {unknown} debug @arg {unknown} undebug @arg {null} getEventListeners @returns {this} */
	attach(debug, undebug, getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		const obj_debug = this.get_d();
		const obj_undebug = this.getData("u");
		const get_ev_lis = this.getData("getEventListeners");
		if (
			obj_debug !== debug || obj_undebug !== undebug ||
			get_ev_lis !== getEventListeners
		) {
			this.setData("d", new StoredData("d", debug));
			this.setData("u", new StoredData("u", undebug));
			this.setData(
				"getEventListeners",
				new StoredData("getEventListeners", getEventListeners),
			);
		}
		return this;
	}
	/** @arg {new (...arg0: unknown[]) => unknown} class_value @arg {unknown[]} arg_vec @returns {unknown} */
	activateClass(class_value, arg_vec) {
		return new class_value(...arg_vec);
	}
	/** @this {import("./support/dbg/ActivateFunction.ts").ActivateFunction} @returns {boolean} */
	activateApply() {
		return Reflect.apply(this.target, this.activate_this, this.activate_args);
	}
	/** @returns {void} */
	debuggerBreakpointCode() {
		window.__require_module_cache__?.DebugApi?.DebugApi.the();
		window.__require_module_cache__?.DebugApi &&
			(window.__require_module_cache__.DebugApi.DebugApi.the().get_k().get = (
				/** @type {string} */ __v,
			) => {
				if (__v === "__v") return { type: "eval-hidden-var", var: "__v" };
				try {
					return {
						type: "var",
						data: [__v, eval(__v)],
					};
				} catch {
					return { type: "no-var", data: null };
				}
			});
		if (window.__require_module_cache__?.DebugApi) {
			if (
				!window.__require_module_cache__.DebugApi.DebugApi.the()
					.clearCurrentBreakpoint()
			) {
				console.log("failed to clear breakpoint");
			}
		} else console.log("missing window.inject_api");
		0;
	}
	/** @returns {boolean} */
	clearCurrentBreakpoint() {
		if (this.current_function_value === void 0) return false;
		const undebug = this.get_u();
		if (undebug) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/** @argument {Function} function_value @returns {string} */
	stringifyFunction(function_value) {
		let function_code = function_value.toString();
		if (function_code.includes("{}"[0])) {
			function_code = function_code.slice(function_code.indexOf("{}"[0]));
		} else console.log(function_code);
		return function_code;
	}
	/** @arg {import("./support/dbg/IDebugBreakpointArgs.ts").IDebugBreakpointArgs} breakpoint_arguments @returns {import("./__global.ts").dbg_result} */
	debuggerGetVarArray_a(breakpoint_arguments) {
		const function_value = breakpoint_arguments.target;
		const var_match = breakpoint_arguments.name;
		if (!this.hasData("d") || !this.getData("u")) {
			return { type: "invalid-state-error" };
		}
		if (typeof function_value != "function") return { type: "argument-error" };
		const ma = var_match.matchAll(/.-.|./g);
		const sr = [];
		const qs = [...ma].map((e) => e[0]);
		for (const j of qs) {
			if (j.length === 1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			const fs = j.split("-");
			const sa = fs[0].charCodeAt(0);
			const se = fs[1].charCodeAt(0);
			for (let i = sa; i <= se; i++) sr.push(i);
		}
		const vars_arr = sr.map((e) => String.fromCharCode(e));
		this.current_function_value = function_value;
		const tmp_key = "k";
		const tmp_value = new StoredData("tmp", new DebugInfoValue());
		this.setData(tmp_key, tmp_value);
		const debug = this.get_d();
		const breakpoint_code_string = this.stringifyFunction(
			this.debuggerBreakpointCode,
		);
		debug(this.current_function_value, `${breakpoint_code_string}`);
		// ---- Activate ----
		let activate_return = null;
		if (breakpoint_arguments.type === "function-breakpoint") {
			const { target, activate_this, activate_args } = breakpoint_arguments;
			activate_return = breakpoint_arguments.activate(
				target,
				activate_this,
				activate_args,
			);
		} else {
			this.get_u()(this.current_function_value);
			return { type: "argument-error" };
		}
		const exec_res_arr = [];
		if (tmp_value.tmp.get) {
			for (const j of vars_arr) {
				const res = tmp_value.tmp.get(j);
				if (!res) continue;
				switch (res.type) {
					case "var":
						exec_res_arr.push(res.data);
						break;
					case "no-var":
						break;
					case "eval-hidden-var":
						console.log(
							"can't use dynamic eval for var hidden by eval argument \"" + j +
								'"',
						);
				}
			}
		}
		this.deleteData(tmp_key);
		if (exec_res_arr.length) {
			return {
				type: "data-arr",
				data: {
					result: exec_res_arr,
					return: activate_return,
				},
			};
		}
		return {
			type: "no-response",
			return: activate_return,
		};
	}
	/** @arg {import("./support/types/Constructor.ts").Constructor} class_value @arg {[unknown,unknown[]]} activate_args @arg {string} var_match @returns {import("./__global.ts").dbg_result} */
	debuggerGetVarArray_c(class_value, activate_args, var_match) {
		return this.debuggerGetVarArray_a({
			type: "class-breakpoint",
			name: var_match,
			target: class_value,
			activate: this.activateClass,
			activate_args,
		});
	}
	/** @arg {(...x: unknown[]) => void} function_value @arg {[unknown, unknown[]]} activate_args @arg {string} var_match @returns {import("./__global.ts").dbg_result} */
	debuggerGetVarArray(function_value, activate_args, var_match) {
		return this.debuggerGetVarArray_a({
			type: "function-breakpoint",
			name: var_match,
			target: function_value,
			activate: this.activateApply,
			activate_this: activate_args[0],
			activate_args: activate_args[1],
		});
	}
	/** @arg {import("./support/dbg/IDebugBreakpointArgs.ts").IDebugBreakpointArgs} breakpoint_arguments @returns {import("./__global.ts").dbg_result} */
	debuggerGetVar_a(breakpoint_arguments) {
		if (!this.hasData("d") || !this.getData("u")) {
			return { type: "invalid-state-error" };
		}
		if (typeof breakpoint_arguments.target != "function") {
			return { type: "argument-error" };
		}
		const tmp_key = "k";
		const tmp_value = new StoredData("tmp", new DebugInfoValue());
		this.setData(tmp_key, tmp_value);
		const breakpoint_code_string = this.stringifyFunction(
			this.debuggerBreakpointCode,
		);
		const debug = this.get_d();
		this.current_function_value = breakpoint_arguments.target;
		debug(this.current_function_value, `${breakpoint_code_string}`);
		// ---- Activate ----
		let activate_return = null;
		if (breakpoint_arguments.type === "class-breakpoint") {
			activate_return = breakpoint_arguments.activate(
				breakpoint_arguments.target,
				breakpoint_arguments.activate_args,
			);
		} else if (breakpoint_arguments.type === "function-breakpoint") {
			activate_return = breakpoint_arguments.activate(
				breakpoint_arguments.target,
				breakpoint_arguments.activate_this,
				breakpoint_arguments.activate_args,
			);
		} else {
			this.get_u()(this.current_function_value);
			return { type: "argument-error" };
		}
		this.deleteData(tmp_key);
		const breakpoint_result = tmp_value.tmp.get(breakpoint_arguments.name);
		if (!breakpoint_result) {
			return {
				type: "no-response",
				return: activate_return,
			};
		}
		if (breakpoint_result?.type === "var") {
			return {
				type: "data",
				result: breakpoint_result.data,
				return: activate_return,
			};
		}
		if (breakpoint_result) {
			return {
				type: "unexpected",
				data: {
					result: breakpoint_result,
					return: activate_return,
				},
			};
		}
		return {
			type: "no-response",
			return: activate_return,
		};
	}
	/** @arg {import("./support/types/Constructor.ts").Constructor} class_value @arg {unknown[]} activate_args @arg {string} var_name @returns {import("./__global.ts").dbg_result} */
	debuggerGetVar_c(class_value, activate_args, var_name) {
		return this.debuggerGetVar_a({
			type: "class-breakpoint",
			name: var_name,
			target: class_value,
			activate: this.activateClass,
			activate_args,
		});
	}
	/** @arg {(...x: unknown[]) => void} function_value @arg {[unknown, unknown[]]} activate_vec @arg {string} var_name @returns {import("./__global.ts").dbg_result} */
	debuggerGetVar(function_value, activate_vec, var_name) {
		if (typeof function_value != "function") return { type: "argument-error" };
		const ret = this.debuggerGetVar_a({
			type: "function-breakpoint",
			target: function_value,
			name: var_name,
			activate: this.activateApply,
			activate_this: activate_vec[0],
			activate_args: activate_vec[1],
		});
		if (ret.type !== "data") throw new Error("Debug fail");
		return {
			type: "var-result",
			name: ret.result[0],
			result: ret.result[1],
			return: ret.return,
		};
	}
}
export_((exports) => {
	exports.DebugApi = DebugApi;
});
export_((exports) => {
	exports.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
		isDisabled: false,
		supportsFiber: true,
		/** @type {import("./support/ReactDevtoolsHook.ts").ReactDevtoolsHook|null} */
		hook_ref: null,
		/** @arg {import("./support/ReactDevtoolsHook.ts").ReactDevtoolsHook} react_devtools_scope */
		inject(react_devtools_scope) {
			this.hook_ref = react_devtools_scope;
		},
	};
}, { global: true });
export_((exports) => {
	const proxy_map = new Map();
	const proxy_revoke_fn_map = new Map();
	exports.__proxy_map__ = proxy_map;
	const proxy_make = window.Proxy;
	const proxy_revocable_make = proxy_make.revocable;
	/** @type {ProxyHandler<ProxyConstructor["revocable"]>} */
	const proxy_revocable_handler = {
		apply(...args) {
			/** @type {ReturnType<ProxyConstructor["revocable"]>} */
			const ret = Reflect.apply(...args);
			proxy_revoke_fn_map.set(ret.proxy, ret.revoke);
			proxy_map.set(ret.proxy, args);
			return ret;
		},
		get(obj, key, rx) {
			const ret = Reflect.get(obj, key, rx);
			console.log("Proxy.revocable.", key);
			return ret;
		},
	};
	const proxy_revocable_proxy = new window.Proxy(
		proxy_revocable_make,
		new Proxy(proxy_revocable_handler, {
			/** @arg {typeof proxy_revocable_handler} o @arg {keyof typeof proxy_revocable_handler} k */
			get(o, k) {
				if (k in o) return o[k];
				console.log("Proxy.revocable proxy key", o, k);
				return void 0;
			},
		}),
	);
	/** @type {ProxyHandler<ProxyConstructor>} */
	const proxy_construct_handler = {
		construct(...args) {
			const ret = Reflect.construct(...args);
			proxy_map.set(ret, args);
			return ret;
		},
		get(obj, key, rx) {
			const ret = Reflect.get(obj, key, rx);
			if (key === "revocable") return proxy_revocable_proxy;
			return ret;
		},
	};
	exports.Proxy = new window.Proxy(
		proxy_make,
		new Proxy(proxy_construct_handler, {
			/** @arg {typeof proxy_construct_handler} o @arg {keyof typeof proxy_construct_handler} k */
			get(o, k) {
				if (k in o) return o[k];
				console.log("Proxy proxy key", o, k);
				return void 0;
			},
		}),
	);
}, { global: true });
export_((exports) => exports.__module_loaded__ = true);
if (delete_require) {
	delete window.require;
} else if (reset_require) {
	require = page_require;
}
