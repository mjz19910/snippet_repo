type T$D__ItemSection<T_ContentType,T_sectionIdentifier,T_targetId>=T$Contents<T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
	targetId: T_targetId;
};