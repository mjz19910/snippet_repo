type TabData={
	content: SectionListRenderer<never,never>|RichGridRenderer;
	selected: true;
	trackingParams: string;
}|{
	endpoint: {};
	title: string;
	trackingParams: string;
};
