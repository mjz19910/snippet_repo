import {ConfirmDialogRenderer} from "../c/ConfirmDialogRenderer.js";
import {AboutThisAdRendererPopup} from "./AboutThisAdRendererPopup";

export type DialogPopup={
	popup: ConfirmDialogRenderer|AboutThisAdRendererPopup;
	popupType: "DIALOG";
};
