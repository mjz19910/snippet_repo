import {ui_plugin_attach_to_dom_observer} from "../player_plugin_activate/ui_plugin_attach_to_dom_observer.js"
import {dom_observer} from "./dom_observer.js"

export function init_dom_observer() {
	ui_plugin_attach_to_dom_observer(dom_observer)
}
