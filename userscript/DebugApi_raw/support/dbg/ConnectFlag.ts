import {Constructor} from "../types/Constructor.js";

export enum ConnectFlag_base {
	None=0,
	Syn=1<<0,
	Ack=1<<1
}
export type ConnectFlag=ConnectFlag_base;
export type ConnectFlagT=typeof ConnectFlag_base;
export type RecordKey<T>=Constructor&{key: T;};
