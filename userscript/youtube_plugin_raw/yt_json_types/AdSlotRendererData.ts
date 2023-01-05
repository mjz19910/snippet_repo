type FulfilledLayout={
	inFeedAdLayoutRenderer: InFeedAdLayoutData;
};

type FulfillmentContent={
	fulfilledLayout: FulfilledLayout;
};
type AdSlotData={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: FulfillmentContent;
	enablePacfLoggingWeb: boolean;
};
