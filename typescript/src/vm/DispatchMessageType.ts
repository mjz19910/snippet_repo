import {ReplyMessage1} from "./ReplyMessage1.js"
import {ReplyMessage2} from "./ReplyMessage2.js"
import {MessageWorkerUpdateMessageHandlerReply} from "./MessageWorkerUpdateMessageHandlerReply.js"
import {MessageReplyFromWorkerData} from "./MessageReplyFromWorkerData.js"
import {MessageWorkerReadyReply} from "./MessageWorkerReadyReply.js"
import {MessageReplySetSingle} from "./MessageReplySetSingle.js"
import {MessageReplySetRepeating} from "./MessageReplySetRepeating.js"
import {MessageReplyClearSingle} from "./MessageReplyClearSingle.js"
import {ReplyClearRepeatingMessage} from "./MessageReplyClearRepeating.js"
import {MessageTimeoutClearS} from "./MessageTimeoutClearS.js"
import {MessageTimeoutClearR} from "./MessageTimeoutClearR.js"

export type DispatchMessageType=MessageTimeoutClearR|MessageTimeoutClearS|ReplyClearRepeatingMessage|MessageReplyClearSingle|MessageReplySetRepeating|MessageReplySetSingle|MessageWorkerReadyReply|MessageWorkerUpdateMessageHandlerReply|ReplyMessage2|ReplyMessage1|MessageReplyFromWorkerData
