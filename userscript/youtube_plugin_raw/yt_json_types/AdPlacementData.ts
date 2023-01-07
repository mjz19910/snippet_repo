type AdTimeOffset={
	offsetStartMilliseconds: "-1";
	offsetEndMilliseconds: "-1";
};

type AdPlacementConfigData={
	kind: "AD_PLACEMENT_KIND_END";
	adTimeOffset: AdTimeOffset;
	hideCueRangeMarker: true;
};

type AdPlacementConfig={
	adPlacementConfig: AdPlacementConfigData;
};

type AdBreakServiceData={
	prefetchMilliseconds: "10000";
	getAdBreakUrl: string;
};

type AdBreakServiceRenderer={
	adBreakServiceRenderer: AdBreakServiceData;
};

type AdPlacementData={
	config: AdPlacementConfig;
	renderer: AdBreakServiceRenderer;
};