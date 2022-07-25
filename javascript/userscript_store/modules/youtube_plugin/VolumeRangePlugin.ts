import {createGainController} from "./createGainController"
import {on_gain_controller} from "./on_gain_controller"
import {VolumeRange} from "./VolumeRange"
import {debug,gain_controller,ytd_app} from "./youtube_plugin.user"

export function VolumeRangePlugin() {
	if(debug)
		console.log('VolumeRangePlugin')
	if(!gain_controller.value)
		gain_controller.value=on_gain_controller(createGainController)
	if(!gain_controller.value)
		return
	gain_controller.value.attach_element_list(document.querySelectorAll("video"))
	if(!ytd_app)
		return
	if(!ytd_app.__shady_children.masthead.$)
		return
	if(!ytd_app.volume_range) {
		ytd_app.volume_range=new VolumeRange(0,100*5,100*5*2,gain_controller.value)
		let container_dom_parent=ytd_app.__shady_children.masthead.$.container.children.center
		let use_container=true
		if(use_container) {
			ytd_app.volume_range.attach_to_element(container_dom_parent)
		} else {
			ytd_app.volume_range.attach_to_element(ytd_app)
		}
	}
}
