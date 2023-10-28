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
	/** @arg {import("./support/dbg/ConnectFlag.ts").ConnectFlag} flags @arg {number} seq @arg {number} ack @arg {ConnectionMessage["data"]} data */
	constructor(flags, ack, seq, data) {
		this.flags = flags;
		this.ack = ack;
		this.seq = seq;
		/** @type {ConnectionMessage["data"]} */
		this.data = data;
	}
	/** @returns {ConnectionMessage} */
	static make_syn() {
		const seq = (Math.random() * ack_win) % ack_win | 0;
		return new TCPMessage(tcp_syn, 0, seq, null);
	}
	/** @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	static make_message(seq, ack, data) {
		return new TCPMessage(0, ack, seq, data);
	}
}
const testing_tcp = true;
class SocketBase {
	fmt_tag;
	/** @arg {string} fmt_tag */
	constructor(fmt_tag) {
		this.fmt_tag = fmt_tag;
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
		this.push_tcp_message(this.make_message(ack, seq, null));
	}
	/** @arg {ConnectionMessage} _data */
	push_tcp_message(_data) {
		throw new Error("Abstract impl");
	}
	make_syn() {
		return TCPMessage.make_syn();
	}
	/** @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	make_message(ack, seq, data) {
		return TCPMessage.make_message(
			ack,
			seq,
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
	m_event_source;
	/** @arg {Window} event_source */
	constructor(event_source) {
		super("ClientSocket");
		this.m_event_source = event_source;
		const { server_port, client_port } = this.init_syn_data();
		this.m_port = client_port;
		this.send_syn(server_port);
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
		this.m_event_source.postMessage(msg, "*", [server_port]);
	}
	/** @override @arg {ConnectionMessage} tcp */
	push_tcp_message(tcp) {
		if (testing_tcp) {
			this.open_group("tx-client", tcp);
			console.log(".push_tcp_message ->");
			console.log("port.postMessage ->");
			console.log("server", tcp);
			this.close_group();
		}
		if (ServerSocket.direct_message) {
			const p = ServerSocket.prototype;
			p.handleEvent(new MessageEvent("message", { data: tcp }));
		} else this.m_port.postMessage(tcp);
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
	get_event_source() {
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
	/** @arg {MessagePort} connection_port */
	constructor(connection_port) {
		super("ListenSocket");
		this.m_port = connection_port;
		this.m_port.addEventListener("message", this);
		this.m_port.start();
	}
	get side() {
		return this.m_side;
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
	/** @arg {ConnectionMessage} tcp */
	downstream_connect(tcp) {
		const { ack, seq } = tcp;
		if (!ack) throw new Error("Invalid message");
		if (testing_tcp) {
			console.log("on_server_connect", tcp);
		}
		this.push_tcp_message(this.make_message(
			ack,
			seq,
			{ type: "connected" },
		));
		console.groupEnd();
	}
	/** @arg {ConnectionMessage} info */
	downstream_handle_event(info) {
		if (!info.data) return;
		export_((exports) => {
			exports.socket.push_tcp_message(info);
		});
		if (testing_tcp) {
			console.log("downstream_event", info.data, info.flags);
		}
	}
	disconnected() {
		this.push_tcp_message(this.make_message(0, 0, { type: "disconnected" }));
		// </group> (rst)
		console.groupEnd();
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
	m_socket;
	/** @private @type {ServerSocket[]} */
	m_connections = [];
	constructor() {
		super("WindowSocket");
		this.start_root_server();
		const event_source = this.m_state.get_event_source();
		this.m_socket = new ClientSocket(event_source);
	}
	/** @arg {MessageEvent<unknown>} event_0 */
	on_message_event(event_0) {
		console.log(event_0.data);
		if (!this.is_connection_message(event_0)) return;
		const wrapped_msg = event_0.data;
		if (wrapped_msg.type !== "WindowSocket") return;
		const connection_port = event_0.ports[0];
		if (!event_0.source) throw new Error("No event source");
		const handler = new ServerSocket(connection_port);
		const data = event_0.data.data;
		if (testing_tcp) {
			this.open_group("rx-window", data);
			console.log(".on_message_event ->");
			console.log("server.handle_tcp_data ->");
			console.log("client", data);
			this.close_group();
		}
		handler.handle_tcp_data(data);
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
		this.m_socket.push_tcp_message(message);
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
}
export_((exports) => {
	exports.WindowSocket = WindowSocket;
	exports.socket = new WindowSocket();
});
export_((exports) => exports.__module_loaded__ = true);
if (delete_require) {
	delete window.require;
} else if (reset_require) {
	require = page_require;
}
