import {YtVideoIdStr} from "../w/WatchEndpointData.js";


export interface ReelWatchEndpointData<VideoId> {
	videoId: YtVideoIdStr<VideoId>;
}
