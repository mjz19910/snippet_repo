import {CommentSimpleboxRenderer} from "./CommentSimpleboxRenderer";
import {TextRunsSimple} from "./TextRunsSimple";

export type CommentsHeaderRendererData={
	commentsCount: TextRunsSimple;
	countText: TextRunsSimple;
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
