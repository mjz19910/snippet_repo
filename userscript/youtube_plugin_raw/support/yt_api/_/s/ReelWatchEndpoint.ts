import {CommandMetadata} from "../b/CommandMetadata.js";
import {ReelWatchEndpointData as ReelWatchEndpointData} from "../r/ReelWatchEndpointData";

export type ReelWatchEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData;
};
