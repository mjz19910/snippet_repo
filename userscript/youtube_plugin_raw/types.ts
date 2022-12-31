import {Accessibility} from "./support/yt_api/_/a/Accessibility.js";
import {YtEndpoint} from "./support/yt_api/_/b/YtEndpoint.js";
import {GeneralCommand} from "./support/yt_api/_/g/GeneralCommand.js";
import {YtTextType} from "./support/yt_api/_/s/YtTextType.js";

export type ButtonType_0={
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; serviceEndpoint: YtEndpoint;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; serviceEndpoint: YtEndpoint;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; accessibilityData: Accessibility; command: GeneralCommand;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; navigationEndpoint: YtEndpoint; accessibilityData: Accessibility; command: GeneralCommand;
}|{
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; icon: {iconType: "SETTINGS";}; navigationEndpoint: YtEndpoint; tooltip: string; accessibilityData: Accessibility;
}|{
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; icon: {iconType: "SETTINGS";}; accessibilityData: Accessibility;
}|{
	command: YtEndpoint;
};
export type ButtonType_2={
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; serviceEndpoint: YtEndpoint;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; serviceEndpoint: YtEndpoint;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; accessibilityData: Accessibility; command: GeneralCommand;
}|{
	style: "STYLE_SUGGESTIVE"; size: "SIZE_DEFAULT"; isDisabled: boolean; text: YtTextType; navigationEndpoint: YtEndpoint; accessibilityData: Accessibility; command: GeneralCommand;
}|{
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; icon: {iconType: "SETTINGS";}; navigationEndpoint: YtEndpoint; tooltip: string; accessibilityData: Accessibility;
}|{
	style: "STYLE_DEFAULT"; size: "SIZE_DEFAULT"; isDisabled: boolean; icon: {iconType: "SETTINGS";}; accessibilityData: Accessibility;
};