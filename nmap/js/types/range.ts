import {rangeT} from "./rangeT.ts"

export function range<T extends any[]>(...ranges: T): rangeT<T> {
	return ['range',...ranges]
}
