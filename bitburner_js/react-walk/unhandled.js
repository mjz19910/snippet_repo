/** @param {NS} ns @param {string} key @param {{}[]} value @param {string[]} path @returns {never} */
export function unhandled(ns,key,value,path) {
	ns.toast(key+" not handled: "+path.join("."),"error");
	console.log(key,path.join("."),...value);
	ns.exit();
}
