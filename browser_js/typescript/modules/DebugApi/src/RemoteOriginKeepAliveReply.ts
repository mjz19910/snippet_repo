import {OriginConnectionSide} from "./OriginConnectionSide";

export type RemoteOriginKeepAliveReply={type: "keep_alive_reply"; sides: [OriginConnectionSide,OriginConnectionSide];};
