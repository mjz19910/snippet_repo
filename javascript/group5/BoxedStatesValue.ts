import {StateType} from "./StateType.js"
import {TAG_BOXED_STATES} from "./js_parse_regex.js"

export type BoxedStatesValue=[TAG_BOXED_STATES,StateType[]]
