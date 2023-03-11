export async function wait_for_yt_player() {
	if(!ytd_player.value) {
		throw new Error("No ytd_player to await")
	}
	await ytd_player.value.playerResolver_.promise
}
