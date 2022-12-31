import {BrowseEndpointData} from "./b/BrowseEndpointData.js";
import {SignalServiceEndpointData} from "./s/SignalServiceEndpoint.js";
import {SearchEndpointData} from "./SearchEndpointData.js";
import {SetSettingEndpointData} from "./SetSettingEndpointData";
import {UrlEndpointRoot} from "./UrlEndpointRoot";
import {WatchEndpointData} from "./w/WatchEndpointData.js";
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
