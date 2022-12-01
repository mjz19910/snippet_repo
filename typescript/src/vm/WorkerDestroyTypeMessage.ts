import {Box} from "../box/Box.js"
import {WorkerDestroyTypeT_OLD} from "./WorkerDestroyTypeT.js"

export type WorkerDestroyTypeMessage={
	t: WorkerDestroyTypeT_OLD
	v: Box
}
