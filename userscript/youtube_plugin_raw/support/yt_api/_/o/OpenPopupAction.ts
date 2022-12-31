import {ConfirmDialogRenderer} from "../ConfirmDialogRenderer";
import {MultiPageMenuRenderer} from "./MultiPageMenuRenderer";

export type OpenPopupAction={
	popup: MultiPageMenuRenderer;
	popupType: "DROPDOWN";
}|{
	popup: ConfirmDialogRenderer;
	popupType: "DIALOG";
};
