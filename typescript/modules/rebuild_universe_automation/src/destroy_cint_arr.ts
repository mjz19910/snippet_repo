export function destroy_cint_arr(cint_arr: [1|2,number][]) {
	for(let i=0;i<cint_arr.length;i+=2) {
		let cint_item=cint_arr[i];
		switch(cint_item[0]) {
			case 1: clearTimeout(cint_item[1]); break;
			case 2: clearInterval(cint_item[1]); break;
			default: console.assert(false,'cant destroy cint item (%o)',cint_item); break;
		}
	}
}
