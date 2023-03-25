export {};
/** @arg {number[][]} triangle_arr @arg {[number,number]} pos @returns {[number,number][]} */
function get_neighbors(triangle_arr,pos) {
	let idx0=pos[0];
	let next_row=triangle_arr[idx0+1];
	if(next_row.length===2) return [[pos[0]+1,pos[1]],[pos[0]+1,pos[1]+1]];
	if(next_row.length===3) {
		/** @type {[number,number][]} */
		let n_arr=[];
		n_arr.push([pos[0]+1,pos[1]],[pos[0]+1,pos[1]+1]);
		return n_arr;
	}
	throw new Error();
}
/** @arg {number[][]} arr @arg {[number,number]} pos @returns {[[number,number],number]} */
function to_entry(arr,pos) {
	let row=arr[pos[0]];
	return [pos,row[pos[1]]];
}
/** @arg {[[number,number],number]} entry */
function format_entry(entry) {
	return [entry[0].join(),entry[1]];
}
/** @arg {number[][]} input */
function solve(input,noisy=false) {
	/** @type {number[]} */
	let path=[];
	/** @arg {[number,number]} pos */
	function walk(pos) {
		path.push(to_entry(input,pos)[1]);
		let n=get_neighbors(input,pos);
		let n_ent=n.map(v => to_entry(input,v));
		let min_loc=n_ent.reduce((a,b) => a[1]<b[1]? a:b);
		if(noisy) console.log("path: ",format_entry(min_loc));
		return min_loc[0];
	}
	/** @type {[number,number]} */
	let pos=[0,0];
	while(pos[0]<input.length-1) {
		pos=walk(pos);
	}
	path.push(to_entry(input,pos)[1]);
	return path.reduce((a,b) => a+b,0);
}
console.log(solve([
	[8],
	[3,4],
	[9,3,2]
]));
