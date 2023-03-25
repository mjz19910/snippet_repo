export {};

/** @arg {number[]} input */
function solve(input) {
	let idx=0;
	let steps=0;
	function walk_by() {
		if(input[idx]===0) throw new Error("Unable to reach end");
		steps++;
		idx+=input[idx];
	}
	while(idx<input.length) {
		walk_by();
	}
	if(idx>=input.length) return steps;
	let jump_len=input[idx];
	console.log(jump_len);
	return steps;
}
console.log(solve([1,1,6,1,2,4,2,1,3,2]));
