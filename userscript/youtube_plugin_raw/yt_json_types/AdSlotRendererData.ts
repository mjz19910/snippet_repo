type FulfilledLayout={
	inFeedAdLayoutRenderer: InFeedAdLayoutRendererData;
};

type FulfillmentContent={
	fulfilledLayout: FulfilledLayout;
};
type AdSlotRendererData={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: FulfillmentContent;
	enablePacfLoggingWeb: boolean;
};
