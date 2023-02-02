type Popup_ConfirmDialog={popup: R_ConfirmDialog; popupType: "DIALOG";};
type Popup_DismissibleDialog={popup: R_FancyDismissibleDialog; popupType: "DIALOG";};
type D_FancyDismissibleDialog={
	dialogMessage: G_Text;
	confirmLabel: G_Text;
	trackingParams: string;
};

type R_FancyDismissibleDialog={fancyDismissibleDialogRenderer: D_FancyDismissibleDialog;};
