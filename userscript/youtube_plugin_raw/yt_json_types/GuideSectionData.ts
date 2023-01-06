import {GuideSectionItemType} from "./GuideSectionItemType.js";
import {TextT} from "./TextT.js";
export type GuideSectionData={
	items: GuideSectionItemType[];
	trackingParams: string;
	formattedTitle?: TextT;
};