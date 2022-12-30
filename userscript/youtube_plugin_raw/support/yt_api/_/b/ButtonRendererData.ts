import {Accessibility} from "../a/Accessibility.js";
import {ServiceEndpoint} from "../a/ActionSetPlaylistVideoOrder.js";
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
};

export type OptButtonData={
	icon?: {};
	tooltip?: {};
	clickTrackingParams?: string;
};