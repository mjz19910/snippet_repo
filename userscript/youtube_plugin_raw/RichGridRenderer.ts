import {RendererContentItem} from "./RendererContentItem";

interface RichGridRenderer {
	masthead: {
		[str: string]: {}|undefined;
		videoMastheadAdV3Renderer?: {};
	};
	contents: RendererContentItem[];
}
