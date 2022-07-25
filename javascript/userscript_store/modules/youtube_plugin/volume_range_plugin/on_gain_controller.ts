import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController"
import {g_api} from "../youtube_plugin.user"

export function on_gain_controller(create_gain_controller: () => HTMLMediaElementGainController) {
	if(g_api.value && g_api.value.gain_controller) {
		return g_api.value.gain_controller
	}
	let controller=create_gain_controller()
	if(g_api.value) g_api.value.gain_controller=controller
	return controller
}
