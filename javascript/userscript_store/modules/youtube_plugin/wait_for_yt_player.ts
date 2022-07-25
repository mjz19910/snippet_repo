import {ytd_player} from "./youtube_plugin.user"

export async function wait_for_yt_player() {
	if(!ytd_player) {
		throw new Error("No ytd_player to await")
	}
	await ytd_player.playerResolver_.promise
}
