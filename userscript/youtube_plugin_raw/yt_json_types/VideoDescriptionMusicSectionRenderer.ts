type TopicLinkRenderer={
	topicLinkRenderer: {
		title: SimpleText;
		thumbnailDetails: Thumbnail;
		endpoint: BrowseEndpoint<never>;
		callToActionIcon: Icon<"CHEVRON_RIGHT">;
		trackingParams: string;
	};
};

type VideoDescriptionMusicSectionData={
	sectionTitle: SimpleText;
	carouselLockups: CarouselLockupRenderer[];
	topicLink: TopicLinkRenderer;
	premiumUpsellLink: TextT;
};
type CarouselLockupData={
	infoRows: InfoRowRenderer[];
};
type InfoRowRenderer={
	infoRowRenderer: {
		title: SimpleText;
		defaultMetadata: SimpleText;
		trackingParams: string;
	};
};

type CarouselLockupRenderer={
	carouselLockupRenderer: CarouselLockupData;
};

type VideoDescriptionMusicSectionRenderer={
	videoDescriptionMusicSectionRenderer: VideoDescriptionMusicSectionData;
};
