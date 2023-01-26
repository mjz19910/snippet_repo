type TD_ItemSection_2x<T_ContentType,T_sectionIdentifier>=Record<"contents",T_ContentType[]>&{
	trackingParams: string;
	sectionIdentifier: T_sectionIdentifier;
};