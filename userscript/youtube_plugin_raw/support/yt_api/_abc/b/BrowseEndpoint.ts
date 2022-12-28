import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {BrowseCommandMetadata} from "./BrowseCommandMetadata";
import {BrowseEndpointData} from "./BrowseEndpointData";

export interface BrowseEndpoint<T> extends ClickTrackingParams {
	commandMetadata: BrowseCommandMetadata<T>;
	browseEndpoint: BrowseEndpointData;
}
