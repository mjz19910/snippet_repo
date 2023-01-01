import {BrowseEndpointData} from "../support/yt_api/_/b/BrowseEndpointData.js";
import {SearchEndpointData} from "./SearchEndpointData.js";
import {SetSettingEndpointData} from "./SetSettingEndpointData.js";
import {SignalServiceEndpointData} from "./SignalServiceEndpoint.js";
import {UrlEndpointRoot} from "./UrlEndpointRoot.js";
import {WatchEndpointData} from "./WatchEndpointData.js";
import {YtEndpointBase} from "./YtEndpointBase";

export type YtEndpoint=YtEndpointBase&({
	watchEndpoint: WatchEndpointData;
}|{
	urlEndpoint: UrlEndpointRoot;
}|{
	signalServiceEndpoint: SignalServiceEndpointData;
}|{
	browseEndpoint: BrowseEndpointData;
}|{
	searchEndpoint: SearchEndpointData;
}|{
	setSettingEndpoint: SetSettingEndpointData;
});
