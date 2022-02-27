import {RemoteWorkerMessage1} from "./RemoteWorkerMessage1";
import {RemoteWorkerMessage2} from "./RemoteWorkerMessage2";
import {WorkerMessageReply2} from "./WorkerMessageReply2";
import {WorkerReplyMsg} from "./WorkerReplyMsg";
import {RemoteWorkerMessage101} from "./RemoteWorkerMessage101";
import {RemoteWorkerReplyMessage200} from "./RemoteWorkerReplyMessage200";
import {WorkerMessageReply201} from "./WorkerMessageReply201";
import {WorkerMessageReply202} from "./WorkerMessageReply202";
import {RemoteWorkerMessage102} from "./RemoteWorkerMessage102";
import {RemoteWorkerMessage201} from "./RemoteWorkerMessage201";
import {RemoteWorkerMessage202} from "./RemoteWorkerMessage202";
import {RemoteWorkerMessage203} from "./RemoteWorkerMessage203";
import {RemoteWorkerMessage204} from "./RemoteWorkerMessage204";
import {RemoteWorkerMessage205} from "./RemoteWorkerMessage205";
import {RemoteWorkerMessage206} from "./RemoteWorkerMessage206";
import {RemoteWorkerMessage207} from "./RemoteWorkerMessage207";

export type RemoteWorkerMessage = RemoteWorkerMessage1 |
	RemoteWorkerMessage2 |
	WorkerReplyMsg<WorkerMessageReply2> |
	WorkerReplyMsg<WorkerMessageReply201> |
	WorkerReplyMsg<WorkerMessageReply202> |
	RemoteWorkerMessage101 |
	RemoteWorkerMessage102 |
	RemoteWorkerReplyMessage200<never> |
	RemoteWorkerMessage201 |
	RemoteWorkerMessage202 |
	RemoteWorkerMessage203 |
	RemoteWorkerMessage204 |
	RemoteWorkerMessage205 |
	RemoteWorkerMessage206 |
	RemoteWorkerMessage207;
