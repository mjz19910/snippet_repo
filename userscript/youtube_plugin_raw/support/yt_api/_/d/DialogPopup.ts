import {ConfirmDialogRenderer} from "../n/ConfirmDialogRenderer.js";
import {AboutThisAdRendererPopup} from "./AboutThisAdRendererPopup";

export type DialogPopup={
	popup: ConfirmDialogRenderer|AboutThisAdRendererPopup;
	popupType: "DIALOG";
};
