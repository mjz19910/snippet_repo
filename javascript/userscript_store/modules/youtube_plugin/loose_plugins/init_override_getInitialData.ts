import {override_prop} from "../property_handler_plugin/override_prop"
import {PropertyHandler} from "../property_handler_plugin/PropertyHandler"
import {do_proxy_call_getInitialData} from "../fetch_result_handler_plugin/do_proxy_call_getInitialData"

export function init_override_getInitialData() {
	override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
}
