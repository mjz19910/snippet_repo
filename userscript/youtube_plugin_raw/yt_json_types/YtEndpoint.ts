import {BrowseEndpointData} from "../_/b/BrowseEndpointData.js";
import {SearchEndpointData} from "../_/s/SearchEndpointData.js";
import {SetSettingEndpointData} from "../_/s/SetSettingEndpointData.js";
import {SignalServiceEndpointData} from "../_/s/SignalServiceEndpoint.js";
import {UrlEndpointRoot} from "../_/u/UrlEndpointRoot.js";
import {WatchEndpointData} from "../_/w/WatchEndpointData.js";
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
