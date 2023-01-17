type ItemSectionDataTemplate<T_sectionIdentifier,T_targetId>=ContentsArrayTemplate<ItemSectionItem>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
	targetId: T_targetId;
};