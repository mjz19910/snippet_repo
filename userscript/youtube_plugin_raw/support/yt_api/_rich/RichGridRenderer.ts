import {RendererContentItem} from "../_abc/r/RendererContentItem";


export interface RichGridRenderer {
	masthead: {
		[str: string]: {}|undefined;
		videoMastheadAdV3Renderer?: {};
	};
	contents: RendererContentItem[];
}
