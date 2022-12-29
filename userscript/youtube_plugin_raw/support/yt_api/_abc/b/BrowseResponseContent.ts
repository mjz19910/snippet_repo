import {EntityBatchUpdate} from "../e/EntityBatchUpdate.js";
import {GeneralContext} from "../g/GeneralContext.js";
import {TwoColumnBrowseResultsRendererData} from "../TwoColumnBrowseResultsRendererData.js";

type FeedTabbedHeaderRenderer={
	feedTabbedHeaderRenderer: {};
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
	onResponseReceivedActions: {
		clickTrackingParams: string;
		adsControlFlowOpportunityReceivedCommand: {};
	}[];
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};
