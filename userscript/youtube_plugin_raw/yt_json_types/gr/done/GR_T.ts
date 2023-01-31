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
//#endregion
//#region Object conversion Templates
type T_RemovePrefix<T,T2 extends string>={
	[U in keyof T as `${string&U extends `${T2}${infer U1}${infer I1}`? `${Lowercase<U1>}${I1}`:never}`]: T[U];
};
//#endregion
//#region TB_
type TB_ContinuationItemMap_1={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
type TB_ContinuationItemMap={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
//#endregion
//#region TE_
type TE_Endpoint_2<EP_Key extends string,T_Data>={clickTrackingParams: string;}&{[I in EP_Key]: T_Data};
type TE_Endpoint_3<EP_Key extends `${string}${D_EndpointLikeEndings}`,T_Data,T_Meta>={clickTrackingParams: string; commandMetadata: T_Meta;}&{[K in EP_Key]: T_Data};
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
type GenNs_AllNames=import("../../../zd_gen_CF/gen_export_cur.js").Prelude.AllNames;
type T_ExtractImport_<T extends (GenNs_AllNames|import("../../../zd_gen_CF/gen_export_cur.js").Gen.CF_Generated['n'])>=
	Extract<import("../../../zd_gen_CF/gen_export_cur.js").Gen.CF_Generated,{n: T;}>["v"]
	;
type T_ExtractImport<T extends (GenNs_AllNames|import("../../../zd_gen_CF/gen_export_cur.js").Gen.CF_Generated['n'])>=T_ExtractImport_<T>;
type TA_OpenPopup_TopAlignedDialog<T>=BTA_OpenPopup_TopAligned<"DIALOG",T>;
type TA_OpenPopup_Toast<T>={popup: T; popupType: "TOAST";};
