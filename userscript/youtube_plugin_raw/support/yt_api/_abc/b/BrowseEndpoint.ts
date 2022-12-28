import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {BrowseEndpointData} from "./BrowseEndpointData";
type BrowseCommandMetadata<T>={
	webCommandMetadata: {
		apiUrl: "/youtubei/v1/browse";
		rootVe: 3854;
		url: T;
		webPageType: "WEB_PAGE_TYPE_BROWSE";
	};
};

export interface BrowseEndpoint<T> extends ClickTrackingParams {
	commandMetadata: BrowseCommandMetadata<T>;
	browseEndpoint: BrowseEndpointData;
}
