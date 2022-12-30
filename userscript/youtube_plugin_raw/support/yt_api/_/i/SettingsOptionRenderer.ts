import {SimpleTextRun} from "./SimpleTextRun";

type SettingsOptionItemType={};

export type BasicOptionsData={
	options: SettingsOptionItemType[];
	title: SimpleTextRun;
};

export type Option_AV1_OPTIONS={
	id: "SETTINGS_OPTIONS_ID_TYPE_AV1_OPTIONS";
	options: SettingsOptionItemType[];
	title: SimpleTextRun;
	hidden: true;
};

export type OptionWithText={
	options: SettingsOptionItemType[];
	title: SimpleTextRun;
	text: SimpleTextRun;
}

export type SettingsOptionRenderer={
	settingsOptionsRenderer: BasicOptionsData|Option_AV1_OPTIONS;
};
