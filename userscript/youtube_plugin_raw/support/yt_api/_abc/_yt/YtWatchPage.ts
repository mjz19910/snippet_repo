import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type YtWatchPage<VideoId>={
	/** @readonly */
	page: "watch";
	endpoint: WatchEndpoint<VideoId>;
};
