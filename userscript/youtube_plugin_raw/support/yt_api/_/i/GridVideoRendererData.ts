import {MenuRenderer} from "../m/MenuRenderer.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {TextRuns} from "../t/TextRuns.js";
import {ThumbnailOverlayItem} from "../t/ThumbnailOverlay.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {TextRunsAndAccessibility} from "./TextRunsAndAccessibility";

export type GridVideoRendererData={
	badges: {}[];
	channelThumbnail: ThumbnailsList;
	menu: MenuRenderer;
	navigationEndpoint: NavigationEndpoint;
	shortBylineText: TextRuns;
	shortViewCountText: TextRuns;
	thumbnail: ThumbnailsList;
	thumbnailOverlay: ThumbnailOverlayItem[];
	title: TextRunsAndAccessibility;
	trackingParams: string;
	videoId: string;
	viewCountText: TextRuns;
};
