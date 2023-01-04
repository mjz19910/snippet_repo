type TabRendererData={
	content: SectionListRenderer|RichGridRenderer;
	selected: true;
	trackingParams: string;
}|{
	endpoint: YtEndpoint;
	title: string;
	trackingParams: string;
};
