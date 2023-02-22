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
type T_MenuPopup_RD<T>=T_OpenPopup_ReuseableDropdown<TR_MultiPageMenu<T>>;
type T_OpenPopup_Dialog<T>={popup: T; popupType: "DIALOG";};
type T_OpenPopup_Dropdown<T>={popupType: "DROPDOWN"; popup: T;};
type T_OpenPopup_ReuseableDialog<T>={popup: T; popupType: "DIALOG"; beReused: boolean;};
type T_OpenPopup_ReuseableDropdown<T>={popup: T; popupType: "DROPDOWN"; beReused: true;};
type T_OpenPopup_Toast<T>={popupType: "TOAST"; popup: T;};
type T_OpenPopup_TopAlignedDialog<T>={popupType: "TOP_ALIGNED_DIALOG"; popup: T;};
//#endregion
//#endregion
//#region Actions
type A_ClientSignal=TA_OpenPopup<Popup_ClientSignal>;
type A_ConfirmDialog=TA_OpenPopup<Popup_ConfirmDialog>;
type A_FancyDismissibleDialog=TA_OpenPopup<Popup_DismissibleDialog>;
type A_GetAccountMenu=TA_OpenPopup<Popup_GetAccountMenu>;
type A_GetNotificationsMenu=TA_OpenPopup<Popup_GetNotificationsMenu>;
type A_GetSystemMenu=TA_OpenPopup<Popup_SystemMenu>;
type A_NotificationMenuPopup=TA_OpenPopup<Popup_NotificationMenu>;
type A_NotificationToast=TA_OpenPopup<Popup_NotificationToast>;
type A_PdgBuyFlow=TA_OpenPopup<R_PdgBuyFlow>;
type A_ShareEntityService=TA_OpenPopup<Popup_ShareEntityService>;
type G_OpenPopup_All=
	|A_GetSystemMenu
	|A_ConfirmDialog
	|A_ShareEntityService
	|A_FancyDismissibleDialog
	|A_GetAccountMenu
	|A_GetNotificationsMenu
	|A_ClientSignal
	|A_NotificationMenuPopup
	|A_NotificationToast
	|A_PdgBuyFlow
	;
;
//#endregion
//#region Popup_
type Popup_ConfirmDialog=T_OpenPopup_Dialog<R_ConfirmDialog>;
type Popup_DismissibleDialog=T_OpenPopup_Dialog<R_FancyDismissibleDialog>;
type Popup_GetAccountMenu=T_OpenPopup_ReuseableDropdown<R_AccountMenu>;
type Popup_GetNotificationsMenu=T_OpenPopup_ReuseableDropdown<R_GetNotificationsMenu>;
type Popup_MenuPopup=T_OpenPopup_Dropdown<R_MenuPopup>;
type Popup_NotificationMenu=T_OpenPopup_Dropdown<R_NotificationMenu>;
type Popup_NotificationToast=T_OpenPopup_Toast<RA_Notification>;
type Popup_ShareEntityService=T_OpenPopup_ReuseableDialog<R_UnifiedSharePanel>;
type Popup_SystemMenu=T_OpenPopup_Dropdown<R_SystemMenu>;
//#endregion
//#region MultiPageMenu
type R_AccountMenu=TR_MultiPageMenu<MP_AccountMenu>;
type R_GetNotificationsMenu=TR_MultiPageMenu<D_NotificationMenuPopupMenuItem>;
type R_NotificationMenu=TR_MultiPageMenu<D_PopupItemMenu>;
type R_SystemMenu=TR_MultiPageMenu<MP_SystemMenu>;
type R_TopbarMenu=TR_MultiPageMenu<D_TopbarMenu>;
//#endregion
