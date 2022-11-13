import {is_in_ignored_from_src_fn,is_in_userscript} from "../script_registry/script_registry.js";
import {ScriptStateHost} from "./ScriptStateHost.js";

declare global {
	interface Window {
		is_in_ignored_fn(): boolean;
	}
}

export function init_script_registry() {
	window.is_in_ignored_fn=function() {
		return is_in_ignored_from_src_fn.flag;
	};
	ScriptStateHost.event_target.addEventListener(() => {
		is_in_userscript.flag=false;
	});
}
