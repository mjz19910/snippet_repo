//#region Used by renderer
type D_TwoColumnWatchNextResults={
	results: T_Results<G_Watch_ResultsItem>;
	secondaryResults: T_SecondaryResults<G_Watch_SecondaryResults>;
	playlist?: T_Playlist<D_PlaylistContent>;
	autoplay?: T_Autoplay<D_AutoplayContent>;
	conversationBar?: G_ConversationBar;
};
//#endregion
//#region Used by data
type G_Watch_ResultsItem={trackingParams: string; contents: G_Watch_ContentsItem[];};
type G_Watch_SecondaryResults=G_Watch_SecondaryResults_Contents|G_Watch_SecondaryResults_Results;
type G_ConversationBar=R_LiveChat|R_ConversationBar;
//#endregion
//#region Watch Secondary
type RG_Watch_ItemSection=TR_ItemSection_3<G_Watch_SecondaryResults_G_SectionItem,"sid-wn-chips","watch-next-feed">;
type G_Watch_SecondaryResults_G_SectionItem=R_CompactPlaylist|R_CompactVideo|R_CompactRadio|R_AdSlot;
type G_Watch_AnyResultItem=R_RelatedChipCloud|RG_Watch_ItemSection;
type G_Watch_SecondaryResults_Results={trackingParams: string; results: G_Watch_AnyResultItem[]; continuations?: [];};
type G_Watch_SecondaryResults_Contents={contents: G_Watch_AnyResultItem[];};
//#endregion
//#region Watch ContentsItem
type G_Watch_ContentsItem=[
	TR_ItemSection_3<R_ContinuationItem,"comment-item-section","comments-section">,
	TR_ItemSection_2<R_CommentsEntryPointHeader,"comments-entry-point">,
	R_MerchandiseShelf,
	R_VideoPrimaryInfo,
	R_VideoSecondaryInfo,
][number];
//#endregion
//#region Data
type D_AutoplayContent={
	sets: D_AutoplaySetItem[];
	countDownSecs?: 5;
	modifiedSets?: D_ModifiedSetItem[];
	trackingParams: string;
};
//#endregion
