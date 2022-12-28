import {ShortsEndpoint} from "../../../../ShortsEndpoint";
import {ShortsPlayerResponse} from "../../../../ShortsPlayerResponse";
import {PageResponseShortsContentResponse} from "./PageResponseShortsContentResponse";

export type PageResponseShorts<T>={
	page: "shorts";
	endpoint: ShortsEndpoint<T>;
	response: PageResponseShortsContentResponse;
	playerResponse: ShortsPlayerResponse;
	reelWatchSequenceResponse: {
		responseContext: {};
		entries: {}[];
		trackingParams: string;
	};
	url: T extends string? `/shorts/${T}`:never;
};
