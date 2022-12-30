import {TextRunsSimpleT} from "../t/TextRunsSimple.js";


type SettingsSidebarRendererData={
	title: TextRunsSimpleT<"Settings">;
	items: {}[];
};

export type SettingsSidebarRenderer={
	settingsSidebarRenderer: SettingsSidebarRendererData;
};
