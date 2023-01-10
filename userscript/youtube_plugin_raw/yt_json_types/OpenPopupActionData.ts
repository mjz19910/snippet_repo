type OpenPopupActionData={
	popup: MultiPageMenuRenderer|ConfirmDialogRenderer|NotificationActionRenderer;
	popupType: PopupTypeList;
};
type PopupTypeList=[
	"DROPDOWN",
	"DIALOG",
	"TOAST",
	"TOP_ALIGNED_DIALOG",
][number];