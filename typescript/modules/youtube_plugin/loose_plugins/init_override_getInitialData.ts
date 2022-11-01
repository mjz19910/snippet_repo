import {override_prop} from "../property_handler_plugin/override_prop.js"
import {PropertyHandler} from "../property_handler_plugin/PropertyHandler.js"
import {do_proxy_call_getInitialData} from "../fetch_result_handler_plugin/do_proxy_call_getInitialData.js"

export function init_override_getInitialData() {
	override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
}
