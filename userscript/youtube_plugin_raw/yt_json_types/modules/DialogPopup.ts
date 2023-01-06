import {AboutThisAdRendererPopup} from "./AboutThisAdRendererPopup.js";

export type DialogPopup={
	popup: ConfirmDialogRenderer|AboutThisAdRendererPopup;
	popupType: "DIALOG";
};
