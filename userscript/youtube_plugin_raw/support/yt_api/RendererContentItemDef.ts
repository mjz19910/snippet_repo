import {CompactPlaylistRendererH} from "./CompactPlaylistRendererHolder.js";
import {CompactVideoRendererH} from "./CompactVideoRendererH.js";
import {ContinuationItemRendererH} from "./ContinuationItemRendererH.js";
import {CommentThreadRendererH} from "./CommentThreadRendererHolder.js";
import {CommentsHeaderRendererH} from "./CommentsHeaderRendererHolder.js";
import {RichSectionRendererH} from "./RichSectionRendererH.js";
import {RichItemRendererH} from "./RichItemRendererH.js";

export type RendererContentItemDef=
	RichItemRendererH|
	RichSectionRendererH|
	CommentsHeaderRendererH|
	CommentThreadRendererH|
	ContinuationItemRendererH|
	CompactVideoRendererH|
	CompactPlaylistRendererH;

