import {Accessibility} from "./Accessibility.js";
import {GuideEntryServicePlugins} from "./GuideEntryServicePlugins";
import {ServiceEndpoint} from "./ServiceEndpoint";
import {TextT} from "./TextT.js";
export type GuideEntryRendererData={
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