type VideoPrimaryInfoData={
	title: D$TextWithRuns;
	viewCount: VideoViewCountRenderer;
	videoActions: R$MenuRenderer;
	trackingParams: string;
	superTitleLink?: D$TextWithRuns;
	badges?: MetadataBadgeRenderer[];
	dateText: D$SimpleText;
	relativeDateText: D$SimpleText;
};