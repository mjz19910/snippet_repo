import { CustomInputMatcher } from "../../support/CustomInputMatcher.js";
import { Runner } from "../../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/kongregate_yet-another-merge-game.js
*/
function main() {
	const cur = new Runner();
	// cspell:words cook1eegames
	cur.n = new CustomInputMatcher(
		/https:\/\/www\.kongregate\.com\/games\/cook1eegames\/yet-another-merge-game/,
		() => location.origin + location.pathname,
		"https://www.kongregate.com/games/cook1eegames/yet-another-merge-game",
	);
	cur.f = function () {
		console.log("run");
		function getMaxObjects() {
			return Upgrade.apply(game.upgrades.maxObjects);
		}
		if (window.__cint) {
			clearInterval(window.__cint);
		}
		if (window.__cint2) {
			clearInterval(window.__cint2);
		}
		window.__cint2 = setInterval(function () {
			const g_u_maxObjects_int = getMaxObjects().toNumber();
			const g_mO_l = game.mergeObjects.length;
			if (g_mO_l >= g_u_maxObjects_int) {
				return;
			}
			const spawn_cooldown = game.spawnTime.cd;
			let scd_c = spawn_cooldown;
			for (; scd_c < 30;) {
				scd_c += 0.075;
			}
			gameFunctions.decreaseSpawnCooldown(scd_c - spawn_cooldown);
		}, 100);
		window.__cint = setInterval(function () {
			gameFunctions.maxUpgrades(game.matter, game.upgrades);
		}, 150);
	};
	cur.value = cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret = main();
