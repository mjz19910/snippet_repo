import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {ReelWatchCommandMetadata} from "./ReelWatchCommandMetadata";

export interface ReelWatchEndpoint<VideoId> {
	commandMetadata: ReelWatchCommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData<VideoId>;
}
