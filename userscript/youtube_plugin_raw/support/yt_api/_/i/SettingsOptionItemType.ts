import {YtEndpoint} from "../b/YtEndpoint.js";
import {YtTextType} from "../s/YtTextType.js";
import {ChannelOptionsRenderer} from "./ChannelOptionsRenderer";
import {SettingsSwitchRenderer} from "./SettingsSwitchRenderer";

export type SettingsOptionItemType=ChannelOptionsRenderer|SettingsSwitchRenderer|{
	settingsCheckboxRenderer: {
		title: YtTextType;
		helpText?: YtTextType;
		enabled:boolean;
		enableServiceEndpoint: YtEndpoint;
		disableServiceEndpoint: YtEndpoint;
		disabled: boolean;
	}|{
		settingsRadioOptionRenderer: {
			id: "SETTINGS_OPTIONS_ID_TYPE_AV1_SD"|"SETTINGS_OPTIONS_ID_TYPE_AV1_ALWAYS";
			title: YtTextType;
			helpText?: YtTextType;
			hidden: boolean;
		};
	};
};
