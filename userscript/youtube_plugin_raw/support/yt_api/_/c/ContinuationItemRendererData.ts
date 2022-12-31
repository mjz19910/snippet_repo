import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {GhostGridRenderer} from "../g/GhostGridRenderer.js";

export type ContinuationItemRendererData={
	trigger: string;
	continuationEndpoint: YtEndpoint;
	button?: ButtonRenderer;
	ghostCards?: GhostGridRenderer;
};
