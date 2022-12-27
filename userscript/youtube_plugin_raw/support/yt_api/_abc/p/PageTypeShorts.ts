import {ReelWatchEndpoint} from "./ReelWatchEndpoint";
const use_post_req_uniq_symbol:unique symbol=Symbol("PostTag");
const web_cmd_api_url:unique symbol=Symbol("ApiUrl");

export type WebCommandMetadata2a<T,_z extends typeof web_cmd_api_url,_U extends typeof use_post_req_uniq_symbol>={
	apiUrl: T;
	sendPost: true;
}
type WebCommandMetadata0<T>=WebCommandMetadata2a<T,typeof web_cmd_api_url,typeof use_post_req_uniq_symbol>;

type EngagementPanelSectionListRendererOpt={
	content: {
		sectionListRenderer: {
			contents: {
				itemSectionRenderer: {
					contents: {
						continuationItemRenderer: {
							continuationEndpoint: {
								clickTrackingParams: string;
								commandMetadata: {
									webCommandMetadata: WebCommandMetadata0<"/youtubei/v1/browse">;
								};
								continuationCommand: {
									request: "CONTINUATION_REQUEST_TYPE_BROWSE";
									token: string;
								};
							};
							trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
						};
					}[];
					sectionIdentifier: "comment-item-section";
					targetId: "engagement-panel-comments-section";
					trackingParams: string;
				};
			}[];
			trackingParams: string;
		}
	};
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "shorts-comments-panel";
	};
	loggingDirectives: {};
	targetId: "shorts-comments-panel";
	veType: 139722;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
}|{
	content: {};
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "engagement-panel-structured-description";
	};
	loggingDirectives: {};
	targetId: "engagement-panel-structured-description";
	veType: 124975;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};

type PageResponseWatchShorts<VideoId>={
	page: "shorts";
	endpoint: ReelWatchEndpoint<VideoId>;
	response: {
		responseContext: {}
		overlay: {};
		status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
		trackingParams: string;
		desktopTopbar: {};
		engagementPanels: {
			engagementPanelSectionListRenderer: EngagementPanelSectionListRendererOpt
		}[];
	};
	playerResponse: {};
	reelWatchSequenceResponse: {};
};

export type PageTypeShorts<VideoId>={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpoint<VideoId>;
	response: PageResponseWatchShorts<VideoId>;
};
