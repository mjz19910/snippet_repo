type TopicLinkRenderer={
	topicLinkRenderer: {};
};

type VideoDescriptionMusicSectionData={
	sectionTitle: SimpleText;
	carouselLockups: CarouselLockupRenderer[];
	topicLink: TopicLinkRenderer;
	premiumUpsellLink: TextT;
};
type CarouselLockupData={
	infoRows: [
		{
			infoRowRenderer: {};
		}
	];
};

type CarouselLockupRenderer={
	carouselLockupRenderer: CarouselLockupData;
};

type VideoDescriptionMusicSectionRenderer={
	videoDescriptionMusicSectionRenderer: VideoDescriptionMusicSectionData;
};
