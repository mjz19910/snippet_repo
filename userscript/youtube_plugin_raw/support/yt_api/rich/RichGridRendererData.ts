import {RendererContentItem} from "../_abc/r/RendererContentItem";


export interface RichGridRendererData {
	masthead: {
		[str: string]: {}|undefined;
		videoMastheadAdV3Renderer?: {};
	};
	contents: RendererContentItem[];
}
