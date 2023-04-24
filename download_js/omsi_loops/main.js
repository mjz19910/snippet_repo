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
			mana: "13.7k",
			gold: 0,
			reputation: 10,
		},
	});
	return ret;
})();
