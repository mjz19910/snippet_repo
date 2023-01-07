type AdPlacementRendererItem=AdBreakServiceRenderer|ClientForecastingAdRenderer;
type AdPlacementData={
	config: AdPlacementConfig;
	renderer: AdPlacementRendererItem;
};