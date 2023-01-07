type TwoColumnWatchNextResultsData={
	results: ResultsTemplate<ContentTemplate<VideoPrimaryInfoRenderer|VideoSecondaryInfoRenderer|ItemSectionRenderer<never,never>>>;
	secondaryResults: SecondaryResultsTemplate<ContentTemplate<RelatedChipCloudRenderer|ItemSectionRenderer<never,never>>>;
	playlist: PlaylistTemplate<PlaylistContent>;
	autoplay?: AutoplayTemplate<AutoplayContent>;
};