import {ButtonRendererH} from "./ButtonRendererH";
import {ContinuationEndpoint} from "./ContinuationEndpoint";
import {GhostCards} from "./GhostCards";

export type ContinuationItemRenderer={
	trigger: string;
	continuationEndpoint: ContinuationEndpoint;
	button?: ButtonRendererH;
	ghostCards?: GhostCards;
};
