import {DbgRetInfo} from "./DbgRetInfo";

export interface DbgState {
	get(x: string): DbgRetInfo;
}
