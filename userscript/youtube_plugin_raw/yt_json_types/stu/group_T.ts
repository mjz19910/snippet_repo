import {YtPageTypeEnum} from "../../support_2/YtPageTypeEnum.js";
import {T_D32} from "../_rtv_wrong/T_Data.js";
import {TA_Continuation} from "../abc/A.js";
import {B_VEMap} from "../abc/B.js";
import {D_RootVisualElementType,D_Omit_Compact_Player,D_Omit_Compact_Video,D_Accessibility} from "../d/group_D.js";
import {D_TargetIdUuid,DU_EndpointKey} from "../d/mod_D/DU_T/DU.js";
import {G_HexNibbleStr,G_WatchNext,G_Text,G_ResponseActions} from "../ghi/group_G.js";
import {KM_TrackingObj} from "../k/KM.js";
import {NS_UnionToPartial} from "../nop_q/Namespaces.js";
import {R_Comment,R_ContinuationItem,R_RichItem,R_CommentThread,R_GuideEntryData,R_RelatedChipCloud,RC_ResponseContext} from "../r/group_R.js";
import {CF_P_ParamParse} from "../nop_q/p_sub/P_ParamParse.js";
import {CF_L_Params} from "../abc/C.js";
import {V_ParamMapValue, V_RawValue} from "../vw/group_V.js";

//#region GetNumKey
export type T_GetKeyMap<T,U extends keyof T,KM>=Extract<KM[Extract<keyof KM,U>],string>|T_MakeNumFieldFmt<T,U,Extract<U,number>,keyof KM,T_D32<number>|undefined>;
export type T_Extract_D32_Keys<T,U extends keyof T,Y extends number,L>=T[U] extends L? Y:never;
export type T_OmitKeyMapKeys<Y extends number>=Exclude<Y,keyof KM_TrackingObj>;
export type T_MakeNumFieldFmt<T,U extends keyof T=keyof T,V extends number=Extract<U,number>,W=never,L=T_D32<number>|undefined>=`f${T_Extract_D32_Keys<T,U,Exclude<V,W>,L>}`;
export type T_ObjGetNumKey_1<T extends {},KM>={[U in keyof T as T_GetKeyMap<T,U,KM>]: U;};
export type T_ObjGetNumKey<T extends {},KM={}>=`${Extract<keyof T_ObjGetNumKey_1<T,KM>,string>}`;
//#endregion
export type MonadFn<U,A extends any[]>=(...s: A) => U;
export type M_Optional<T>=Some<T>|None;
export type Some<T>={
	type: "s";
	v: T;
};
export type None={type: "n";};

//#region Template strings
//#endregion
//#region Enum templates
export type T_MutType<T extends string>=T_EnumStr<"ENTITY_MUTATION_TYPE",T>;
//#endregion
//#region Templates
//#region T_
export type T_Item<T>={item: T;};
export type T_Menu<T>={menu: T;};
export type T_Page<T>={page: T;};
export type T_Items<T>={items: T[];};
export type T_TrackedItems<T>={trackingParams: string; items: T[];};
export type T_Actions<T>={actions: T[];};
export type T_AnyObjectOrEmpty<T extends {}>={}|T;
export type T_Autoplay<T>={autoplay: T;};
export type T_BaseUrl<T extends string>={
	baseUrl: T;
	elapsedMediaTimeSeconds?: number;
};
export type T_Command_TP<T>={
	command: T;
	trackingParams: string;
};
export type T_DistributedKeyof<T>=T extends infer A? keyof A:never;
export type T_DistributedKeyof_2<T>=T extends infer A? Union2Tuple<keyof A>:[];
// oh boy don't do this
export type UnionToIntersection<U>=(U extends any? (k: U) => void:never) extends ((k: infer I) => void)? I:never;
export type LastOf<T>=UnionToIntersection<T extends any? () => T:never> extends () => (infer R)? R:never;
// TS4.1+
export type Union2Tuple<T,L=LastOf<T>,N=[T] extends [never]? true:false>=true extends N? []:[...Union2Tuple<Exclude<T,L>>,L];
export type T_DistributedKeysOf_2<T extends {}>=T_DistributedKeyof_2<T> extends []? []:T_DistributedKeyof_2<T>;
export namespace X_T_DistributedKeysOf {
	export type T1={v: string;};
	export type U1=T_DistributedKeysOf_2<T1>;
}

