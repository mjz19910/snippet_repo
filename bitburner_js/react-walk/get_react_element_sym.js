import {createElement} from "react";
import {as_any} from "/run/as";

export function get_react_element_sym() {
	let u=createElement("div");
	/** @type {DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>,HTMLElement>} */
	let r=as_any(u);
	return r["$$typeof"];
}
