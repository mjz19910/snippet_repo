type ItemSectionData<T=never,U=never>={
	contents: ItemSectionItem[];
	trackingParams: string;
	sectionIdentifier: T;
	targetId: U;
};
