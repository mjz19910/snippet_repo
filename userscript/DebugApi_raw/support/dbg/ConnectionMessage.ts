import {ConnectFlag} from "./ConnectFlag.ts";
import {MessageType} from "./MessageType.ts";
export type ConnectionMessage={
	type: "tcp";
	flags: ConnectFlag;
	seq: number;
	ack: number;
	client_id: number;
	data: MessageType|null;
};