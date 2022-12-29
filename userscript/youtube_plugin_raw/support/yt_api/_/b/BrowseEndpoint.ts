import {ClickTrackingParams} from "../../_abc/c/ClickTrackingParams.js";
import {BrowseCommandMetadata} from "./BrowseCommandMetadata";
import {BrowseEndpointData} from "./BrowseEndpointData";

export interface BrowseEndpoint extends ClickTrackingParams {
	commandMetadata: BrowseCommandMetadata;
	browseEndpoint: BrowseEndpointData;
}
