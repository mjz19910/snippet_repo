type TabData={
	content: SectionListRenderer<never,never>|RichGridRenderer;
	selected: true;
	trackingParams: string;
}|{
	endpoint: YtEndpoint;
	title: string;
	trackingParams: string;
};
