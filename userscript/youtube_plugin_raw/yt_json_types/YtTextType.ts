import {Accessibility} from "./Accessibility.js";
import {TextRun} from "./TextRun.js";

export type YtTextType={
	runs?: TextRun[];
	accessibility?: Accessibility;
	simpleText?: string;
};
