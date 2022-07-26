import {mk} from "./mk"
import {mk_tree_arr} from "./mk_tree_arr"

export function init_yt_player_application_plugin() {
	let ar='yt.player.Application'.split('.')
	let a2=ar.slice()
	ar.push('create')
	a2.push('createAlternate')
	let yta_str='yt.player.Application'
	mk_tree_arr.push(yta_str+'.create',yta_str+'.createAlternate')
	mk(window,'yt','yt',true)
}
