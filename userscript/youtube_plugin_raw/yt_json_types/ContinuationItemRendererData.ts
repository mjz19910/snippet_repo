import {ButtonRenderer} from "./ButtonRenderer.js";
import {YtEndpoint} from "./YtEndpoint.js";
import {GhostGridRenderer} from "../support/yt_api/_/g/GhostGridRenderer.js";

export type ContinuationItemRendererData={
	trigger: string;
	continuationEndpoint: YtEndpoint;
	button?: ButtonRenderer;
	ghostCards?: GhostGridRenderer;
};
