import {DialogPopup} from "../d/DialogPopup.js";
import {ToastPopupTag} from "../t/ToastPopupTag";
import {DropdownPopup} from "../d/DropdownPopup";
import {VoiceSearchDialogRenderer} from "./VoiceSearchDialogRenderer";

export type OpenPopupAction=ToastPopupTag|DropdownPopup|DialogPopup|{
	popupType: "TOP_ALIGNED_DIALOG";
	popup: VoiceSearchDialogRenderer;
};
