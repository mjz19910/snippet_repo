import {OriginState} from "../OriginState";
import {TransportMessageObj} from "../TransportMessageObj";

export class RemoteOriginConnection {
	// @Update on minor version change
	// version 0.3.0 sha1 initial commit
	sha_1_initial="f615a9c";
	constructor() {
		this.max_elevate_id=0;
		/**@type {WeakMap<Window, Window>} */
		this.event_transport_map=new WeakMap;
		this.state=OriginState;
		/**
		 * @type {(WeakRef<any>|null)[]}
		 */
		this.elevated_array=[];
		this.state.is_top=this.state.window===this.state.top;
		this.state.is_root=this.state.opener===null;
		this.setup_root_proxy(this.state.window);
		if(!this.state.is_top)
			this.state.is_root=false;
		if(this.state.opener===null) {
			this.start_root_server();
		} else {
			if(this.state.is_top) {
				this.init_transport_over(this.state.opener,this.state.window);
			}
		}
	}
	/**
	 * @param {Window & typeof globalThis} window
	 */
	setup_root_proxy(window) {
		//TODO
		let todo=true;
		if(!todo) {
			return window;
		}
	}
	/**
	 * @param {Window} post_message_event_transport_target
	 * @param {Window} response_message_event_transport_target
	 */
	init_transport_over(post_message_event_transport_target,response_message_event_transport_target) {
		let channel=new MessageChannel;
		this.port=channel.port2;
		post_message_event_transport_target.postMessage({
			type: "ConnectOverPostMessage",
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		this.event_transport_map.set(response_message_event_transport_target,post_message_event_transport_target);
		let message_object=new TransportMessageObj;
		message_object.construct(this);
		message_object.start(response_message_event_transport_target,300);
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id) {
		this.elevated_array[elevated_id]=null;
		//TODO
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=new WeakRef(object);
		return elevated_id;
	}
	/**
	 * @param {any} message_event
	 */
	transport_init_maybe_complete(message_event) {
		//TODO
	}
	start_root_server() {
		//TODO
	}
}
