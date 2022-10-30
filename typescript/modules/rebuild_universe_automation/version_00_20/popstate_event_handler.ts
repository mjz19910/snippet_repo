import {page_url_no_protocol} from "./page_url_no_protocol"

export function popstate_event_handler(e: PopStateEvent) {
	console.log('popstate',e.state,location.href)
	if(e.state===null) {
		let non_proto_url=page_url_no_protocol()
		if(non_proto_url=="//rebuildtheuniverse.com/mjz_version") {
			history.go(-1)
		} else if(non_proto_url=="//rebuildtheuniverse.com/?type=mjz_version") {
			history.go(-1)
		}
	}
	if(e.state) {
	} else {
	}
}
