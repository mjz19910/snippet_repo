import {BrowseFeedAction} from "../_abc/b/BrowseFeedAction.js";
import {CommentsSectionContinuationAction} from "../_abc/c/CommentsSectionContinuationAction.js";
import {WatchNextContinuationAction} from "../_abc/w/WatchNextContinuationAction.js";

export type AppendContinuationItemsAction=WatchNextContinuationAction|CommentsSectionContinuationAction|BrowseFeedAction;
