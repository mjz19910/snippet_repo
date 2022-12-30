import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {TrackingParams} from "../t/TrackingParams.js";


export interface ThumbnailRoot extends TrackingParams {
	thumbnail: ThumbnailsList;
	trackingParams: string;
}
