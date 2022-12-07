import {RemoteOriginConnection} from "./debug_api/RemoteOriginConnection.js";

export class TransportMessageObj {
	/**@type {WeakRef<RemoteOriginConnection>|null} */
	w_connection=null;
	/**@type {number|null|undefined} */
	elevation_id=null;
	/** @type {Window|null} */
	current_target=null;
	/**
	 * @param {any} message_event_response
	 */
	handleEvent(message_event_response) {
		if(this.w_connection&&this.w_connection.deref()==null) {
			console.log('lost connection in handleEvent');
			this.disconnect();
			return;
		}
		this.w_connection&&this.w_connection.deref()?.transport_init_maybe_complete({
			event: message_event_response,
			handler: this
		});
	}
	/**
	 * @param {RemoteOriginConnection} connection
	 */
	construct(connection) {
		this.w_connection=new WeakRef(connection);
	}
	/** @type {ReturnType<typeof setTimeout>|null} */
	timeout_id=null;
	/**
	 * @param {Window} transport_target
	 * @param {number} timeout_ms
	 */
	start(transport_target,timeout_ms) {
		if(!this.w_connection)
			throw new Error();
		this.elevation_id=this.w_connection.deref()?.elevate_object(this);
		this.connect(transport_target);
		this.timeout_id=setTimeout(() => {
			if(!this.w_connection)
				throw new Error();
			if(this.w_connection.deref()==null) {
				console.log('lost connection in timeout');
			}
			this.disconnect();
			this.clear();
		},timeout_ms);
	}
	/**
	 * @param {Window} target
	 */
	connect(target) {
		if(this.current_target!==null&&this.current_target!==target)
			this.disconnect();
		this.current_target=target;
		this.current_target.addEventListener('message',this);
	}
	disconnect() {
		if(this.current_target) {
			this.current_target.removeEventListener('message',this);
		}
	}
	clear() {
		if(!this.w_connection)
			throw new Error();
		if(this.w_connection.deref()==null) {
			console.log('lost connection in clear');
			return;
		}
		if(this.elevation_id===null)
			throw new Error();
		if(this.elevation_id===void 0)
			throw new Error();
		this.w_connection.deref()?.clear_elevation_by_id(this.elevation_id);
	}
}
