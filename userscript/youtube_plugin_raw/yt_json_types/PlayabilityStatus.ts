import {ButtonRenderer} from "./ButtonRenderer.js";
import {MiniplayerRenderer} from "./MiniplayerRenderer";
export type PlayabilityStatus={
	status: "OK";
	playableInEmbed: boolean;
	offlineability: ButtonRenderer;
	miniplayer: MiniplayerRenderer;
	contextParams: string;
};