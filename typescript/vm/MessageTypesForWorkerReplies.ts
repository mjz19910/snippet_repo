import {MessageTimeoutFireS} from "./MessageTimeoutFireS"
import {MessageWorkerDestroyMessage} from "./MessageWorkerDestroyMessage"
import {MessageReplyMessage1} from "./MessageReplyMessage1"
import {MessageReplyMessage2} from "./MessageReplyMessage2"
import {MessageReplyFromWorker} from "./MessageReplyFromWorker"

export type MessageTypesForWorkerReplies=MessageReplyFromWorker|MessageReplyMessage2|MessageReplyMessage1|MessageWorkerDestroyMessage|MessageTimeoutFireS
