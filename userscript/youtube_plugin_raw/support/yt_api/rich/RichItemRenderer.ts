import {RichItemRendererContentDef} from "./RichItemRendererContentDef";
import {TrackingParams} from "../_abc/t/TrackingParams.js";

export interface RichItemRenderer extends TrackingParams {
	content: RichItemRendererContentDef;
	rowIndex?: number;
	colIndex?: number;
}
