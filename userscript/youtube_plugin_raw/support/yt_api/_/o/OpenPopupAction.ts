import {DialogPopup} from "../d/DialogPopup.js";
import {ToastPopupTag} from "../t/ToastPopupTag";
import {DropdownPopup} from "../d/DropdownPopup";
import {YtTextType} from "../s/YtTextType.js";

export type VoicePopup={
	voiceSearchDialogRenderer: {
		trackingParams: string;
		placeholderHeader: YtTextType;
		promptHeader: YtTextType;
		exampleQuery1: YtTextType;
		exampleQuery2: YtTextType;
		promptMicrophoneLabel: YtTextType;
		loadingHeader: YtTextType;
		connectionErrorHeader: YtTextType;
		connectionErrorMicrophoneLabel: YtTextType;
		permissionsHeader: YtTextType;
		permissionsSubtext: YtTextType;
		disabledHeader: YtTextType;
		disabledSubtext: YtTextType;
		microphoneButtonAriaLabel: YtTextType;
		exitButton: YtTextType;
		microphoneOffPromptHeader: YtTextType;
	};
};

export type OpenPopupAction=ToastPopupTag|DropdownPopup|DialogPopup|{
	popupType: "TOP_ALIGNED_DIALOG";
	popup: VoicePopup;
};
