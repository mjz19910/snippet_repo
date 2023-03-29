import {MastheadNext} from "./MastheadNext";

interface MastheadChildren {
	$: MastheadNext;
}

interface YtdAppChildren {masthead: MastheadChildren;}

export interface YtdAppElement extends HTMLElement {
	ytp_click_cint?: ReturnType<typeof setTimeout>;
	app_is_visible?: number;
	ui_plugin_style_element: HTMLStyleElement|undefined;
	volume_range: {}|undefined;
	__shady_children: YtdAppChildren;
}

export namespace YtdAppElement {
	export function cast(element: HTMLElement): YtdAppElement {
		return element as YtdAppElement;
	};
}
