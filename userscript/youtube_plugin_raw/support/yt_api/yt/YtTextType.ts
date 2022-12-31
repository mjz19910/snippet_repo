import {Accessibility} from "../_/a/Accessibility.js";
import {TextRun} from "../_/t/TextRun.js";

type TextRuns={
	runs: TextRun[];
};
type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};
export type YtTextType=SimpleText|TextRuns;
