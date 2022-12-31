import {Accessibility} from "../a/Accessibility.js";
import {GeneralCommand} from "../g/GeneralCommand.js";
import {Icon} from "../i/Icon.js";
import {YtTextType} from "../s/YtTextType.js";
import {YtEndpoint} from "./YtEndpoint.js";

type Default_0={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: YtEndpoint;
	trackingParams: string;
};

type Suggestive_0={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	serviceEndpoint: YtEndpoint;
	trackingParams: string;
};

type Suggestive_1={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
};

type Suggestive_2={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
	accessibilityData: Accessibility;
	command: GeneralCommand;
};

type Default_1={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: ButtonRendererIconTypes;
	navigationEndpoint: YtEndpoint;
	tooltip: string;
	trackingParams: string;
	accessibilityData: Accessibility;
};

type Default_2={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: ButtonRendererIconTypes;
	trackingParams: string;
	accessibilityData: Accessibility;
};

export type NoStyleButtonTypes_={
	trackingParams: string;
	command: YtEndpoint;
};

export type SuggestiveButtonTypes=Suggestive_0|Suggestive_1|Suggestive_2;

type Default_3={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: YtTextType;
	trackingParams: string;
	command: YtEndpoint;
};

export type DefaultButtonTypes=Default_0|Default_1|Default_2|Default_3;

export type ButtonRendererData=DefaultButtonTypes|SuggestiveButtonTypes|NoStyleButtonTypes_;

type ButtonRendererIconTypes=Icon<"SETTINGS">;

export type OptButtonData={
	clickTrackingParams?: string;
};
