/** @param {import("/dom/react_fiber").ReactElementProps} props @arg {string[]} path */
export function on_react_fiber_props(props,path) {
	for(let [idx_i,child_like] of props.children.entries()) {
		if(child_like===void 0)
			continue;
		if(child_like instanceof Array) {
			let sub_children=child_like;
			for(let [idx_j,child] of sub_children.entries()) {
				on_react_element(child,[...path,"children",idx_i+"",idx_j+""]);
			}
			return;
		}
		if(typeof child_like==="object") {
			let child=child_like;
			on_react_element(child,[...path,"children",idx_i+""]);
			return;
		}
		ns.toast("fiber_props not handled","error");
		console.log("fiber_props.children",child_like);
		ns.exit();
	}
}
