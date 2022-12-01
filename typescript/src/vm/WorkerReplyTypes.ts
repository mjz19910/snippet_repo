import {WorkerReplyTypesT} from "./constant_types.js";
import {WorkerReplyTimerFireTypes} from "./WorkerFireReplyTypes.js";

export class WorkerReplyTypes implements WorkerReplyTypesT {
	fire=new WorkerReplyTimerFireTypes;
}
