(function main() {
	let res=null;
	class OutputResult {
		result=res;
		/**
		 * @param {{ setup: ({ pot: number; }|{pick_locks:number}|{buy_mana:number})[]; used: { mana: number; time: string; }; result: { mana: number; gold: number; time: string; }; }} val_any
		 */
		use(val_any) {
			val_any;
		}
	}
	let ret=new OutputResult;
	ret.use({
		setup: [{
			pot: 50
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
			{pot: 50},
			{pick_locks: 7},
			{buy_mana: 1},
		],
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
	return ret;
})();
