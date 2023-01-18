type AllPopups=MultiPageMenuRenderer|ConfirmDialogRenderer|NotificationActionRenderer;

type OpenPopupActionData={
	popup: AllPopups;
	popupType: PopupTypeList;
};
type PopupTypeList=[
	"DROPDOWN",
	"DIALOG",
	"TOAST",
	"TOP_ALIGNED_DIALOG",
][number];