import {Accessibility} from "./Accessibility.js";
import {ReelWatchEndpointPlugin} from "./ReelWatchEndpointPlugin.js";
import {ServiceEndpoint} from "./ServiceEndpoint";
import {TextT} from "./TextT.js";
export type GuideEntryRendererData={
	navigationEndpoint?: YtEndpoint;
	icon: Icon<"MIX">;
	trackingParams: string;
	formattedTitle: TextT;
	accessibility: Accessibility;
	serviceEndpoint?: ServiceEndpoint<ReelWatchEndpointPlugin>;
	entryData?: GuideEntryData;
	isPrimary?: boolean;
	targetId?: "library-guide-item";
};