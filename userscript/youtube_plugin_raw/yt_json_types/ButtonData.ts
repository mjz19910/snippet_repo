type Button_serviceEndpoint=E$SignalServiceEndpoint|YpcGetOffersEndpoint;
type YpcGetOffers={
	params: string;
};

type YpcGetOffersEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	ypcGetOffersEndpoint: YpcGetOffers;
}
type Button_navigationEndpoint=E$ShareEntityServiceEndpoint;

type ButtonData={
	accessibility?: LabelData;
	accessibilityData?: Accessibility;
	command?: ButtonCommand;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: Button_serviceEndpoint;
	navigationEndpoint?: Button_navigationEndpoint;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	hint?: HintRenderer;
	targetId?: YtTargetIdType;
};