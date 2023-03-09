type D_LivePlayerConfig={
	liveReadaheadSeconds: 1.6;
	hasSubfragmentedFmp4: true;
	isLiveHeadPlayable?: true;
};
type D_PlayerConfig={
	audioConfig: D_AudioConfig;
	playbackStartConfig?: D_StartSeconds;
	streamSelectionConfig?: D_StreamSelectionConfig;
	livePlayerConfig?: D_LivePlayerConfig;
	mediaCommonConfig: R_DynamicReadaheadConfig;
	webPlayerConfig: D_WebPlayerConfig;
};
