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
type T_OpenPopup_Dropdown<T>={popupType: "DROPDOWN"; popup: T;};
type T_OpenPopup_Toast<T>={popupType: "TOAST"; popup: T;};
type T_OpenPopup_TopAlignedDialog<T>={popupType: "TOP_ALIGNED_DIALOG"; popup: T;};
type T_OpenPopup_Dialog<T>={popupType: "DIALOG"; popup: T;};
type T_Items<T>={items: T[];};
type T_Items_TP<T>={trackingParams: string; items: T[];};
type T_Actions<T>={actions: T[];};
type T_AnyObjectOrEmpty<T extends {}>={}|T;
type T_Autoplay<T>={autoplay: T;};
type T_BaseUrl<T extends string>={baseUrl: T;};
type T_Command$<T>={
	command: T;
	trackingParams: string;
};
type T_DialogPopup<T=R_ConfirmDialog>={
	popup: T;
	popupType: "DIALOG";
};
type T_DialogPopup_ReuseFlag<T=R_ConfirmDialog>={
	popup: T;
	popupType: "DIALOG";
	beReused: boolean;
};
type T_DropdownPopup_ReuseFlag<T>={
	popup: T;
	popupType: "DROPDOWN";
	beReused: true;
};
type T_DistributedKeyof<T>=T extends infer A? keyof A:never;
type T_DistributedKeysOf<T extends {}>=T_DistributedKeyof<T> extends never? []:T_DistributedKeyof<T>[];
type T_ElementId<T extends string,U extends string>=`${T}-${U}`;
type T_EnsureHex<T extends `0x${string}`>=T extends `0x${infer G}`? T_Split<G,"">[number] extends T_Split<"0123456789abcdef","">[number]? T:never:never;
type T_EnumStr<T extends string,U extends string>=`${T}_${U}`;
type T_ExtractKeyValue<T,U extends string>=T extends {[C in U]: any;}? T:never;
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
type T_Playlist<T>={playlist: T;};
type T_Replace<T extends string,S extends string,R extends string>=T extends `${S}${infer N}`? `${R}${T_Replace<N,S,R>}`:T extends `${infer B}${S}${infer N}`? `${B}${R}${T_Replace<N,S,R>}`:T;
type T_Results<T>={results: T;};
type T_ResultsArray<T>={
	results: T[];
	trackingParams: string;
};
type T_RidFormat<T extends string>=`${T}_rid`;
type T_SecondaryResults<T>={secondaryResults: T;};
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
type T_StyleType<T>={styleType: T;};
type T_TargetIdStr<T extends string,U extends string>=`${T}-${U}`;
type T_Text<T>={text: T;};
type T_TextRuns<T>={runs: T;};
type T_TrackingParamsAsString<T,V extends string>=V extends "trackingParams"? string:T;
type T_Types<T extends number>={types: `${T}`;};
type T_UnionToPartial<T>=NS_UnionToPartial.UnionToPartial<T>;
type T_UrlWrappedValue<T extends string>={privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: T;};
type T_VideoIdStr<T>=T extends string? T_Split<T,"">["length"] extends 11? T:never:never;
type T_VideoListStr<T extends string>=`VL${T}`;
type T_WCM_={
	url?: string;
	webPageType?: YtPageTypeEnum;
	apiUrl?: string;
	sendPost?: boolean;
	rootVe?: D_RootVisualElementType;
};
type T_ParseCallbackFunction<T extends CF_L_Params>=(
	x: V_ParamMapValue[],
	idx: number[],
	path: P_ParamParse,
	map_keys: number[],
	root: T,
) => void;
type T_UserFeedbackEndpointProductSpecificValueData<K,V>={userFeedbackEndpointProductSpecificValueData: T_MapEntry<K,V>;};
//#endregion
//#region Types that modify other types
type T_OmitKey<T,K extends keyof T>=T extends infer U? Omit<U,K>:never;
//#endregion
//#region Object conversion Templates
type T_RemovePrefix<T,T2 extends string>={[U in keyof T as `${string&U extends `${T2}${infer U1}${infer I1}`? `${Lowercase<U1>}${I1}`:never}`]: T[U];};
//#endregion
//#region T_DC_
type T_DC_Content<T>={trackingParams: string; contents: T[];};
type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
type T_DC_Content_3<SectionId_T extends string,TargetId_T extends string,T_Content>={contents: T_Content[]; trackingParams: string; sectionIdentifier: SectionId_T; targetId: TargetId_T;};
//#endregion
//#region T_Omit_
type T_Omit_Compact_Player<T extends D_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
type T_Omit_Compact_Video<T extends D_Omit_Compact_Video>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
//#endregion
//#region TA
type TA_OpenPopup_Empty=TA_OpenPopup<{}>;
//#endregion
//#region TB_
type TB_ContinuationItemMap_1={"browse-feedFEwhat_to_watch": G_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
type TB_ContinuationItemMap={"browse-feedFEwhat_to_watch": G_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
//#endregion
//#region TD_
type TD_ContinuationItem_CE<T>={trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN"; continuationEndpoint: T;};
type TD_GuideEntry_EntryData<T_IconType extends string>=TD_GuideEntry_Simple<T_IconType>&{entryData: R_GuideEntryData;};
type TD_GuideEntry_Primary<T_IconType extends string>=TD_GuideEntry_Simple<T_IconType>&{isPrimary: true;};
type TD_GuideEntry_Simple<T_IconType extends string>={navigationEndpoint: GE_Browse; icon: T_Icon<T_IconType>; trackingParams: string; formattedTitle: G_Text; accessibility: D_Accessibility;};
type TD_GuideEntry_Tid_Primary<T_IconType extends string,Tid>=TD_GuideEntry_Primary<T_IconType>&{targetId: Tid;};
type TD_ItemSection_2<T_ContentType,T_sectionIdentifier>={trackingParams: string; contents: T_ContentType[]; sectionIdentifier: T_sectionIdentifier;};
type TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>={targetId: T_targetId;}&TD_ItemSection_2<T_ContentType,T_sectionIdentifier>;
type TD_Label<T>={label: T;};
//#endregion
//#region TE_
type TE_Endpoint_1<EP_Key extends string,T_Data>={[I in EP_Key]: T_Data};
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
type T_ExtractIconType<T extends {icon: T_Icon<U>;},U extends string=T["icon"]["iconType"]>=U;
type T_NumArrStr<T extends string>=T extends `${infer U extends number},${infer A extends number},${infer X}`? [U,A,...T_NumArrStr<X>]:T extends `${infer U extends number},${infer X}`? [U,...T_NumArrStr<X>]:T extends `${infer U extends number}`? [U]:never;
type T_NumArrStrVerify<T extends string,C extends string="">=C extends ''? T extends `${number},${number},${infer X}`? T_NumArrStrVerify<T,X>:C extends ''? `${T}`:`${T},${C}`:C extends `${number},${number},${infer X}`? T_NumArrStrVerify<T,X>:T;
type T_NumRange<T,U>=NS_NumRange.NumRange<T,U>;
//#endregion
//#region Check if the passed in type meets certain conditions
type TCmp_Is_Endpoint_3<T extends TE_Endpoint_3<any,any,any>>=T;
type TCmp_Is_Endpoint_2<T extends TE_Endpoint_2<any,any>>=T;
//#endregion
//#region TR_
type TR_SectionListItem_3_Empty=TR_SectionListItem_3<{},{},{}>;
type TR_MP_MenuSection<T>={multiPageMenuSectionRenderer: T_Items_TP<T>;};
type TR_ContinuationItem_CE<T>={continuationItemRenderer: TD_ContinuationItem_CE<T>;};
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
type TR_MultiPageMenu_Empty=TR_MultiPageMenu<{}>;
type TR_MultiPageMenu<T>={multiPageMenuRenderer: T;};
//#endregion
type TG_SecondaryResultsItem_3<A,B,C>=[
	R_RelatedChipCloud,
	TR_ItemSection_3<A,B,C>
][number];
type TM_Visibility=T_Types<12|14|15>;
type TP_Color<T extends T_IsColorHelper<T,U>,U extends string>=T;
type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`? TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
type TP_KeyofSearchParams<T extends string>=T extends `${infer U}=${string}&${infer Z}`? [U,...TP_KeyofSearchParams<Z>]:T extends `${infer U}=${string}`? [U]:[];
type TP_ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? TP_ParseUrlItems<V>:T extends `${infer V}`? TP_ParseUrlItems<V>:never;
type TP_ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {[V in U]: DecodeUriComponent<C>;}:T;
type DecodeUriComponent<T extends string>=T_Replace<T,`%3${"f"|"F"}`,"?">;
type TRS_Actions={
	responseContext: RC_ResponseContext;
	actions: G_ResponseActions[];
};