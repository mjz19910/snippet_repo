import {CompactPlaylistRendererH} from "./CompactPlaylistRendererH.js";
import {CompactVideoRendererH} from "./CompactVideoRendererH.js";
import {ContinuationItemRendererH} from "./ContinuationItemRendererH.js";
import {CommentThreadRendererH} from "./CommentThreadRendererH.js";
import {CommentsHeaderRendererH} from "./CommentsHeaderRendererH.js";
import {RichSectionRendererH} from "./RichSectionRendererH.js";
import {RichItemRendererH} from "./RichItemRendererH";

export type RendererContentItem=
	RichItemRendererH|
	RichSectionRendererH|
	CommentsHeaderRendererH|
	CommentThreadRendererH|
	ContinuationItemRendererH|
	CompactVideoRendererH|
	CompactPlaylistRendererH|
	never;
