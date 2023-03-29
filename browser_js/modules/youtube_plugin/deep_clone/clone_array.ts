import {deep_clone} from "./deep_clone.js"

export function clone_array<T extends any[]>(arr: T): T {
	return arr.map(deep_clone) as T
}
