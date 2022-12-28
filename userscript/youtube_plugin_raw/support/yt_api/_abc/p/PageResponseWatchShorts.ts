import {EngagementPanelSectionListRendererOpt} from "./EngagementPanelSectionListRendererOpt";
import {ReelWatchEndpoint} from "./ReelWatchEndpoint";

export type PageResponseWatchShorts<VideoId>={
	page: "shorts";
	endpoint: ReelWatchEndpoint<VideoId>;
	response: {
		responseContext: {};
		overlay: {};
		status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
		trackingParams: string;
		desktopTopbar: {};
		engagementPanels: {
			engagementPanelSectionListRenderer: EngagementPanelSectionListRendererOpt;
		}[];
	};
	playerResponse: {};
	reelWatchSequenceResponse: {};
};
