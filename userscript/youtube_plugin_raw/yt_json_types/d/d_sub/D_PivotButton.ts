type A_AddToToast={
	clickTrackingParams: string;
	addToToastAction: AD_AddToToast;
};

type D_PivotButton={
	thumbnail?: D_Thumbnail;
	onClickCommand?: E_VE3611|A_AddToToast;
	trackingParams?: string;
	contentDescription?: G_Text;
	soundAttributionTitle?: G_Text;
	backgroundColor?: "THEME_ATTRIBUTE_OVERLAY_BACKGROUND_MEDIUM";
	icon?: T_Icon<"WAVEFORM">;
};
