import {Dumper} from "./vm/Dumper"
import {GenericDataEvent} from "./vm/GenericDataEvent"
import {GenericEventTarget} from "./vm/GenericEventTarget"
import {HexRandomDataGenerator} from "./vm/HexRandomDataGenerator"
export let random_data_generator=new HexRandomDataGenerator
window.GenericDataEvent=GenericDataEvent
export const static_event_target=new GenericEventTarget
export const local_dumper=new Dumper
export const debug_api_instance={}
window.DebugAPI=debug_api_instance
