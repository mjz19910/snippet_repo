import {CommandMetadata} from "../c/CommandMetadata.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {YtVideoIdStr} from "../w/WatchEndpointData.js";
import {PageResponseWatch} from "./PageResponseWatch";
import {PageTypeBrowse} from "./PageTypeBrowse.js";

export interface PageTypeWatch<T> {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint<T>;
	response: PageResponseWatch;
}

interface ReelWatchEndpointData<VideoId> {
	videoId: YtVideoIdStr<VideoId>;
}
type ReelWatchCommandMetadata=CommandMetadata;
interface ReelWatchEndpoint<VideoId> {
	commandMetadata: ReelWatchCommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData<VideoId>;
}

type PageTypeShorts<VideoId>={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpoint<VideoId>;
	response: PageResponseWatch;
};

export type YTNavigateFinishEventDetail<T>=PageTypeWatch<T>|PageTypeBrowse|PageTypeShorts<T>;
