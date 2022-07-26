import {act_found_create_yt_player} from "../player_replace_config/act_found_create_yt_player"
import {win_watch} from "../yt_application_create_plugin/win_watch"

export function init_window_watch() {
	win_watch.addEventListener('new_window_object',act_found_create_yt_player)
}
