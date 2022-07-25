import {any} from "./any"
import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController"
import {g_api} from "./youtube_plugin.user"

/**@arg {()=>HTMLMediaElementGainController} create_gain_controller */
export function on_gain_controller(create_gain_controller: () => HTMLMediaElementGainController) {
	if(g_api.value && g_api.value.gain_controller) {
		return any<HTMLMediaElementGainController>(g_api.value.gain_controller)
	}
	let controller=create_gain_controller()
	if(g_api.value) g_api.value.gain_controller=controller
	return controller
}
