import {HistoryBackSignal} from "./HistoryBackSignal";


export type YtSignalAction=HistoryBackSignal|{
	signal: "HISTORY_FORWARD";
};
