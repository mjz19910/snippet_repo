type D$Radio=Radio$PlaylistId;
type R$ChildVideo={
	childVideoRenderer: {
		title: D$SimpleText;
		navigationEndpoint: E$WatchEndpoint;
		lengthText: D$SimpleText;
		videoId: string;
	};
};

type Radio$PlaylistId={
	playlistId: `RD${string}`;
	title: D$SimpleText;
	thumbnail: D$Thumbnail;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
	videos: R$ChildVideo[];
	thumbnailText: D$TextWithRuns;
	longBylineText: D$SimpleText;
	menu: R$Menu;
	thumbnailOverlays: R$ThumbnailOverlayBottomPanel[];
	videoCountShortText: D$TextWithRuns;
};
