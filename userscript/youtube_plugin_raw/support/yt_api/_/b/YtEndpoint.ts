import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {WatchEndpointData} from "../w/WatchEndpointData.js";
import {BrowseEndpointData} from "./BrowseEndpointData.js";
import {CommandMetadata} from "./CommandMetadata.js";
import {SearchEndpointData} from "./SearchEndpointData.js";

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
}|{
	browseEndpoint: BrowseEndpointData;
}|{
	searchEndpoint: SearchEndpointData;
};

export type YtEndpoint=YtEndpointParts&YtEndpointBase;

