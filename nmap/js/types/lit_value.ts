import {lit_valueT} from "./lit_valueT.ts"
export function lit_value<T extends any[]>(...val_arr: T): lit_valueT<T> {
	return ['lit_value',...val_arr]
}
