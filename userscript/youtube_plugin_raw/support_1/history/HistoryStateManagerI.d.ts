import {HistoryStateManagerEventMap} from "./HistoryStateManagerEventMap.d.ts";
export interface HistoryStateManagerI {
	addEventListener<K extends keyof HistoryStateManagerEventMap>(type: K,listener: (this: HistoryStateManagerI,ev: HistoryStateManagerEventMap[K]) => unknown,options?: boolean|AddEventListenerOptions): void;
	addEventListener(type: string,listener: EventListenerOrEventListenerObject,options?: boolean|AddEventListenerOptions): void;
}
