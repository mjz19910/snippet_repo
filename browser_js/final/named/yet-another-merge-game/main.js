if (window.__matter_max_upgrades_interval) {
	clearInterval(window.__matter_max_upgrades_interval);
}
window.__matter_max_upgrades_interval = setInterval(function () {
	functions.maxUpgrades(game.matter.amount, game.matter.upgrades);
}, 5 * 1000);
