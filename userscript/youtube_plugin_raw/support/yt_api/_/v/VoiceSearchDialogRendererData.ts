import {YtTextType} from "../../yt/YtTextType.js";
import {ButtonRenderer} from "../b/ButtonRenderer.js";

export type VoiceSearchDialogRendererData={
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
	exitButton: ButtonRenderer;
	microphoneOffPromptHeader: YtTextType;
};
