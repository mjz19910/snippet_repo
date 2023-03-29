import {gen_dispatcher} from "./gen_dispatcher";
import {as_any} from "/run/as";

/** @type {string[]} */
export const fn_str_list=[];
/** @type {Map<Function,[number,string]>} */
export const fn_str_map=new Map;
export const fn_set=new Set;

export const global_hook=__REACT_DEVTOOLS_GLOBAL_HOOK__.hook_ref;
export const dispatcher_ref=global_hook.currentDispatcherRef;
export const react_render_set=new Set;

export const local_react_context=gen_dispatcher();
export const react_symbols={
	forward_ref: window.React.forwardRef(() => null)["$$typeof"],
	react_element: (() => {
		let u=window.React.createElement("div");
		/** @type {DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>,HTMLElement>} */
		let r=as_any(u);
		return r["$$typeof"];
	})(),
};
