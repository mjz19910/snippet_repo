import {SimpleTextRun} from "./SimpleTextRun";
import {SettingsOptionItemType} from "./SettingsOptionItemType";


export type OptionWithText={
	options: SettingsOptionItemType[];
	title: SimpleTextRun;
	text: SimpleTextRun;
};
