type D_PlayerConfig={
	audioConfig: D_AudioConfig;
	playbackStartConfig?: D_StartSeconds;
	streamSelectionConfig?: D_StreamSelectionConfig;
	livePlayerConfig?: D_LivePlayerConfig;
	mediaCommonConfig: R_DynamicReadaheadConfig;
	webPlayerConfig: D_WebPlayerConfig;
	inlinePlaybackConfig?: D_InlinePlaybackConfig;
};
