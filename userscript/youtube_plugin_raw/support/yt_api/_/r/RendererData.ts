import {SettingsCheckboxRendererData} from "../s/SettingsCheckboxRendererData.js";
import {SettingsRadioOptionRendererData} from "../s/SettingsRadioOptionRendererData.js";
import {SettingsSwitchRendererData} from "../s/SettingsSwitchRendererData.js";
import {ChannelOptionsRendererData} from "../../../../yt_json_types/ChannelOptionsRendererData.js";
import {CopyLinkRendererData} from "../c/CopyLinkRendererData.js";

export type RendererData=ChannelOptionsRendererData|SettingsSwitchRendererData|SettingsCheckboxRendererData|SettingsRadioOptionRendererData|CopyLinkRendererData;
