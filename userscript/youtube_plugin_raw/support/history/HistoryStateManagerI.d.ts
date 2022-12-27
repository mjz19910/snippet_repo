import {HistoryStateManagerEventMap} from "./HistoryStateManagerEventMap";


export interface HistoryStateManagerI {
	addEventListener<K extends keyof HistoryStateManagerEventMap>(type: K,listener: (this: HistoryStateManagerI,ev: HistoryStateManagerEventMap[K]) => any,options?: boolean|AddEventListenerOptions): void;
	addEventListener(type: string,listener: EventListenerOrEventListenerObject,options?: boolean|AddEventListenerOptions): void;
}
