class MessageChannelExt {
	constructor() {
		this.next_callback_id = 0;

		/** @type {Map<number,()=>void>} */
		this.callback_map = new Map();

		this.channel = new MessageChannel();
		/** @type {(ev: MessageEvent<number>)=>void} */
		const port_message_handler = (msg) => {
			this.port_message(msg);
		};
		this.channel.port1.onmessage = port_message_handler;
	}
	/** @param {MessageEvent<number>} msg */
	port_message(msg) {
		const callback_id = msg.data, cb = this.callback_map.get(callback_id);
		if (!cb) return;
		this.fire(cb, callback_id);
	}
	fire(cb, id) {
		cb();
		this.channel.port2.postMessage(id);
	}
	set(cb) {
		const callback_id = ++this.next_callback_id;
		this.callback_map.set(callback_id, cb);
		this.fire(cb, callback_id);
		return callback_id;
	}
	clear(callback_id) {
		this.callback_map.delete(callback_id);
	}
}
const mc = new MessageChannelExt();
mc;
