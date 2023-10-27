import {Constructor} from "../types/Constructor.ts";

enum ConnectFlag {
	None=0,
	Syn=1<<0,
	Ack=1<<1
}
export {type ConnectFlag};
export type ConnectFlagT=typeof ConnectFlag;
export type RecordKey<T>=Constructor&{key: T;};
