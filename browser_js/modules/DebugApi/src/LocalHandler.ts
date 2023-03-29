import {elevate_event_handler} from "./elevate_event_handler";
import {OriginConnectionSide} from "./OriginConnectionSide";
import {RemoteOriginMessage} from "./RemoteOriginMessage";
import {ReportInfo} from "./ReportInfo";
import {RemoteOriginConnection} from "./RemoteOriginConnection";

export class LocalHandler {
	m_side: OriginConnectionSide="server";
	m_timeout_id: ReturnType<typeof setTimeout>|null=null;
	m_elevation_id: number|null=null;
	m_connection_port: MessagePort|null=null;
	m_remote_side_connected=false;
	m_tries_left=0;
	m_reconnecting=false;
	constructor(private m_root: RemoteOriginConnection,private m_connection_timeout: number) {
		elevate_event_handler(this);
	}
	start_reconnect() {
		this.m_root.request_new_port(this);
		this.m_timeout_id=setTimeout(
			this.process_reconnect.bind(this),
			this.m_connection_timeout/4
		);
	}
	process_reconnect() {
		if(this.m_tries_left<12) {
			console.log("reconnect tries_left",this.m_tries_left);
		}
		if(this.m_tries_left>0) {
			if(this.m_reconnecting) {
				this.start_reconnect();
				this.m_tries_left--;
			}
		} else {
			this.start_timeout();
		}
	}
	post_message(message_data: RemoteOriginMessage) {
		if(!this.m_connection_port) {
			throw new Error("unable to use missing port");
		}
		this.m_connection_port.postMessage(message_data);
	}
	m_missing_keep_alive_counter=0;
	keep_alive_send() {
		this.m_missing_keep_alive_counter++;
		if(this.m_missing_keep_alive_counter>1) {
			console.log("missed keep alive interval");
		}
		if(this.m_missing_keep_alive_counter>8) {
			console.log("keep alive disabled (no replies for 8 intervals)");
			if(this.m_keep_alive_interval) {
				clearInterval(this.m_keep_alive_interval);
			}
		}
		if(this.m_missing_keep_alive_counter>0) {
			// drain it slowly
			if(Math.random()<0.1) {
				this.m_missing_keep_alive_counter--;
			}
		}
		this.post_message({
			type: "keep_alive",
			side: "client",
		});
	}
	m_keep_alive_interval: number|null=null;
	handleEvent(event: MessageEvent<RemoteOriginMessage>) {
		let report_info=new ReportInfo(event,this);
		let data=event.data;
		switch(data.type) {
			case "connected": {
				this.m_root.transport_connected(report_info);
				if(this.m_reconnecting) {
					this.m_reconnecting=false;
				}
				if(!this.m_remote_side_connected&&this.m_timeout_id) {
					this.m_remote_side_connected=true;
					clearTimeout(this.m_timeout_id);
					this.m_timeout_id=null;
				}
				this.m_keep_alive_interval=setInterval(
					this.keep_alive_send.bind(this),
					this.m_connection_timeout/4
				);
			} break;
			case "disconnected": {
				if(this.m_reconnecting)
					return;
				this.disconnect();
				this.m_root.transport_disconnected(report_info);
				this.m_tries_left=24;
				this.m_reconnecting=true;
				this.m_remote_side_connected=false;
				this.m_timeout_id=setTimeout(this.process_reconnect.bind(this),15000);
			} break;
			case "keep_alive": {
				this.post_message({
					type: "keep_alive_reply",
					sides: [data.side,this.m_side],
				});
			} break;
			case "keep_alive_reply": {
				if(this.m_timeout_id!==null) {
					clearTimeout(this.m_timeout_id);
				}
				if(this.m_missing_keep_alive_counter>0) {
					this.m_missing_keep_alive_counter--;
				}
			} break;
		}
	}
	connect(port: MessagePort,elevation_id: number) {
		this.m_elevation_id=elevation_id;
		this.m_connection_port=port;
		this.m_connection_port.start();
		this.m_connection_port.addEventListener("message",this);
		if(this.m_timeout_id!==null)
			return;
		this.start_timeout();
	}
	start_timeout() {
		this.m_timeout_id=setTimeout(() => {
			this.disconnect();
			this.m_root.request_new_port(this);
		},this.m_connection_timeout*2);
	}
	disconnect() {
		if(!this.m_connection_port)
			return;
		this.m_connection_port.removeEventListener('message',this);
		this.m_connection_port=null;
		this.m_remote_side_connected=false;
		if(this.m_keep_alive_interval) {
			clearInterval(this.m_keep_alive_interval);
		}
		if(this.m_elevation_id)
			this.m_root.clear_elevation_by_id(this.m_elevation_id);
	}
}
