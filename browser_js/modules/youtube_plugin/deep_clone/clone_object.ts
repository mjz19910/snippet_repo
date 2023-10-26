import {clone_each_entry} from "./clone_each_entry.ts"

export function clone_object<C,U extends {[V in keyof U]: U[V]}>(obj: U): U {
	const obj_entries=Object.entries<C>(obj)
	const cloned_entries=obj_entries.map(clone_each_entry)
	return Object.fromEntries(cloned_entries) as U
}