export type T_DistributedKeysOf<T extends {}>=T_DistributedKeyof<T> extends never? []:T_DistributedKeyof<T>[];
export type T_ElementId<T extends string,U extends string>=`${T}-${U}`;
export type T_EnsureHex<T extends `0x${string}`>=T extends `0x${infer G}`? T_Split<G,"">[number] extends T_Split<"0123456789abcdef","">[number]? T:never:never;
export type T_EnumStr<T extends string,U extends string>=`${T}_${U}`;
export type T_ExtractKeyValue<T,U extends string>=T extends {[C in U]: any;}? T:never;
export type T_GetTypeof<T>=
	T extends undefined? "undefined":
	T extends number? "number":
	T extends bigint? "bigint":
	T extends string? "string":
	T extends boolean? "boolean":
	T extends {}? "object":
	never;
export type T_HexByte<T extends string>=string extends T? "00":T extends `${infer U}${infer V}`? `${T_HexNibble<U>}${T_HexNibble<V>}`:never;
export type HexLen<T extends string,L extends number>=T_Split<T,"">["length"] extends L? T:T_Split<T,"">["length"];
export type T_HexNibble<T extends string>=string extends T? "0":T extends G_HexNibbleStr? T:never;
export type T_Icon<T extends string>={iconType: T;};
export type T_IsColorHelper<T,U>=U extends `0x${infer I}`? T_Split<I,""> extends infer G extends T_Split<I,"">? G['length'] extends 6|8? T_EnsureHex<`0x${I}`> extends infer V extends string? V extends string? T:never:never:never:never:never;
export type T_MapEntry<T,U>={key: T; value: U;};
export type T_SettingsPageStr<T extends string>=`SP${T}`;
export type T_MapValidHex<T extends string[]>=T_HexByte<T[number]> extends never? never:T;
export type T_VerifyHex<T extends string>=T extends `0x${infer U}`? T_MapValidHex<T_SplitIntoGroups<U,string>>["length"] extends 8? T:never:never;
export type T_Playlist<T>={playlist: T;};
export type T_Replace<T extends string,S extends string,R extends string>=T extends `${S}${infer N}`? `${R}${T_Replace<N,S,R>}`:T extends `${infer B}${S}${infer N}`? `${B}${R}${T_Replace<N,S,R>}`:T;
export type T_Results<T>={results: T;};
export type T_ResultsArray<T>={
	results: T[];
	trackingParams: string;
};
export type T_RidFormat<T extends string>=`${T}_rid`;
export type T_SecondaryResults<T>={secondaryResults: T;};
export type T_ShortsSurfaceIdentifier<T>={
	surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
	tag: T;
};
export type T_Signal<T>=Record<"signal",T>;
export type T_SplitIntoGroups<S extends string,D extends string>=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${infer X extends D}${infer U}`? [`${T}${X}`,...T_SplitIntoGroups<U,D>]:
	[S]
	;
;
export type T_SplitOnce_Helper<S extends string,D extends string>=S extends `${infer T}${D}${infer U}`? string extends U? never:[T,U]:[S];
export type T_SplitOnce_Helper2<S extends string,D extends string>=S extends `${infer T}${D}${infer U}`? [T,U]:[S];
export type T_SplitOnce<S extends string,D extends string>=string extends S?
	[string]|[string,string]:S extends ''? []:T_SplitOnce_Helper2<S,D>;
export type T_StyleType<T>={styleType: T;};
export type T_TargetIdStr<T extends string,U extends string>=`${T}-${U}`;
export type T_Text<T>={text: T;};
export type T_TextRuns<T>={runs: T;};
export type T_TrackingParamsAsString<T,V extends string>=V extends "trackingParams"? string:T;
export type T_Types<T extends number>={types: `${T}`;};
export type T_UnionToPartial<T>=NS_UnionToPartial.UnionToPartial<T>;
export type T_UrlWrappedValue<T extends string>={privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: T;};
export type T_VideoIdStr<T>=T extends string? T_Split<T,"">["length"] extends 11? T:never:never;
export type T_WCM_={
	url?: string;
	webPageType?: YtPageTypeEnum;
	apiUrl?: string;
	sendPost?: boolean;
	rootVe?: D_RootVisualElementType;
};
// path,map_entry_values,map_entry_key_path,map_keys,root
export type T_ParseCallbackFunction<T extends CF_L_Params>=(
	root: T,
	path: CF_P_ParamParse,
	map_entry_values: V_ParamMapValue[],
	map_entry_key_path: number[],
	map_keys: number[],
	is_debug_enabled: boolean,
) => boolean;
export type T_UserFeedbackEndpointProductSpecificValueData<K,V>={userFeedbackEndpointProductSpecificValueData: T_MapEntry<K,V>;};
//#endregion
//#region Types that modify other types
export type T_OmitKey<T,K extends keyof T>=T extends infer U? Omit<U,K>:never;
//#endregion
//#region Object conversion Templates
export type T_RemovePrefix<T,T2 extends string>={[U in keyof T as `${string&U extends `${T2}${infer U1}${infer I1}`? `${Lowercase<U1>}${I1}`:never}`]: T[U];};
//#endregion
//#region T_DC_
export type T_DC_Content<T>={trackingParams: string; contents: T[];};
export type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
export type T_DC_Content_3<SectionId_T extends string,TargetId_T extends string,T_Content>={contents: T_Content[]; trackingParams: string; sectionIdentifier: SectionId_T; targetId: TargetId_T;};
//#endregion
//#region T_Omit_
export type T_Omit_Compact_Player<T extends D_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
export type T_Omit_Compact_Video<T extends D_Omit_Compact_Video>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
//#endregion
//#region TA
export type G_CommentRepliesItem=R_Comment|R_ContinuationItem;
export type GA_Continuation_CommentRepliesItem=TA_Continuation<`comment-replies-item-${string}`,R_Comment|R_ContinuationItem>;
//#endregion
//#region TB_

export type TB_ContinuationItemMap={
	"browse-feedFEwhat_to_watch": G_BrowseFeed;
	"comments-section": G_CommentsSection;
	[x: `comment-replies-item-${string}`]: GA_Continuation_CommentRepliesItem["continuationItems"][number];
	"watch-next-feed": G_WatchNext;
	[x: `browse-feedUC${string}channels156`]: R_GridChannel|R_ContinuationItem;
	[x: D_TargetIdUuid]: R_RichItem|R_ContinuationItem;
	"engagement-panel-comments-section": R_CommentThread|R_ContinuationItem;
};
//#endregion
//#region TD_
export type TD_ContinuationItem_CE<T>={trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN"; continuationEndpoint: T;};
export type TD_GuideEntry_EntryData<T_IconType extends string>=TD_GuideEntry_Simple<T_IconType>&{entryData: R_GuideEntryData;};
export type TD_GuideEntry_Primary<T_IconType extends string>=TD_GuideEntry_Simple<T_IconType>&{isPrimary: true;};
export type TD_GuideEntry_Simple<T_IconType extends string>={navigationEndpoint: {}; icon: T_Icon<T_IconType>; trackingParams: string; formattedTitle: G_Text; accessibility: D_Accessibility;};
export type TD_GuideEntry_Tid_Primary<T_IconType extends string,Tid>=TD_GuideEntry_Primary<T_IconType>&{targetId: Tid;};
export type TD_ItemSection_2<T_ContentType,T_sectionIdentifier>={trackingParams: string; contents: T_ContentType[]; sectionIdentifier: T_sectionIdentifier;};
export type TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>={targetId: T_targetId;}&TD_ItemSection_2<T_ContentType,T_sectionIdentifier>;
export type TD_Label<T>={label: T;};
//#endregion
//#region TE_
export type EP_Key=DU_EndpointKey;
export type TE_Endpoint_1_Generic<T_Key extends PropertyKey,T_Data>={[I in T_Key]: T_Data};
export type TE_Endpoint_1<T_Key extends EP_Key,T_Data>={[I in T_Key]: T_Data};
export type TE_EndpointImpl_2<T_Key extends EP_Key,T_Data>={clickTrackingParams: string;}&{[I in T_Key]: T_Data};
export type TE_Endpoint_2<T_Key extends EP_Key,T_Data>={[K in keyof TE_EndpointImpl_2<T_Key,T_Data>]: TE_EndpointImpl_2<T_Key,T_Data>[K]};
export type TE_Endpoint_2_OptImpl<T_Key extends EP_Key,T_Data>={clickTrackingParams?: string;}&{[I in T_Key]: T_Data};
export type TE_Endpoint_2_Opt<T_Key extends EP_Key,T_Data>={[K in keyof TE_Endpoint_2_OptImpl<T_Key,T_Data>]: TE_EndpointImpl_2<T_Key,T_Data>[K]};
export type TE_Endpoint_NoTrack_3<T_Key extends EP_Key,T_Data,T_Meta>={commandMetadata: T_Meta;}&{[I in T_Key]: T_Data};
export type TE_TrackedObj_2<T_Key extends EP_Key,T_Data>={trackingParams: string;}&{[I in T_Key]: T_Data};
export type TE_Endpoint_3_Helper<T_Key extends EP_Key,T_Data,T_Meta>={clickTrackingParams: string; commandMetadata: T_Meta;}&{[K in T_Key]: T_Data};
export type TE_Endpoint_3<T_Key extends EP_Key,T_Data,T_Meta>={[K in keyof TE_Endpoint_3_Helper<T_Key,T_Data,T_Meta>]: TE_Endpoint_3_Helper<T_Key,T_Data,T_Meta>[K]};
export type TE_Endpoint_Opt_1<T_Meta>={clickTrackingParams: string; commandMetadata: T_Meta|undefined;};
export type TE_Endpoint_Opt_3<T_Key extends EP_Key,T_Data,T_Meta>={clickTrackingParams: string; commandMetadata?: T_Meta;}&{[I in T_Key]: T_Data};
export type TE_SetSetting<T_ItemId,T extends boolean,T_ClientItemId extends string>=TE_Endpoint_3<"setSettingEndpoint",T_DE_SettingItem<T_ItemId,T,T_ClientItemId>,M_SetSetting>;
//#endregion
//#region TM_
export type TM_GetByVE<T extends keyof B_VEMap>=B_VEMap[T]['CommandMetadata'];
export type TM_Gen<T>={webCommandMetadata: T;};
//#endregion
//#region T_DE_
export type T_DE_SettingItem<T_ItemId,T_V extends boolean,T_ClientItemId extends string>={settingItemId: T_ItemId; boolValue: T_V; settingItemIdForClient: T_ClientItemId;};
//#endregion
//#region T_GM
export type T_GM_PostApi_WithApiUrl<T extends string>={/**/sendPost: true; apiUrl: T;};
//#endregion
//#region T_SE
export type T_SE_Signal<T_Meta extends {webCommandMetadata: {};},T_Data>=TE_Endpoint_3<"signalServiceEndpoint",T_Data,T_Meta>;
//#endregion
//#region T_Setting
export type T_Setting_AutoNavForDesktop<T_Opt extends boolean>=TE_SetSetting<"407",T_Opt,"AUTONAV_FOR_DESKTOP">;
//#endregion
//#region T_Extract
export type T_ExtractImport<T extends string>=Extract<CF_Generated,{n: T;}>["v"];
export type T_ExtractIconType<T extends {icon: T_Icon<U>;},U extends string=T["icon"]["iconType"]>=U;
export type T_NumArrStr<T extends string>=T extends `${infer U extends number},${infer A extends number},${infer X}`? [U,A,...T_NumArrStr<X>]:T extends `${infer U extends number},${infer X}`? [U,...T_NumArrStr<X>]:T extends `${infer U extends number}`? [U]:never;
export type T_NumArrStrVerify<T extends string,C extends string="">=C extends ''? T extends `${number},${number},${infer X}`? T_NumArrStrVerify<T,X>:C extends ''? `${T}`:`${T},${C}`:C extends `${number},${number},${infer X}`? T_NumArrStrVerify<T,X>:T;
export type T_NumRange<T,U>=NS_NumRange.NumRange<T,U>;
//#endregion
//#region Check if the passed in type meets certain conditions
export type TCmp_Is_Endpoint_3<T extends TE_Endpoint_3<any,any,any>>=T;
export type TCmp_Is_Endpoint_2<T extends TE_Endpoint_2<any,any>>=T;
//#endregion
//#region TR_
export type TR_SectionListItem_3_Empty=TR_ItemSection_3<{},{},{}>;
export type TR_MultiPageMenuSection<T>={multiPageMenuSectionRenderer: T_TrackedItems<T>;};
export type TR_ContinuationItem_CE<T>={continuationItemRenderer: TD_ContinuationItem_CE<T>;};
export type TR_ItemSection_2<CType,T>={itemSectionRenderer: TD_ItemSection_2<CType,T>;};
export type TD_ItemSection_1<T_ContentType>={trackingParams: string; contents: T_ContentType[];};
export type TR_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>={itemSectionRenderer: TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>;};
export type TR_ItemSection_1<T_ContentType>={itemSectionRenderer: TD_ItemSection_1<T_ContentType>;};
export type TR_SectionListItem_1<T_ContentType>=TR_ItemSection_1<T_ContentType>;
export type TR_SectionList_3<C,T,U>={sectionListRenderer: Record<"contents",TR_ItemSection_3<C,T,U>>;};
//#endregion
export type TG_SecondaryResultsItem_3<A,B,C>=[
	R_RelatedChipCloud,
	TR_ItemSection_3<A,B,C>
][number];
export type TM_Visibility=T_Types<12|14|15>;
export type TP_Color<T extends T_IsColorHelper<T,U>,U extends string>=T;

export type TP_KeyofSearchParams<T extends string>=T extends `${infer U}=${string}&${infer Z}`? [U,...TP_KeyofSearchParams<Z>]:T extends `${infer U}=${string}`? [U]:[];

export type TP_ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {[V in U]: DecodeUriComponent<C>;}:T;

export type TP_ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`? TP_ParseUrlValue<U>&TP_ParseUrlItems<Z>:T extends `${infer U}`? TP_ParseUrlValue<U>:never;
export type TP_ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? string extends V? {[U in string]?: string;}:TP_ParseUrlItems<V>:T extends `${infer V}`? TP_ParseUrlItems<V>:never;
export type Map_UriDecode={
	// not alphanumeric
	"%20": " ";
	"%22": '"';
	"%25": "%";
	"%3C": "<";
	"%3E": ">";
	"%5B": "[";
	"%5C": "\\";
	"%5D": "]";
	"%5E": "^";
	"%60": "`";
	"%7B": "{";
	"%7C": "|";
	"%7D": "}";
	// Reserved Characters
	// ;/?:@&=+$,#
	"%3B": ";";
	"%2F": "/";
	"%3F": "?";
	"%3A": ":";
	"%40": "@";
	"%26": "&";
	"%3D": "=";
	"%2B": "+";
	"%24": "$";
	"%2C": ",";
	"%23": "#";
};
export type DecodeUriComponent_all_1<T extends string>=T extends ""? T:[{[U in keyof Map_UriDecode]: T extends `${U}${string}`? Map_UriDecode[U]:never}[keyof Map_UriDecode]] extends [never]? T:{[U in keyof Map_UriDecode]: T extends `${U}${string}`? Map_UriDecode[U]:never}[keyof Map_UriDecode];
export type DecodeUriComponent_all<T extends string>=T extends `${infer M extends keyof Map_UriDecode}${infer R}`? `${DecodeUriComponent_all_1<M>}${R}`:T extends `%${infer M2}${infer M3}${infer R}`? `${DecodeUriComponent_all_1<`%${M2}${M3}`>}${DecodeUriComponent_all<R>}`:T extends `${infer B}%${infer M2}${infer M3}${infer R}`? `${B}${DecodeUriComponent_all_1<`%${M2}${M3}`>}${DecodeUriComponent_all<R>}`:T;
export type DecodeUriComponent<T extends string>=Join<DecodeUriComponentEach_Init<T_Split<T,"%">>,"">;
export type Do_Dec=DecodeUriComponent<"%5Bab%5D%5Bab%5D">;
export type TMP_UrP1=T_Split<D_FormatItem_SignatureCipher_SP,"&">[2];
export type DoDec3=T_Split<T_Split<TMP_UrP1,"=">[1],"%">;
export type DecodeUriComponentEach<T extends string[]>=
	T extends []? []:
	T extends [infer F extends string]? [DecodeUriComponent_all<`%${F}`>]:
	T extends [infer F extends string,...infer R extends string[]]? DecodeUriComponentEach<R> extends infer R2 extends string[]? [DecodeUriComponent_all<`%${F}`>,...R2]:never:T;
