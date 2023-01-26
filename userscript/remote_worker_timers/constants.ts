export namespace WorkerConstants {
	export const TIMER_SINGLE=1;
	export const TIMER_REPEATING=2;
	export const TIMER_TAG_COUNT=3;
	export const TimeoutFireSingle=101;
	export const TimeoutFireRepeating=102;
	export const TimeoutMessageReady=202;
	export const TimeoutSetSingle=203;
	export const TimeoutSetRepeating=204;
	export const TimeoutClearSingle=205;
	export const TimeoutClearRepeating=206;
	export const TimeoutClearAny=207;
	export const WorkerDestroyType=300;
	export const WorkerUpdateMessageHandlerReply=301;
	export const WorkerReadyReply=302;
	export const ReplySetSingle=303;
	export const ReplySetRepeating=304;
	export const ReplyClearSingle=305;
	export const ReplyClearRepeating=306;
	export const ReplyClearAny=307;
	export const TimeoutSingleReply=400;
	export const TimeoutRepeatingReply=401;
	export const ReplyToWorkerState=501;
	export const ReplyToLocalTimer=502;
	export const ReplyFromWorker=503;
	export const ReplyToWorker=504;
	export const WorkerAsyncMessage=600;
	export const WorkerUpdateMessageHandler=601;
	export const TimeoutSetTypes=700;
	export const TimeoutSetStringSingle="setTimeout";
	export const TimeoutSetStringRepeating="setInterval";
	export const TimeoutClearStringSingle="clearTimeout";
	export const TimeoutClearStringRepeating="clearInterval";

	export const GlobalWorkerApiKey="g_worker_api";
}
