import {ConfirmDialogRenderer} from "../c/ConfirmDialogRenderer.js";
import {MultiPageMenuRenderer} from "../m/MultiPageMenuRenderer.js";

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