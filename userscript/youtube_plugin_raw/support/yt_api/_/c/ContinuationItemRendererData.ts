import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {GhostCards} from "../g/GhostCards.js";
import {ContinuationEndpoint} from "./ContinuationEndpoint.js";

export type ContinuationItemRendererData={
	trigger: string;
	continuationEndpoint: ContinuationEndpoint;
	button?: ButtonRenderer;
	ghostCards?: GhostCards;
};
