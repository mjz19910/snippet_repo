import {ConfirmDialogPopup} from "../n/ConfirmDialogPopup.js";
import {AboutThisAdRendererPopup} from "./AboutThisAdRendererPopup";

export type DialogPopup={
	popup: ConfirmDialogPopup|AboutThisAdRendererPopup;
	popupType: "DIALOG";
};
