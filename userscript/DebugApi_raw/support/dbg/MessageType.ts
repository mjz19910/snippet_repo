import {ConnectionConnected} from "./ConnectionConnected.ts";
import {ConnectionDisconnected} from "./ConnectionDisconnected.ts";
import {ConnectionSideMsg} from "./ConnectionSideMsg.ts";
import {ConnectionWillDisconnect} from "./ConnectionWillDisconnect.ts";

export type MessageType=
	|ConnectionConnected
	|ConnectionDisconnected
	|ConnectionSideMsg
	|ConnectionWillDisconnect
	;
