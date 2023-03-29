import {deep_clone} from "./deep_clone.js"

export function clone_each_entry<A,B>(entry: [A,B]): [A,B] {
	return [entry[0],deep_clone(entry[1])]
}
