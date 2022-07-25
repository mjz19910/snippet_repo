import {port_state_log} from "./youtube_plugin.user"

export class MessagePortState {
	cint=-1;
	state_log=port_state_log;
	time_offset=performance.now();
	current_event_type="find-ytd-app";
}
