import {ContinuationItemRenderer} from "../c/ContinuationItemRenderer.js";
import {ItemSectionRenderer} from "../i/ItemSectionRenderer.js";

export type SectionListRendererData={
	contents: (ItemSectionRenderer|ContinuationItemRenderer)[];
	trackingParams: string;
};
