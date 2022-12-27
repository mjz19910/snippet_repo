import {ReloadContinuationItemsCommandFor} from "./ReloadContinuationItemsCommandFor";
import {CommentsHeaderRenderer} from "./yt_api/_abc/c/CommentsHeaderRenderer.js";

export type AllResponseReceivedEndpoints={
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_HEADER",{
		continuationItems: [{
			commentsHeaderRenderer: CommentsHeaderRenderer;
		}];
	}>;
}|{
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_BODY",{
		continuationItems: {}[];
	}>;
};
