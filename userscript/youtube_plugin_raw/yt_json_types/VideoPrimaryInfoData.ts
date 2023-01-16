type VideoPrimaryInfoData={
	title: TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: MenuRenderer;
	trackingParams: string;
	badges?: MetadataBadgeRenderer[];
	dateText: TextWithRuns;
	relativeDateText: TextWithRuns;
};