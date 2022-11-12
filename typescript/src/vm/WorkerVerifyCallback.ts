import {WorkerVerifyType} from "./WorkerVerifyType.js"

export type WorkerVerifyCallback={
	(verify_obj: WorkerVerifyType): void
}
