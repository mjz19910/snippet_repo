/** @param {object|null} ref @param {string[]} path */
export function on_react_ref(ref,path) {
	if(ref===null)
		return;
	ns.toast("react_ref not handled: "+path,"error");
	console.log("react_ref",path,ref);
	ns.exit();
}
