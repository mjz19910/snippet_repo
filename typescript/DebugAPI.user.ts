import {DebugAPI} from "./src/DebugAPI.js"
import {GenericDataEvent} from "./vm/GenericDataEvent.js"

window.GenericDataEvent=GenericDataEvent
window.DebugAPI=DebugAPI.the()
