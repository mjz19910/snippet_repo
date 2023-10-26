import {Constructor} from "../types/Constructor.ts";

export enum ConnectFlag_base {
	None=0,
	Syn=1<<0,
	Ack=1<<1
}
export type ConnectFlag={
	none: true;
	ack: false;
	syn: false;
}|{
	none: false;
	ack: false;
	syn: true;
}|{
	none: false;
	ack: true;
	syn: false;
}|{
	none: false;
	ack: true;
	syn: true;
};
export type ConnectFlagT=typeof ConnectFlag_base;
export type RecordKey<T>=Constructor&{key: T;};
