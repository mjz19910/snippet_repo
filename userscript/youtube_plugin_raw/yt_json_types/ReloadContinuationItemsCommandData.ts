type ReloadContinuationItemsCommandData={
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: SectionItem[];
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: [CommentsHeaderRenderer];
};
