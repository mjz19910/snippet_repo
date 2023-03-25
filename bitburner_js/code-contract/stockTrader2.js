
/** @arg {number[]} input */
function solve(input) {
	let inc=[];
	/** @param {number} idx */
	function process(idx) {
		let cur_price=input[idx];
		while(cur_price>input[idx+1]) idx++;
		inc.push(input[idx+1]-input[idx]);
		return idx+1;
	}
	let idx=0;
	idx=process(idx);
	idx=process(idx);
	idx=process(idx);
	let cur_price=input[idx];
	return [inc,cur_price];
}
console.log(solve([122,16,140,40,81,194,12,31,7,184,192,108,44,127,187,110,92,180]));
