import {Accessibility} from "./Accessibility.js";
import {TextT} from "./TextT.js";

export type GuideEntryRendererData={
	navigationEndpoint?: YtEndpoint;
	icon: Icon<"MIX">;
	trackingParams: string;
	formattedTitle: TextT;
	accessibility: Accessibility;
	entryData?: GuideEntryData;
	isPrimary?: boolean;
};