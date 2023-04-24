(function main() {
	let res=null;
	class OutputResult {
		result=res;
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
	return ret;
})();
