import {any} from "./any"
import {VolumeRange} from "./VolumeRange"

export class YtdAppElement extends HTMLElement {
	ytp_click_cint?: number
	app_is_visible?: number
	ui_plugin_style_element: HTMLStyleElement|undefined
	volume_range: VolumeRange|undefined
	static cast(element: HTMLElement) {
		return any<YtdAppElement>(element)
	}
	__shady_children={
		masthead: {
			$: {
				container: {
					children: {
						center: new Element
					}
				}
			}
		}
	};
}
