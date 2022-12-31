import {ChannelOptionsRenderer} from "../c/ChannelOptionsRenderer";
import {SettingsSwitchRenderer} from "./SettingsSwitchRenderer";
import {SettingsRadioOptionRenderer} from "./SettingsRadioOptionRenderer";
import {SettingsCheckboxRenderer} from "./SettingsCheckboxRenderer";
import {CopyLinkRenderer} from "../i/CopyLinkRenderer.js";

export type SettingsOptionItemType=
	ChannelOptionsRenderer|
	SettingsSwitchRenderer|
	SettingsCheckboxRenderer|
	SettingsRadioOptionRenderer|
	CopyLinkRenderer;
