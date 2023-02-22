//#region Templates
type TR_MultiPageMenu_Empty=TR_MultiPageMenu<{}>;
type TR_MultiPageMenu<T>={multiPageMenuRenderer: T;};
//#endregion
//#region MultiPageMenu
type R_TopbarMenu=TR_MultiPageMenu<D_TopbarMenu>;
type R_PopupItemMenu=TR_MultiPageMenu<D_PopupItemMenu>;
type R_AccountMenu=TR_MultiPageMenu<MP_AccountMenu|MP_AccountMenu_2>;
//#endregion
