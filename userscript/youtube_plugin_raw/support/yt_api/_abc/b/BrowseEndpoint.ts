import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {BrowseEndpointData} from "./BrowseEndpointData";
type BrowseCommandMetadata={};

export interface BrowseEndpoint extends ClickTrackingParams {
	commandMetadata: BrowseCommandMetadata;
	browseEndpoint: BrowseEndpointData;
}
