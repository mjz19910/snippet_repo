import {CommentsHeaderRendererH} from "../c/CommentsHeaderRendererH.js";
import {CommentThreadRendererH} from "../c/CommentThreadRendererH.js";
import {CompactPlaylistRendererH} from "../c/CompactPlaylistRendererH.js";
import {CompactVideoRendererH} from "../c/CompactVideoRendererH.js";

export type RendererContentItemDef=
	RichItemRendererH|
	RichSectionRenderer|
	CommentsHeaderRendererH|
	CommentThreadRendererH|
	CompactVideoRendererH|
	CompactPlaylistRendererH;

