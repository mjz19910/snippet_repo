export {};

/** @arg {number[]} input */
function solve(input) {
	let idx=0;
	let steps=0;
	while(input[idx]>0) {
		steps++;
		idx++;
	}
	let jump_idx=idx-1;
	let jump_len=input[jump_idx];
	let rev_idx=0;
	while(input[jump_idx+jump_len-rev_idx]===0) rev_idx++;
	jump_idx=jump_idx+jump_len-rev_idx;
	let res=input.slice(jump_idx).length<input[jump_idx];
	return +res;
}
console.log(solve([1,1,6,1,2,4,2,1,3,2]));
