//#region Grouped
namespace GR_Watch_Results_Types {}
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
type G_ConversationBar=R_LiveChat;
//#endregion
//#region Data
type D_TwoColumnWatchNextResults={
	results: T_Results<G_Watch_ResultsItem>;
	secondaryResults: T_SecondaryResults<G_Watch_SecondaryResults>;
	playlist?: T_Playlist<D_PlaylistContent>;
	autoplay?: T_Autoplay<D_AutoplayContent>;
	conversationBar?: G_ConversationBar;
};
type D_PlaylistContent={
	title: string;
	contents: R_PlaylistPanelVideo[];
	currentIndex: number;
	playlistId: D_PlaylistId;
	ownerName: G_Text;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: G_Text;
	longBylineText: G_Text;
	trackingParams: string;
	titleText: G_Text;
	isEditable: true;
	menu: R_Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R_Menu;
	isCourse: false;
	nextVideoLabel: G_Text;
};
type D_AutoplayContent={
	sets: AutoplaySetItem[];
	countDownSecs?: 5;
	modifiedSets?: D_ModifiedSetItem[];
	trackingParams: string;
};
//#endregion
//#region Renderer
type R_TwoColumnWatchNextResults={twoColumnWatchNextResults: D_TwoColumnWatchNextResults;};
//#endregion