export type DecodeUriComponentEach_Init<T extends string[]>=T extends [infer S,...infer R extends string[]]? [S,...DecodeUriComponentEach<R>]:T;
export type DoDec4=Join<DecodeUriComponentEach_Init<DoDec3>,"">;
export type DoDec2=DecodeUriComponent_all_1<"=">;
export type T_EncodeUriComponent<T extends string>=T;
export type Map_UriComponentEncode={
	// not alphanumeric
	" ": "%20";
	'"': "%22";
	"%": "%25";
	"<": "%3C";
	">": "%3E";
	"[": "%5B";
	"\\": "%5C";
	"]": "%5D";
	"^": "%5E";
	"`": "%60";
	"{": "%7B";
	"|": "%7C";
	"}": "%7D";
	// Reserved Characters
	// ;/?:@&=+$,#
	";": "%3B";
	"/": "%2F";
	"?": "%3F";
	":": "%3A";
	"@": "%40";
	"&": "%26";
	"=": "%3D";
	"+": "%2B";
	"$": "%24";
	",": "%2C";
	"#": "%23";
};
export type TRS_Actions={
	responseContext: RC_ResponseContext;
	actions: G_ResponseActions[];
};

export type T_MaybeTemplatedText<T>={
	text: T;
	isTemplated: false;
	trackingParams: string;
};
//#region split tools
export type T_Split_Helper<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}${D}${infer X}`?
	[T,U,...T_Split_Helper<X,D>]:
	S extends `${infer T}${D}${infer U}`?
	[T,...T_Split_Helper<U,D>]:
	[S]
	;
;
export type T_Split<S extends string,D extends string=",">=
	string extends S? string[]:
	S extends ''? []:
	S extends `${infer T}${D}${infer U}`? U extends ""? [T,""]:
	T_Split_Helper<S,D>:T_Split_Helper<S,D>
	;
;
//#endregion
export type T_VW<T>=T_PArr_1<[T_Param_Child<T,["string",string]>]>;
export type T_VW2<T,S extends string>=T_PArr_1<[T_Param_Child<T,["string",S]>]>;
export type T_Param_Child<T,U extends V_RawValue=["string",string]>=[type: "v_child",binary_arr: Uint8Array,obj: T,raw_value: U];
export type T_PArr_1<T extends [any]>=["v_param_arr",T];
export type T_PArr_R<T extends any[]>=["v_param_arr",T];
