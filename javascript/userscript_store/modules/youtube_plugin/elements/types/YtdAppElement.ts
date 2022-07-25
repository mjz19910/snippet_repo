import {VolumeRange} from "modules/youtube_plugin/volume_range_plugin/VolumeRange"

export class YtdAppElement extends HTMLElement {
	ytp_click_cint?: number
	app_is_visible?: number
	ui_plugin_style_element: HTMLStyleElement|undefined
	volume_range: VolumeRange|undefined
	static cast(element: HTMLElement) {
		let element_any: any = element
		return element_any
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
