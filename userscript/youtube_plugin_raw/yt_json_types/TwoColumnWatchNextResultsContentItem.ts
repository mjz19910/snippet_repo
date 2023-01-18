type WatchResultItem=[
	ItemSectionRendererTemplate<"comment-item-section","comments-section">,
	ItemSectionRendererTemplate<"comments-entry-point",never>,
	MerchandiseShelfRenderer,
	VideoPrimaryInfoRenderer,
	VideoSecondaryInfoRenderer,
][number];
type MerchandiseShelfRenderer={
	merchandiseShelfRenderer: {
		title: "Shop the Z3Cubing store";
		items: MerchandiseItemRenderer[];
		trackingParams: string;
		showText: "Double-tap to expand";
		hideText: "Double-tap to collapse";
		actionButton: MenuRenderer;
	};
};
type MerchandiseItemRenderer={
	merchandiseItemRenderer: {
		title: "Z3Cubing Logo Sticker";
		description: string;
		thumbnail: Thumbnail;
		price: "CA$8.70";
		vendorName: "Spring";
		trackingParams: string;
		buttonText: "Shop";
		buttonCommand: {
			clickTrackingParams: string;
			commandMetadata: CommandMetadata;
			urlEndpoint: {
				url: string;
				target: "TARGET_NEW_WINDOW";
				nofollow: true;
			};
		};
		accessibilityTitle: string;
		buttonAccessibilityText: "Buy merchandise from Spring";
		fromVendorText: "From Spring";
		additionalFeesText: "+ taxes and fees";
		regionFormat: "REGIONAL_FORMAT_EU";
	};
};
