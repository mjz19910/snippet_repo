import {debug} from "../debug"
import {ytd_app} from "../elements/ytd_app"
import {createGainController} from "./createGainController"
import {gain_controller} from "./gain_controller"
import {on_gain_controller} from "./on_gain_controller"
import {VolumeRange} from "./VolumeRange"

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
		if(use_container) {
			(ytd_app.value.volume_range as VolumeRange).attach_to_element(container_dom_parent)
		} else {
			(ytd_app.value.volume_range as VolumeRange).attach_to_element(ytd_app.value)
		}
	}
}
