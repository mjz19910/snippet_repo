import {RendererContentItem} from "./RendererContentItem"

// { masthead: { [str: string]: any; videoMastheadAdV3Renderer?: any; }; contents: {richItemRenderer:{content:{}}}[]; }
export class RichGridRenderer {
	masthead: {[str: string]: any; videoMastheadAdV3Renderer?: any}={};
	/**@type {RendererContentItem[]} */
	contents: RendererContentItem[]=[];
}
