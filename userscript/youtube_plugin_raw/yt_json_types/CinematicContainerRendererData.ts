type CinematicContainerRendererData={
	backgroundImageConfig: ThumbnailsList;
	gradientColorConfig: {
		lightThemeColor: number;
		darkThemeColor: number;
		startLocation: number;
	}[];
	presentationStyle?: "CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED";
	config: PageVisualEffectsConfig;
};
