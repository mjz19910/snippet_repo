import {CommandMetadata} from "./CommandMetadata.js";
import {SearchEndpointData} from "./SearchEndpointData";

export type SearchEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	searchEndpoint: SearchEndpointData;
};
