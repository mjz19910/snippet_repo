import {playlist_arr} from "./playlist_arr.ts";

declare global {
	interface Window {
		playlist_arr?: string[];
	}
}

export function init_playlist_arr() {
	window.playlist_arr??=[];
	playlist_arr.value=window.playlist_arr;
}
