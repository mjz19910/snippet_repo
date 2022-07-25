import {playlist_arr} from "./playlist_arr"

export function init_playlist_arr() {
	window.playlist_arr??=[]
	playlist_arr.value=window.playlist_arr
}
