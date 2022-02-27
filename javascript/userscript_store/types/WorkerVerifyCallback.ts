import {WorkerVerifyType} from "./WorkerVerifyType";

export type WorkerVerifyCallback = {
	(verify_obj: WorkerVerifyType): void;
};
