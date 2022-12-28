import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {ReelWatchCommandMetadata} from "./ReelWatchCommandMetadata";

export interface ReelWatchEndpoint<VideoId> {
	commandMetadata: ReelWatchCommandMetadata<VideoId>;
	reelWatchEndpoint: ReelWatchEndpointData<VideoId>;
}
