function start_slow_upgrade_auto() {
	window.__cint2_arr.push(setInterval(function () {
		functions.craftPick(functions.getUsedGems());
		game.upgrades.blacksmith.buy();
		game.upgrades.blacksmithSkill.buy();
		game.upgrades.activePower.buy();
		game.upgrades.idlePower.buy();
		game.gemUpgrades.blacksmith.buy();
		game.gemUpgrades.gemMultiply.buy();
	}, 500));
}
(function () {
	function init() {
		if (window.__cint2_arr === void 0) {
			window.__cint2_arr = [];
		}
	}

	function reset() {
		if (window.__cint) {
			__message_channel_timers.clear(window.__cint);
			window.__cint = void 0;
		}
		if (window.__cint2) {
			clearInterval(window.__cint2);
			window.__cint2 = void 0;
		}
		for (const v of window.__cint2_arr) {
			clearInterval(v);
		}
	}
	init();
	reset();
})();
window.__timer_mode = 6;
switch (window.__timer_mode) {
	case 1:
		window.__cint = __message_channel_timers.set(function () {
			functions.clickMineObject();
		});
		break;
	case 2:
		window.__cint = __message_channel_timers.set(function () {
			functions.clickMineObject();
			functions.craftPick(functions.getUsedGems());
		});
		break;
	case 3:
		window.__cint2 = setInterval(function () {
			functions.clickMineObject();
		}, 100 / 3);
		break;
	case 4:
		break;
	case 5:
		window.__cint = __message_channel_timers.set(function () {
			functions.clickMineObject();
		});
		start_slow_upgrade_auto();
		break;
	case 6:
		window.__cint2_arr.push(setInterval(function () {
			functions.clickMineObject();
		}, 33));
		start_slow_upgrade_auto();
		break;
}
