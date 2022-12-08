import {RemoteOriginConnected} from "./RemoteOriginConnected";
import {RemoteOriginDisconnected} from "./RemoteOriginDisconnected";
import {RemoteOriginKeepAliveReply} from "./RemoteOriginKeepAliveReply";
import {RemoteOriginKeepAlive} from "./RemoteOriginKeepAlive";

export type RemoteOriginMessage=
	RemoteOriginConnected|
	RemoteOriginDisconnected|
	RemoteOriginKeepAlive|
	RemoteOriginKeepAliveReply;
