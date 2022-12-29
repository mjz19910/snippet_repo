export type UrlEndpointTargetType="TARGET_NEW_WINDOW";
export type UrlEndpoint<Target extends UrlEndpointTargetType>={
	url: string;
	target: Target;
};
