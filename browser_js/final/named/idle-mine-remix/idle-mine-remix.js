// https://veprogames.github.io/idle-mine-remix/
window.__timer_mode = 6;

function start_slow_upgrade_auto() {
	window.__cint2_arr.push(setInterval(function () {
		if (game.gems.gt(1e20)) {
			functions.craftPick(functions.getUsedGems());
		}
		const highest_hit_obj = functions.getHighestDamageableMineObjectLevel();
		if (highest_hit_obj > game.mineObjectLevel) {
			game.mineObjectLevel += 1;
			const newObj = functions.getMineObject(game.mineObjectLevel);
			const hitsToBreak = Math.ceil(
				newObj.totalHp.div(functions.getActiveDamage()),
			);
			if (hitsToBreak !== 1) {
				game.mineObjectLevel -= 1;
			}
		}
	}, 750));
	window.__cint2_arr.push(setInterval(function () {
		if (game.money.gt(1e75)) {
			game.upgrades.blacksmith.buy100();
			game.upgrades.blacksmithSkill.buy100();
			game.upgrades.activePower.buy100();
			game.upgrades.idlePower.buy100();
		}
		if (game.gems.gt(1e50)) {
			game.gemUpgrades.blacksmith.buy();
			game.gemUpgrades.gemMultiply.buy();
		}
		if (game.planetCoins.gt(1e35)) {
			game.planetCoinUpgrades.gemMultiply.buy();
			game.planetCoinUpgrades.bulkCraft.buy();
		}
	}, 250));
}

function im_init() {
	if (window.__cint2_arr === void 0) {
		window.__cint2_arr = [];
	}
}

function im_reset() {
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
im_init();
im_reset();
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
		}, 0));
		start_slow_upgrade_auto();
		break;
}
