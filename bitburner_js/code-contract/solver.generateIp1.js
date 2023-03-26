
/** @arg {string} input */
function solve(input) {
	let parts=input.split("");
	/** @type {[number,number,number,number][]} */
	let ip_opts=[];
	let ip_str_arr=[];
	for(let sub_len1 of [1,2,3]) {
		let n1=parts.slice(0,sub_len1);
		let res1=parseInt(n1.join(""));
		if(res1>255) break;
		for(let sub_len2 of [1,2,3]) {
			let end_len2=sub_len1+sub_len2;
			let n2=parts.slice(sub_len1,end_len2);
			let res2=parseInt(n2.join(""));
			if(res2>255) break;
			for(let sub_len of [1,2,3]) {
				let end_len1=end_len2+sub_len;
				let n1=parts.slice(end_len2,end_len1);
				let res3=parseInt(n1.join(""));
				if(res3>255) break;
				for(let sub_len of [1,2,3]) {
					let end_len2=end_len1+sub_len;
					let n1=parts.slice(end_len1,end_len2);
					let res4=parseInt(n1.join(""));
					if(res4>255) break;
					if(parts.slice(end_len2).length!==0) continue;
					const addr=`${res1}.${res2}.${res3}.${res4}`;
					if(ip_str_arr.includes(addr)) continue;
					ip_str_arr.push(`${res1}.${res2}.${res3}.${res4}`);
					ip_opts.push([res1,res2,res3,res4]);
					console.log(res1,res2,res3,res4);
				}
			}
		}
	}
	console.log(JSON.stringify(ip_str_arr));
}
console.log(solve("631611571"));
