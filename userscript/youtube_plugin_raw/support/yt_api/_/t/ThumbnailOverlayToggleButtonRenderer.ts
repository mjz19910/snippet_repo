type ThumbnailOverlayToggleButtonRenderer={
	isToggled?: boolean;
	untoggledIcon: Icon<never>;
	toggledIcon: Icon<never>;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: UntoggledServiceEndpoint;
	toggledServiceEndpoint?: ToggledServiceEndpoint;
	untoggledAccessibility: Accessibility;
	toggledAccessibility: Accessibility;
	trackingParams: string;
};
