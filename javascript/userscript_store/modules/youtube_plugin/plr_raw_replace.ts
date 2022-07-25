export function plr_raw_replace(player_config: {args: {raw_player_response: any}}) {
	let raw_plr_rsp=player_config.args.raw_player_response
	if(raw_plr_rsp===void 0) {
		console.log('yt_cfg',player_config)
		return
	}
	raw_plr_rsp.playerAds=[]
	raw_plr_rsp.adPlacements=[]
	return
}
