import {InFeedAdLayoutRenderer} from "../InFeedAdLayoutRenderer.js";
import {AdSlotMetadata} from "./AdSlotMetadata";

export type AdSlotRendererData={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: {
		fulfilledLayout: {
			inFeedAdLayoutRenderer: InFeedAdLayoutRenderer;
		};
	};
	enablePacfLoggingWeb: boolean;
};
