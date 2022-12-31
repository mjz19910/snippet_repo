import {SettingsCheckboxRendererData} from "../s/SettingsCheckboxRendererData.js";
import {SettingsRadioOptionRendererData} from "../s/SettingsRadioOptionRendererData.js";
import {SettingsSwitchRendererData} from "../s/SettingsSwitchRendererData.js";
import {ChannelOptionsRendererData} from "./ChannelOptionsRendererData.js";
import {CopyLinkRendererData} from "./CopyLinkRendererData.js";

export type RendererData=ChannelOptionsRendererData|SettingsSwitchRendererData|SettingsCheckboxRendererData|SettingsRadioOptionRendererData|CopyLinkRendererData;
