import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {ReelWatchCommandMetadata} from "./ReelWatchCommandMetadata";

export interface ReelWatchEndpoint {
	commandMetadata: ReelWatchCommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData;
}
