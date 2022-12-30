import {GeneralContext} from "../g/GeneralContext.js";
import {TwoColumnBrowseResultsRenderer} from "../t/TwoColumnBrowseResultsRenderer.js";
import {DesktopTopbarRenderer} from "./DesktopTopbarRenderer";
import {EntityBatchUpdate} from "./EntityBatchUpdate";
import {FeedTabbedHeaderRenderer} from "./FeedTabbedHeaderRenderer";
import {ResponseReceivedActionItem} from "../r/ResponseReceivedActionItem";

export type BrowseResponseContent={
	responseContext: GeneralContext;
	contents?: TwoColumnBrowseResultsRenderer;
	header: FeedTabbedHeaderRenderer;
	topbar?: DesktopTopbarRenderer;
	onResponseReceivedActions: ResponseReceivedActionItem[];
	trackingParams: string;
	frameworkUpdates?: EntityBatchUpdate;
};
