import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {WatchEndpointData} from "../w/WatchEndpointData.js";
import {CommandMetadata} from "./CommandMetadata.js";

type UrlEndpointRoot={
	url: string;
};
type YtEndpointBase={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};
type YtEndpointParts={
	watchEndpoint: WatchEndpointData;
}|{
	// TODO: 
	// target=UrlEndpointTargetType;
	urlEndpoint: UrlEndpointRoot;
}|{
	signalServiceEndpoint: SignalServiceEndpointData;
};

export type YtEndpoint=YtEndpointParts&YtEndpointBase;

