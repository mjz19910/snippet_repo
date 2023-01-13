namespace WatchNextResultsNS {
	type SR_CTI=[
		RelatedChipCloudRenderer,
		ItemSectionRendererTemplate<"sid-wn-chips","watch-next-feed">
	][number];

	type SR_CT=ContentsTemplate<SR_CTI>;

	type SR_RAI=[
		RelatedChipCloudRenderer,
		ItemSectionRenderer
	][number];

	type SR_RA=ResultsArrTemplate<SR_RAI>;

	type RT_CTI=[
		VideoPrimaryInfoRenderer,
		VideoSecondaryInfoRenderer,
		ItemSectionRendererTemplate<"comments-entry-point",never>,
		ItemSectionRendererTemplate<"comment-item-section","comments-section">
	][number];

	type RT_CT=ContentsTemplate<RT_CTI>;

	export type SR=SecondaryResultsTemplate<SR_CT|SR_RA>;
	export type RT=ResultsTemplate<RT_CT>;
}
