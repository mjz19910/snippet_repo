import {DialogPopup} from "../d/DialogPopup.js";
import {ToastPopupTag} from "../t/ToastPopupTag";
import {DropdownPopup} from "../d/DropdownPopup";
import {YtTextType} from "../s/YtTextType.js";

export type VoicePopup={
	voiceSearchDialogRenderer: {
		placeholderHeader: YtTextType;
		promptHeader: YtTextType;
	};
};

export type OpenPopupAction=ToastPopupTag|DropdownPopup|DialogPopup|{
	popupType: "TOP_ALIGNED_DIALOG";
	popup: VoicePopup;
};
