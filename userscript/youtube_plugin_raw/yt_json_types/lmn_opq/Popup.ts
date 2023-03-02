//#region Templates
//#region Action Templates
type TA_OpenPopup_Empty=TA_OpenPopup<{}>;
type TA_OpenPopup<T_Action>=TE_Endpoint_2<"openPopupAction",T_Action>;
//#endregion
//#region TR_MultiPage Templates
type TR_MultiPageMenu_Empty=TR_MultiPageMenu<{}>;
type TR_MultiPageMenu<T>={multiPageMenuRenderer: T;};
//#endregion
//#region T_OpenPopup
type T_MenuPopup_RD<T>=T_OpenPopup_Dropdown<TR_MultiPageMenu<T>>;
type T_OpenPopup_Dropdown<T>={popupType: "DROPDOWN"; popup: T; beReused?: true;};
type T_OpenPopup_Dialog<T>={popup: T; popupType: "DIALOG"; beReused?: true;};
type T_OpenPopup_Toast<T>={popupType: "TOAST"; popup: T;};
type T_OpenPopup_TopAlignedDialog<T>={popupType: "TOP_ALIGNED_DIALOG"; popup: T;};
//#endregion
//#endregion
//#region Actions
type A_AboutThisAd=TA_OpenPopup<Popup_DL_AboutThisAd>;
type A_ClientSignal=TA_OpenPopup<Popup_ClientSignal>;
type A_ConfirmDialog=TA_OpenPopup<Popup_DL_ConfirmDialog>;
type A_FancyDismissibleDialog=TA_OpenPopup<Popup_DL_DismissibleDialog>;
type A_GetAccountMenu=TA_OpenPopup<Popup_DD_GetAccountMenu>;
type A_GetNotificationsMenu=TA_OpenPopup<Popup_DD_GetNotificationsMenu>;
type A_GetSystemMenu=TA_OpenPopup<Popup_DD_SystemMenu>;
type A_NotificationMenuPopup=TA_OpenPopup<Popup_DD_NotificationMenu>;
type A_NotificationToast=TA_OpenPopup<Popup_TT_NotificationToast>;
type A_PdgBuyFlow=TA_OpenPopup<R_PdgBuyFlow>;
type A_ShareEntityService=TA_OpenPopup<Popup_DL_ShareEntityService>;
type G_OpenPopup_All=
	|A_AboutThisAd
	|A_ClientSignal
	|A_ConfirmDialog
	|A_FancyDismissibleDialog
	|A_GetAccountMenu
	|A_GetNotificationsMenu
	|A_GetSystemMenu
	|A_NotificationMenuPopup
	|A_NotificationToast
	|A_PdgBuyFlow
	|A_ShareEntityService
	;
;

//#endregion
//#region Popup_
type Popup_ClientSignal=
	|Popup_DL_ConfirmDialog
	|Popup_TT_NotificationToast
	|Popup_TAD_VoiceSearch
	;
;
type Popup_DD_GetAccountMenu=T_OpenPopup_Dropdown<R_AccountMenu>;
type Popup_DD_GetNotificationsMenu=T_OpenPopup_Dropdown<R_GetNotificationsMenu>;
type Popup_DD_MenuPopup=T_OpenPopup_Dropdown<R_MenuPopup>;
type Popup_DD_NotificationMenu=T_OpenPopup_Dropdown<R_NotificationMenu>;
type Popup_DD_NotificationsMenu=T_OpenPopup_Dropdown<R_NotificationsMenu>;
type Popup_DD_SystemMenu=T_OpenPopup_Dropdown<R_SystemMenu>;
type Popup_DL_AboutThisAd=T_OpenPopup_Dialog<R_AboutThisAd>;
type Popup_DL_ConfirmDialog=T_OpenPopup_Dialog<R_ConfirmDialog>;
type Popup_DL_DismissibleDialog=T_OpenPopup_Dialog<R_FancyDismissibleDialog>;
type Popup_DL_ShareEntityService=T_OpenPopup_Dialog<R_UnifiedSharePanel>;
type Popup_TAD_VoiceSearch=T_OpenPopup_TopAlignedDialog<R_VoiceSearchDialog>;
type Popup_TT_NotificationToast=T_OpenPopup_Toast<RA_Notification>;
// {popup:TR_MultiPageMenu<MP_AccountMenu|MP_NotificationsMenu>;popupType:"DROPDOWN";}
type G_Popup_All=
	|Popup_DD_GetAccountMenu
	|Popup_DD_GetNotificationsMenu
	|Popup_DD_MenuPopup
	|Popup_DD_NotificationMenu
	|Popup_DD_NotificationsMenu
	|Popup_DD_SystemMenu
	|Popup_DL_AboutThisAd
	|Popup_DL_ConfirmDialog
	|Popup_DL_DismissibleDialog
	|Popup_DL_ShareEntityService
	|Popup_TAD_VoiceSearch
	|Popup_TT_NotificationToast
	;
;
//#endregion
//#region MultiPageMenu
type R_AccountMenu=TR_MultiPageMenu<MP_AccountMenu>;
type R_GetNotificationsMenu=TR_MultiPageMenu<MP_GetNotificationMenu>;
type R_NotificationMenu=TR_MultiPageMenu<MP_NotificationMenu>;
type R_NotificationsMenu=TR_MultiPageMenu<MP_NotificationsMenu>;
type R_SystemMenu=TR_MultiPageMenu<MP_SystemMenu>;
type R_TopbarMenu=TR_MultiPageMenu<MP_TopbarMenu>;
//#endregion
//#region MultiPageMenu Renderer Data
type T_MP_SG<T extends string>=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",T>;
type S_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE","NOTIFICATIONS"|"ACCOUNT"|"CREATION">;
type T_LoadingMenu<T_Style extends S_MenuStyle>={trackingParams: string; style: T_Style; showLoadingSpinner: true;};
type T_BaseMenu<T_Style extends S_MenuStyle>={trackingParams: string; style: T_Style;};
type MP_AccountMenu=T_LoadingMenu<"MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT">;
type MP_SystemMenu={trackingParams: string; style: T_MP_SG<"SYSTEM">; header: R_ActiveAccountHeader; sections: TR_MultiPageMenu<R_MultiPageMenuSection>[];};
type MP_GetNotificationMenu=T_LoadingMenu<T_MP_SG<"NOTIFICATIONS">>;
type MP_NotificationMenu=T_BaseMenu<T_MP_SG<"NOTIFICATIONS">>&{header: R_SimpleMenuHeader; sections: D_NotificationMenu_SectionItem[];};
type MP_TopbarMenu=T_BaseMenu<T_MP_SG<"CREATION">>&{sections: [TR_MultiPageMenuSection<R_CompactLink>];};
//#endregion
//#region Popup Renderer Data
//#endregion
