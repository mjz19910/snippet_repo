import {ConnectFlag} from "./ConnectFlag.ts";
import {ConnectionForward} from "./ConnectionForward.ts";
import {MessageType} from "./MessageType.ts";

export type ConnectionMessage={
	type: "tcp";
	flags: ConnectFlag;
	seq: number;
	ack: number|null;
	client_id: number;
	data: MessageType|ConnectionForward|null;
};
