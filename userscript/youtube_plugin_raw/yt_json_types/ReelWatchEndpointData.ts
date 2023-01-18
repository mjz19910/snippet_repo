type ReelWatchEndpointData={
	videoId?: string;
	playerParams: string;
	thumbnail?: Thumbnail;
	overlay: ReelPlayerOverlayRenderer;
	params: string;
	sequenceProvider?: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";
	sequenceParams?: string;
	inputType?: "REEL_WATCH_INPUT_TYPE_SEEDLESS";
};