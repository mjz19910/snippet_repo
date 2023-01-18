type EngagementPanelSectionListContent=[
	AdsEngagementPanelContentRenderer,
	ClipSectionRenderer,
	ContinuationItemRenderer,
	MacroMarkersListRenderer,
	ProductListRenderer,
	SectionListRendererTemplate<"comment-item-section","engagement-panel-comments-section">,
	StructuredDescriptionContentRenderer,
][number];
type ProductListItem={
	title: SimpleText;
	accessibilityTitle: string;
	thumbnail: Thumbnail;
	price: `CA$${string}`;
	onClickCommand: UrlEndpoint;
	trackingParams: string;
	loggingDirectives: {};
};

type ProductList={
	contents: {
		productListItemRenderer: ProductListItem;
	}[];
	trackingParams: string;
};

type ProductListRenderer={
	productListRenderer: ProductList;
};