import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {BrowseEndpointData} from "./BrowseEndpointData";
type BrowseCommandMetadata={
	webCommandMetadata: {
		apiUrl: "/youtubei/v1/browse";
		rootVe: 3854;
		url: "/";
		webPageType: "WEB_PAGE_TYPE_BROWSE";
	};
};

export interface BrowseEndpoint extends ClickTrackingParams {
	commandMetadata: BrowseCommandMetadata;
	browseEndpoint: BrowseEndpointData;
}
