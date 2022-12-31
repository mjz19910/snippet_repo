import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {WatchEndpointData} from "../w/WatchEndpointData.js";
import {BrowseEndpointData} from "./BrowseEndpointData.js";
import {SearchEndpointData} from "./SearchEndpointData.js";
import {SetSettingEndpointData} from "./SetSettingEndpointData";
import {UrlEndpointRoot} from "./UrlEndpointRoot";
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
