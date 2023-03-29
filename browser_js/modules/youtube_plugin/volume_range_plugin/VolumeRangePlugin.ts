import {debug} from "../debug.js"
import {ytd_app} from "../player_plugin_activate/elements/ytd_app.js"
import {createGainController} from "./createGainController.js"
import {gain_controller} from "./gain_controller.js"
import {on_gain_controller} from "./on_gain_controller.js"
import {VolumeRange} from "./VolumeRange.js"

export function VolumeRangePlugin() {
	if(debug.value) console.log('VolumeRangePlugin')
	if(!gain_controller.value)
		gain_controller.value=on_gain_controller(createGainController)
	if(!gain_controller.value) return
	gain_controller.value.attach_element_list(document.querySelectorAll("video"))
	if(!ytd_app.value) return
	if(!ytd_app.value.__shady_children.masthead.$) return
	if(!ytd_app.value.volume_range) {
		ytd_app.value.volume_range=new VolumeRange(0,100*5,100*5*2,gain_controller.value)
		if(!ytd_app.value.volume_range) throw new Error("Typechecker error")
		let container_dom_parent=ytd_app.value.__shady_children.masthead.$.container.children.center
		let use_container=true
		if(!(ytd_app.value.volume_range instanceof VolumeRange)) return
		if(use_container) {
			ytd_app.value.volume_range.attach_to_element(container_dom_parent)
		} else {
			ytd_app.value.volume_range.attach_to_element(ytd_app.value)
		}
	}
}
