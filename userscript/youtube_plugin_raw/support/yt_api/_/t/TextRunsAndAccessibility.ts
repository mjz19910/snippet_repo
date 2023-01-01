import {Accessibility} from "../../../../yt_json_types/Accessibility.js";
import {TextRun} from "../../json/TextRun.js";

export type TextRunsAndAccessibility={
	runs: TextRun[];
	accessibility: Accessibility;
};
