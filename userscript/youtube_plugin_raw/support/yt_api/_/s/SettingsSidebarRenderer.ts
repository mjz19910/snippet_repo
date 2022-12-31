import {YtEndpoint} from "../b/YtEndpoint.js";
import {YtTextType} from "./YtTextType.js";


export type SettingsSidebarRendererData={
	title: YtTextType;
	items: {
		compactLinkRenderer: {
			title: YtTextType;
			navigationEndpoint: YtEndpoint;
			trackingParams: string;
			style: "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR";
		};
	}[];
};

export type SettingsSidebarRenderer={
	settingsSidebarRenderer: SettingsSidebarRendererData;
};
