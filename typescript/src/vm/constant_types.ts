import {TimeoutFireRepeating,TimeoutFireSingle} from "../constants.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";

export type TimeoutFireSingleT=typeof TimeoutFireSingle;
export type TimeoutFireRT=typeof TimeoutFireRepeating;
export type TimeoutFireInfoT={
	single: TimeoutFireSingleT;
	repeating: TimeoutFireRT;
};
export type TimerMessageTypesT={
	async: WorkerAsyncMessageTy;
	reply: ReplyTypes;
	fire: TimeoutFireInfoTy;
	worker: TimeoutWorkerTypesTy;
};
