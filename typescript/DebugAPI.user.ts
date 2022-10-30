import {DebugAPI} from "./src/DebugAPI"
import {GenericDataEvent} from "./vm/GenericDataEvent"

window.GenericDataEvent=GenericDataEvent
window.DebugAPI=DebugAPI.the()
