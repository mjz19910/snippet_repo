type UnifiedSharePanel={
	trackingParams: string;
	showLoadingSpinner: true;
};

type UnifiedSharePanelRenderer={
	unifiedSharePanelRenderer: UnifiedSharePanel;
};

type PopupTypeMap={
	DIALOG: [{
		popup: UnifiedSharePanelRenderer;
		popupType: "DIALOG";
		beReused: true;
	}];
}

type OpenPopupActionData={
	popup: AllPopups;
	popupType: PopupTypeList;
}|{
	popup: UnifiedSharePanelRenderer;
	popupType: "DIALOG";
	beReused: true;
};