import {RemoteWorkerReply205} from "./RemoteWorkerReply205";
import {RemoteWorkerReply206} from "./RemoteWorkerReply206";

export type WorkerMessageReply2 = {
	t: 2;
	v: RemoteWorkerReply205 | RemoteWorkerReply206;
};
