import {CommentsHeaderContent} from "../yt_api/_abc/c/CommentsHeaderContent";
import {ReloadContinuationItemsCommandFor} from "./ReloadContinuationItemsCommandFor";

export type ReloadContinuationSlotHeader={
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_HEADER",CommentsHeaderContent>;
};
