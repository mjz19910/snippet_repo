import {EntityBatchUpdateData} from "../e/EntityBatchUpdate.js";
import {GeneralContext} from "../GeneralContext.js";
import {TwoColumnBrowseResultsRenderer} from "../t/TwoColumnBrowseResultsRenderer.js";
import {AdsControlFlowOpportunityReceivedCommand} from "./AdsControlFlowOpportunityReceivedCommand";
import {DesktopTopbarRenderer} from "./DesktopTopbarRenderer";
import {FeedTabbedHeaderRenderer} from "./FeedTabbedHeaderRenderer";

export type BrowseResponseContent={
	responseContext: GeneralContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: FeedTabbedHeaderRenderer;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedActions: AdsControlFlowOpportunityReceivedCommand[];
	trackingParams: string;
	frameworkUpdates: {
		entityBatchUpdate: EntityBatchUpdateData;
	};
};
