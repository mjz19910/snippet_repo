import {ReloadContinuationItemsCommandFor} from "./ReloadContinuationItemsCommandFor";

export type ReloadContinuationSlotBody={
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_BODY",{
		continuationItems: {}[];
	}>;
};
