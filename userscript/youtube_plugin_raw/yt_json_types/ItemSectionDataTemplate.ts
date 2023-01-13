type ItemSectionDataTemplate<T_sectionIdentifier,T_targetId>={
	contents: ItemSectionItem[];
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
	targetId: T_targetId;
};
