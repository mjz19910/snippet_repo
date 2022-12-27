import {PageResponseWatch} from "./PageResponseWatch";
import {ReelWatchEndpoint} from "./ReelWatchEndpoint";

export type PageTypeShorts<VideoId>={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpoint<VideoId>;
	response: PageResponseWatch;
};
