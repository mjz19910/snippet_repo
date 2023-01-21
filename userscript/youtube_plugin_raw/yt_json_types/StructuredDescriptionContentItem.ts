type StructuredDescriptionContentItem=[
	ExpandableVideoDescriptionBodyRenderer,
	HorizontalCardListRenderer,
	VideoDescriptionHeaderRenderer,
	VideoDescriptionMusicSectionRenderer,
][number];
type HorizontalCardList={
	cards: MacroMarkersListItemRenderer[];
	trackingParams: string;
	header: {
		richListHeaderRenderer: {
			title: D$SimpleText;
			trackingParams: string;
			navigationButton: R$ButtonRenderer;
		};
	};
	style: {
		type: "HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION";
	};
	centerItems: false;
};

type HorizontalCardListRenderer={
	horizontalCardListRenderer: HorizontalCardList;
};