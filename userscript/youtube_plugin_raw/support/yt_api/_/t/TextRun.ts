import {YtEndpoint} from "../../yt/YtEndpoint.js";

export type TextRun={
	text: string;
	navigationEndpoint?: YtEndpoint;
	bold?: boolean;
};
