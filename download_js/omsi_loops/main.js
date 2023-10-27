(function main() {
	class OutputResult {
		result = res;
		/**
		 * @param {{ setup: ({ pot: number; }|{pick_locks:number}|{buy_mana:number})[]; used: { mana: number; time: string; }; result: { mana: number; gold: number; time: string; }; }} val_any
		 */
		use(val_any) {
			val_any;
		}
	}
	const ret = new OutputResult();
	ret.use({
		setup: [{
			pot: 50,
		}],
		used: {
			mana: 2_436,
			time: "9.75s",
		},
		result: {
			mana: 2_813,
			gold: 0,
			time: "11.3s",
		},
	});
	ret.use({
		setup: [
			{ pot: 50 },
			{ pick_locks: 7 },
			{ buy_mana: 1 },
		],
		used: {
			mana: 5_225,
			time: "20.9s",
		},
		result: {
			mana: 3_534,
			gold: 0,
			time: "14.1s",
		},
	});
	ret.use({
		setup: [
			{ pot: 50 },
			{ pick_locks: 7 },
			{ buy_mana: 1 },
			{ pick_locks: 3 },
			{ buy_mana: 1 },
		],
		used: {
			mana: 6_448,
			time: "25.8s",
		},
		result: {
			mana: 3_801,
			gold: 0,
			time: "15.2s",
		},
	});
	return ret;
})();
