import {State} from "./State.js"
import {typed_entries} from "./typed_entries.js"
/**@type {[keyof typeof State, typeof State[keyof typeof State]][]}*/
export const StateEntries=typed_entries(State)
/**
 * @arg {Extract<typeof State[keyof typeof State], number>} state
 */
export function state_name(state) {
	console.log('get name for',state)
	let entry=StateEntries.find(e => e[1]===state)
	if(entry)
		return entry[0]
	return "Unknown"
}
