import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {UrlEndpointTargetType} from "../u/UrlEndpointTargetType.js";
import {WatchEndpointData} from "../w/WatchEndpointData.js";
import {BrowseEndpointData} from "./BrowseEndpointData.js";
import {CommandMetadata} from "./CommandMetadata.js";
import {SearchEndpointData} from "./SearchEndpointData.js";

type UrlEndpointRoot={
	url: string;
	target?: UrlEndpointTargetType;
};
type YtEndpointBase={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};
type SetSettingEndpoint={
	settingItemId: `${number}`;
	boolValue?: boolean;
	settingItemIdForClient: "EMAIL_CREATOR_NEWSLETTER";
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
}|{
	setSettingEndpoint: SetSettingEndpoint;
};

export type YtEndpoint=YtEndpointParts&YtEndpointBase;

