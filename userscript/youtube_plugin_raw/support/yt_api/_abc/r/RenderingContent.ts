import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {DisplayAdRenderer} from "./DisplayAdRenderer";

export interface TN extends TrackingParams {
	thumbnail: ThumbnailsList;
};

export type AdTitle_0={
	"simpleText": "Create Lasting Wealth";
};

export type RenderingContent={
	"displayAdRenderer": DisplayAdRenderer;
};
