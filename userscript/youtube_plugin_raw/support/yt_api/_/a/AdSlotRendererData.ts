import {InFeedAdLayoutRendererData} from "../i/InFeedAdLayoutRendererData.js";
import {AdSlotMetadata} from "./AdSlotMetadata";

type FulfilledLayout={
	inFeedAdLayoutRenderer: InFeedAdLayoutRendererData;
};

type FulfillmentContent={
	fulfilledLayout: FulfilledLayout;
};

export type AdSlotRendererData={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: FulfillmentContent;
	enablePacfLoggingWeb: boolean;
};
