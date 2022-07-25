import {any} from "./any"
import {deep_clone} from "./deep_clone"

export function clone_object<T extends {}>(obj: T): T {
	let obj_entries=Object.entries(obj)
	let cloned_entries: [string,unknown][]=obj_entries.map((object_entry) => [object_entry[0],deep_clone(object_entry[1])])
	let clone: T=any(Object.fromEntries(cloned_entries))
	return clone
}
