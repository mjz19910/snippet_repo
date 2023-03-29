/** @param {HTMLElement} node @param {string[]} path */
export function on_react_state_node(node,path) {
	if(node instanceof HTMLElement)
		return;
	ns.toast("react_state_node not handled: "+path,"error");
	console.log("react_state_node",path,node);
	ns.exit();
}
