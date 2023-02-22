//#region T_OpenPopup
type T_MenuPopup<T>=T_OpenPopup_ReuseableDropdown<TR_MultiPageMenu<T>>;
type T_OpenPopup_Dialog<T>={popup: T; popupType: "DIALOG";};
type T_OpenPopup_Dropdown<T>={popupType: "DROPDOWN"; popup: T;};
type T_OpenPopup_ReuseableDialog<T>={popup: T; popupType: "DIALOG"; beReused: boolean;};
type T_OpenPopup_ReuseableDropdown<T>={popup: T; popupType: "DROPDOWN"; beReused: true;};
type T_OpenPopup_Toast<T>={popupType: "TOAST"; popup: T;};
type T_OpenPopup_TopAlignedDialog<T>={popupType: "TOP_ALIGNED_DIALOG"; popup: T;};
//#endregion
//#region Popup_
type Popup_AccountMenu=T_OpenPopup_Dropdown<R_AccountMenu>;
type Popup_ConfirmDialog=T_OpenPopup_Dialog<R_ConfirmDialog>;
type Popup_DismissibleDialog=T_OpenPopup_Dialog<R_FancyDismissibleDialog>;
type Popup_GetAccountMenu=T_OpenPopup_ReuseableDropdown<R_AccountMenu>;
type Popup_GetNotificationsMenu=T_OpenPopup_ReuseableDropdown<P_NotificationMenu_Popup>;
type Popup_NotificationMenu=T_OpenPopup_Dropdown<R_PopupItemMenu>;
type Popup_NotificationToast=T_OpenPopup_Toast<RA_Notification>;
type Popup_ShareEntityService=T_OpenPopup_ReuseableDialog<R_UnifiedSharePanel>;
//#endregion
