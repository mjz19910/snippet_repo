//#region Template strings
type T_MixPlaylistStr=`RD${string}`;
//#endregion
//#region Enum templates
type T_MutType<T extends string>=T_EnumStr<"ENTITY_MUTATION_TYPE",T>;
//#endregion
//#region Templates
//#region T_
type T_Item<T>={item: T;};
type T_Menu<T>={menu: T;};
type T_Page<T>={page: T;};
//#endregion
//#region Object conversion Templates
type T_RemovePrefix<T,T2 extends string>={
	[U in keyof T as `${string&U extends `${T2}${infer U1}${infer I1}`? `${Lowercase<U1>}${I1}`:never}`]: T[U];
};
//#endregion
//#region TA_
type TA_OpenPopup_Dropdown<T>={popup: T; popupType: "DROPDOWN";};
type TA_OpenPopup_Toast<T>={popup: T; popupType: "TOAST";};
type TA_OpenPopup_TopAlignedDialog<T>=BTA_OpenPopup_TopAligned<"DIALOG",T>;
//#endregion
//#region TB_
type TB_ContinuationItemMap_1={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
type TB_ContinuationItemMap={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
//#endregion
//#region TE_
type TE_Endpoint_2<EP_Key extends string,T_Data>={clickTrackingParams: string;}&{[I in EP_Key]: T_Data};
type TE_Endpoint_3_Helper<EP_Key extends `${string}${D_EndpointLikeEndings}`,T_Data,T_Meta>={clickTrackingParams: string; commandMetadata: T_Meta;}&{[K in EP_Key]: T_Data};
type TE_Endpoint_3<EP_Key extends `${string}${D_EndpointLikeEndings}`,T_Data,T_Meta>={[K in keyof TE_Endpoint_3_Helper<EP_Key,T_Data,T_Meta>]: TE_Endpoint_3_Helper<EP_Key,T_Data,T_Meta>[K]};
type TE_Endpoint_Opt_1<T_Meta>={clickTrackingParams: string; commandMetadata: T_Meta|undefined;};
type TE_Endpoint_Opt_3<EP_Key extends string,T_Data,T_Meta>={clickTrackingParams: string; commandMetadata?: T_Meta;}&{[I in EP_Key]: T_Data};
type TE_SetSetting<T_ItemId,T extends boolean,T_ClientItemId extends string>=TE_Endpoint_3<"setSettingEndpoint",T_DE_SettingItem<T_ItemId,T,T_ClientItemId>,M_SetSetting>;
//#endregion
//#region TM_
type TM_GetByVE<T extends keyof B_VEMap>=B_VEMap[T]['CommandMetadata'];
type TM_Gen<T>={webCommandMetadata: T;};
//#endregion
//#region T_DE_
type T_DE_SettingItem<T_ItemId,T_V extends boolean,T_ClientItemId extends string>={settingItemId: T_ItemId; boolValue: T_V; settingItemIdForClient: T_ClientItemId;};
//#endregion
//#region T_GM
type T_GM_PostApi_WithApiUrl<T extends string>={/**/sendPost: true; apiUrl: T;};
//#endregion
//#region T_SE
type T_SE_Signal<T_Meta extends {webCommandMetadata: any;},T_Data>=TE_Endpoint_3<"signalServiceEndpoint",T_Data,T_Meta>;
//#endregion
//#region T_Setting
type T_Setting_AutoNavForDesktop<T_Opt extends boolean>=TE_SetSetting<"407",T_Opt,"AUTONAV_FOR_DESKTOP">;
//#endregion
//#region T_Extract
type T_ExtractImport_<T extends (GenNs_AllNames|CF_Generated_NS.CF_Generated['n'])>=
	Extract<CF_Generated_NS.CF_Generated,{n: T;}>["v"]
	;
;
type T_ExtractImport<T extends (GenNs_AllNames|CF_Generated_NS.CF_Generated['n'])>=T_ExtractImport_<T>;
//#endregion
//#region Check if the passed in type meets certain conditions
type TCmp_Is_Endpoint_3<T extends TE_Endpoint_3<any,any,any>>=T;
type TCmp_Is_Endpoint_2<T extends TE_Endpoint_2<any,any>>=T;
//#endregion
type TA_OpenPopup_Empty=TA_OpenPopup<{}>;
type T_Items<T>={items: T[];};
type T_Items_TP<T>={
	items: T[];
	trackingParams: string;
};
type TR_MP_MenuSection<T>={multiPageMenuSectionRenderer: T_Items_TP<T>;};
type TAD_OpenPopup_Dialog<T>={
	popup: T;
	popupType: "DIALOG";
};
type TD_ContinuationItem_CE<T>={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: T;
};
type TD_GuideEntry_EntryData<T extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
};
type TD_GuideEntry_NotPrimary<T extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
type TD_GuideEntry_Primary<T_IconType extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	isPrimary: true;
};
type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
type TD_GuideEntry_Tid_Primary<T_IconType extends string,Tid>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	targetId: Tid;
	isPrimary: true;
};
type TD_ItemSection_2<T_ContentType,T_sectionIdentifier>=Record<"contents",T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
};
type TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>=Record<"contents",T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
	targetId: T_targetId;
};
type TD_ItemSection_3_I_1=R_ContinuationItem;
type TD_Label<T>={label: T;};
type TG_SecondaryResultsItem_3<A,B,C>=[
	R_RelatedChipCloud,
	TR_ItemSection_3<A,B,C>
][number];
type TM_Visibility=T_Types<12|14|15>;
type TP_Color<T extends T_IsColorHelper<T,U>,U extends string>=T;
type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`? TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
type TP_KeyofSearchParams<T extends string>=T extends `${infer U}=${string}&${infer Z}`? [U,...TP_KeyofSearchParams<Z>]:T extends `${infer U}=${string}`? [U]:[];
type TP_ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? TP_ParseUrlItems<V>:T extends `${infer V}`? TP_ParseUrlItems<V>:never;
type UC=TP_ParseUrlItems<"x=3&r=12">;
type TP_ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
type TRS_Actions={
	responseContext: RC_ResponseContext;
	actions: G_ResponseActions[];
};
type TR_ContinuationItem_CE<T>={
	continuationItemRenderer: TD_ContinuationItem_CE<T>;
};
type TR_ItemSection_2<CType,T>={itemSectionRenderer: TD_ItemSection_2<CType,T>;};
type TR_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>={itemSectionRenderer: TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>;};
type TR_SectionListItem_3<T_ContentType,B,C>=
	|R_ContinuationItem
	|TR_ItemSection_3<T_ContentType,B,C>
	|R_MusicCarouselShelf
	|R_MusicShelf
	;
;
type TR_SectionList_3<C,T,U>={sectionListRenderer: Record<"contents",TR_ItemSection_3<C,T,U>>;};
type T_Actions<T>={
	actions: T[];
};
type T_AnyObjectOrEmpty<T extends {}>={}|T;
type T_Autoplay<T>={
	autoplay: T;
};
type T_BaseUrl<T extends string>={baseUrl: T;};
type T_Command$<T>={
	command: T;
	trackingParams: string;
};
type T_DialogPopup<T=R_ConfirmDialog>={
	popup: T;
	popupType: "DIALOG";
};
type T_DialogPopup_ReuseFlag<T=R_ConfirmDialog,BeReused=false>={
	popup: T;
	popupType: "DIALOG";
	beReused: BeReused;
};
type T_DistributedKeyof<T>=T extends infer A? keyof A:never;
type T_DistributedKeysOf<T extends {}>=T_DistributedKeyof<T> extends never? []:T_DistributedKeyof<T>[];
type T_ElementId<T extends string,U extends string>=`${T}-${U}`;
type T_EnsureHex<T extends `0x${string}`>=T extends `0x${infer G}`? T_Split<G,"">[number] extends T_Split<"0123456789abcdef","">[number]? T:never:never;
type T_EnumStr<T extends string,U extends string>=`${T}_${U}`;
type T_ExtractKeyValue<T,U extends string>=T extends {
	[C in U]: any;
}? T:never;
type T_FeedEntry<T extends string>=`FE${T}`;
type T_GetTypeof<T>=
	T extends undefined? "undefined":
	T extends number? "number":
	T extends string? "string":
	T extends boolean? "boolean":
	T extends {}? "object":
	never;
type T_HexByte<T extends string>=string extends T? "00":T extends `${infer U}${infer V}`? `${T_HexNibble<U>}${T_HexNibble<V>}`:never;
type HexLen<T extends string,L extends number>=T_Split<T,"">["length"] extends L? T:T_Split<T,"">["length"];
type T_HexNibble<T extends string>=string extends T? "0":T extends G_HexNibbleStr? T:never;
type T_Icon<T extends string>={iconType: T;};
type T_IsColorHelper<T,U>=U extends `0x${infer I}`? T_Split<I,""> extends infer G extends T_Split<I,"">? G['length'] extends 6|8? T_EnsureHex<`0x${I}`> extends infer V extends string? V extends string? T:never:never:never:never:never;
type T_MapEntry<T,U>={key: T; value: U;};
type T_SettingsPageStr<T extends string>=`SP${T}`;
type T_MapValidHex<T extends string[]>=T_HexByte<T[number]> extends never? never:T;
type T_VerifyHex<T extends string>=T extends `0x${infer U}`? T_MapValidHex<T_SplitIntoGroups<U,string>>["length"] extends 8? T:never:never;
type R_Omit_Compact_Player={
	title: G_Text;
	trackingParams: string;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type T_Omit_Compact_Player<T extends R_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
type R_Omit_Compact_Video=R_Omit_Compact_Player&{
	videoId: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
};
type T_Omit_Compact_Video<T extends R_Omit_Compact_Video>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
type R_Omit_Menu_Video={
	thumbnail: R_Thumbnail;
	longBylineText: G_Text;
	viewCountText: G_Text;
	navigationEndpoint: E_Watch;
	shortBylineText: G_Text;
	menu: R_Menu;
};
type R_Omit_Menu_Radio={
	navigationEndpoint: E_Watch;
	menu: R_Menu;
};
type R_Omit_Menu_Video_Ex={
	ownerBadges: RMD_Badge[];
};
type T_Playlist<T>={
	playlist: T;
};
type T_Replace<T extends string,S extends string,R extends string>=T extends `${S}${infer N}`? `${R}${T_Replace<N,S,R>}`:T extends `${infer B}${S}${infer N}`? `${B}${R}${T_Replace<N,S,R>}`:T;
type T_Results<T>={
	results: T;
};
type T_ResultsArray<T>={
	results: T[];
	trackingParams: string;
};
type T_RidFormat<T extends string>=`${T}_rid`;
type T_SecondaryResults<T>={
	secondaryResults: T;
};
type T_ShortsSurfaceIdentifier<T>={
	surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
	tag: T;
};
type T_Signal<T>=Record<"signal",T>;
type T_SplitIntoGroups<S extends string,D extends string>=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${infer X extends D}${infer U}`? [`${T}${X}`,...T_SplitIntoGroups<U,D>]:
	[S];
