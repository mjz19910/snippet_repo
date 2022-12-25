import {RendererContentItem} from "./RendererContentItem";


export interface RichGridRenderer {
	masthead: {
		[str: string]: {}|undefined;
		videoMastheadAdV3Renderer?: {};
	};
	contents: RendererContentItem[];
}
