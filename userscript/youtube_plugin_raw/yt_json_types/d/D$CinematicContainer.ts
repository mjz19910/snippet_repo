type D_CinematicContainer={
	backgroundImageConfig?: R_ThumbnailsList;
	gradientColorConfig: D_GradientColorConfig;
	presentationStyle?: "CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED";
	config: {
		lightThemeBackgroundColor: 4278190080;
		darkThemeBackgroundColor: 4278190080;
		animationConfig: {
			minImageUpdateIntervalMs: 5000;
			crossfadeDurationMs: 5000;
			crossfadeStartOffset: 1;
			maxFrameRate: 30;
		};
		colorSourceSizeMultiplier: 1.4;
		applyClientImageBlur: true;
		bottomColorSourceHeightMultiplier: 0.67000002;
		maxBottomColorSourceHeight: 260;
		colorSourceWidthMultiplier: 1.5;
		colorSourceHeightMultiplier: 2;
		blurStrength: 5;
	};
};