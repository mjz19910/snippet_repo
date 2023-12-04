function mg_reset() {
	if (window.__matter_max_upgrades_interval) {
		clearInterval(window.__matter_max_upgrades_interval);
	}
}
setTimeout(function () {
	window.__matter_max_upgrades_interval = setInterval(function () {
		functions.maxUpgrades(game.matter.amount, game.matter.upgrades);
	}, 30 * 1000);
}, 300);
const automation_obj = {
	reset: mg_reset,
};
export { automation_obj as yet_another_merge_game_automation };
