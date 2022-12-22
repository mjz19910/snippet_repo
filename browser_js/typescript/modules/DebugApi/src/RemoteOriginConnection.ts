import {OriginState} from "./OriginState";
import {elevate_event_handler} from "./elevate_event_handler";
import {RemoteHandler} from "./RemoteHandler";
import {RemoteSocket} from "./RemoteSocket";
import {RemoteOriginMessage} from "./RemoteOriginMessage";
import {ReportInfo} from "./ReportInfo";
import {LocalHandler} from "./LocalHandler";
import {ConnectionFlags} from "./ConnectionFlags";
import {cast_to_object, cast_to_record_with_key_and_string_type, cast_to_record_with_string_type} from "./cast_to_object";
import {inject_api} from "../types/inject_api";

// @Update on minor version change
// version <4.9.13 commit sha1
const sha_1_initial="781ee649";

export const post_message_connect_message_type=`ConnectOverPostMessage_${sha_1_initial}` as const;

export class RemoteOriginConnection {
	m_flags=new ConnectionFlags;
	m_transport_map: Map<LocalHandler,{port: MessagePort;}>=new Map;
	max_elevate_id=0;
	event_transport_map: WeakMap<MessageEventSource|Window,Window>=new WeakMap;
	state=OriginState;
	elevated_array: ({}|null)[]=[];
	request_new_port(obj: LocalHandler) {
		this.request_connection(obj);
	}
	transport_disconnected(arg0: ReportInfo<LocalHandler>) {
		console.log('transport disconnected',arg0.event.data,arg0.event);
	}
	unhandled_child_events: RemoteOriginMessage[]=[];
	m_local_handler: LocalHandler;
	constructor() {
		this.m_local_handler=new LocalHandler(30000,this);
		let s=this.state;
		s.is_top=this.state.window===this.state.top;
		s.is_root=this.state.opener===null;
		if(!s.is_top)
			s.is_root=false;
		if(s.is_top&&s.opener===null) {
			this.start_root_server();
			return;
		}
		if(s.is_top&&s.opener!==null) {
			if(s.opener.top!==s.opener&&s.opener.top!==null) {
				this.init_with_next_parent(s.opener.top);
				return;
			}
			this.init_with_opener(s.opener);
			return;
		}
		if(!this.state.top)
			throw new Error("Invalid state, not top and window.top is null");
		this.init_with_next_parent(this.state.top);
	}
	last_misbehaved_client_event?: MessageEvent<unknown>|undefined;
	init_with_next_parent(cur_window: Window) {
		if(cur_window.top!==null&&cur_window.top!==cur_window) {
			this.init_with_next_parent(cur_window.top);
		}
		if(cur_window.opener===null) {
			this.init_transport_over(cur_window);
		} else {
			if(cur_window.opener.top!==cur_window.opener) {
				console.log("need to go up more");
			}
			this.init_with_opener(cur_window.opener);
		}
	}
	init_with_opener(opener: Window) {
		this.m_flags.does_proxy_to_opener=true;
		this.init_transport_over(opener);
		this.start_root_server();
	}
	m_remote_target?: Window;
	init_transport_over(remote_target: Window) {
		this.m_remote_target=remote_target;
		this.request_connection(this.m_local_handler);
	}
	request_connection(local_handler: LocalHandler) {
		if(!this.m_remote_target)
			return false;
		let channel=new MessageChannel;
		console.log("post request ConnectOverPostMessage");
		this.m_remote_target.postMessage({
			type: post_message_connect_message_type,
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		this.m_transport_map.set(local_handler,{
			port: channel.port2,
		});
		local_handler.connect(channel.port2,this.get_next_elevation_id());
		return true;
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id: number) {
		this.elevated_array[elevated_id]=null;
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object: any) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=object;
		return elevated_id;
	}
	get_next_elevation_id() {
		return this.max_elevated_id++;
	}
	/** @arg {{event: MessageEvent<RemoteOriginMessage>;handler: LocalHandler;}} message_event */
	transport_connected(message_event: {event: MessageEvent<RemoteOriginMessage>; handler: LocalHandler;}) {
		console.log('transport connected',message_event.event.data);
		if(message_event.event.source!==null) {
			this.event_transport_map.set(message_event.event.source,window);
		}
	}
	/**@type {RemoteSocket[]} */
	connections: RemoteSocket[]=[];
	client_max_id=0;
	/**
	 * @arg {MessageEvent<unknown>} event
	 */
	on_connect_request_message(event: MessageEvent<unknown>) {
		let fail=() => this.on_client_misbehaved(event);
		let cast_result=cast_to_object(event.data);
		if(cast_result===null)
			return fail();
		let message_data=cast_result.data;
		if(message_data===null)
			return fail();
		// for https://godbolt.org & vscode integrators
		if('vscodeScheduleAsyncWork' in message_data)
			return;
		/** @type {{type:string}|null} */
		let message_record: {type: string;}|null=cast_to_record_with_string_type(message_data);
		if(message_record===null)
			return fail();
		switch(message_record.type) {
			case post_message_connect_message_type: break;
			default: return fail();
		}
		let client_id=this.client_max_id++;
		let connection_port=event.ports[0];
		let handler=new RemoteHandler(this.m_flags,connection_port,client_id);
		let prev_connection_index=this.connections.findIndex(e => {
			return e.first_event.source===event.source;
		});
		if(prev_connection_index>-1) {
			this.connections.splice(prev_connection_index,1);
		}
		this.connections.push(new RemoteSocket(connection_port,handler,client_id,event));
	}
	postListeningToConnection() {}
	/** @arg {{}} data_obj @returns {boolean} */
	is_sponsor_block_event_data(data_obj: {}): boolean {
		let message_record_with_source=cast_to_record_with_key_and_string_type(data_obj,"source");
		if(!message_record_with_source)
			return false;
		if(message_record_with_source.source!=="sponsorblock")
			return false;
		// should be a SponsorBlock event.data
		/** @type {{type:string}|null} */
		let message_record_with_type: {type: string;}|null=cast_to_record_with_string_type(message_record_with_source);
		if(message_record_with_type===null)
			return false;
		switch(message_record_with_type.type) {
			case "data":
			case "navigation": return true;
		}
		return false;
	}
	/** @arg {MessageEvent<unknown>} event */
	did_client_misbehave(event: MessageEvent<unknown>) {
		// don't handle strings, too easy to get custom data that
		// may be very hard to distinguish between
		if(typeof event.data==='string')
			return false;
		if(typeof event.data==='object') {
			if(event.data===null)
				return true;
			// for https://godbolt.org & vscode integrators
			if('vscodeScheduleAsyncWork' in event.data)
				return false;
			return false;
		}
		return true;
	}
	/** @arg {MessageEvent<unknown>} event */
	can_handle_message(event: MessageEvent<unknown>) {
		if(typeof event.data==='string')
			return false;
		if(typeof event.data==='object') {
			if(event.data===null)
				return false;
			// for https://godbolt.org & vscode integrators
			if('vscodeScheduleAsyncWork' in event.data)
				return false;
			let is_sponsor_block=this.is_sponsor_block_event_data(event.data);
			if(is_sponsor_block)
				return false;
			return true;
		}
		return false;
	}
	/** @arg {MessageEvent<unknown>} event */
	extract_message(event: MessageEvent<unknown>) {
		let cast_result=cast_to_object(event.data);
		if(cast_result===null)
			return null;
		let message_data=cast_result.data;
		if(message_data===null)
			return null;
		// for https://godbolt.org & vscode integrators
		if('vscodeScheduleAsyncWork' in message_data)
			return null;
		return message_data;
	}
	/** @arg {MessageEvent<unknown>} event */
	on_message_event(event: MessageEvent<unknown>) {
		let fail=() => this.on_client_misbehaved(event);
		if(this.did_client_misbehave(event))
			return fail();
		if(!this.can_handle_message(event))
			return;
		if(event.ports.length===0) {
			let message_data=this.extract_message(event);
			if(message_data===null)
				return fail();
			fail();
		} else if(event.ports.length===1) {
			this.on_connect_request_message(event);
		} else {
			console.log("too many ports");
			fail();
		}
	}
	/** @arg {MessageEvent<unknown>} event */
	on_client_misbehaved(event: MessageEvent<unknown>) {
		console.group("[RemoteOriginConnection.on_client_misbehaved]");
		console.log(`Client misbehaved: Connect api not followed`);
		console.log("root_ev_data",event.data);
		console.log("root_ev_ports",event.ports);
		console.log("root_event",event);
		this.last_misbehaved_client_event=event;
		console.groupEnd();
	}
	start_root_server() {
		let t=this;
		/** @arg {MessageEvent<unknown>} event */
		function on_message_event(event: MessageEvent<unknown>) {
			t.on_message_event(event);
		}
		elevate_event_handler(on_message_event);
		window.addEventListener("message",on_message_event);
		window.addEventListener("beforeunload",function() {
			for(let connection of t.connections) {
				connection.handler.onDisconnect();
			}
		});
		window.addEventListener("unload",function() {
			t.connections.length=0;
		});
	}
	static connect_to_api() {
		inject_api.RemoteOriginConnection=this;
		let remote_origin=new this;
		inject_api.remote_origin=remote_origin;
	}
}
