import {Box} from "typescript/box/Box.js"
import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy.js"

export type MessageWorkerDestroyMessage={
	t: WorkerDestroyMessageTy
	v: Box
}
