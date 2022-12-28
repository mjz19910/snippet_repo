import {ShortsEndpoint} from "../../../../ShortsEndpoint";
import {ShortsPlayerResponse} from "../../../../ShortsPlayerResponse";
import {PageResponseShortsContentResponse} from "./PageResponseShortsContentResponse";

export type PageResponseShorts={
	page: "shorts";
	endpoint: ShortsEndpoint;
	response: PageResponseShortsContentResponse;
	playerResponse: ShortsPlayerResponse;
	reelWatchSequenceResponse: {
		responseContext: {};
		entries: {}[];
		trackingParams: string;
	};
	url: `/shorts/${string}`;
};
