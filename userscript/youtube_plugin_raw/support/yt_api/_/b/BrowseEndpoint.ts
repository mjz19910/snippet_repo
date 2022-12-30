import {CommandMetadata} from "./CommandMetadata";
import {BrowseEndpointData} from "./BrowseEndpointData";

export type BrowseEndpoint={
	commandMetadata: CommandMetadata;
	browseEndpoint: BrowseEndpointData;
	clickTrackingParams: string;
};
