import {WatchEndpoint} from "../_/w/WatchEndpoint.js";

export type YtWatchPage<VideoId>={
	/** @readonly */
	page: "watch";
	endpoint: WatchEndpoint<VideoId>;
};
