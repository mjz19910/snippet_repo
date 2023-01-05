type TwoColumnWatchNextResultsData={
	results: ResultsTemplate<ContentTemplate<VideoPrimaryInfoRenderer|VideoSecondaryInfoRenderer|ItemSectionRenderer>>;
	secondaryResults: SecondaryResultsTemplate<ContentTemplate<RelatedChipCloudRenderer|ItemSectionRenderer>>;
	playlist: PlaylistTemplate<PlaylistContent>;
	autoplay: AutoplayTemplate<AutoplayContent>;
};
