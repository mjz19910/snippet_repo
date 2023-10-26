import {RemoteOriginConnected} from "./RemoteOriginConnected.ts";
import {RemoteOriginDisconnected} from "./RemoteOriginDisconnected.ts";
import {RemoteOriginKeepAliveReply} from "./RemoteOriginKeepAliveReply.ts";
import {RemoteOriginKeepAlive} from "./RemoteOriginKeepAlive.ts";

export type RemoteOriginMessage=
	|RemoteOriginConnected
	|RemoteOriginDisconnected
	|RemoteOriginKeepAlive
	|RemoteOriginKeepAliveReply;
