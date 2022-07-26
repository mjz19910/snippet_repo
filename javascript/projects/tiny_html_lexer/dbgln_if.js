/**
 * @param {boolean} flag
 * @param {any[]} args
 * @param {string} format
 */
export function dbgln_if(flag,format,...args) {
	if(flag) {
		let fmt=format.split("{}")
		let res=[]
		let i=0
		for(let chk of fmt) {
			res.push(chk,args[i])
			i++
		}
		// FIXME: parse {} format str
		console.log(...res)
	}
}
