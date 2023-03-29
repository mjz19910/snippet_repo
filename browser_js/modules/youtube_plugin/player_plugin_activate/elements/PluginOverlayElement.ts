// extends HTMLElement
export interface PluginOverlayElement extends HTMLDivElement {
	onupdate():void;
}

export namespace PluginOverlayElement {
	export function cast(value: HTMLDivElement): PluginOverlayElement {
		return value as PluginOverlayElement;
	}
}
