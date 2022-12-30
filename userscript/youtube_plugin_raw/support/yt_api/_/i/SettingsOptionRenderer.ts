import {SimpleTextRun} from "./SimpleTextRun";

type SettingsOptionItemType={};

type BasicOptionsData={
	options: SettingsOptionItemType[];
	title: SimpleTextRun;
};

export type SettingsOptionRenderer={
	settingsOptionsRenderer: BasicOptionsData|{
		options: SettingsOptionItemType[];
		title: SimpleTextRun;
		hidden: true;
		id: "SETTINGS_OPTIONS_ID_TYPE_AV1_OPTIONS";
	};
};
