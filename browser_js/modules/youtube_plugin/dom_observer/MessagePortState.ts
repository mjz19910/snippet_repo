import {port_state_log} from "./port_state_log.ts"

export class MessagePortState {
	cint:ReturnType<typeof setTimeout>=-1 as unknown as ReturnType<typeof setTimeout>
	state_log=port_state_log
	time_offset=performance.now()
	current_event_type="find-ytd-app"
}
