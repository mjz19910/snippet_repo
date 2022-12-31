import {LinkRenderer} from "./LinkRenderer";
import {YtTextType} from "./YtTextType.js";



export type SettingsSidebarRendererData={
	title: YtTextType;
	items: {
		compactLinkRenderer: LinkRenderer;
	}[];
};
