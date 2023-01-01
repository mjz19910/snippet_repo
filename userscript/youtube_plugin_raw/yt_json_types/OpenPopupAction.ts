type OpenPopupAction={
	popup: MultiPageMenuRenderer|ConfirmDialogRenderer;
	popupType: PopupTypeList[number];
};
type PopupTypeList=[
	"DROPDOWN",
	"DIALOG",
	"TOAST",
	"TOP_ALIGNED_DIALOG",
];