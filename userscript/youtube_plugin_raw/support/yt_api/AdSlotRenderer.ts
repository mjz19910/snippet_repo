import {AdSlotMetadata} from "./AdSlotMetadata";
import {InFeedAdLayoutRenderer} from "./InFeedAdLayoutRenderer";

export type AdSlotRenderer={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: {
		fulfilledLayout: {
			inFeedAdLayoutRenderer: InFeedAdLayoutRenderer;
		};
	};
	enablePacfLoggingWeb: boolean;
};
