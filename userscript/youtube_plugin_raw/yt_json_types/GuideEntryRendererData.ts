type GuideEntryRendererData={
	navigationEndpoint?: YtEndpoint;
	icon: Icon<"MIX">;
	trackingParams: string;
	formattedTitle: TextT;
	accessibility: Accessibility;
	serviceEndpoint?: ServiceEndpoint<GuideEntryServicePlugins,never>;
	entryData?: GuideEntryData;
	isPrimary?: boolean;
	targetId?: "library-guide-item";
};
type ServiceEndpoint_Omit<T extends {},U extends keyof VEMap>=Omit<ServiceEndpoint<T, U>,"clickTrackingParams"|"commandMetadata">;