type TD_ItemSection_3<T_ContentType,T_sectionIdentifier,T_targetId>=Record<"contents",T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
	targetId: T_targetId;
};