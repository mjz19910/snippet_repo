import {MessageReplyMessage1} from "./MessageReplyMessage1"
import {MessageReplyMessage2} from "./MessageReplyMessage2"
import {MessageWorkerUpdateMessageHandlerReply} from "./MessageWorkerUpdateMessageHandlerReply"
import {MessageReplyFromWorkerData} from "./MessageReplyFromWorkerData"
import {MessageWorkerReadyReply} from "./MessageWorkerReadyReply"
import {MessageReplySetSingle} from "./MessageReplySetSingle"
import {MessageReplySetRepeating} from "./MessageReplySetRepeating"
import {MessageReplyClearSingle} from "./MessageReplyClearSingle"
import {MessageReplyClearRepeating} from "./MessageReplyClearRepeating"
import {MessageTimeoutClearS} from "./MessageTimeoutClearS"
import {MessageTimeoutClearR} from "./MessageTimeoutClearR"

export type DispatchMessageType = MessageTimeoutClearR | MessageTimeoutClearS | MessageReplyClearRepeating | MessageReplyClearSingle | MessageReplySetRepeating | MessageReplySetSingle | MessageWorkerReadyReply | MessageWorkerUpdateMessageHandlerReply | MessageReplyMessage2 | MessageReplyMessage1 | MessageReplyFromWorkerData
