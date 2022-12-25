import {RichItemRendererContentDef} from "./RichItemRendererContentDef";

export interface RichItemRenderer {
	content: RichItemRendererContentDef;
	trackingParams: string;
	rowIndex?: number;
	colIndex?: number;
}
