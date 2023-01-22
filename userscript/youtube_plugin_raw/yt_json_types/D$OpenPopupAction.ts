type D$OpenPopupAction={
	popup: AllPopups;
	popupType: PopupTypeList;
}|{
	popup: UnifiedSharePanelRenderer;
	popupType: "DIALOG";
	beReused: true;
};