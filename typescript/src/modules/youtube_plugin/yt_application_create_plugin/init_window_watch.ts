import {act_found_create_yt_player} from "./act_found_create_yt_player.js"
import {object_property_watcher} from "../object_property_watcher.js"

export function init_window_watch() {
	object_property_watcher.addEventListener('new-window-property-path',act_found_create_yt_player)
}
