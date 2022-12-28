import {GeneralHistoryState} from "../p/GeneralHistoryState.js";
import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
type PlaylistCommandMetadata<T extends string>={
	webCommandMetadata: {
		apiUrl: "/youtubei/v1/browse";
		rootVe: 5754;
		url: `/playlist?list=${T}`;
		webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	};
};
type PlaylistEndpoint<T extends string>={
	browseEndpoint: {
		browseId: "VLWL";
	};
	clickTrackingParams: string;
	commandMetadata: PlaylistCommandMetadata<T>;
};
type PlaylistResponse<T extends string>={
	endpoint: PlaylistEndpoint<T>;
	page: "playlist";
	response: {
		trackingParams: string;
	};
	url: `/playlist?list=${T}`;
};
interface PageTypePlaylist<VideoId extends string> extends GeneralHistoryState {
	pageType: "playlist";
	endpoint: PlaylistEndpoint<VideoId>;
	response: PlaylistResponse<VideoId>;
};

export type YTNavigateFinishEventDetail<T extends string>=PageTypeWatch<T>|PageTypeBrowse|PageTypeShorts<T>|PageTypePlaylist<T>;
