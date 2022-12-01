import {Box} from "../box/Box.js"
import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js"

export type MessageWorkerDestroyMessage={
	t: WorkerDestroyTypeT
	v: Box
}
