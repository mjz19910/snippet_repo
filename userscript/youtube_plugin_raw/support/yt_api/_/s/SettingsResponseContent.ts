import {DesktopTopbarRenderer} from "../b/DesktopTopbarRenderer.js";
import {ResponseContext} from "../g/json/GeneralContext.js";
import {TwoColumnBrowseResultsRenderer} from "../t/TwoColumnBrowseResultsRenderer.js";
import {SettingsSidebarRenderer} from "./SettingsSidebarRenderer";


export type SettingsResponseContent={
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	sidebar: SettingsSidebarRenderer;
};
