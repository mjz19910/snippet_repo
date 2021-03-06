import {AutoBuy} from "types/vm/AutoBuy"
import {find_all_scripts_using_string_apis} from "types/vm/find_all_scripts_using_string_apis_helper"
import {SymbolRef} from "types/vm/SymbolRef"
import {UniqueIdGenerator} from "types/vm/UniqueIdGenerator"

export const TIMER_SINGLE = 1
export const TIMER_REPEATING = 2
export const TIMER_TAG_COUNT = 3
export const AUDIO_ELEMENT_VOLUME = 0.58
export const WorkerAsyncMessage = 1
export const TimeoutFireS = 101
export const TimeoutFireR = 102
export const WorkerUpdateMessageHandler = 201
export const TimeoutMessageR = 202
export const TimeoutSetS = 203
export const TimeoutSetR = 204
export const TimeoutClearS = 205
export const TimeoutClearR = 206
export const TimeoutClearA = 207
export const WorkerDestroyMessage = 300
export const WorkerUpdateMessageHandlerReply = 301
export const WorkerReadyReply = 302
export const ReplySetSingle = 303
export const ReplySetRepeating = 304
export const ReplyClearSingle = 305
export const ReplyClearRepeating = 306
export const ReplyClearAny = 307
export const ReplyMessage1 = 401
export const ReplyMessage2 = 402
export const ReplyFromWorker = 500
export const ReplyToWorker = 600
export const TimeoutSingleReply = 700
export const TimeoutRepeatingReply = 701
export const TimeoutSetTypes = 1001
export const TimeoutSetStringS = "setTimeout"
export const TimeoutSetStringR = "setInterval"
export const TimeoutClearStringS = "clearTimeout"
export const TimeoutClearStringR = "clearInterval"
export const LOG_LEVEL_ERROR = 1
export const LOG_LEVEL_WARN = 2
export const LOG_LEVEL_INFO = 3
export const LOG_LEVEL_VERBOSE = 4
export const LOG_LEVEL_TRACE = 5
export const debug_id_gen = new UniqueIdGenerator
export const auto_buy_obj = new AutoBuy
export const [weak_scripts, register_obj_with_registry] = find_all_scripts_using_string_apis()
export const local_logging_level = 3
export const debug_id_syms: WeakRef<SymbolRef>[] = []
