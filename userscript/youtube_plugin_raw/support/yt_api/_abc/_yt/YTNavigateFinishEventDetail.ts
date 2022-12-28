import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "./PageTypePlaylist";

type WebPageTypeChannel={
	endpoint: {
		clickTrackingParams: string;
		browseEndpoint: {
			browseId: `UC${string}`;
			canonicalBaseUrl: `/@${string}`;
		};
		commandMetadata: {
			webCommandMetadata: {
				apiUrl: "/youtubei/v1/browse";
				rootVe: 3611;
				url: `/@${string}`;
				webPageType: "WEB_PAGE_TYPE_CHANNEL";
			};
		};
	};
	pageType: "channel";
	fromHistory: boolean;
	response: {
		page: "channel";
		response: {
			responseContext: {};
			contents: {};
			header: {};
			metadata: {};
			trackingParams: string;
			topbar: {};
			microformat: {};
			onResponseReceivedActions: {}[];
		};
	};
	navigationDoneMs: number;
};

export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	WebPageTypeChannel|
	PageTypePlaylist;
