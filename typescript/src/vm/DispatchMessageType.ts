import {MessageReplyMessage1} from "./MessageReplyMessage1.js"
import {MessageReplyMessage2} from "./MessageReplyMessage2.js"
import {MessageWorkerUpdateMessageHandlerReply} from "./MessageWorkerUpdateMessageHandlerReply.js"
import {MessageReplyFromWorkerData} from "./MessageReplyFromWorkerData.js"
import {MessageWorkerReadyReply} from "./MessageWorkerReadyReply.js"
import {MessageReplySetSingle} from "./MessageReplySetSingle.js"
import {MessageReplySetRepeating} from "./MessageReplySetRepeating.js"
import {MessageReplyClearSingle} from "./MessageReplyClearSingle.js"
import {MessageReplyClearRepeating} from "./MessageReplyClearRepeating.js"
import {MessageTimeoutClearS} from "./MessageTimeoutClearS.js"
import {MessageTimeoutClearR} from "./MessageTimeoutClearR.js"

export type DispatchMessageType=MessageTimeoutClearR|MessageTimeoutClearS|MessageReplyClearRepeating|MessageReplyClearSingle|MessageReplySetRepeating|MessageReplySetSingle|MessageWorkerReadyReply|MessageWorkerUpdateMessageHandlerReply|MessageReplyMessage2|MessageReplyMessage1|MessageReplyFromWorkerData
