type TD_ItemSection_1<T_ContentType,T_sectionIdentifier>=Record<"contents",T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
};