import {ConfirmDialogRenderer} from "../n/ConfirmDialogRenderer.js";
import {AboutThisAdRenderer} from "../a/AboutThisAdRenderer";

export type DialogPopup={
	popup: ConfirmDialogRenderer|{
		aboutThisAdRenderer: AboutThisAdRenderer;
	};
	popupType: "DIALOG";
};
