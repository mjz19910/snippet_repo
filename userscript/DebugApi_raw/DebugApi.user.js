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
/** @typedef {(import("./a/ConnectionMessage.ts") .ConnectionMessage)} ConnectionMessage */
const __module_name__ = "DebugApi";
/** @private @template T @arg {(x:typeof exports)=>T} fn @returns {T} */
function export_(fn, flags = { global: false }) {
	return do_export(fn, flags, exports, __module_name__);
}
export_((exports) => {
	exports.__is_module_flag__ = true;
});
const cur_module = export_((v) => v);
//#region is_helpers
/** @template T @typedef {import("./a/CM.ts").CM<T>} CM */
/** @template T @typedef {import("./a/TargetedMessage.ts").TargetedMessage<T>} TargetedMessage */
/** @template {{}|null} T @template {string} U @arg {CM<T>|null} x @arg {U} k @returns {x is CM<T&Record<U,string>>} */
function is_CM_property_string_CM(x, k) {
	if (!x?.data) return false;
	if (!is_obj_with_property(x.data, k)) return false;
	if (typeof x.data[k] !== "string") return false;
	return true;
}
/** @template {{}|null} T @template {string} U @arg {CM<T>|null} x @arg {U} k @returns {x is CM<T&Record<U,unknown>>} */
function is_CM_property_unknown_CM(x, k) {
	if (!x?.data) return false;
	if (!is_obj_with_property(x.data, k)) return false;
	return true;
}
/** @template {{}|null} T @template {string} U @template {string} V @arg {V} v @arg {CM<T>|null} x @arg {U} k @returns {x is CM<Record<U,V>>} */
function is_obj_with_value_at_property_CM(x, k, v) {
	if (!x?.data) return false;
	if (!is_obj_with_property(x.data, k)) return false;
	if (x.data[k] !== v) return false;
	return true;
}
/** @template {{}|null} T @template {string} U @arg {CM<T>|null} x @arg {U} k @returns {x is CM<Record<U,MessagePort>>} */
function is_CM_with_property_message_port(x, k) {
	if (!x?.data) return false;
	if (!is_obj_with_property(x.data, k)) return false;
	if (!is_message_port(x.data[k])) return false;
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
	if (!is_CM_property_string_CM(cast_result, "type")) return null;
	return cast_result;
}
/** @template T @arg {T} v @returns {v is MessagePort} */
function is_message_port(v) {
	return v instanceof MessagePort;
}
/** @template T @arg {CM<T>} x @returns {CM<T&TargetedMessage<unknown>>|null} */
function cast_to_CM_TargetedMessage(x) {
	const cast_result = cast_to_object_CM(x);
	if (
		!is_obj_with_value_at_property_CM(cast_result, "target", "ServerSocket")
	) return null;
	if (!is_CM_property_unknown_CM(cast_result, "message")) return null;
	if (!is_CM_with_property_message_port(cast_result, "port")) return null;
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
	/** @arg {import("./a/ConnectFlag.ts").ConnectFlag} flags */
	constructor(flags) {
		this.f = flags;
	}
}
/** @typedef {import("./a/ConnectFlag.ts").ConnectFlagT} ConnectFlagT */
/** @type {ConnectFlagT["Syn"]} */
const tcp_syn = 1;
/** @type {ConnectFlagT["Ack"]} */
const tcp_ack = 2;
const ack_win = 100_000;
class TCPMessage {
	/** @readonly */
	type = "tcp";
	/** @arg {import("./a/ConnectFlag.ts").ConnectFlag} flags @arg {number} seq @arg {number} ack @arg {ConnectionMessage["data"]} data */
	constructor(flags, seq, ack, data) {
		this.flags = flags;
		this.seq = seq;
		this.ack = ack;
		/** @type {ConnectionMessage["data"]} */
		this.data = data;
	}
	/** @returns {ConnectionMessage} */
	static make_syn() {
		const seq = (Math.random() * ack_win) % ack_win | 0;
		return new TCPMessage(tcp_syn, seq, 0, null);
	}
	/** @arg {import("./a/ConnectFlag.ts").ConnectFlag} flags @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	static make_message2(flags, seq, ack, data) {
		return new TCPMessage(flags, seq, ack, data);
	}
	/** @arg {ConnectionMessage["data"]} data @arg {number} seq @arg {number} ack @returns {ConnectionMessage} */
	static make_message(seq, ack, data) {
		return new TCPMessage(0, seq, ack, data);
	}
}
const testing_tcp = true;
const console = { ...self.console };
console.log = console.log.bind(console);
class SocketBase {
	fmt_tag;
	/** @private */
	m_client_id;
	/** @arg {string} fmt_tag @arg {number} client_id */
	constructor(fmt_tag, client_id) {
		this.fmt_tag = fmt_tag;
		this.m_client_id = client_id;
	}
	/** @deprecated */
	get client_id() {
		return this.m_client_id;
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
	/** @arg {string} fmt @arg {ConnectionMessage} tcp */
	flat_log(fmt, tcp) {
		if (tcp.data !== null) {
			console.log(fmt, tcp, tcp.data);
		} else {
			console.log(fmt, tcp, null);
		}
	}
	/** @arg {ConnectionMessage} tcp */
	make_ack_message(tcp) {
		let { seq: ack, ack: seq, flags } = tcp;
		if ((flags & 2) && (flags & 1) == 1) flags ^= 1;
		flags |= tcp_ack;
		if (seq == 0) {
			seq = (Math.random() * ack_win) % ack_win | 0;
		}
		ack += 1;
		return TCPMessage.make_message2(flags, seq, ack, null);
	}
	make_syn() {
		return TCPMessage.make_syn();
	}
	/** @arg {import("./a/ConnectFlag.ts").ConnectFlag} flags */
	stringify_flags(flags) {
		let ret = "";
		if ((flags & 1) == 1) ret += "S";
		else ret += "_";
		if ((flags & 2) == 2) ret += "A";
		else ret += "_";
		return ret;
	}
}
class ClientSocket extends SocketBase {
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
		if (this.m_remote_target === window) return;
		if (testing_tcp) {
			// <group syn>
			console.group("syn");
		}
		this.init_handler();
		this.send_init_request(this.make_syn(), server_port);
	}
	/** @arg {ConnectionMessage} tcp @arg {MessagePort} server_port */
	send_init_request(tcp, server_port) {
		if (this.m_debug) console.log("post request ConnectOverPostMessage");
		if (testing_tcp) {
			this.open_group("tx-client", tcp);
			this.flat_log(".send_init_request -> to_server", tcp);
			this.close_group();
		}
		this.post_wrapped(tcp, server_port);
	}
	/** @arg {ConnectionMessage} tcp @arg {MessagePort} server_port */
	post_wrapped(tcp, server_port) {
		this.postMessage({
			target: "ServerSocket",
			message: tcp,
			port: server_port,
		});
	}
	/** @arg {import("./a/TargetedMessage.ts").TargetedMessage<ConnectionMessage>} msg */
	postMessage(msg) {
		this.m_remote_target.postMessage(msg, "*", [msg.port]);
	}
	/** @arg {ConnectionMessage} tcp */
	push_tcp_message(tcp) {
		if (testing_tcp) {
			this.open_group("tx-client", tcp);
			this.flat_log(".push_tcp_message -> to_server", tcp);
			this.close_group();
		}
		this.m_port.postMessage(tcp);
	}
	/** @arg {ConnectionMessage} tcp */
	client_connect(tcp) {
		if (testing_tcp) {
			const flags = this.stringify_flags(tcp.flags);
			const socket_fmt = this.fmt_tag + `<${tcp.seq},${tcp.ack},"${flags}">`;
			console.log("on_client_connect", socket_fmt, tcp.data);
		}
		setTimeout(() => {
			// </group syn>
			console.groupEnd();
		});
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
		if (this.m_local_log) console.log("client", tcp);
		if ((f.is_syn() && f.is_ack()) || f.is_none()) {
			this.push_tcp_message(this.make_ack_message(tcp));
		}
		if (!tcp.data) return;
		const tcp_data = tcp.data;
		switch (tcp_data.type) {
			case "connected":
				this.m_connected = true;
				this.client_connect(tcp);
				break;
			case "will_disconnect":
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
	m_top = self.top;
	/** @private @readonly @type {Window|null} */
	m_opener = self.opener;
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
	/** @private @type {import("./a/ConnectionSide.ts").ConnectionSide} */
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
		super("ServerSocket", client_id);
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
	/** @arg {ConnectionMessage} tcp */
	push_tcp_message(tcp) {
		if (testing_tcp) {
			this.open_group("tx-server", tcp);
			this.flat_log(".push_tcp_message -> to_client", tcp);
			this.close_group();
		}
		this.m_port.postMessage(tcp);
	}
	/** @arg {ConnectionMessage["data"]} data @returns {ConnectionMessage} */
	make_message(data) {
		const seq = this.m_current_seq, ack = this.m_current_ack;
		return TCPMessage.make_message(seq, ack, data);
	}
	on_socket_connected() {
		if (testing_tcp) {
			console.log("on_socket_connected");
		}
		this.push_tcp_message(this.make_message({ type: "connected" }));
	}
	/** @arg {ConnectionMessage} tcp */
	handle_client_data(tcp) {
		cur_module.socket.push_tcp_message(tcp);
		if (testing_tcp) {
			if (tcp.data !== null) {
				console.log("downstream_event", tcp.data);
			} else {
				console.log("downstream_ping", tcp);
			}
		}
	}
	disconnected() {
		this.push_tcp_message(this.make_message({ type: "disconnected" }));
	}
	will_disconnect() {
		this.push_tcp_message(this.make_message({ type: "will_disconnect" }));
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
	m_current_ack = 0;
	m_current_seq = 0;
	/** @arg {ConnectionMessage} tcp */
	handle_tcp_data(tcp) {
		const f = new FlagHandler(tcp.flags);
		this.m_current_ack = tcp.ack;
		this.m_current_seq = tcp.seq;
		if ((f.is_syn() && !f.is_ack()) || f.is_none()) {
			this.push_tcp_message(this.make_ack_message(tcp));
		}
		if (f.is_ack() && !f.is_syn() && this.m_is_connecting) {
			this.m_is_connecting = false;
			this.m_connected = true;
			this.on_socket_connected();
		}
		if (!f.is_ack()) {
			this.handle_client_data(tcp);
		}
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
		const client_id = this.m_client_max_id++;
		const wrapped_msg = event_0.data;
		if (!event_0.source) throw new Error("No event source");
		const event_source = event_0.source;
		const socket = new ServerSocket(
			client_id,
			wrapped_msg.port,
			event_source,
		);
		this.append_connection(socket);
		const tcp = wrapped_msg.message;
		if (testing_tcp) {
			this.open_group("rx-window", tcp);
			this.flat_log(".on_message_event -> to_client", tcp);
			this.close_group();
		}
		socket.handle_tcp_data(tcp);
	}
	/** @arg {ServerSocket} socket */
	append_connection(socket) {
		const prev_connection_index = this.m_connections.findIndex((e) => {
			return e.event_source === socket.event_source;
		});
		if (prev_connection_index > -1) {
			this.m_connections.splice(prev_connection_index, 1);
		}
		this.m_connections.push(socket);
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<import("./a/TargetedMessage.ts").TargetedMessage<unknown>>} */
	is_wrapped_message(event) {
		/** @type {CM<import("./a/TargetedMessage.ts").TargetedMessage<unknown>>|null} */
		const data = cast_to_CM_TargetedMessage(wrap_CM(event.data));
		if (!data) return false;
		return data.data.target === "ServerSocket";
	}
	/** @arg {MessageEvent<unknown>} event @returns {event is MessageEvent<import("./a/TargetedMessage.ts").TargetedMessage<ConnectionMessage>>} */
	is_connection_message(event) {
		if (!this.is_wrapped_message(event)) return false;
		const data_record = cast_to_event_like_CM(wrap_CM(event.data.message));
		if (!data_record) return false;
		return true;
	}
	/** @template {CM<{type:string}>} T @arg {T|null} data @returns {data is T&CM<{type:string,data:unknown}>} */
	is_with_data_decay(data) {
		if (data === null) return false;
		if (!is_obj_with_property(data.data, "data")) return false;
		return true;
	}
	/** @arg {ConnectionMessage} tcp */
	push_tcp_message(tcp) {
		this.m_local_handler.push_tcp_message(tcp);
	}
	/** @arg {MessageEvent<unknown>} event */
	handleEvent(event) {
		switch (event.type) {
			case "message":
				this.on_message_event(event);
				break;
			case "beforeunload":
				for (const connection of this.m_connections) {
					connection.will_disconnect();
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
