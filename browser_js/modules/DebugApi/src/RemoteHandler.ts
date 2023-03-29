import {ConnectionFlags} from "./ConnectionFlags";
import {RemoteOriginMessage} from "./RemoteOriginMessage";
import {OriginConnectionSide} from "./OriginConnectionSide";

export class RemoteHandler {
	/** @type {OriginConnectionSide} */
	m_side: OriginConnectionSide="client";
	/** @type {RemoteOriginMessage[]} */
	unhandled_events: RemoteOriginMessage[]=[];
	/** @type {ConnectionFlags} */
	m_flags: ConnectionFlags;
	/** @type {MessagePort} */
	connection_port: MessagePort;
	/** @type {number} */
	client_id: number;
	/** @arg {RemoteOriginMessage} message_data */
	post_message(message_data: RemoteOriginMessage) {
		if(message_data.type!=='keep_alive_reply') {
			console.log("RemoteHandler.post_message",message_data);
		}
		this.connection_port.postMessage(message_data);
	}
	onConnected() {
		let {client_id}=this;
		this.post_message({type: "connected",client_id});
	}
	onDisconnect() {
		this.post_message({type: "disconnected"});
	}
	/** @arg {MessageEvent<RemoteOriginMessage>} event */
	handleEvent(event: MessageEvent<RemoteOriginMessage>) {
		if(this.m_flags.does_proxy_to_opener) {
			console.log("TODO proxy message to opener");
		}
		let {data}=event;
		switch(data.type) {
			case "keep_alive": {
				this.post_message({
					type: "keep_alive_reply",
					sides: [data.side,this.m_side],
				});
			} return;
			case "keep_alive_reply": {
				console.log("unexpected keep alive reply {side: `%o`, sides: `%o`}",this.m_side,data.sides);
			} return;
		}
		this.unhandled_events.push(data);
		console.log(data);
	}
	connect() {
		this.connection_port.start();
		this.connection_port.addEventListener("message",this);
		this.onConnected();
	}
	constructor(flags: ConnectionFlags,connection_port: MessagePort,client_id: number) {
		this.m_flags=flags;
		this.connection_port=connection_port;
		this.client_id=client_id;
		this.connect();
	}
}
