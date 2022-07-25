import {any} from "./any"
import {MKState} from "./MKState"
import {on_mk_new_property} from "./on_mk_new_property"
import {ud_func,ghost_symbol} from "./youtube_plugin.user"

/**
 * @param {MKState} cc
 * @param {{}} obj
 */
export function on_mk_property_set(cc: MKState,obj: {}) {
	if(ud_func.has(obj))
		cc.value=obj
	if(any<{[x: symbol]: any}>(obj)[ghost_symbol]===undefined) {
		on_mk_new_property(cc,obj)
	} else {
		cc.value=obj
	}
}
