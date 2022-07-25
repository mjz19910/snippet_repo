import {any} from "./any"

export class PluginOverlayElement extends HTMLElement {
	/**@arg {HTMLDivElement} value @return {PluginOverlayElement} */
	static cast(value: HTMLDivElement): PluginOverlayElement {
		return any(value)
	}
	onupdate() {}
}
