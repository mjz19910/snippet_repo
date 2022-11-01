import {MessageTimeoutFireS} from "./MessageTimeoutFireS.js"
import {MessageWorkerDestroyMessage} from "./MessageWorkerDestroyMessage.js"
import {MessageReplyMessage1} from "./MessageReplyMessage1.js"
import {MessageReplyMessage2} from "./MessageReplyMessage2.js"
import {MessageReplyFromWorker} from "./MessageReplyFromWorker.js"

export type MessageTypesForWorkerReplies=MessageReplyFromWorker|MessageReplyMessage2|MessageReplyMessage1|MessageWorkerDestroyMessage|MessageTimeoutFireS
