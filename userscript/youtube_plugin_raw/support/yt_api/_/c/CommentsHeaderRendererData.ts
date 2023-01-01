import {YtTextType} from "../../json/YtTextType.js";
import {CommentSimpleboxRenderer} from "./CommentSimpleboxRenderer";

export type CommentsHeaderRendererData={
	commentsCount: YtTextType;
	countText: YtTextType;
	createRenderer: CommentSimpleboxRenderer;
	customEmojis: {};
	loggingDirectives: {};
	showSeparator: true;
	sortMenu: {
		sortFilterSubMenuRenderer: {};
	};
	titleText: {
		runs: {text: string;}[];
	};
	trackingParams: string;
	unicodeEmojisUrl: string;
};
