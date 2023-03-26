
/** @arg {number[]} input @arg {number} target */
function solve(input,target) {
	acc_total_ways(input);
	/**
	 * @param {number[]} arr
	 * @param {number[]} [sum_start]
	 */
	function acc_total_ways(arr,sum_start=[]) {
		let add_set=new Set;
		const [first,...rest]=arr;
		for(let second of arr) {
			for(let mul=0;mul<target/first;mul++) {
				let sum_arr=[...sum_start];
				for(let i=0;i<mul;i++) sum_arr.push(first);
				sum_arr.push(second);
				let sum=sum_arr.reduce((a,b) => a+b);
				if(sum!==target) continue;
				add_set.add(sum_arr.sort((a,b) => a-b).join("+"));
			}
		}
		if(rest.length>1) {
			for(let mul=0;mul<target/first;mul++) {
				let sum_arr=[...sum_start];
				for(let i=0;i<mul;i++) sum_arr.push(first);
				let sum=sum_arr.reduce((a,b) => a+b,0);
				if(sum>target) continue;
				acc_total_ways(rest,sum_arr).forEach(val => add_set.add(val));
			}
		}
		return add_set;
	}
	return acc_total_ways(input).size;
}
console.log(solve([1,3,4,8,9,10,11,13,16,17,18,19],34));