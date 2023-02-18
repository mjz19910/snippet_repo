type Popup_ConfirmDialog={popup: R_ConfirmDialog; popupType: "DIALOG";};
type Popup_DismissibleDialog={popup: R_FancyDismissibleDialog; popupType: "DIALOG";};
type Popup_NotificationMenu=T_OpenPopup_Dropdown<D_NotificationMenu_PopupItemMenu>;
type Popup_NotificationToast=T_OpenPopup_Toast<RA_Notification>;
type Popup_GetNotificationsMenu=T_OpenPopup_ReuseableDropdown<P_NotificationMenu_Popup>;
type Popup_ShareEntityService=T_OpenPopup_ReuseableDialog<R_UnifiedSharePanel>;
type D_GetAccountMenu_Popup=T_OpenPopup_ReuseableDropdown<R_MultiPageMenu_AccountMenu>;
