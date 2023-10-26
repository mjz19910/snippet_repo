import {G_RelatedItem} from "./G_RelatedItem.ts";

export type DC_RelatedChip={
	targetSectionIdentifier: "sid-wn-chips";
	loadCached: true;
	contents?: G_RelatedItem[];
};
