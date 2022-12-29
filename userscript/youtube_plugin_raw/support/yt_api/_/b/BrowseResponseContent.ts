import {GeneralContext} from "../g/GeneralContext.js";
import {TwoColumnBrowseResultsRenderer} from "../t/TwoColumnBrowseResultsRenderer.js";
import {AdsControlFlowOpportunityReceivedCommand} from "./AdsControlFlowOpportunityReceivedCommand";
import {DesktopTopbarRenderer} from "./DesktopTopbarRenderer";
import {EntityBatchUpdate} from "./EntityBatchUpdate";
import {FeedTabbedHeaderRenderer} from "./FeedTabbedHeaderRenderer";

export type BrowseResponseContent={
	responseContext: GeneralContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: FeedTabbedHeaderRenderer;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedActions: AdsControlFlowOpportunityReceivedCommand[];
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};
