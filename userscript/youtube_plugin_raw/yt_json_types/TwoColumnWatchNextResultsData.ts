type TwoColumnWatchNextResultsData={
	results: ResultsTemplate<
		ContentTemplate<
			[
				VideoPrimaryInfoRenderer,
				VideoSecondaryInfoRenderer,
				ItemSectionRenderer<"comments-entry-point",never>,
				ItemSectionRenderer<"comment-item-section","comments-section">,
			][number]
		>
	>;
	secondaryResults: SecondaryResultsTemplate<
		ContentTemplate<
			[
				RelatedChipCloudRenderer,
				ItemSectionRenderer<never,never>,
			][number]
		>|ResultsArrTemplate<
			[
				RelatedChipCloudRenderer,
				ItemSectionRenderer<never,never>,
			][number]
		>
	>;
	playlist?: PlaylistTemplate<PlaylistContent>;
	autoplay?: AutoplayTemplate<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};
type ResultsArrTemplate<T>={
	results: T[];
	trackingParams: string;
};