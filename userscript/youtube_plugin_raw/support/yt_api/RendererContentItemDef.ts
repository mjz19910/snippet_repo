import {CompactPlaylistRendererH} from "./CompactPlaylistRendererHolder";
import {CompactVideoRendererH} from "./CompactVideoRendererHolder";
import {ContinuationItemRendererH} from "./ContinuationItemRendererHolder";
import {CommentThreadRendererH} from "./CommentThreadRendererHolder";
import {CommentsHeaderRendererH} from "./CommentsHeaderRendererHolder";
import {RichSectionRendererH} from "./RichSectionRendererHolder.js";

export type RendererContentItemDef=
	RichItemRendererHolder|
	RichSectionRendererH|
	CommentsHeaderRendererH|
	CommentThreadRendererH|
	ContinuationItemRendererH|
	CompactVideoRendererH|
	CompactPlaylistRendererH;

