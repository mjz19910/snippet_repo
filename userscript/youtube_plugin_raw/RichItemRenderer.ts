import {RichItemRendererContent} from "./RichItemRendererContent";

export interface RichItemRenderer {
	content: RichItemRendererContent;
	trackingParams: string;
	rowIndex?: number;
	colIndex?: number;
}
