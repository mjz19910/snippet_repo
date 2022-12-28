import {PageResponseBrowse} from "./support/yt_api/_abc/p/PageResponseBrowse.js";
import {PageResponseWatch} from "./youtube_plugin.user.js";

type PageResponseShorts<T>={
	page: "shorts";
	endpoint: {
		clickTrackingParams: string;
		commandMetadata: {
			webCommandMetadata: {
				url: T extends string ?`/shorts/${T}`:never;
				webPageType: "WEB_PAGE_TYPE_SHORTS";
				rootVe: 37414;
			};
		};
		reelWatchEndpoint: {
			overlay: {};
			params: string;
			playerParams: string;
		};
	};
	response: {};
	playerResponse: {};
	reelWatchSequenceResponse: {};
	url: T extends string? `/shorts/${T}`:never;
};

export type InitialDataType=PageResponseWatch<string>|PageResponseBrowse|PageResponseShorts<string>;

