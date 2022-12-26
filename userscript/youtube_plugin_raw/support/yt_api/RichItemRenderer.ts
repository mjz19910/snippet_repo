import {RichItemRendererContentDef} from "./RichItemRendererContentDef";
import {TrackingParams} from "./TrackingParams.js";

export interface RichItemRenderer extends TrackingParams {
	content: RichItemRendererContentDef;
	rowIndex?: number;
	colIndex?: number;
}
