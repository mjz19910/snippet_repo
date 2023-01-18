type UnifiedSharePanel={
	trackingParams: string;
	showLoadingSpinner: true;
};

type UnifiedSharePanelRenderer={
	unifiedSharePanelRenderer: UnifiedSharePanel;
};

type OpenPopupActionData={
	popup: AllPopups;
	popupType: PopupTypeList;
}|{
	popup: UnifiedSharePanelRenderer;
	popupType: "DIALOG";
	beReused: true;
};