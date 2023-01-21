type VideoPrimaryInfoData={
	title: D$TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: MenuRenderer;
	trackingParams: string;
	badges?: MetadataBadgeRenderer[];
	dateText: D$SimpleText;
	relativeDateText: D$SimpleText;
};