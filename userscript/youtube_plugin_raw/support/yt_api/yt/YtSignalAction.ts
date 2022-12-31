import {HistoryBackSignal} from "../_/s/HistoryBackSignal";


export type YtSignalAction=HistoryBackSignal|{
	signal: "HISTORY_FORWARD";
};
