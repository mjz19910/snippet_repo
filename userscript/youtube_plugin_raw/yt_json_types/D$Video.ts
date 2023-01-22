type D$Video=Video$VideoId;
type Video$VideoId={
	videoId: string;
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	descriptionSnippet: D$TextWithRuns;
	longBylineText: D$TextWithRuns;
	publishedTimeText: D$SimpleText;
	lengthText: D$SimpleText;
	viewCountText: D$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	ownerBadges: R$MetadataBadgeRenderer[];
	ownerText: D$TextWithRuns;
	shortBylineText: D$TextWithRuns;
	trackingParams: string;
	showActionMenu: false;
	shortViewCountText: D$SimpleText;
	menu: R$Menu;
	channelThumbnailSupportedRenderers: {
		channelThumbnailWithLinkRenderer: {
			thumbnail: D$Thumbnail;
			navigationEndpoint: E$BrowseEndpoint;
			accessibility: A$Accessibility;
			title: string;
		};
	};
	thumbnailOverlays: R$ThumbnailOverlayTimeStatus[];
	richThumbnail: {
		movingThumbnailRenderer: {
			movingThumbnailDetails: D$Thumbnail;
			enableHoveredLogging: true;
			enableOverlay: true;
		};
	};
	inlinePlaybackEndpoint: E$WatchEndpoint;
	owner: {
		thumbnail: D$Thumbnail;
		navigationEndpoint: E$BrowseEndpoint;
		accessibility: A$Accessibility;
		title: string;
	};
};