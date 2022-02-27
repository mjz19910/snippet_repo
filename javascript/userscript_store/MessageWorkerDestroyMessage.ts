import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy";

export type MessageWorkerDestroyMessage = {
	t: WorkerDestroyMessageTy;
	v: never;
};
