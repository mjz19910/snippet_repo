namespace G_Watch_Results_Types {}

//#region G_Watch_Secondary
type RG_Watch_ItemSection=TR_ItemSection_3<G_Watch_SecondaryResults_G_SectionItem,"sid-wn-chips","watch-next-feed">;
type G_Watch_SecondaryResults_G_SectionItem=R_CompactPlaylist|R_CompactVideo|R_CompactRadio|R_AdSlot;
type G_Watch_AnyResultItem=R_RelatedChipCloud|RG_Watch_ItemSection;
type G_Watch_SecondaryResults_Results={trackingParams: string; results: G_Watch_AnyResultItem[];};
type G_Watch_SecondaryResults_Contents={contents: G_Watch_AnyResultItem[];};
type G_Watch_SecondaryResults=G_Watch_SecondaryResults_Contents|G_Watch_SecondaryResults_Results;

//#region ContentsItem
type G_Watch_ResultsItem={trackingParams: string; contents: G_Watch_ContentsItem[];};
type G_Watch_ContentsItem=[
	TR_ItemSection_3<R_ContinuationItem,"comment-item-section","comments-section">,
	TR_ItemSection_2<R_CommentsEntryPointHeader,"comments-entry-point">,
	R_MerchandiseShelf,
	R_VideoPrimaryInfo,
	R_VideoSecondaryInfo,
][number];
//#endregion
