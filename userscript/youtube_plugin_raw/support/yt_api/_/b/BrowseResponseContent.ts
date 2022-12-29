import {EntityBatchUpdate} from "../e/EntityBatchUpdate.js";
import {GeneralContext} from "../GeneralContext.js";
import {TwoColumnBrowseResultsRendererData} from "../t/TwoColumnBrowseResultsRendererData.js";
import {FeedTabbedHeaderRenderer} from "./FeedTabbedHeaderRenderer";

type AdsControlFlowOpportunityReceivedCommandData={
	opportunityType: "OPPORTUNITY_TYPE_ORGANIC_BROWSE_RESPONSE_RECEIVED";
	adSlotAndLayoutMetadata: {}[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};

type AdsControlFlowOpportunityReceivedCommand={
	clickTrackingParams: string;
	adsControlFlowOpportunityReceivedCommand: AdsControlFlowOpportunityReceivedCommandData;
};

export type BrowseResponseContent={
	responseContext: GeneralContext;
	contents: {
		twoColumnBrowseResultsRenderer: TwoColumnBrowseResultsRendererData;
	};
	header: FeedTabbedHeaderRenderer;
	topbar: {
		desktopTopbarRenderer: {};
	};
	onResponseReceivedActions: AdsControlFlowOpportunityReceivedCommand[];
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};
