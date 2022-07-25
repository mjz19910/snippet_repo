import {override_prop} from "./override_prop"
import {PropertyHandler} from "./PropertyHandler"
import {do_proxy_call_getInitialData} from "./do_proxy_call_getInitialData"

export function init_override_getInitialData() {
	override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
}
