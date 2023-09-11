import {ConnectionConnected} from "./ConnectionConnected.js";
import {ConnectionDisconnected} from "./ConnectionDisconnected.js";
import {ConnectionSideMsg} from "./ConnectionSideMsg.js";
import {ConnectionWillDisconnect} from "./ConnectionWillDisconnect.js";

export type MessageType=
	|ConnectionConnected
	|ConnectionDisconnected
	|ConnectionSideMsg
	|ConnectionWillDisconnect
	;
;
