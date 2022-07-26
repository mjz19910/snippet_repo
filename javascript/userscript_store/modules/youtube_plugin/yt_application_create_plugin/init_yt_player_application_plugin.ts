import {init_property_watcher_for_target} from "./init_property_watcher_for_target"
import {active_property_watcher_paths} from "./active_property_watcher_paths"

export function init_yt_player_application_plugin() {
	let ar='yt.player.Application'.split('.')
	let a2=ar.slice()
	ar.push('create')
	a2.push('createAlternate')
	let yta_str='yt.player.Application'
	active_property_watcher_paths.push(yta_str+'.create',yta_str+'.createAlternate')
	init_property_watcher_for_target(window,'yt','yt',true)
}
