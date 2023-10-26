import {plr_raw_replace} from "./plr_raw_replace.ts";
import {plr_raw_replace_embed} from "./plr_raw_replace_embed.ts";

export function act_found_create_yt_player(event: {data: {type: string; data: [any,any,any];};}) {
	let tr=event.data.type;
	if(tr!='yt.player.Application.createAlternate'&&tr!='yt.player.Application.create')
		return;
	let [,,value]=event.data.data;
	let [,player_config,static_config]=value;
	if(!player_config)
		return;
	if(static_config.isEmbed) {
		void player_config;
		plr_raw_replace_embed();
	} else {
		plr_raw_replace(player_config);
	}
}
