import {ResponseContext} from "../g/json/GeneralContext.js";
import {TwoColumnBrowseResultsRenderer} from "../t/TwoColumnBrowseResultsRenderer.js";
import {DesktopTopbarRenderer} from "./DesktopTopbarRenderer";
import {EntityBatchUpdate} from "./EntityBatchUpdate";
import {FeedTabbedHeaderRenderer} from "./FeedTabbedHeaderRenderer";
import {ResponseReceivedActionItem} from "../r/ResponseReceivedActionItem";
import {SettingsSidebarRenderer} from "../s/SettingsSidebarRenderer.js";
import {CacheMetadata} from "../s/CacheMetadata.js";

export type StateTagItem={
	stateTag: 3;
	instruction: "STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY";
};

export type BrowseResponseContent={
	responseContext?: ResponseContext;
	trackingParams: string;
	contents?: TwoColumnBrowseResultsRenderer;
	header?: FeedTabbedHeaderRenderer;
	topbar?: DesktopTopbarRenderer;
	sidebar?: SettingsSidebarRenderer;
	onResponseReceivedActions?: ResponseReceivedActionItem[];
	frameworkUpdates?: EntityBatchUpdate;
	observedStateTags?: StateTagItem[];
	cacheMetadata?: CacheMetadata;
};
