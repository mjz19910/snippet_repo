import {YtdShadyChildrenOfYtdApp} from "./support/yt_api/yt/YtdShadyChildrenOfYtdApp.js";
import {VolumeRange} from "./youtube_plugin.user.js";

export type PagePreparer={
	cancel(): void;
};

interface YtdAppElementI extends HTMLElement {
	/** @type {HTMLStyleElement|undefined} */
	ui_plugin_style_element?: HTMLStyleElement;
	/** @type {VolumeRange|undefined} */
	volume_range?: VolumeRange;
	/** @type {boolean|undefined} */
	app_is_visible?: boolean;
	/** @type {ReturnType<typeof setInterval>|undefined} */
	ytp_click_cint?: number;
	/** @type {import("./types_tmp.js").PagePreparer} */
	pagePreparer?: PagePreparer;
	/** @type {import("./support/yt_api/yt/YtdShadyChildrenOfYtdApp.js").YtdShadyChildrenOfYtdApp} */
	__shady_children: YtdShadyChildrenOfYtdApp;
	hasNavigated: boolean;
}

export type YtdAppElement={
	new(): YtdAppElementI;
	/** @arg {HTMLElement} element @return {YtdAppElement} */
	cast(element: HTMLElement): YtdAppElementI;
};
