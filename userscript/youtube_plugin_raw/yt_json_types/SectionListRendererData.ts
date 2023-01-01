import {ContinuationItemRenderer} from "./ContinuationItemRenderer.js";
import {ItemSectionRenderer} from "./ItemSectionRenderer.js";

export type SectionListRendererData={
	contents: (ItemSectionRenderer|ContinuationItemRenderer)[];
	trackingParams: string;
};
