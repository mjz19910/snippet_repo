import {rangeT} from "./rangeT.js"

export function range<T extends any[]>(...ranges: T): rangeT<T> {
	return ['range',...ranges]
}
