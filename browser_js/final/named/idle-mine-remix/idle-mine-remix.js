// https://veprogames.github.io/idle-mine-remix/
window.__active_timer_modes = ["start_chan_repeat_mine_and_craft_pick"];
im_init();
im_reset();
im_main();

function get_gems_limit(upg, factor) {
	return upg.currentPrice().mul(factor);
}

function buy_gem_upgrade(upg, factor) {
	if (upg.level >= upg.maxLevel) return false;
	if (game.gems.lt(get_gems_limit(upg, factor))) return false;
	upg.buy();
	return true;
}

function start_interval_click_mine_object() {
	window.__cint2_arr.push(setInterval(function () {
		functions.clickMineObject();
	}, 75));
}

function start_chan_repeat_click_mine_object() {
	const chan_timers = window.__message_channel_timers;
	window.__cint_arr.push(chan_timers.set(function () {
		functions.clickMineObject();
	}));
}

function start_chan_repeat_mine_and_craft_pick() {
	window.__cint_arr.push(chan_timers.set(function () {
		functions.clickMineObject();
		functions.craftPick(functions.getUsedGems());
	}));
}

function start_slow_upgrade_auto() {
	window.__cint2_arr.push(setInterval(function () {
		const upg = game.gemUpgrades.blacksmith;
		if (game.gems.gt(get_gems_limit(upg, 2))) {
			functions.craftPick(functions.getUsedGems());
		}
		const highest_hit_obj = functions.getHighestDamageableMineObjectLevel();
		if (highest_hit_obj > game.mineObjectLevel) {
			const newObj = functions.getMineObject(game.mineObjectLevel + 1);
			const min_damage = Decimal.min(
				functions.getActiveDamage(),
				functions.getIdleDamage(),
			);
			const hitsToBreak = Math.ceil(
				newObj.totalHp.div(min_damage),
			);
			if (hitsToBreak === 1) {
				game.mineObjectLevel += 1;
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
		buy_gem_upgrade(game.gemUpgrades.blacksmith, 6);
		buy_gem_upgrade(game.gemUpgrades.gemMultiply, 6);
		buy_gem_upgrade(game.gemUpgrades.gemChance, 3);
		if (game.planetCoins.gt(1e35)) {
			game.planetCoinUpgrades.gemMultiply.buy();
			game.planetCoinUpgrades.bulkCraft.buy();
		}
	}, 275));
}

function im_init() {
	if (window.__cint_arr === void 0) {
		window.__cint_arr = [];
	}
	if (window.__cint2_arr === void 0) {
		window.__cint2_arr = [];
	}
}

function im_reset() {
	const chan_timers = window.__message_channel_timers;
	for (const v of window.__cint_arr) {
		chan_timers.clear(v);
	}
	window.__cint_arr.length = 0;
	for (const v of window.__cint2_arr) {
		clearInterval(v);
	}
	window.__cint2_arr.length = 0;
}

function im_main() {
	for (const timer_mode of window.__active_timer_modes) {
		switch (timer_mode) {
			case "start_chan_repeat_click_mine_object":
				start_chan_repeat_click_mine_object();
				break;
			case "start_chan_repeat_mine_and_craft_pick":
				start_chan_repeat_mine_and_craft_pick();
				break;
			case "start_interval_click_mine_object":
				start_interval_click_mine_object();
				break;
			case "start_slow_upgrade_auto":
				start_slow_upgrade_auto();
				break;
		}
	}
}