type T_SplitOnce<S extends string,D extends string>=string extends S?
	[string]|[string,string]:S extends ''? []:S extends `${infer T}${D}${infer U}`? [T,U]:[S];
type T_StyleType<T>={
	styleType: T;
};
type T_TargetIdStr<T extends string,U extends string>=`${T}-${U}`;
type T_Text<T>={text: T;};
type T_TextRuns<T>={runs: T;};
type T_TrackingParamsAsString<T,V extends string>=V extends "trackingParams"? string:T;
type T_Types<T extends number>={types: `${T}`;};
type T_UnionToPartial<T>=NS_UnionToPartial.UnionToPartial<T>;
type T_UrlWrappedValue<T extends string>={
	privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: T;
};
type T_VideoIdStr<T>=T extends string? T_Split<T,"">["length"] extends 11? T:never:never;
type T_VideoListStr<T extends string>=`VL${T}`;
type T_WCM_={
	url?: string;
	webPageType?: YtPageTypeEnum;
	apiUrl?: string;
	sendPost?: boolean;
	rootVe?: D_RootVisualElementType;
};
type TR_SectionListItem_3_Empty=TR_SectionListItem_3<{},{},{}>;
type T_DC_Content<T>={trackingParams: string; contents: T[];};
type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
type T_DC_Content_3<SectionId_T extends string,TargetId_T extends string,T_Content>={contents: T_Content[]; trackingParams: string; sectionIdentifier: SectionId_T; targetId: TargetId_T;};

