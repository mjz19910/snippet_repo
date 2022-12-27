import {ReelWatchEndpoint} from "./ReelWatchEndpoint";
type PageResponseWatchShorts<T>={
	__vid: T;
};

export type PageTypeShorts<VideoId>={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpoint<VideoId>;
	response: PageResponseWatchShorts<VideoId>;
};
