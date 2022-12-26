import {RendererContentItem} from "../r/RendererContentItem";


export interface RichGridRenderer {
	masthead: {
		[str: string]: {}|undefined;
		videoMastheadAdV3Renderer?: {};
	};
	contents: RendererContentItem[];
}
