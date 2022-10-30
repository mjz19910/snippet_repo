import {is_in_ignored_from_src_fn,is_in_userscript} from "typescript/script_registry/mod"
import {ScriptStateHost} from "./ScriptStateHost"

export function init_script_registry() {
	window.is_in_ignored_fn=function() {
		return is_in_ignored_from_src_fn.flag
	}
	ScriptStateHost.event_target.addEventListener(() => {
		is_in_userscript.flag=false
	})
}
