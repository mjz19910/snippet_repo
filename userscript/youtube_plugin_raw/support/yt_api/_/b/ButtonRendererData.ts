import {Accessibility} from "../a/Accessibility.js";
import {GeneralCommand} from "../g/GeneralCommand.js";
import {Icon} from "../i/Icon.js";
import {YtTextType} from "../s/YtTextType.js";
import {YtEndpoint} from "./YtEndpoint.js";

export type ButtonRendererData={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: YtEndpoint;
	trackingParams: string;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: YtEndpoint;
	trackingParams: string;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: ButtonRendererIconTypes;
	navigationEndpoint: YtEndpoint;
	tooltip: string;
	trackingParams: string;
	accessibilityData: Accessibility;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: ButtonRendererIconTypes;
	trackingParams: string;
	accessibilityData: Accessibility;
};

type ButtonRendererIconTypes=Icon<"SETTINGS">;

export type OptButtonData={
	clickTrackingParams?: string;
};
