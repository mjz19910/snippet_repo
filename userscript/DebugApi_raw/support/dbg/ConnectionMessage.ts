import {ConnectFlag} from "./ConnectFlag.js";
import {ConnectionForward} from "./ConnectionForward.js";
import {MessageType} from "./MessageType.js";

export type ConnectionMessage={
	type: "tcp";
	flags: ConnectFlag;
	seq: number;
	ack: number|null;
	client_id: number;
	data: MessageType|ConnectionForward|null;
};
