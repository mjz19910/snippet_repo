import {RichItemRendererContentDef} from "./RichItemRendererContentDef";
import {TrackingParams} from "../t/TrackingParams.js";

export interface RichItemRenderer extends TrackingParams {
	content: RichItemRendererContentDef;
	rowIndex?: number;
	colIndex?: number;
}
