//#region Templates
type TR_MultiPageMenu_Empty=TR_MultiPageMenu<{}>;
type TR_MultiPageMenu<T>={multiPageMenuRenderer: T;};
//#endregion
//#region MultiPageMenu
type R_TopbarMenu=TR_MultiPageMenu<D_TopbarMenu>;
type R_PopupItemMenu=TR_MultiPageMenu<D_PopupItemMenu>;
type T_MenuPopup<T>=T_OpenPopup_ReuseableDropdown<TR_MultiPageMenu<T>>;
type R_AccountMenu=TR_MultiPageMenu<MP_AccountMenu>;
//#endregion
