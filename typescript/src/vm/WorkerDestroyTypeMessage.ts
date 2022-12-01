import {Box} from "../box/Box.js"
import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js"

export type WorkerDestroyTypeMessage={
	t: WorkerDestroyTypeT
	v: Box
}
