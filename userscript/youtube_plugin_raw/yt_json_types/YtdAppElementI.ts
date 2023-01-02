interface YtdAppElementI extends HTMLElement {
	/** @type {HTMLStyleElement|undefined} */
	ui_plugin_style_element?: HTMLStyleElement;
	/** @type {VolumeRange|undefined} */
	volume_range?: VolumeRange;
	/** @type {boolean|undefined} */
	app_is_visible?: boolean;
	/** @type {ReturnType<typeof setInterval>|undefined} */
	ytp_click_cint?: number;
	/** @type {PagePreparer} */
	pagePreparer?: PagePreparer;
	/** @type {YtdShadyChildrenOfYtdApp} */
	__shady_children: YtdShadyChildrenOfYtdApp;
	hasNavigated: boolean;
}