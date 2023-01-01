type EndscreenElementRendererData={
	style: "VIDEO"|"CHANNEL";
	image: {},
	left: number,
	width: number,
	top: number,
	aspectRatio: number,
	startMs: `${number}`,
	endMs: `${number}`,
	title: {},
	metadata: {},
	endpoint: YtEndpoint,
	trackingParams: string,
	id: string;
	thumbnailOverlays: {}[];
};
