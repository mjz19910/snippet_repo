type GuideEntryRendererData={
	navigationEndpoint?: YtEndpoint;
	icon: Icon<"MIX">;
	trackingParams: string;
	formattedTitle: TextT;
	accessibility: Accessibility;
	serviceEndpoint?: ServiceEndpoint<GuideEntryServicePlugins>;
	entryData?: GuideEntryData;
	isPrimary?: boolean;
	targetId?: "library-guide-item";
};