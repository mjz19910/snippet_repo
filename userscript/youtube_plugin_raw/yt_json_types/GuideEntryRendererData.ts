type GuideEntryRendererData={
	navigationEndpoint?: {};
	icon: Icon<"MIX">;
	trackingParams: string;
	formattedTitle: TextT;
	accessibility: Accessibility;
	serviceEndpoint?: ServiceEndpoint<GuideEntryServicePlugins>;
	entryData?: GuideEntryData;
	isPrimary?: boolean;
	targetId?: "library-guide-item";
};
type ServiceEndpoint_Omit<T extends {}>=Omit<ServiceEndpoint<T>,"clickTrackingParams"|"commandMetadata">;