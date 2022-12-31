import {Accessibility} from "../a/Accessibility.js";
import {ServiceEndpoint} from "../a/ServiceEndpoint";
import {GeneralCommand} from "../g/GeneralCommand.js";
import {Icon} from "../i/Icon.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {YtTextType} from "../s/YtTextType.js";

export type ButtonRendererData={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: ServiceEndpoint;
	trackingParams: string;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: ServiceEndpoint;
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
	navigationEndpoint: NavigationEndpoint;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: ButtonRendererIconTypes;
	navigationEndpoint: NavigationEndpoint;
	tooltip: string;
	trackingParams: string;
	accessibilityData: Accessibility;
};

type ButtonRendererIconTypes=Icon<"SETTINGS">;

export type OptButtonData={
	clickTrackingParams?: string;
};
