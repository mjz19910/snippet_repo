type ItemSectionData=T$AR$Contents<ItemSectionItem>&{
	trackingParams: string;
	sectionIdentifier: string;
	targetId?: string;
	header?: ItemSectionHeaderRenderer;
};
type ItemSectionHeader={
	title: D$TextWithRuns;
	subtitle: D$TextWithRuns;
};

type ItemSectionHeaderRenderer={
	itemSectionHeaderRenderer: ItemSectionHeader;
};