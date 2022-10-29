import {DebugAPI} from "./src/DebugAPI"
import {Dumper} from "./vm/Dumper"
import {GenericDataEvent} from "./vm/GenericDataEvent"
window.GenericDataEvent=GenericDataEvent
export const local_dumper=new Dumper()
window.DebugAPI=DebugAPI.the()
