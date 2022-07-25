import {deep_clone} from "./deep_clone"

export function clone_object<C extends {}, U extends {[V in keyof U]: U[V]}>(obj: U): U {
	const obj_entries=Object.entries<C>(obj) as [keyof U,C][]
	const cloned_entries: [keyof U,C][]=obj_entries.map((object_entry) => [object_entry[0],deep_clone(object_entry[1])])
	return Object.fromEntries(cloned_entries) as U
}
