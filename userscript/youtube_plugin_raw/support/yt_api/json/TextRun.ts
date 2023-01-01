import {YtEndpoint} from "./YtEndpoint.js";

export type TextRun={
	text: string;
	navigationEndpoint?: YtEndpoint;
	bold?: boolean;
};
