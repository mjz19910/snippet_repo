import {ChannelOptionsRenderer} from "./ChannelOptionsRenderer";
import {SettingsSwitchRenderer} from "./SettingsSwitchRenderer";
import {SettingsRadioOptionRenderer} from "./SettingsRadioOptionRenderer";
import {SettingsCheckboxRenderer} from "./SettingsCheckboxRenderer";
import {CopyLinkRenderer} from "./CopyLinkRenderer";

export type SettingsOptionItemType=
	ChannelOptionsRenderer|
	SettingsSwitchRenderer|
	SettingsCheckboxRenderer|
	SettingsRadioOptionRenderer|
	CopyLinkRenderer;
