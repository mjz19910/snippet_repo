type ItemSectionData=ContentsArrayTemplate<ItemSectionItem>&{
	trackingParams: string;
	sectionIdentifier: string;
	targetId?: string;
	header?: ItemSectionHeaderRenderer;
};
type ItemSectionHeader={
	title: TextWithRuns;
	subtitle: TextWithRuns;
};

type ItemSectionHeaderRenderer={
	itemSectionHeaderRenderer: ItemSectionHeader;
};