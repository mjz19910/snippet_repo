import {Accessibility} from "../a/Accessibility.js";
import {ServiceEndpoint} from "../a/ServiceEndpoint";
import {GeneralCommand} from "../g/GeneralCommand.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {SimpleText} from "../s/SimpleText.js";
import {TextRuns} from "../t/TextRuns.js";

export type ButtonRendererData={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns|SimpleText;
	serviceEndpoint: ServiceEndpoint;
	trackingParams: string;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns|SimpleText;
	serviceEndpoint: ServiceEndpoint;
	trackingParams: string;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns|SimpleText;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
}|{
	style: "STYLE_SUGGESTIVE"
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns|SimpleText;
	navigationEndpoint: NavigationEndpoint;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: {};
	navigationEndpoint: NavigationEndpoint;
	tooltip: string;
	trackingParams: string;
	accessibilityData: Accessibility;
};

export type OptButtonData={
	icon?: {};
	tooltip?: {};
	clickTrackingParams?: string;
};