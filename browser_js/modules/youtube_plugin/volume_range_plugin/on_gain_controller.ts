import {g_api} from "../g_api.ts";
import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController.ts";

export function on_gain_controller(create_gain_controller: () => HTMLMediaElementGainController): HTMLMediaElementGainController {
	if(!g_api.value) g_api.value=g_api.create();
	if(g_api.value.gain_controller) {
		return g_api.value.gain_controller as HTMLMediaElementGainController;
	}
	let controller=create_gain_controller();
	g_api.value.gain_controller=controller;
	return controller;
}
