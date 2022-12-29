import {BrowseFeedAction} from "./_/b/BrowseFeedAction.js";
import {CommentsSectionContinuationAction} from "./_/c/CommentsSectionContinuationAction.js";
import {WatchNextContinuationAction} from "./_/w/WatchNextContinuationAction.js";

export type AppendContinuationItemsAction=WatchNextContinuationAction|CommentsSectionContinuationAction|BrowseFeedAction;
