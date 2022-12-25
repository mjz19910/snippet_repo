import {CustomInputMatcher} from "../../support/CustomInputMatcher.js";
import {Runner} from "../../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/kongregate_yet-another-merge-game.js
*/
/** @arg {{}} game @returns {asserts game is import("./merge_game_type.js").MergeGameType} */
function asserts_game(game) {game;}
/** @returns {import("./merge_game_type.js").MergeGameType} */
function get_game() {
	asserts_game(game);
	return game;
}
function main() {
	/** @type {import("../__global.js")|number} */
	let holder=1;
	holder;
	let cur=new Runner;
	// cspell:words cook1eegames
	cur.n=new CustomInputMatcher(
		/https:\/\/www\.kongregate\.com\/games\/cook1eegames\/yet-another-merge-game/,
		() => location.origin+location.pathname,
		"https://www.kongregate.com/games/cook1eegames/yet-another-merge-game"
	);
	cur.f=function() {
		let game=get_game();
		console.log('run');
		let do_zero_spawn_timer=false;
		if(do_zero_spawn_timer) {
			zero_spawn_timer();
		}
		function zero_spawn_timer() {
			game.spawnTime.cd=0;
		}
		if(window.cint)
			clearInterval(window.cint);
		if(window.citv)
			clearInterval(window.citv);
		window.citv=setInterval(function() {
			let g_u_maxObjects_int=Upgrade.apply(game.upgrades.maxObjects).toNumber();
			let g_mO_l=game.mergeObjects.length;
			if(g_mO_l>=g_u_maxObjects_int)
				return;
			let scd=game.spawnTime.cd;
			let scd_c=scd;
			for(;scd_c<30;)
				scd_c+=0.075;
			gameFunctions.decreaseSpawnCooldown(scd_c-scd);
		},100);
		window.cint=setInterval(function() {
			gameFunctions.maxUpgrades(game.matter,game.upgrades);
		},150);
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();
