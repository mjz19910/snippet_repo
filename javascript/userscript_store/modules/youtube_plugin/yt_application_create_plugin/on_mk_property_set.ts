import {ghost_symbol} from "./ghost_symbol"
import {MKState} from "./MKState"
import {on_mk_new_property} from "./on_mk_new_property"
import {ud_func} from "./ud_func"

export function on_mk_property_set(cc: MKState,obj: {[x: symbol]: any}) {
	if(ud_func.has(obj))
		cc.value=obj
	if(obj[ghost_symbol]===undefined) {
		on_mk_new_property(cc,obj)
	} else {
		cc.value=obj
	}
}
