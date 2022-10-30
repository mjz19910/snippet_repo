import {Box} from "typescript/box/Box"
import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy"

export type MessageWorkerDestroyMessage={
	t: WorkerDestroyMessageTy
	v: Box
}
