import {Accessibility} from "../a/Accessibility.js";
import {TextRun} from "../t/TextRun.js";
type TextRuns={
	runs: TextRun[];
};
type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};
export type YtTextType=SimpleText|TextRuns;
