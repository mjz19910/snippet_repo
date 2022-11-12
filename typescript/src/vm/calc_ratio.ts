export function calc_ratio(arr: number[]) {
	let ratio_acc=0
	for(let i=0;i<arr.length;i++)
		ratio_acc+=arr[i]
	// don't divide by zero
	if(ratio_acc===0)
		return 0
	return ratio_acc/arr.length
}

console.assert(calc_ratio([0,0])===0,"calc ratio of array full of zeros does not divide by zero")