import {WorkerMessageReply202} from "./WorkerMessageReply202";
import {WorkerMessageReply201} from "./WorkerMessageReply201";

export type RemoteWorkerMessage1 = {
	t: 1;
	v: WorkerMessageReply201 | WorkerMessageReply202;
};
