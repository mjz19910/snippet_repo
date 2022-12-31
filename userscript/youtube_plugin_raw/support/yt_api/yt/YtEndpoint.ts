import {BrowseEndpointData} from "../_/b/BrowseEndpointData.js";
import {SignalServiceEndpointData} from "../_/s/SignalServiceEndpoint.js";
import {SearchEndpointData} from "../_/SearchEndpointData.js";
import {SetSettingEndpointData} from "../_/SetSettingEndpointData";
import {UrlEndpointRoot} from "../_/UrlEndpointRoot";
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
