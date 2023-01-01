import {ConfirmDialogRenderer} from "../support/yt_api/_/c/ConfirmDialogRenderer.js";
import {MultiPageMenuRenderer} from "./MultiPageMenuRenderer.js";

export type OpenPopupAction={
	popup: MultiPageMenuRenderer|ConfirmDialogRenderer;
	popupType: PopupTypeList[number];
};
type PopupTypeList=[
	"DROPDOWN",
	"DIALOG",
	"TOAST",
	"TOP_ALIGNED_DIALOG",
];