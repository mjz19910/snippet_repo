import {CompactPlaylistRendererH} from "./CompactPlaylistRendererH.js";
import {CompactVideoRendererH} from "./CompactVideoRendererH.js";
import {ContinuationItemRendererH} from "./ContinuationItemRendererH.js";
import {CommentThreadRendererH} from "./CommentThreadRendererH.js";
import {CommentsHeaderRendererH} from "./CommentsHeaderRendererH.js";
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

